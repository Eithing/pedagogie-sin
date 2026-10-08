// Lecture d'un document source : front matter, repérage des blocs `:::`,
// validation et production des variantes élève / prof.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const TYPES = ['tp', 'td', 'evaluation', 'cours', 'autonomie', 'cadrage', 'progression'];
export const NOTES = ['tp', 'td', 'evaluation']; // documents notés : points et barème obligatoires
// Un travail en autonomie (distanciel) est noté seulement s'il porte un barème.
export const estNote = (meta) => NOTES.includes(meta.type) || (meta.type === 'autonomie' && meta.bareme != null);
export const BLOCS = [
  'question', 'reponse', 'zone', 'prof', 'dire',
  'info', 'attention', 'rappel', 'contexte', 'problematique', 'retenir', 'doc', 'figure',
  'slide', 'activite', 'variante',
];
const BLOCS_SEANCE = ['slide', 'activite', 'dire'];

export const SANS_CODE = /(^|\n)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\2[ \t]*(?=\n|$)/g;

// {{valeurA|valeurB}} ; la fermeture est la dernière paire d'une suite d'accolades,
// pour qu'une valeur LaTeX finissant par « } » (ex. \text{ V}) reste entière.
const SUJETS = /\{\{([\s\S]*?)\}\}(?!\})/g;

// « 1 h 30 min », « 55 min », « 2 h » -> minutes (null si illisible)
export function parseDuree(v) {
  const s = String(v ?? '');
  const h = s.match(/(\d+)\s*h/);
  const m = s.match(/(\d+)\s*min/);
  if (!h && !m) return null;
  return (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
}

// Images référencées : ![alt](chemin) hors code + illustration du front matter
export function images(doc) {
  const sansCode = doc.corps.replace(SANS_CODE, '$1');
  const liens = [...sansCode.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)>?[^)]*\)/g)].map((m) => m[1]);
  if (doc.meta.illustration) liens.push(doc.meta.illustration);
  return liens;
}

const OUVERTURE = /^(:{3,})\s*([A-Za-z-]+)\s*(.*?)\s*$/;
const FERMETURE = /^(:{3,})\s*$/;
const FENCE_OUVERTE = /^\s*(`{3,}|~{3,})/;
const FENCE_FERMEE = /^\s*(`{3,}|~{3,})\s*$/;

// Arguments d'une question : `::: question 3 [1,5 pt]`
const ARGS_QUESTION = /^(\d+)?\s*(?:\[\s*([\d.,]+)\s*pts?\s*\])?$/;

export function lireDocument(fichier) {
  const source = fs.readFileSync(fichier, 'utf8');
  const { data: meta, content: corps } = matter(source);
  const decalage = source.split(/\r?\n/).length - corps.split(/\r?\n/).length;
  return { fichier, meta, corps, decalage };
}

export function parseArgsQuestion(args) {
  const m = args.match(ARGS_QUESTION);
  if (!m) return null;
  return {
    numero: m[1] ? Number(m[1]) : null,
    points: m[2] ? Number(m[2].replace(',', '.')) : null,
  };
}

// Repère les blocs `:::` en ignorant ceux qui sont dans des blocs de code.
export function reperer(corps) {
  const lignes = corps.split(/\r?\n/);
  const pile = [];
  const blocs = [];
  const erreurs = [];
  let fence = null;

  lignes.forEach((ligne, i) => {
    if (fence) {
      const f = ligne.match(FENCE_FERMEE);
      if (f && f[1][0] === fence[0] && f[1].length >= fence.length) fence = null;
      return;
    }
    const f = ligne.match(FENCE_OUVERTE);
    if (f) { fence = f[1]; return; }

    let m;
    if ((m = ligne.match(FERMETURE))) {
      const haut = pile.at(-1);
      if (!haut) {
        erreurs.push({ ligne: i, msg: 'Fermeture `:::` sans bloc ouvert' });
      } else if (m[1].length >= haut.marqueur) {
        haut.fin = i;
        blocs.push(pile.pop());
      }
    } else if ((m = ligne.match(OUVERTURE))) {
      pile.push({
        nom: m[2].toLowerCase(),
        args: m[3],
        marqueur: m[1].length,
        debut: i,
        fin: null,
        parent: pile.at(-1)?.nom ?? null,
      });
    }
  });

  if (fence) erreurs.push({ ligne: lignes.length - 1, msg: 'Bloc de code ``` jamais fermé' });
  for (const b of pile) erreurs.push({ ligne: b.debut, msg: `Bloc « ${b.nom} » jamais fermé` });
  blocs.sort((a, b) => a.debut - b.debut);
  return { lignes, blocs, erreurs };
}

// Contrôles de cohérence. Renvoie { erreurs, avertissements } avec numéros de ligne du fichier.
export function valider(doc, config) {
  const { meta, corps, decalage } = doc;
  const erreurs = [];
  const avert = [];
  const E = (ligne, msg) => erreurs.push({ ligne: ligne == null ? null : ligne + decalage + 1, msg });
  const A = (ligne, msg) => avert.push({ ligne: ligne == null ? null : ligne + decalage + 1, msg });

  // Front matter
  for (const champ of ['titre', 'niveau', 'type', 'duree', 'competences']) {
    if (meta[champ] == null || meta[champ] === '' || (Array.isArray(meta[champ]) && !meta[champ].length)) {
      E(null, `Front matter : champ « ${champ} » manquant`);
    }
  }
  if (meta.type && !TYPES.includes(meta.type)) {
    E(null, `Front matter : type « ${meta.type} » inconnu (attendu : ${TYPES.join(', ')})`);
  }
  if (meta.type === 'tp' && !meta.materiel) E(null, 'Front matter : champ « materiel » obligatoire pour un TP');
  if (meta.type === 'autonomie' && !meta.rendu) E(null, 'Front matter : champ « rendu » obligatoire en autonomie (quoi déposer, où, pour quand)');

  // Blocs
  const { lignes, blocs, erreurs: errStruct } = reperer(corps);
  errStruct.forEach((e) => E(e.ligne, e.msg));

  if (lignes.some((l) => /^#\s/.test(l))) {
    A(lignes.findIndex((l) => /^#\s/.test(l)), 'Titre de niveau 1 (`# `) dans le corps : le titre est généré depuis le front matter');
  }

  const seance = meta.type === 'cours';
  for (const b of blocs) {
    if (!seance && BLOCS_SEANCE.includes(b.nom)) E(b.debut, `Bloc « ${b.nom} » réservé aux cours (type: cours)`);
    if (!BLOCS.includes(b.nom)) A(b.debut, `Bloc « ${b.nom} » inconnu (connus : ${BLOCS.join(', ')})`);
    if (b.nom === 'reponse' && b.parent === 'question') E(b.debut, 'Bloc « reponse » placé à l\'intérieur d\'une question : fermer la question avant');
    if (b.nom === 'reponse' && b.args && !/^\d+$/.test(b.args)) E(b.debut, `Argument « ${b.args} » invalide : \`::: reponse N\` où N = nombre de lignes de la zone élève`);
  }

  // Questions : numérotation, points, réponse associée
  const questions = blocs.filter((b) => b.nom === 'question');
  let attendu = 1;
  let total = 0;
  let avecPoints = 0;
  for (const q of questions) {
    const a = parseArgsQuestion(q.args);
    if (!a) { E(q.debut, `En-tête de question invalide : « ::: question ${q.args} » (attendu : \`::: question N [x pt]\`)`); continue; }
    if (a.numero == null) E(q.debut, 'Question sans numéro');
    else if (a.numero !== attendu) E(q.debut, `Question ${a.numero} : numéro attendu ${attendu}`);
    attendu = (a.numero ?? attendu) + 1;
    if (a.points != null) { total += a.points; avecPoints++; }

    const suivant = blocs.find((b) => b.debut > q.fin && b.parent === q.parent);
    const entre = suivant ? lignes.slice(q.fin + 1, suivant.debut).every((l) => !l.trim()) : false;
    if (!(suivant && suivant.nom === 'reponse' && entre) && (estNote(meta) || meta.type === 'cours')) {
      A(q.debut, `Question ${a.numero ?? '?'} : aucun bloc « reponse » juste après`);
    }
  }

  if (estNote(meta)) {
    if (!questions.length) E(null, `Aucune question \`::: question N\` dans ce ${meta.type.toUpperCase()}`);
    const bareme = meta.bareme ?? config.baremeTotalParDefaut;
    if (avecPoints === 0 && questions.length) {
      A(null, 'Aucun point indiqué sur les questions (`::: question N [x pt]`) : total non vérifiable');
    } else if (avecPoints < questions.length) {
      E(null, `Points indiqués sur ${avecPoints}/${questions.length} questions seulement`);
    } else if (Math.abs(total - bareme) > 1e-9) {
      E(null, `Somme des points des questions = ${fmt(total)} ≠ barème ${bareme}`);
    }
    if (meta.type !== 'evaluation' && !/^##.*bar[eè]me/im.test(corps)) A(null, 'Pas de section « Barème » (titre `##` contenant « Barème »)');
  }

  // Tabulation hors code : presque toujours un « \t » mal échappé (\times, \text… devenus « imes », « ext »)
  const sansCode = corps.replace(SANS_CODE, (m, debut) => debut + m.slice(debut.length).replace(/[^\n]/g, ' '));
  sansCode.split('\n').forEach((l, i) => {
    if (l.includes('\t')) E(i, 'Tabulation hors bloc de code (commande LaTeX \\t… mal échappée ?)');
    // Formules $…$ appariées dans l'ordre : un espace juste après « $ » ouvrant ou avant « $ » fermant empêche le rendu
    const morceaux = l.replace(/`[^`]*`/g, '').replace(/\$\$[^$]*\$\$/g, '').split('$');
    for (let k = 1; k < morceaux.length - 1; k += 2) {
      if (morceaux[k].trim() && /^\s|\s$/.test(morceaux[k])) {
        A(i, `Formule « $${morceaux[k]}$ » non rendue : pas d'espace juste après « $ » ni juste avant le « $ » fermant`);
        break;
      }
    }
  });

  // Sujets multiples : chaque {{a|b}} doit proposer une valeur par sujet
  const nbSujets = (meta.variantes ?? []).length;
  for (const m of corps.matchAll(SUJETS)) {
    const n = m[1].split('|').length;
    const ligne = corps.slice(0, m.index).split('\n').length - 1;
    if (!nbSujets) E(ligne, `« {{…}} » sans champ « variantes » dans le front matter`);
    else if (n !== nbSujets) E(ligne, `« {{${m[1].slice(0, 30)}}} » : ${n} valeur(s) pour ${nbSujets} sujets`);
  }
  for (const b of blocs.filter((x) => x.nom === 'variante')) {
    if (!(meta.variantes ?? []).includes(b.args)) E(b.debut, `Bloc « variante ${b.args} » : sujet inconnu (variantes : ${(meta.variantes ?? []).join(', ') || 'aucune'})`);
  }

  // Images : fichiers présents, et au moins une illustration pour les activités élèves
  const imgs = images(doc);
  for (const src of imgs) {
    if (/^(https?:|data:)/.test(src)) continue;
    if (!fs.existsSync(path.resolve(path.dirname(doc.fichier), decodeURI(src)))) E(null, `Image introuvable : ${src}`);
  }
  for (const f of [].concat(meta.fichiers ?? [])) {
    if (!fs.existsSync(path.resolve(path.dirname(doc.fichier), f))) E(null, `Fichier joint introuvable : ${f}`);
  }
  if (!imgs.length && ['tp', 'td', 'cours', 'autonomie'].includes(meta.type)) {
    A(null, 'Aucune illustration : ajouter au moins un schéma ou une image de mise en situation');
  }

  return { erreurs, avertissements: avert, questions: questions.length, total, blocs };
}

// Variante élève : réponses remplacées par des zones à lignes, notes prof / « à dire » supprimées.
// Sujet « v » d'un document à sujets multiples (variantes: [A, B]) :
// {{valeurA|valeurB}} -> valeur du sujet ; blocs « ::: variante X » conservés seulement pour X.
export function appliquerSujet(corps, v, variantes) {
  const k = variantes.indexOf(v);
  const texte = corps.replace(SUJETS, (_m, alt) => alt.split('|')[k] ?? '');
  const { lignes, blocs } = reperer(texte);
  const retirer = new Set();
  for (const b of blocs.filter((x) => x.nom === 'variante' && x.fin != null)) {
    if (b.args === v) { retirer.add(b.debut); retirer.add(b.fin); }
    else for (let i = b.debut; i <= b.fin; i++) retirer.add(i);
  }
  return lignes.filter((_l, i) => !retirer.has(i)).join('\n');
}

export function variante(corps, cible, config) {
  if (cible === 'prof') return corps;
  const { lignes, blocs } = reperer(corps);
  const sortie = [];
  const remplacements = new Map();
  const masque = new Array(lignes.length).fill(false);

  for (const b of blocs) {
    if (b.fin == null) continue;
    if (!['reponse', 'prof', 'dire'].includes(b.nom)) continue;
    if (masque[b.debut]) continue; // déjà dans un bloc retiré
    for (let i = b.debut; i <= b.fin; i++) masque[i] = true;
    if (b.nom === 'reponse') {
      const n = /^\d+$/.test(b.args) ? Number(b.args) : config.lignesReponseParDefaut;
      remplacements.set(b.debut, n > 0 ? [`::: zone ${n}`, ':::'] : []); // 0 : QCM, rien à écrire
    }
  }

  lignes.forEach((l, i) => {
    if (remplacements.has(i)) sortie.push(...remplacements.get(i));
    else if (!masque[i]) sortie.push(l);
  });
  return sortie.join('\n');
}

const fmt = (n) => String(Math.round(n * 100) / 100).replace('.', ',');
export { fmt };
