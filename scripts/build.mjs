// Usage :
//   npm run build                      -> tous les fichiers de sources/ (+ nettoyage de output/)
//   npm run build -- sources/tp/x.md   -> un ou plusieurs fichiers
//   npm run build:html                 -> HTML seulement (aperçu rapide, sans PDF)
//   npm run watch                      -> régénère à chaque enregistrement
//
// Sorties rangées par classe : output/<dossier>/ (voir pipeline.config.json > classes)
//   TP / TD / cadrage : eleve/ELEVE_<nom>.pdf, prof/PROF_<nom>.pdf
//   Cours (séance)    : slides/SLIDES_<nom>.pdf + slides/<nom>.html (projection),
//                       prof/DEROULE_<nom>.pdf, eleve/ELEVE_<nom>.pdf, prof/PROF_<nom>.pdf
//   Progression       : PROGRESSION_<classe>.pdf à la racine du dossier de la classe
// output/.manifest.json mémorise ce que chaque source a produit : les fichiers devenus inutiles
// (source renommée ou supprimée, ancien rangement) sont effacés automatiquement.
import fs from 'node:fs';
import path from 'node:path';
import { chargerConfig, listerSources, analyser, dossierClasse, RACINE } from './lib/commun.mjs';
import { variante, appliquerSujet } from './lib/document.mjs';
import { rendreHtml } from './lib/render.mjs';
import { rendreDiapos, rendreDeroule, corpsFiche } from './lib/seance.mjs';
import { rendreProgression } from './lib/progression.mjs';
import { ouvrirNavigateur, genererPdf } from './lib/pdf.mjs';

const args = process.argv.slice(2);
const htmlSeul = args.includes('--html');
const surveiller = args.includes('--watch');
const fichiersDemandes = args.filter((a) => !a.startsWith('--'));

let navigateur = null;

const SORTIE = () => path.join(RACINE, chargerConfig().dossierSortie);
const MANIFESTE = () => path.join(SORTIE(), '.manifest.json');
const lireManifeste = () => { try { return JSON.parse(fs.readFileSync(MANIFESTE(), 'utf8')); } catch { return {}; } };
const ecrireManifeste = (m) => fs.writeFileSync(MANIFESTE(), JSON.stringify(m, null, 2));
const relSortie = (f) => path.relative(SORTIE(), f).split(path.sep).join('/');

// Une sortie = { cle, html, fichierHtml, pdf, format, libelle }
function sorties(doc, seance, progression, config, nom) {
  const dossier = path.join(SORTIE(), dossierClasse(doc.meta, config));
  const cache = (cle) => path.join(SORTIE(), '.cache', `${nom}.${cle}.html`);
  const s = [];

  if (progression) {
    return [{
      cle: 'progression', html: rendreProgression(doc, progression, config), fichierHtml: cache('progression'),
      pdf: path.join(dossier, `${nom}.pdf`), format: 'a4-paysage', libelle: `PROGRESSION — ${doc.meta.classe}`,
    }];
  }

  const fiche = seance ? corpsFiche(seance.seance) : doc.corps;
  // Sujets multiples (variantes: [A, B]) : un couple élève / prof par sujet, suffixé _A, _B…
  const sujets = !seance && doc.meta.variantes ? doc.meta.variantes : [null];
  for (const v of sujets) {
    const corps = v ? appliquerSujet(fiche, v, sujets) : fiche;
    const meta = v ? { ...doc.meta, sujet: v } : doc.meta;
    const suffixe = v ? `_${v}` : '';
    for (const cible of ['eleve', 'prof']) {
      s.push({
        cle: `${cible}${suffixe}`,
        html: rendreHtml({
          meta, corps: variante(corps, cible, config), cible, config, fichierSource: doc.fichier,
          libelleVariante: seance ? 'Fiche d\'activités — corrigé enseignant' : undefined,
        }),
        fichierHtml: cache(`${cible}${suffixe}`),
        pdf: path.join(dossier, cible, `${cible === 'prof' ? 'PROF' : 'ELEVE'}_${nom}${suffixe}.pdf`),
        libelle: `${cible === 'prof' ? 'CORRIGÉ PROF' : 'ÉLÈVE'}${v ? ` — SUJET ${v}` : ''}`,
      });
    }
  }
  if (seance) {
    s.push({
      cle: 'deroule', html: rendreDeroule(doc, seance.seance, config, seance.tActivite), fichierHtml: cache('deroule'),
      pdf: path.join(dossier, 'prof', `DEROULE_${nom}.pdf`), libelle: 'DÉROULÉ ENSEIGNANT',
    });
    s.push({
      cle: 'slides', html: rendreDiapos(doc, seance.seance, config),
      fichierHtml: path.join(dossier, 'slides', `${nom}.html`), garderHtml: true,
      pdf: path.join(dossier, 'slides', `SLIDES_${nom}.pdf`), format: 'diapo',
    });
  }
  return s;
}

async function construire(fichier, config, manifeste) {
  const { doc, seance, progression, ok } = analyser(fichier, config);
  if (!ok) return false;

  const nom = path.basename(fichier, '.md');
  const produits = [];
  for (const s of sorties(doc, seance, progression, config, nom)) {
    fs.mkdirSync(path.dirname(s.fichierHtml), { recursive: true });
    fs.writeFileSync(s.fichierHtml, s.html);
    if (s.garderHtml) produits.push(s.fichierHtml);
    if (htmlSeul) { console.log(`    → ${relSortie(s.fichierHtml)}`); continue; }

    navigateur ??= await ouvrirNavigateur(config);
    fs.mkdirSync(path.dirname(s.pdf), { recursive: true });
    const debordements = await genererPdf(navigateur, s.fichierHtml, s.pdf, { meta: doc.meta, config, libelle: s.libelle, format: s.format });
    produits.push(s.pdf);
    console.log(`    → ${relSortie(s.pdf)}`);
    if (debordements.length) console.log(`    avert.  contenu trop long (coupé) sur les diapos ${debordements.join(', ')} : alléger ou découper`);
  }

  if (!htmlSeul) {
    const cle = path.relative(RACINE, fichier).split(path.sep).join('/');
    const nouveaux = produits.map(relSortie);
    for (const ancien of manifeste[cle] ?? []) if (!nouveaux.includes(ancien)) supprimer(ancien);
    manifeste[cle] = nouveaux;
  }
  return true;
}

let supprimes = [];
function supprimer(rel) {
  const f = path.join(SORTIE(), rel);
  if (fs.existsSync(f)) { fs.rmSync(f); supprimes.push(rel); }
}

// Après une génération complète : retire les sorties des sources disparues et tout fichier
// que plus aucune source ne produit (anciens rangements), puis les dossiers vides.
function nettoyer(manifeste, sources) {
  const actives = new Set(sources.map((f) => path.relative(RACINE, f).split(path.sep).join('/')));
  for (const cle of Object.keys(manifeste)) {
    if (!actives.has(cle)) { (manifeste[cle] ?? []).forEach(supprimer); delete manifeste[cle]; }
  }
  const attendus = new Set(Object.values(manifeste).flat());
  const parcourir = (dossier) => {
    for (const e of fs.readdirSync(dossier, { withFileTypes: true })) {
      const f = path.join(dossier, e.name);
      if (e.isDirectory()) {
        if (e.name === '.cache') continue;
        parcourir(f);
        if (!fs.readdirSync(f).length) fs.rmdirSync(f);
      } else if (e.name !== '.manifest.json' && !attendus.has(relSortie(f))) {
        supprimer(relSortie(f));
      }
    }
  };
  parcourir(SORTIE());
}

async function toutConstruire(fichiers, { complet = false } = {}) {
  const config = chargerConfig();
  const manifeste = lireManifeste();
  supprimes = [];
  let ok = true;
  for (const f of fichiers) {
    try {
      ok = (await construire(f, config, manifeste)) && ok;
    } catch (e) {
      ok = false;
      console.log(`    ERREUR  ${e.message}`);
    }
  }
  if (!htmlSeul) {
    if (complet && ok) nettoyer(manifeste, fichiers);
    fs.mkdirSync(SORTIE(), { recursive: true });
    ecrireManifeste(manifeste);
  }
  if (supprimes.length) {
    console.log(`\nNettoyage : ${supprimes.length} fichier(s) obsolète(s) supprimé(s)`);
    supprimes.forEach((s) => console.log(`    ✗ ${s}`));
  }
  return ok;
}

const config = chargerConfig();
const fichiers = listerSources(fichiersDemandes, config);
if (!fichiers.length) console.log('Aucun fichier source trouvé.');
const ok = await toutConstruire(fichiers, { complet: !fichiersDemandes.length });

if (!surveiller) {
  await navigateur?.close();
  process.exit(ok ? 0 : 1);
}

// Mode surveillance : sources/ (le fichier modifié, ou tout si une image ou des données changent)
// et templates/*.css, referentiels/ (tout).
console.log('\nSurveillance active (Ctrl+C pour arrêter)…');
const enAttente = new Map();
function planifier(cle, action) {
  clearTimeout(enAttente.get(cle));
  enAttente.set(cle, setTimeout(action, 300));
}
const toutes = () => toutConstruire(listerSources(fichiersDemandes, chargerConfig()));
const dossierSources = path.join(RACINE, config.dossierSources);
fs.watch(dossierSources, { recursive: true }, (_evt, nom) => {
  if (!nom) return;
  const f = path.join(dossierSources, nom);
  if (nom.endsWith('.md') && !path.basename(nom).startsWith('_') && fs.existsSync(f)) planifier(f, () => toutConstruire([f]));
  else if (/\.(svg|png|jpe?g|webp|ya?ml)$/i.test(nom) || path.basename(nom).startsWith('_')) planifier('tout', toutes);
});
for (const d of ['templates', 'referentiels']) {
  fs.watch(path.join(RACINE, d), { recursive: true }, (_evt, nom) => {
    if (nom && /\.(css|ya?ml)$/.test(nom)) planifier('tout', toutes);
  });
}
