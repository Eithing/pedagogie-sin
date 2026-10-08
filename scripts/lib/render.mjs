// Pages HTML autonomes : documents TP / TD / cadrage (élève et prof) + squelette commun.
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import katex from 'katex';
import { esc, rendre, accentPour } from './markdown.mjs';
import { estNote, SANS_CODE } from './document.mjs';

const require = createRequire(import.meta.url);
export const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export const LIBELLES_TYPE = { tp: 'Travaux pratiques', td: 'Travaux dirigés', evaluation: 'Évaluation', cours: 'Cours', autonomie: 'Travail en autonomie', cadrage: 'Document de cadrage' };

const lien = (fichier) => pathToFileURL(fichier).href;
const FEUILLES_BASE = () => [
  require.resolve('katex/dist/katex.min.css'),
  require.resolve('highlight.js/styles/github.min.css'),
  require.resolve('@fontsource/inter/400.css'),
  require.resolve('@fontsource/inter/600.css'),
  require.resolve('@fontsource/inter/700.css'),
  require.resolve('@fontsource/inter/800.css'),
  require.resolve('@fontsource/fira-code/400.css'),
];

export const liste = (v) => (v == null ? '' : Array.isArray(v) ? v.join(' · ') : String(v));

// Squelette commun : feuilles de style, couleur d'accent, <base> sur le dossier de la source (images relatives).
export function page({ titre, corps, meta, config, fichierSource, feuilles = ['style.css'], classes = '', script = '' }) {
  const css = [...FEUILLES_BASE(), ...feuilles.map((f) => path.join(RACINE, 'templates', f))]
    .map((f) => `<link rel="stylesheet" href="${lien(f)}">`).join('\n');
  const base = lien(path.dirname(fichierSource) + path.sep);
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base href="${base}">
<title>${esc(titre)}</title>
${css}
</head>
<body class="${classes}" style="--accent:${esc(accentPour(meta.niveau, config))}">
${corps}
${script ? `<script>${script}</script>` : ''}
</body>
</html>
`;
}

// Travail en autonomie : plan de travail (étapes = titres ##, durée entre parenthèses en fin de titre),
// ce qu'il faut déposer et comment obtenir de l'aide.
function planTravail(meta, corps) {
  const etapes = corps.replace(SANS_CODE, '$1').split('\n').filter((l) => /^##\s/.test(l)).map((l) => {
    const m = l.replace(/^##\s+/, '').match(/^(.*?)\s*(?:\((\d+\s*min)\))?\s*$/);
    return { titre: m[1], duree: m[2] };
  }).filter((e) => !/bar[eè]me/i.test(e.titre));
  const liste = (v) => [].concat(v ?? []).map((t) => `<li>${esc(t)}</li>`).join('');
  return `<section class="plan-travail">
    <div class="plan-etapes"><h2>Mon plan de travail</h2><ol>${etapes.map((e) => `<li><span class="case"></span><span>${esc(e.titre)}</span>${e.duree ? `<em>${esc(e.duree)}</em>` : ''}</li>`).join('')}</ol></div>
    <div class="plan-rendu"><h2>À déposer sur l'ENT</h2><ul>${liste(meta.rendu)}</ul></div>
    ${meta.aide ? `<div class="plan-aide"><h2>Besoin d'aide ?</h2><ul>${liste(meta.aide)}</ul></div>` : ''}
  </section>`;
}

function entete(meta, cible, config, libelleVariante) {
  const type = meta.type ?? '';
  const evaluable = estNote(meta);
  const bareme = meta.bareme ?? config.baremeTotalParDefaut;
  const identite = cible === 'eleve'
    ? `<div class="doc-identite">
        <div class="champ"><span>Nom</span></div>
        <div class="champ"><span>Prénom</span></div>
        <div class="champ"><span>Classe</span></div>
        <div class="champ"><span>Date</span></div>
        ${evaluable ? `<div class="doc-note"><span></span><span>/ ${esc(bareme)}</span></div>` : ''}
      </div>`
    : `<div class="doc-corrige">${esc(libelleVariante ?? 'Document enseignant — corrigé et barème')}</div>`;
  const illu = meta.illustration ? `<img class="doc-illustration" src="${esc(meta.illustration)}" alt="">` : '';

  return `<header class="doc-entete${illu ? ' avec-illustration' : ''}">
    <div class="doc-entete-texte">
      <div class="doc-bandeau">
        <span>${esc(config.etablissement)}</span>
        <span>${esc(meta.niveau ?? config.discipline)}</span>
        <span class="doc-type">${esc(LIBELLES_TYPE[type] ?? type)}</span>
      </div>
      <h1 class="doc-titre">${meta.sujet ? `<span class="doc-sujet">Sujet ${esc(meta.sujet)}</span>` : ''}${esc(meta.titre)}</h1>
      ${meta.accroche ? `<p class="doc-accroche">${esc(meta.accroche)}</p>` : ''}
      <dl class="doc-meta">
        ${meta.duree ? `<div><dt>Durée</dt><dd>${esc(meta.duree)}</dd></div>` : ''}
        ${meta.competences ? `<div><dt>Compétences</dt><dd>${esc(liste(meta.competences))}</dd></div>` : ''}
      </dl>
      ${meta.consignes ? `<ul class="doc-consignes">${[].concat(meta.consignes).map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
    </div>
    ${illu}
    ${identite}
  </header>`;
}

// Document A4 (TP, TD, cadrage, fiche d'activités d'un cours)
export function rendreHtml({ meta, corps, cible, config, fichierSource, libelleVariante }) {
  const contenu = rendre(corps, cible);
  return page({
    titre: `${meta.titre} — ${cible === 'prof' ? 'Prof' : 'Élève'}`,
    corps: `${entete(meta, cible, config, libelleVariante)}\n${meta.type === 'autonomie' ? planTravail(meta, corps) : ''}\n<main class="doc-corps">\n${contenu}\n</main>`,
    meta, config, fichierSource,
    classes: `document variante-${cible} type-${esc(meta.type ?? 'doc')}`,
  });
}

// Vérifie chaque formule $…$ / $$…$$ hors blocs de code. Renvoie la liste des erreurs KaTeX.
export function verifierFormules(corps) {
  const sansCode = corps.replace(/(^|\n)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\2[ \t]*(?=\n|$)/g, '$1').replace(/`[^`\n]*`/g, '');
  const erreurs = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^\s$](?:[^$\n]*[^\s$])?)\$/g;
  let m;
  while ((m = re.exec(sansCode))) {
    const tex = m[1] ?? m[2];
    try {
      katex.renderToString(tex, { throwOnError: true, displayMode: m[1] != null, strict: false });
    } catch (e) {
      erreurs.push({ formule: tex.trim().slice(0, 60), msg: e.message.replace(/^KaTeX parse error: /, '') });
    }
  }
  return erreurs;
}
