// Configuration, recherche des sources, rangement des sorties et affichage des diagnostics.
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { lireDocument, valider, appliquerSujet, estNote } from './document.mjs';
import { verifierFormules, RACINE } from './render.mjs';
import { validerSeance } from './seance.mjs';
import { validerProgression } from './progression.mjs';

export { RACINE };

export function chargerConfig() {
  const fichier = path.join(RACINE, 'pipeline.config.json');
  return JSON.parse(fs.readFileSync(fichier, 'utf8'));
}

// Fichiers passés en argument, ou tous les .md du dossier sources
// (hors dossiers d'images et fichiers commençant par « _ », qui sont des données incluses).
export function listerSources(args, config) {
  if (args.length) return args.map((a) => path.resolve(a));
  const dossier = path.join(RACINE, config.dossierSources);
  return fs.readdirSync(dossier, { recursive: true })
    .filter((f) => f.endsWith('.md') && !f.split(/[\\/]/).includes('img') && !path.basename(f).startsWith('_'))
    .map((f) => path.join(dossier, f))
    .sort();
}

// Dossier de sortie d'un document : champ « dossier » du front matter, sinon d'après le niveau
// (pipeline.config.json > classes : la première règle dont un motif apparaît dans le niveau).
export function dossierClasse(meta, config) {
  if (meta.dossier) return meta.dossier;
  const niveau = String(meta.niveau ?? '').toLowerCase();
  const regle = (config.classes ?? []).find((c) => c.motifs.some((m) => niveau.includes(m.toLowerCase())));
  return regle?.dossier ?? 'Divers';
}

// Séquences connues de chaque dossier de classe, lues dans les progressions (et leur catalogue).
// Clé « <dossier>|<id> » → { id, dossier: "S1_Internet", ressources }.
let index = null;
export const oublierSequences = () => { index = null; };
const slug = (t) => String(t).replace(/µ/g, 'u').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');
export function indexSequences(config) {
  if (index) return index;
  index = new Map();
  const dossier = path.join(RACINE, config.dossierSources, 'progression');
  if (!fs.existsSync(dossier)) return index;
  for (const f of fs.readdirSync(dossier).filter((n) => n.endsWith('.md') && !n.startsWith('_'))) {
    const { meta } = lireDocument(path.join(dossier, f));
    const classe = dossierClasse(meta, config);
    const catalogue = meta.catalogue ? yaml.load(fs.readFileSync(path.join(RACINE, meta.catalogue), 'utf8')) : {};
    const parId = new Map((catalogue.sequences ?? []).map((s) => [s.id, s]));
    const locales = (meta.sequences ?? []).map((e) => ({ ...(e.ref ? parId.get(e.ref) : {}), ...e, id: e.id ?? e.ref }));
    for (const s of [...(catalogue.sequences ?? []), ...locales]) {
      const cle = `${classe}|${s.id}`;
      const deja = index.get(cle);
      const ressources = [...(deja?.ressources ?? []), ...[].concat(s.ressources ?? []).map(String)];
      index.set(cle, { id: s.id, dossier: `${s.id}_${slug(s.court ?? s.titre ?? '')}`, ressources });
    }
  }
  return index;
}

// Sous-dossier de séquence d'un document : champ « sequence: S2 » du front matter,
// sinon la séquence de la progression qui le cite dans ses « ressources », sinon « Hors_sequence ».
export function dossierSequence(meta, nom, config) {
  const classe = dossierClasse(meta, config);
  const seqs = [...indexSequences(config).entries()].filter(([k]) => k.startsWith(`${classe}|`)).map(([, s]) => s);
  if (meta.sequence) return seqs.find((s) => s.id === String(meta.sequence))?.dossier ?? null;
  return seqs.find((s) => s.ressources.some((r) => r.split(/[\s(]/)[0] === nom))?.dossier ?? 'Hors_sequence';
}

// Lit, valide et affiche le diagnostic d'un fichier.
export function analyser(fichier, config) {
  const rel = path.relative(RACINE, fichier);
  const doc = lireDocument(fichier);
  let res;
  let seance = null;
  let progression = null;
  let resume = '';

  if (doc.meta.type === 'progression') {
    progression = validerProgression(doc);
    res = { erreurs: progression.erreurs, avertissements: progression.avertissements };
    const seqs = progression.pistes.flatMap((p) => p.sequences);
    resume = ` (${seqs.length} séquences : ${seqs.filter((s) => s.etat === 'fait').length} réalisées, ${seqs.filter((s) => s.etat === 'en-cours').length} en cours)`;
  } else {
    res = valider(doc, config);
    if (doc.meta.sequence && !dossierSequence(doc.meta, path.basename(fichier, '.md'), config)) {
      const connues = [...indexSequences(config).keys()].filter((k) => k.startsWith(`${dossierClasse(doc.meta, config)}|`)).map((k) => k.split('|')[1]);
      res.erreurs.push({ ligne: null, msg: `sequence « ${doc.meta.sequence} » inconnue dans les progressions de ${dossierClasse(doc.meta, config)} (connues : ${connues.join(', ') || 'aucune'})` });
    }
    const sujets = doc.meta.variantes ?? [null];
    for (const v of sujets) {
      const corps = v ? appliquerSujet(doc.corps, v, sujets) : doc.corps;
      verifierFormules(corps).forEach((e) => res.erreurs.push({ ligne: null, msg: `${v ? `Sujet ${v} — ` : ''}Formule LaTeX « ${e.formule} » : ${e.msg}` }));
    }
    if (doc.meta.type === 'cours') {
      const s = validerSeance(doc, config);
      res.erreurs.push(...s.erreurs);
      res.avertissements.push(...s.avertissements);
      seance = s;
      const pct = s.seance.total ? Math.round((100 * s.tActivite) / s.seance.total) : 0;
      resume = ` (${s.seance.total} min, ${s.seance.etapes.filter((e) => e.type === 'activite').length} activités = ${pct} %, ${s.seance.nbDiapos} diapos)`;
    } else if (estNote(doc.meta)) {
      resume = ` (${res.questions} questions, ${String(res.total).replace('.', ',')} pts${doc.meta.variantes ? `, sujets ${doc.meta.variantes.join(' / ')}` : ''})`;
    }
  }

  const etat = res.erreurs.length ? '✗' : res.avertissements.length ? '!' : '✓';
  console.log(`${etat} ${rel}${resume}`);
  const ligne = (d) => (d.ligne ? `${rel}:${d.ligne} ` : '');
  const tri = (a, b) => (a.ligne ?? 0) - (b.ligne ?? 0);
  res.erreurs.sort(tri).forEach((d) => console.log(`    ERREUR  ${ligne(d)}${d.msg}`));
  res.avertissements.sort(tri).forEach((d) => console.log(`    avert.  ${ligne(d)}${d.msg}`));
  return { doc, seance, progression, ok: res.erreurs.length === 0 };
}
