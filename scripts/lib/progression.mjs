// Progressions annuelles (type: progression).
//
// Une progression = des « pistes » (créneaux horaires d'une classe) sur lesquelles des séquences
// s'enchaînent semaine après semaine. Les dates sont calculées à partir du calendrier scolaire :
// seules comptent les semaines où au moins un créneau de la piste tombe un jour de classe.
// Ce qui est réalisé (debut / fin réels, etat) fige le passé ; le reste se recale automatiquement.
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { md, esc } from './markdown.mjs';
import { page, RACINE } from './render.mjs';

const JOURS = { lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5 };
const ETATS = { fait: 'Réalisée', 'en-cours': 'En cours', prevu: 'Prévue' };
const JOUR_MS = 864e5;

// ---------- Dates (UTC, sans heure) ----------
export const date = (v) => (v instanceof Date ? new Date(Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate())) : new Date(`${String(v).slice(0, 10)}T00:00:00Z`));
const iso = (d) => d.toISOString().slice(0, 10);
const plus = (d, n) => new Date(d.getTime() + n * JOUR_MS);
const lundi = (d) => plus(d, -((d.getUTCDay() + 6) % 7));
const fr = (d, opts = { day: 'numeric', month: 'short' }) => d.toLocaleDateString('fr-FR', { ...opts, timeZone: 'UTC' });
const frLong = (d) => fr(d, { day: 'numeric', month: 'long', year: 'numeric' });
const inline = (t) => md.renderInline(String(t ?? ''), { cible: 'prof' });
const lireYaml = (rel) => yaml.load(fs.readFileSync(path.join(RACINE, rel), 'utf8'));
const fmtH = (h) => String(Math.round(h * 10) / 10).replace('.', ',');

// ---------- Calendrier ----------
export function calendrier(fichier, finCours) {
  const c = lireYaml(fichier);
  const rentree = date(c.rentree);
  const finAnnee = date(c.fin_annee);
  const fin = date(finCours ?? c.fin_annee); // dernier jour de cours de la classe
  const vacances = (c.vacances ?? []).map((v) => ({ ...v, du: date(v.du), au: date(v.au) }));
  const feries = (c.feries ?? []).map((f) => ({ ...f, date: date(f.date) }));
  const evenements = (c.evenements ?? []).map((e) => ({ ...e, du: date(e.du ?? e.date), au: date(e.au ?? e.date) }));
  const enVacances = (d) => vacances.find((v) => d >= v.du && d <= v.au);
  const ferie = (d) => feries.find((f) => +f.date === +d);
  const ecole = (d) => d >= rentree && d <= fin && d.getUTCDay() >= 1 && d.getUTCDay() <= 5 && !enVacances(d) && !ferie(d);

  const semaines = [];
  // La frise couvre toute l'année scolaire ; après « fin_cours », les semaines n'ont plus de cours.
  for (let l = lundi(rentree); l <= finAnnee; l = plus(l, 7)) {
    const jours = [1, 2, 3, 4, 5].filter((j) => ecole(plus(l, j - 1)));
    const vac = [0, 1, 2, 3, 4].map((k) => enVacances(plus(l, k))).find(Boolean);
    const fer = [0, 1, 2, 3, 4].map((k) => ferie(plus(l, k))).filter(Boolean);
    semaines.push({ lundi: l, jours, vacances: !jours.length && vac ? vac.nom : null, feries: fer, apres: l > fin });
  }
  return { ...c, rentree, fin, vacances, feries, evenements, semaines };
}

// Heures d'une piste pendant une semaine donnée.
// annulees : dates (ISO) des séances annulées pour cette piste (grève, sortie, bac blanc…).
function capacite(piste, sem, annulees = new Set()) {
  let h = 0;
  for (const c of piste.creneaux ?? []) {
    const j = c.jour ? JOURS[String(c.jour).toLowerCase()] : null;
    const jourCours = j ? plus(sem.lundi, j - 1) : sem.lundi;
    if (c.du && jourCours < date(c.du)) continue;
    if (c.au && jourCours > date(c.au)) continue;
    if (j ? annulees.has(iso(jourCours)) : [0, 1, 2, 3, 4].some((k) => annulees.has(iso(plus(sem.lundi, k))))) continue;
    const ouvert = j ? sem.jours.includes(j) : sem.jours.length >= 3;
    if (ouvert) h += Number(c.heures) * (c.frequence ?? 1);
  }
  return h;
}

// Un créneau de la piste est-il en vigueur cette semaine (indépendamment des jours fériés) ?
function actif(piste, sem) {
  return (piste.creneaux ?? []).some((c) => {
    const vendredi = plus(sem.lundi, 4);
    return !(c.du && vendredi < date(c.du)) && !(c.au && sem.lundi > date(c.au));
  });
}

// ---------- Chargement ----------
export function charger(doc) {
  const m = doc.meta;
  const erreurs = [];
  const avert = [];
  const cal = calendrier(m.calendrier ?? 'referentiels/calendrier_2026-2027.yaml', m.fin_cours);
  const programme = m.programme ? lireYaml(m.programme) : { groupes: [], competences: [] };
  const catalogue = m.catalogue ? lireYaml(m.catalogue) : { sequences: [] };
  const parId = new Map((catalogue.sequences ?? []).map((s) => [s.id, s]));
  const items = new Map(programme.groupes.flatMap((g) => g.items.map((i) => [String(i.id), { ...i, groupe: g }])));
  const competences = new Map((programme.competences ?? []).map((c) => [c.id, c]));

  // Pistes propres à la classe + pistes partagées décrites dans le catalogue (ex. heure commune D2+D3)
  const pistes = (m.pistes ?? []).map((p) => {
    if (!p.partagee) return { ...p, sequences: [] };
    const commune = catalogue.pistes_partagees?.[p.id];
    if (!commune) { erreurs.push({ ligne: null, msg: `Piste partagée « ${p.id} » absente du catalogue` }); return { ...p, sequences: [] }; }
    return { ...commune, ...p, sequences: [], planning: commune.sequences ?? [] };
  });
  const parPiste = new Map(pistes.map((p) => [p.id, p]));

  const ajouter = (entree, piste) => {
    const base = entree.ref ? parId.get(entree.ref) : {};
    if (entree.ref && !base) { erreurs.push({ ligne: null, msg: `Séquence « ${entree.ref} » absente du catalogue` }); return; }
    const s = { ...base, ...entree, id: entree.id ?? entree.ref ?? base.id };
    s.etat = s.etat ?? 'prevu';
    if (!ETATS[s.etat]) erreurs.push({ ligne: null, msg: `${s.id} : état « ${s.etat} » inconnu (fait, en-cours, prevu)` });
    for (const r of s.programme ?? []) if (!items.has(String(r))) erreurs.push({ ligne: null, msg: `${s.id} : élément de programme « ${r} » inconnu dans ${m.programme}` });
    for (const r of s.competences ?? []) if (competences.size && !competences.has(r)) erreurs.push({ ligne: null, msg: `${s.id} : compétence « ${r} » inconnue dans ${m.programme}` });
    piste.sequences.push(s);
  };
  for (const p of pistes) for (const e of p.planning ?? []) ajouter(e, p);
  for (const e of m.sequences ?? []) {
    const p = parPiste.get(e.piste ?? pistes[0]?.id);
    if (!p) { erreurs.push({ ligne: null, msg: `${e.ref ?? e.id} : piste « ${e.piste} » inconnue` }); continue; }
    ajouter(e, p);
  }

  const aujourdhui = date(m.date_etat ?? new Date());
  for (const p of pistes) {
    const annulees = new Set((m.annulations ?? []).filter((a) => !a.piste || a.piste === p.id).map((a) => iso(date(a.date))));
    placer(p, cal, aujourdhui, avert, annulees);
  }
  return { m, cal, programme, items, competences, pistes, aujourdhui, erreurs, avertissements: avert };
}

// Place les séquences d'une piste sur le calendrier.
function placer(piste, cal, aujourdhui, avert, annulees) {
  const S = cal.semaines;
  const cap = S.map((s) => capacite(piste, s, annulees));
  const indexDe = (d) => S.findIndex((s) => +s.lundi === +lundi(date(d)));
  const prochaine = (k) => { while (k < S.length && !cap[k]) k++; return k; };
  let curseur = prochaine(0);

  for (const s of piste.sequences) {
    let debut = s.debut ? indexDe(s.debut) : prochaine(curseur);
    if (s.debut && debut < 0) avert.push({ ligne: null, msg: `${s.id} : date de début hors calendrier` });
    debut = Math.max(debut, 0);
    let fin;
    if (s.fin) fin = indexDe(s.fin);
    else if (s.semaines === 'fin') {
      // jusqu'au dernier créneau de la piste
      fin = debut;
      for (let k = debut; k < S.length; k++) if (cap[k]) fin = k;
      s.manque = 0;
    } else {
      let n = Number(s.semaines ?? 1);
      fin = debut - 1;
      for (let k = debut; k < S.length && n > 0; k++) { fin = k; if (cap[k]) n--; }
      s.manque = n; // semaines qui ne tiennent plus avant la fin des cours
    }
    s.iDebut = debut;
    s.iFin = Math.min(fin, S.length - 1);
    // Dates réelles : premier et dernier jour de cours des semaines occupées
    s.dateDebut = S[debut] ? plus(S[debut].lundi, (S[debut].jours[0] ?? 1) - 1) : null;
    s.dateFin = S[s.iFin] ? plus(S[s.iFin].lundi, (S[s.iFin].jours.at(-1) ?? 5) - 1) : cal.fin;
    s.semainesEff = cap.slice(debut, s.iFin + 1).filter(Boolean).length;
    s.heures = cap.slice(debut, s.iFin + 1).reduce((a, b) => a + b, 0);
    curseur = prochaine(s.iFin + 1);

    if (s.manque > 0) avert.push({ ligne: null, msg: `${piste.nom ?? piste.id} — ${s.id} : il manque ${s.manque} semaine(s) avant la fin des cours` });
    if (s.etat === 'prevu' && s.dateDebut && s.dateDebut < lundi(aujourdhui)) avert.push({ ligne: null, msg: `${s.id} devait commencer le ${fr(s.dateDebut)} : passer en « en-cours » ou recaler` });
    if (s.etat === 'en-cours' && s.dateFin < aujourdhui && !s.fin) avert.push({ ligne: null, msg: `${s.id} devait se terminer le ${fr(s.dateFin)} : indiquer « fin » ou passer en « fait »` });
  }
  piste.capacites = cap;
  piste.heuresTotal = cap.reduce((a, b) => a + b, 0);
}

export function validerProgression(doc) {
  const p = charger(doc);
  const m = doc.meta;
  for (const champ of ['titre', 'classe', 'niveau', 'pistes']) if (!m[champ]) p.erreurs.push({ ligne: null, msg: `Front matter : champ « ${champ} » manquant` });
  // Couverture du programme
  const couverts = new Set(p.pistes.flatMap((pi) => pi.sequences.flatMap((s) => (s.programme ?? []).map(String))));
  const hors = new Set((m.hors_perimetre ?? []).flatMap((h) => h.items ?? []).map(String));
  const manquants = [...p.items.keys()].filter((k) => !couverts.has(k) && !hors.has(k));
  if (manquants.length) p.avertissements.push({ ligne: null, msg: `Programme non couvert : ${manquants.join(', ')}` });
  return p;
}

// ---------------------------------------------------------------------------
// Rendu
// ---------------------------------------------------------------------------

function gantt(p) {
  const S = p.cal.semaines;
  const n = S.length;
  const cols = `grid-template-columns: 34mm repeat(${n}, 1fr)`;
  const cellules = [];
  // Mois
  let k = 0;
  while (k < n) {
    const mois = S[k].lundi.getUTCMonth();
    let f = k;
    while (f + 1 < n && S[f + 1].lundi.getUTCMonth() === mois) f++;
    cellules.push(`<div class="g-mois" style="grid-row:1;grid-column:${k + 2}/${f + 3}">${fr(S[k].lundi, { month: 'short' })}</div>`);
    k = f + 1;
  }
  S.forEach((s, i) => {
    const cls = s.vacances ? 'g-sem g-vac' : s.feries.length ? 'g-sem g-ferie' : 'g-sem';
    cellules.push(`<div class="${cls}" style="grid-row:2;grid-column:${i + 2}" title="Semaine du ${fr(s.lundi)}">${s.lundi.getUTCDate()}</div>`);
  });

  // Fonds (vacances) et pistes
  const lignes = p.pistes.length;
  const premApres = S.findIndex((s) => s.apres);
  if (premApres >= 0) cellules.push(`<div class="g-fond-fin" style="grid-row:3/${3 + lignes};grid-column:${premApres + 2}/${n + 2}"><span>Fin des cours</span></div>`);
  S.forEach((s, i) => {
    if (s.vacances) cellules.push(`<div class="g-fond-vac" style="grid-row:3/${3 + lignes};grid-column:${i + 2}"><span>${i === S.findIndex((x) => x.vacances === s.vacances) ? esc(s.vacances) : ''}</span></div>`);
  });
  p.pistes.forEach((pi, r) => {
    const row = 3 + r;
    cellules.push(`<div class="g-piste" style="grid-row:${row};grid-column:1"><strong>${esc(pi.nom ?? pi.id)}</strong><small>${esc(pi.resume ?? '')}</small></div>`);
    pi.capacites.forEach((c, i) => { if (!c && !S[i].vacances && !S[i].apres && actif(pi, S[i])) cellules.push(`<div class="g-vide" style="grid-row:${row};grid-column:${i + 2}"></div>`); });
    for (const s of pi.sequences) {
      if (s.iDebut == null || s.iFin < s.iDebut) continue;
      cellules.push(`<div class="g-barre etat-${s.etat}" style="grid-row:${row};grid-column:${s.iDebut + 2}/${s.iFin + 3};--c:${s.couleur ?? 'var(--accent)'}" title="${esc(s.titre)}"><b>${esc(s.id)}</b><span>${esc(s.court ?? s.titre)}</span></div>`);
    }
  });

  // Examens
  const rowEx = 3 + lignes;
  cellules.push(`<div class="g-piste g-piste-ex" style="grid-row:${rowEx};grid-column:1">Examens</div>`);
  for (const e of p.cal.evenements) {
    const a = S.findIndex((s) => +s.lundi === +lundi(e.du));
    const b = S.findIndex((s) => +s.lundi === +lundi(e.au));
    if (a < 0) continue;
    cellules.push(`<div class="g-examen" style="grid-row:${rowEx};grid-column:${a + 2}/${(b < 0 ? n - 1 : b) + 3}" title="${esc(e.nom)}">${esc(e.court ?? e.nom)}</div>`);
  }

  // Aujourd'hui
  const ia = S.findIndex((s) => +s.lundi === +lundi(p.aujourdhui));
  if (ia >= 0) {
    const frac = ((p.aujourdhui.getUTCDay() + 6) % 7) / 7;
    cellules.push(`<div class="g-auj" style="grid-row:1/${rowEx + 1};grid-column:${ia + 2};--x:${frac * 100}%"><span>${fr(p.aujourdhui)}</span></div>`);
  }
  return `<div class="gantt" style="${cols}">${cellules.join('')}</div>
  <div class="g-legende"><span class="l-fait">Réalisée</span><span class="l-en-cours">En cours</span><span class="l-prevu">Prévue</span><span class="l-vac">Vacances</span><span class="l-vide">Pas de cours (férié, pont, séance annulée)</span><span class="l-auj">Aujourd'hui</span></div>`;
}

const badge = (e) => `<span class="badge etat-${e}">${ETATS[e]}</span>`;

function ficheSequences(p) {
  const prof = p.m.profondeur ?? 'socle';
  return p.pistes.map((pi) => `
    <h2>${esc(pi.nom ?? pi.id)}${pi.resume ? ` <small>— ${esc(pi.resume)}</small>` : ''}</h2>
    ${pi.sequences.map((s) => {
      const prog = (s.programme ?? []).map((r) => { const it = p.items.get(String(r)); return `<li><b>${esc(r)}</b> ${it ? esc(it.contenu) : ''}</li>`; }).join('');
      const comp = (s.competences ?? []).map((c) => `<li><b>${esc(c)}</b> ${esc(p.competences.get(c)?.texte ?? '')}</li>`).join('');
      const act = s.activites ?? {};
      const listes = Array.isArray(act) ? act : [...(act.socle ?? []), ...(prof === 'approfondi' ? (act.approfondissement ?? []).map((a) => `**[approfondissement]** ${a}`) : [])];
      return `<section class="seq etat-${s.etat}">
        <header class="seq-tete" style="--c:${s.couleur ?? 'var(--accent)'}">
          <span class="seq-id">${esc(s.id)}</span>
          <span class="seq-titre">${esc(s.titre)}</span>
          ${badge(s.etat)}
          <span class="seq-dates">${s.dateDebut ? `${fr(s.dateDebut)} → ${fr(s.dateFin)}` : ''} · ${s.semainesEff} sem. · ${fmtH(s.heures)} h</span>
        </header>
        <div class="seq-corps">
          <div class="seq-col">
            ${s.theme ? `<p class="seq-theme">${inline(s.theme)}</p>` : ''}
            ${s.problematique ? `<p class="seq-pb">${inline(s.problematique)}</p>` : ''}
            ${prog ? `<h4>Programme (BO)</h4><ul class="seq-bo">${prog}</ul>` : ''}
            ${comp ? `<h4>Compétences</h4><ul class="seq-bo">${comp}</ul>` : ''}
          </div>
          <div class="seq-col">
            ${listes.length ? `<h4>Activités</h4><ul>${listes.map((a) => `<li>${inline(a)}</li>`).join('')}</ul>` : ''}
            ${s.outils ? `<h4>Outils</h4><p>${inline([].concat(s.outils).join(' · '))}</p>` : ''}
            ${s.evaluation ? `<h4>Évaluation</h4><p>${inline(s.evaluation)}</p>` : ''}
            ${s.ressources ? `<h4>Ressources du dossier</h4><p>${inline([].concat(s.ressources).join(' · '))}</p>` : ''}
            ${s.note ? `<p class="seq-note">${inline(s.note)}</p>` : ''}
          </div>
        </div>
      </section>`;
    }).join('')}`).join('');
}

function couverture(p) {
  const seqs = p.pistes.flatMap((pi) => pi.sequences);
  const hors = new Map((p.m.hors_perimetre ?? []).flatMap((h) => (h.items ?? []).map((i) => [String(i), h.raison])));
  const rang = { fait: 3, 'en-cours': 2, prevu: 1 };
  const lignes = p.programme.groupes.map((g) => {
    const rows = g.items.map((it) => {
      const qui = seqs.filter((s) => (s.programme ?? []).map(String).includes(String(it.id)));
      const meilleur = qui.reduce((a, s) => (rang[s.etat] > (rang[a] ?? 0) ? s.etat : a), null);
      const statut = qui.length ? badge(meilleur) : hors.has(String(it.id)) ? `<span class="badge hors" title="${esc(hors.get(String(it.id)))}">Hors périmètre</span>` : '<span class="badge manque">Non couvert</span>';
      const cases = seqs.map((s) => `<td class="c-case">${qui.includes(s) ? `<span class="pt etat-${s.etat}"></span>` : ''}</td>`).join('');
      const capa = it.capacites ? `<div class="c-capa">${it.capacites.map(esc).join('<br>')}</div>` : '';
      return `<tr><td class="c-item"><b>${esc(it.id)}</b> ${esc(it.contenu)}${capa}</td>${cases}<td class="c-statut">${statut}</td></tr>`;
    }).join('');
    return `<tr class="c-groupe"><td colspan="${seqs.length + 2}">${esc(g.titre)}</td></tr>${rows}`;
  }).join('');
  const raisons = (p.m.hors_perimetre ?? []).map((h) => `<li><b>${esc((h.items ?? []).join(', '))}</b> : ${inline(h.raison)}</li>`).join('');
  return `<table class="couverture">
    <thead><tr><th>Programme officiel — ${esc(p.programme.reference ?? '')}</th>${seqs.map((s) => `<th class="c-case" title="${esc(s.titre)}">${esc(s.id)}</th>`).join('')}<th>Statut</th></tr></thead>
    <tbody>${lignes}</tbody></table>
    ${raisons ? `<div class="c-hors"><b>Hors périmètre de mes créneaux :</b><ul>${raisons}</ul></div>` : ''}`;
}

export function rendreProgression(doc, p, config) {
  const m = doc.meta;
  const seqs = p.pistes.flatMap((pi) => pi.sequences.map((s) => ({ ...s, piste: pi })));
  const nb = (e) => seqs.filter((s) => s.etat === e).length;
  const hFaites = p.pistes.reduce((t, pi) => t + pi.capacites.reduce((a, c, i) => a + (p.cal.semaines[i].lundi <= lundi(p.aujourdhui) ? c : 0), 0), 0);
  const hTotal = p.pistes.reduce((t, pi) => t + pi.heuresTotal, 0);
  const semRest = p.cal.semaines.filter((s) => s.lundi > p.aujourdhui && s.jours.length).length;

  const creneaux = p.pistes.map((pi) => `<li><b>${esc(pi.nom ?? pi.id)}</b> : ${(pi.creneaux ?? []).map((c) => esc(c.libelle ?? `${c.jour ?? ''} ${fmtH(c.heures)} h`)).join(' ; ')}</li>`).join('');
  const annul = (m.annulations ?? []).map((a) => ({ date: a.date, texte: `Séance annulée${a.piste ? ` (${a.piste})` : ''} : ${a.raison ?? 'sans motif précisé'}` }));
  const journal = [...(m.journal ?? []), ...annul].slice().sort((a, b) => date(b.date) - date(a.date))
    .map((j) => `<tr><td class="j-date">${fr(date(j.date), { day: 'numeric', month: 'short', year: 'numeric' })}</td><td>${inline(j.texte)}</td></tr>`).join('');
  const corps = doc.corps.trim() ? md.render(doc.corps, { cible: 'prof' }) : '';
  const principes = (p.programme.principes ?? []).map((x) => `<li>${esc(x)}</li>`).join('');

  const html = `
  <header class="doc-entete">
    <div class="doc-entete-texte">
      <div class="doc-bandeau"><span>${esc(config.etablissement)} — ${esc(p.cal.annee)} — zone ${esc(String(p.cal.zone).split(' ')[0])}</span><span>${esc(m.niveau)}</span><span class="doc-type">Progression annuelle</span></div>
      <h1 class="doc-titre">${esc(m.classe)} — ${esc(m.titre)}</h1>
      <dl class="doc-meta">
        <div><dt>Horaire</dt><dd>${esc(m.horaire ?? '')}</dd></div>
        <div><dt>Programme</dt><dd>${esc(p.programme.reference ?? '')}</dd></div>
        <div><dt>État au</dt><dd>${frLong(p.aujourdhui)}</dd></div>
      </dl>
    </div>
  </header>
  <main class="doc-corps">
    <div class="kpis">
      <div><b>${nb('fait')}</b><span>séquences réalisées</span></div>
      <div><b>${nb('en-cours')}</b><span>en cours</span></div>
      <div><b>${nb('prevu')}</b><span>à venir</span></div>
      <div><b>${fmtH(hFaites)} / ${fmtH(hTotal)} h</b><span>heures écoulées / année</span></div>
      <div><b>${semRest}</b><span>semaines de cours restantes</span></div>
    </div>
    ${gantt(p)}
    <div class="orga">
      <div><h3>Créneaux</h3><ul>${creneaux}</ul></div>
      ${corps ? `<div class="orga-texte">${corps}</div>` : ''}
    </div>

    <div class="saut-page"></div>
    <h1 class="partie">Séquences</h1>
    ${ficheSequences(p)}

    <div class="saut-page"></div>
    <h1 class="partie">Couverture du programme officiel</h1>
    ${principes ? `<ul class="principes">${principes}</ul>` : ''}
    ${couverture(p)}

    ${journal ? `<h1 class="partie">Journal des ajustements</h1><table class="journal"><tbody>${journal}</tbody></table>` : ''}
  </main>`;

  return page({
    titre: `Progression — ${m.classe}`,
    corps: html, meta: m, config, fichierSource: doc.fichier,
    feuilles: ['style.css', 'progression.css'],
    classes: 'document variante-prof type-progression',
  });
}
