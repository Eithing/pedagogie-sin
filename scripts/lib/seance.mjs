// Séances de cours (type: cours) : une source -> diapos + fiche de déroulé + fiche d'activités élève/prof.
//
// La source est une suite plate d'étapes :
//   ## Phase                         -> intercalaire (diapo de section)
//   ::: slide 3 min | Titre | fiche  -> exposé projeté (« fiche » : recopié sur la fiche élève)
//   ::: activite 8 min | Titre | binome | projeter
//   ::: retenir 5 min                -> trace écrite (à trous côté élève)
// Les blocs dire / prof s'attachent à l'étape qui précède ; question / reponse à l'activité qui précède.
import { reperer, parseDuree } from './document.mjs';
import { esc, rendre, argsBloc } from './markdown.mjs';
import { page, liste } from './render.mjs';

export const MODALITES = { individuel: 'Individuel', binome: 'En binôme', groupe: 'En groupe', classe: 'Classe entière' };
const DRAPEAUX = ['projeter', 'fiche'];
const DUREE = /^(\d+)\s*min$/;

function lireArgs(args) {
  const r = { duree: 0, titre: '', modalite: null, drapeaux: new Set() };
  for (const a of args) {
    const m = a.match(DUREE);
    if (m) r.duree = Number(m[1]);
    else if (MODALITES[a.toLowerCase()]) r.modalite = a.toLowerCase();
    else if (DRAPEAUX.includes(a.toLowerCase())) r.drapeaux.add(a.toLowerCase());
    else if (!r.titre) r.titre = a;
  }
  return r;
}

export function decouper(doc) {
  const { lignes, blocs } = reperer(doc.corps);
  const top = blocs.filter((b) => b.parent === null && b.fin != null);
  const contenu = (b) => lignes.slice(b.debut + 1, b.fin).join('\n');
  const brut = (b) => lignes.slice(b.debut, b.fin + 1).join('\n');
  const ligne = (i) => i + doc.decalage + 1;

  const dansBloc = new Array(lignes.length).fill(false);
  top.forEach((b) => { for (let i = b.debut; i <= b.fin; i++) dansBloc[i] = true; });

  const evenements = top.map((b) => ({ i: b.debut, bloc: b }));
  const hors = [];
  lignes.forEach((l, i) => {
    if (dansBloc[i]) return;
    const m = l.match(/^##\s+(.+)/);
    if (m) evenements.push({ i, phase: m[1].trim() });
    else if (l.trim() && !/^(-{3,}|\*{3,})\s*$/.test(l)) hors.push(ligne(i));
  });
  evenements.sort((a, b) => a.i - b.i);

  const etapes = [];
  const avant = { dire: [], prof: [] };
  const erreurs = [];
  let courante = null;
  let nActivite = 0;

  for (const ev of evenements) {
    if (ev.phase) {
      etapes.push({ type: 'phase', titre: ev.phase, duree: 0, ligne: ligne(ev.i) });
      courante = null;
      continue;
    }
    const b = ev.bloc;
    const a = lireArgs(argsBloc(b.nom + ' ' + b.args, b.nom));
    const base = { duree: a.duree, titre: a.titre, contenu: contenu(b), dire: [], prof: [], ligne: ligne(b.debut) };
    switch (b.nom) {
      case 'slide':
        courante = { ...base, type: 'expose', fiche: a.drapeaux.has('fiche') };
        etapes.push(courante);
        break;
      case 'activite':
        courante = { ...base, type: 'activite', numero: ++nActivite, modalite: a.modalite, projeter: a.drapeaux.has('projeter'), questions: [] };
        etapes.push(courante);
        break;
      case 'retenir':
        courante = { ...base, type: 'retenir', titre: a.titre || 'À retenir' };
        etapes.push(courante);
        break;
      case 'dire':
      case 'prof':
        (courante ?? avant)[b.nom].push(contenu(b));
        break;
      case 'question':
        if (courante?.type !== 'activite') erreurs.push({ ligne: ligne(b.debut), msg: 'Question hors activité : la placer après un bloc `::: activite`' });
        else courante.questions.push({ args: b.args, contenu: contenu(b), brut: brut(b), reponse: null });
        break;
      case 'reponse': {
        const q = courante?.questions?.at(-1);
        if (q) { q.reponse = { contenu: contenu(b), brut: brut(b) }; }
        break;
      }
      default:
        erreurs.push({ ligne: ligne(b.debut), msg: `Bloc « ${b.nom} » isolé : dans un cours, le placer dans un slide / activité (bloc extérieur ouvert avec \`::::\`)` });
    }
  }

  // Numérotation des diapos et horaires
  let diapo = 1; // 1 = diapo de titre
  let t = 0;
  for (const e of etapes) {
    e.debut = t;
    t += e.duree;
    e.diapos = [++diapo];
    if (e.type === 'activite' && e.projeter) e.questions.forEach(() => e.diapos.push(++diapo));
  }
  return { etapes, avant, hors, erreurs, total: t, nbDiapos: diapo };
}

export function validerSeance(doc, config) {
  const s = decouper(doc);
  const erreurs = [...s.erreurs];
  const avert = [];
  const r = { exposeMaxMin: 10, partActiviteMin: 0.4, ...(config.rythme ?? {}) };

  const prevu = parseDuree(doc.meta.duree);
  if (prevu == null) erreurs.push({ ligne: null, msg: `Durée « ${doc.meta.duree} » illisible (ex. « 55 min », « 1 h 30 min »)` });
  else if (s.total !== prevu) erreurs.push({ ligne: null, msg: `Somme des durées des étapes = ${s.total} min ≠ durée de la séance ${prevu} min` });

  const activites = s.etapes.filter((e) => e.type === 'activite');
  if (!activites.length) erreurs.push({ ligne: null, msg: 'Aucune activité `::: activite` : un cours doit faire travailler les élèves' });
  activites.filter((e) => !e.duree).forEach((e) => erreurs.push({ ligne: e.ligne, msg: `Activité ${e.numero} sans durée (\`::: activite 8 min | …\`)` }));
  if (!s.etapes.some((e) => e.type === 'retenir')) erreurs.push({ ligne: null, msg: 'Aucune trace écrite `::: retenir`' });

  const tActivite = activites.reduce((n, e) => n + e.duree, 0);
  if (s.total && tActivite / s.total < r.partActiviteMin) {
    erreurs.push({ ligne: null, msg: `Activités = ${Math.round((100 * tActivite) / s.total)} % du temps (minimum ${Math.round(r.partActiviteMin * 100)} %) : cours trop descendant` });
  }
  let suite = 0;
  for (const e of s.etapes) {
    if (e.type === 'activite') { suite = 0; continue; }
    suite += e.duree;
    if (suite > r.exposeMaxMin) {
      erreurs.push({ ligne: e.ligne, msg: `${suite} min sans activité élève (maximum ${r.exposeMaxMin} min) : insérer une activité courte` });
      suite = -Infinity; // un seul signalement par tunnel
    }
  }

  for (const e of s.etapes.filter((x) => x.type !== 'phase' && !x.titre && x.type !== 'retenir')) {
    erreurs.push({ ligne: e.ligne, msg: 'Étape sans titre (`::: slide 3 min | Titre`)' });
  }
  if (s.hors.length) avert.push({ ligne: s.hors[0], msg: `${s.hors.length} ligne(s) hors bloc ignorée(s) : seuls les titres \`##\` (phases) sont permis entre les blocs` });
  if (!doc.meta.objectifs) avert.push({ ligne: null, msg: 'Front matter : « objectifs » absent (affiché sur la fiche de déroulé)' });
  return { erreurs, avertissements: avert, seance: s, tActivite };
}

// ---------------------------------------------------------------------------
// Diapositives
// ---------------------------------------------------------------------------

const enColonnes = (texte, cible) => {
  const parts = texte.split(/^\|\|\|\s*$/m);
  if (parts.length === 1) return rendre(texte, cible);
  return `<div class="colonnes">${parts.map((p) => `<div>${rendre(p, cible)}</div>`).join('')}</div>`;
};

const mmss = (min) => `${String(min).padStart(2, '0')}:00`;

function diapo({ classe = '', titre = '', corps = '', n, total, meta, attrs = '' }) {
  return `<section class="diapo ${classe}" ${attrs}>
  ${titre ? `<header class="diapo-titre"><h2>${titre}</h2></header>` : ''}
  <div class="diapo-corps">${corps}</div>
  <footer class="diapo-pied"><span>${esc(meta.titre)}</span><span>${n} / ${total}</span></footer>
  <div class="diapo-progression" style="--p:${(n / total) * 100}%"></div>
</section>`;
}

const SCRIPT_DIAPOS = `
const d=[...document.querySelectorAll('.diapo')];let i=0;
const ech=()=>document.documentElement.style.setProperty('--echelle',Math.min(innerWidth/1280,innerHeight/720));
function voir(n){i=Math.max(0,Math.min(d.length-1,n));d.forEach((x,k)=>x.classList.toggle('active',k===i));try{history.replaceState(null,'',location.href.split('#')[0]+'#'+(i+1));}catch(_){}}
const minuteurs=new Map();
function chrono(x){const c=x.querySelector('.act-chrono');if(!c)return;
 if(minuteurs.has(c)){clearInterval(minuteurs.get(c));minuteurs.delete(c);c.classList.remove('en-cours');return;}
 let s=c.dataset.reste?+c.dataset.reste:+c.dataset.secondes;c.classList.add('en-cours');
 minuteurs.set(c,setInterval(()=>{s--;c.dataset.reste=s;const a=Math.abs(s);
  c.textContent=(s<0?'+':'')+String(Math.floor(a/60)).padStart(2,'0')+':'+String(a%60).padStart(2,'0');
  c.classList.toggle('bientot',s>0&&s<=60);c.classList.toggle('fini',s<=0);},1000));}
addEventListener('resize',ech);ech();voir((parseInt(location.hash.slice(1))||1)-1);
addEventListener('hashchange',()=>voir((parseInt(location.hash.slice(1))||1)-1));
addEventListener('keydown',e=>{
 if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)){voir(i+1);e.preventDefault();}
 else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){voir(i-1);e.preventDefault();}
 else if(e.key==='Home')voir(0);else if(e.key==='End')voir(d.length-1);
 else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
 else if(e.key==='t'||e.key==='T')chrono(d[i]);});
addEventListener('click',e=>{if(e.target.closest('.act-chrono')){chrono(d[i]);return;}voir(e.clientX>innerWidth/3?i+1:i-1);});
`;

export function rendreDiapos(doc, seance, config) {
  const { meta } = doc;
  const total = seance.nbDiapos;
  const out = [];
  const illu = meta.illustration ? `<img class="titre-illustration" src="${esc(meta.illustration)}" alt="">` : '';
  out.push(`<section class="diapo diapo-couverture">
  <div class="couverture-texte">
    <div class="couverture-bandeau">${esc(config.etablissement)} · ${esc(meta.niveau ?? '')}</div>
    <h1>${esc(meta.titre)}</h1>
    ${meta.accroche ? `<p class="couverture-accroche">${esc(meta.accroche)}</p>` : ''}
    ${meta.objectifs ? `<ul class="couverture-objectifs">${[].concat(meta.objectifs).map((o) => `<li>${esc(o)}</li>`).join('')}</ul>` : ''}
  </div>
  ${illu}
  <footer class="diapo-pied"><span>${esc(meta.duree ?? '')}</span><span>1 / ${total}</span></footer>
</section>`);

  for (const e of seance.etapes) {
    const n = e.diapos[0];
    if (e.type === 'phase') {
      out.push(diapo({ classe: 'diapo-phase', corps: `<h2>${esc(e.titre)}</h2>`, n, total, meta }));
    } else if (e.type === 'expose') {
      out.push(diapo({ titre: esc(e.titre), corps: enColonnes(e.contenu, 'slides'), n, total, meta }));
    } else if (e.type === 'retenir') {
      out.push(diapo({ classe: 'diapo-retenir', titre: esc(e.titre), corps: enColonnes(e.contenu, 'slides'), n, total, meta }));
    } else if (e.type === 'activite') {
      const bandeau = `<div class="act-bandeau">
        <span class="act-num">Activité ${e.numero}</span>
        ${e.modalite ? `<span class="act-modalite">${esc(MODALITES[e.modalite])}</span>` : ''}
        <span class="act-chrono" data-secondes="${e.duree * 60}" title="Clic ou touche T : démarrer / pause">${mmss(e.duree)}</span>
      </div>`;
      out.push(diapo({ classe: 'diapo-activite', titre: `${bandeau}${esc(e.titre)}`, corps: enColonnes(e.contenu, 'slides'), n, total, meta }));
      if (e.projeter) e.questions.forEach((q, k) => {
        const num = q.args.match(/^\d+/)?.[0] ?? '';
        out.push(diapo({
          classe: 'diapo-question',
          titre: `<span class="act-num">Activité ${e.numero}</span> Question ${num}`,
          corps: rendre(q.contenu, 'slides'),
          n: e.diapos[k + 1], total, meta,
        }));
      });
    }
  }

  return page({
    titre: `${meta.titre} — Diapos`,
    corps: `<main class="diapos">\n${out.join('\n')}\n</main>`,
    meta, config, fichierSource: doc.fichier,
    feuilles: ['style.css', 'slides.css'],
    classes: 'presentation',
    script: SCRIPT_DIAPOS,
  });
}

// ---------------------------------------------------------------------------
// Fiche de déroulé (enseignant)
// ---------------------------------------------------------------------------

const hhmm = (min) => `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}`;
const plage = (e) => (e.duree ? `${hhmm(e.debut)} → ${hhmm(e.debut + e.duree)}` : hhmm(e.debut));
const diapos = (e) => (e.diapos.length > 1 ? `D${e.diapos[0]}–${e.diapos.at(-1)}` : `D${e.diapos[0]}`);
const notes = (e) => [
  ...e.dire.map((t) => `<div class="deroule-dire">${rendre(t, 'prof')}</div>`),
  ...e.prof.map((t) => `<aside class="note-prof"><header>Note</header>${rendre(t, 'prof')}</aside>`),
].join('');

function frise(seance) {
  const segs = seance.etapes.filter((e) => e.duree).map((e) => {
    const lib = e.type === 'activite' ? `A${e.numero}` : e.type === 'retenir' ? 'Trace' : '';
    return `<div class="frise-seg frise-${e.type}" style="flex:${e.duree}" title="${esc(e.titre)} (${e.duree} min)"><span>${lib}</span><small>${e.duree}′</small></div>`;
  }).join('');
  return `<div class="frise">${segs}</div>
  <div class="frise-legende"><span class="l-expose">Exposé / échange</span><span class="l-activite">Activité élèves</span><span class="l-retenir">Trace écrite</span></div>`;
}

export function rendreDeroule(doc, seance, config, tActivite) {
  const { meta } = doc;
  const lignes = [];
  for (const e of seance.etapes) {
    if (e.type === 'phase') {
      lignes.push(`<tr class="ligne-phase"><td colspan="4">${esc(e.titre)}</td></tr>`);
      continue;
    }
    let contenu = '';
    if (e.type === 'expose') {
      contenu = `<div class="deroule-titre">${esc(e.titre)}</div>${notes(e)}`;
    } else if (e.type === 'retenir') {
      contenu = `<div class="deroule-titre">Trace écrite — ${esc(e.titre)}</div><div class="deroule-trace">${rendre(e.contenu, 'prof')}</div>${notes(e)}`;
    } else {
      const corriges = e.questions.map((q) => {
        const num = q.args.match(/^\d+/)?.[0] ?? '?';
        return `<div class="deroule-corrige"><strong>Q${num}</strong><div>${q.reponse ? rendre(q.reponse.contenu, 'prof') : '<em>pas de corrigé</em>'}</div></div>`;
      }).join('');
      contenu = `<div class="deroule-lancer">▶ LANCER l'activité ${e.numero} — ${esc(e.titre)}
          <span>${e.duree} min${e.modalite ? ` · ${esc(MODALITES[e.modalite])}` : ''}${e.projeter ? ' · questions projetées' : ''}</span></div>
        <details open><summary>Consigne</summary><div class="deroule-consigne">${rendre(e.contenu, 'prof')}</div></details>
        ${notes(e)}
        ${corriges ? `<div class="deroule-corriges"><div class="deroule-sous-titre">Réponses attendues</div>${corriges}</div>` : ''}`;
    }
    lignes.push(`<tr class="ligne-${e.type}">
      <td class="col-temps"><strong>${plage(e)}</strong>${e.duree ? `<small>${e.duree} min</small>` : ''}</td>
      <td class="col-diapo">${diapos(e)}</td>
      <td class="col-contenu">${contenu}</td>
      <td class="col-check"><span class="case"></span></td>
    </tr>`);
  }

  const puces = (titre, v, cases = false) => (v ? `<div class="bloc-prepa"><h3>${titre}</h3><ul class="${cases ? 'liste-cases' : ''}">${[].concat(v).map((x) => `<li>${cases ? '<span class="case"></span>' : ''}${esc(x)}</li>`).join('')}</ul></div>` : '');
  const avant = seance.avant.dire.length || seance.avant.prof.length ? `<div class="bloc-prepa">${notes(seance.avant)}</div>` : '';
  const pct = seance.total ? Math.round((100 * tActivite) / seance.total) : 0;

  const corps = `<header class="doc-entete">
    <div class="doc-entete-texte">
      <div class="doc-bandeau"><span>${esc(config.etablissement)}</span><span>${esc(meta.niveau ?? '')}</span><span class="doc-type">Fiche de déroulé</span></div>
      <h1 class="doc-titre">${esc(meta.titre)}</h1>
      <dl class="doc-meta">
        <div><dt>Durée</dt><dd>${esc(meta.duree)}</dd></div>
        <div><dt>Activités</dt><dd>${tActivite} min (${pct} %)</dd></div>
        <div><dt>Diapos</dt><dd>${seance.nbDiapos}</dd></div>
        ${meta.competences ? `<div><dt>Compétences</dt><dd>${esc(liste(meta.competences))}</dd></div>` : ''}
      </dl>
    </div>
    <div class="doc-corrige">Document enseignant — à garder sous la main pendant la séance</div>
  </header>
  <main class="doc-corps">
    ${frise(seance)}
    <div class="prepa">
      ${puces('Objectifs', meta.objectifs)}
      ${puces('Prérequis', meta.prerequis)}
      ${puces('Avant la séance', meta.preparation, true)}
    </div>
    ${avant}
    <table class="deroule">
      <thead><tr><th>Horaire</th><th>Diapo</th><th>Déroulé — ce que je dis, ce que je lance</th><th>✓</th></tr></thead>
      <tbody>${lignes.join('\n')}</tbody>
    </table>
  </main>`;

  return page({
    titre: `${meta.titre} — Déroulé`,
    corps, meta, config, fichierSource: doc.fichier,
    classes: 'document variante-prof type-deroule',
  });
}

// ---------------------------------------------------------------------------
// Fiche d'activités (source Markdown regroupant activités + traces écrites)
// ---------------------------------------------------------------------------

export function corpsFiche(seance) {
  const parts = [];
  for (const e of seance.etapes) {
    if (e.type === 'expose' && e.fiche) {
      parts.push(`### ${e.titre}\n\n${e.contenu.replace(/^\|\|\|\s*$/gm, '')}`);
    } else if (e.type === 'activite') {
      const meta = [`⏱ ${e.duree} min`, e.modalite && MODALITES[e.modalite]].filter(Boolean).join(' · ');
      parts.push(`## Activité ${e.numero} — ${e.titre}\n\n<p class="act-meta">${esc(meta)}</p>\n\n${e.contenu}`);
      for (const q of e.questions) parts.push(q.brut + (q.reponse ? `\n\n${q.reponse.brut}` : ''));
    } else if (e.type === 'retenir') {
      parts.push(`:::: retenir\n${e.contenu.replace(/^\|\|\|\s*$/gm, '')}\n::::`);
    }
  }
  return parts.join('\n\n');
}
