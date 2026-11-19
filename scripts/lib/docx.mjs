// Document réponse .docx (travail en autonomie, champ « document_reponse: true ») :
// l'élève répond à l'ordinateur, sous Word ou LibreOffice, puis dépose le fichier sur l'ENT.
// Une section par question (énoncé rappelé en gris, zone « Ma réponse »), puis les bilans à trous.
import fs from 'node:fs';
import path from 'node:path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle, Table, TableRow, TableCell, WidthType, ImageRun, AlignmentType } from 'docx';
import { reperer } from './document.mjs';

const GRIS = '64748B';
const POLICE = 'Arial';

// Formule LaTeX → texte lisible dans Word (fractions en a / b, exposants et indices simples)
const EXPOSANTS = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', n: 'ⁿ', '-': '⁻', '+': '⁺' };
function texteMath(tex) {
  // D'abord ce qui contient des accolades internes (texte, indices, exposants, {,}, symboles),
  // puis les fractions, en ne gardant les parenthèses que si un terme contient un espace
  let t = tex
    .replace(/\\(?:text|mathrm|operatorname)\{([^{}]*)\}/g, '$1')
    .replace(/_\{([^{}]*)\}/g, '$1').replace(/\{,\}/g, ',')
    .replace(/\^(?:\{([0-9n+-]+)\}|([0-9n]))/g, (_, a, b) => [...(a ?? b)].map((c) => EXPOSANTS[c] ?? c).join(''))
    .replace(/\\,/g, ' ')
    .replace(/\\times/g, '×').replace(/\\le(q)?/g, '≤').replace(/\\ge(q)?/g, '≥').replace(/\\approx/g, '≈')
    .replace(/\\[lc]?dots/g, '…').replace(/\\Delta\s*/g, 'Δ').replace(/\\cdot/g, '·');
  const terme = (x) => (/\s/.test(x.trim()) ? `(${x.trim()})` : x.trim());
  for (let i = 0; i < 5; i++) t = t.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, a, b) => `${terme(a)} / ${terme(b)}`);
  return t
    .replace(/_\{([^{}]*)\}/g, '$1').replace(/_(\w)/g, '$1')
    .replace(/[{}]/g, '').replace(/\\/g, '').replace(/\s+/g, ' ').trim();
}

// Texte Markdown simple → morceaux { texte, gras, code }
function morceaux(ligne) {
  return ligne
    .replace(/\$\$([^$]+)\$\$|\$([^$]+)\$/g, (_, a, b) => texteMath(a ?? b))
    .replace(/!\[[^\]]*\]\([^)]*\)(\{[^}]*\})?/g, '')
    .replace(/\[\[([^\]]+)\]\]/g, '……………')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/)
    .filter(Boolean)
    .map((m) => (m.startsWith('**') ? { texte: m.slice(2, -2), gras: true }
      : m.startsWith('`') ? { texte: m.slice(1, -1), code: true } : { texte: m }));
}
const runs = (ligne, opts = {}) => morceaux(ligne).map((m) => new TextRun({
  text: m.texte, bold: m.gras || opts.gras, font: m.code ? 'Consolas' : POLICE, size: 21, color: opts.couleur, italics: opts.italique,
}));

// Tableau Markdown → vrai tableau Word (les cases vides restent à remplir)
function tableau(lignes) {
  const rangees = lignes.filter((l) => !/^\|?\s*:?-{2,}/.test(l))
    .map((l) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rangees.map((cellules, i) => new TableRow({
      children: cellules.map((c, j) => new TableCell({
        children: [new Paragraph({ children: c ? runs(c, { gras: i === 0 || j === 0 }) : [] })],
        shading: i === 0 || j === 0 ? { fill: 'F1F5F9' } : undefined,
      })),
    })),
  });
}

// Lignes d'un bloc → paragraphes (listes à cocher, puces) et tableaux
function paragraphes(lignes, opts) {
  const sortie = [];
  let lignesTableau = [];
  const vider = () => {
    if (lignesTableau.length) sortie.push(tableau(lignesTableau), new Paragraph({ children: [] }));
    lignesTableau = [];
  };
  let code = false;
  for (const brut of lignes) {
    const l = brut.trim();
    // Bloc de code : police à chasse fixe, indentation conservée
    if (/^(`{3,}|~{3,})/.test(l)) { vider(); code = !code; continue; }
    if (code) {
      sortie.push(new Paragraph({ children: [new TextRun({ text: brut.replace(/\t/g, '  '), font: 'Consolas', size: 19 })], shading: { fill: 'F6F8FA' }, spacing: { after: 0 } }));
      continue;
    }
    if (l.startsWith('|')) { lignesTableau.push(l); continue; }
    vider();
    if (!l) continue;
    let texte = l;
    if (/^- \[[ xX]\]\s/.test(l)) texte = `☐ ${l.replace(/^- \[[ xX]\]\s/, '')}`;
    else if (/^[-*]\s/.test(l)) texte = `• ${l.slice(2)}`;
    sortie.push(new Paragraph({ children: runs(texte, opts), spacing: { after: 60 } }));
  }
  vider();
  return sortie;
}

const zoneReponse = () => [
  new Paragraph({ children: [new TextRun({ text: 'Ma réponse :', bold: true, font: POLICE, size: 21, color: '0F766E' })], spacing: { before: 120, after: 60 } }),
  ...[1, 2, 3].map(() => new Paragraph({
    children: [new TextRun({ text: '', font: POLICE, size: 22 })],
    border: { bottom: { style: BorderStyle.DOTTED, size: 4, color: 'CBD5E1', space: 4 } },
    spacing: { after: 160 },
  })),
];

export async function genererDocx(doc, cheminSortie) {
  const { lignes, blocs } = reperer(doc.corps);
  const interieur = (b) => lignes.slice(b.debut + 1, b.fin);
  const enfants = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: `Document réponse — ${doc.meta.titre}`, font: POLICE, size: 32, bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: `${doc.meta.niveau ?? ''}`, font: POLICE, size: 20, color: GRIS })], spacing: { after: 200 } }),
    ...['Nom :', 'Prénom :', 'Classe :'].map((t) => new Paragraph({ children: [new TextRun({ text: t, bold: true, font: POLICE, size: 22 })], spacing: { after: 80 } })),
    new Paragraph({
      children: runs('**Comment faire :** écris tes réponses sous chaque question (la zone « Ma réponse » s\'agrandit toute seule). Pour un choix multiple, recopie la bonne proposition dans « Ma réponse ». Enregistre ensuite le fichier sous le nom `REPONSES_NOM_Prenom` (Word ou LibreOffice), puis dépose-le sur l\'ENT.'),
      border: { left: { style: BorderStyle.SINGLE, size: 18, color: '0D9488', space: 8 } },
      spacing: { before: 200, after: 300 },
    }),
  ];

  for (const q of blocs.filter((b) => b.nom === 'question')) {
    const numero = (q.args ?? '').match(/^\d+/)?.[0] ?? '';
    enfants.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: `Question ${numero}`, font: POLICE, size: 26, bold: true, color: '0F766E' })], spacing: { before: 280, after: 80 } }));
    const sousBlocs = blocs.filter((b) => b.parent === 'question' && b.debut > q.debut && b.fin < q.fin);
    const texte = interieur(q).filter((_, i) => !sousBlocs.some((s) => q.debut + 1 + i === s.debut || q.debut + 1 + i === s.fin));
    enfants.push(...paragraphes(texte, { couleur: GRIS, italique: true }), ...zoneReponse());
  }

  const bilans = blocs.filter((b) => b.nom === 'retenir' && interieur(b).some((l) => l.includes('[[')));
  if (bilans.length) {
    enfants.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: 'Bilan à compléter', font: POLICE, size: 26, bold: true, color: '15803D' })], spacing: { before: 320, after: 80 } }));
    enfants.push(new Paragraph({ children: runs('Remplace chaque …………… par le mot qui manque.', { couleur: GRIS, italique: true }), spacing: { after: 120 } }));
    for (const b of bilans) enfants.push(...paragraphes(interieur(b)));
  }

  const document = new Document({
    creator: 'SNT', title: `Document réponse — ${doc.meta.titre}`,
    styles: { default: { document: { run: { font: POLICE, size: 21 } } } },
    sections: [{ properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } }, children: enfants }],
  });
  fs.mkdirSync(path.dirname(cheminSortie), { recursive: true });
  fs.writeFileSync(cheminSortie, await Packer.toBuffer(document));
}


// ---------------------------------------------------------------------------
// Fiche élève éditable (champ « fiche_docx: true ») : ELEVE_<nom>.docx, même contenu que le PDF élève
// (titres, consignes, questions, lignes de réponse, trace écrite à trous, schémas en images PNG).
// L'enseignant peut la retoucher sous Word ou LibreOffice. Les points ne sont pas affichés.
// ---------------------------------------------------------------------------

const VERT = '0F766E';

// Image (SVG, PNG, JPG) → PNG net, rendu par le navigateur de la chaîne
async function imagePng(navigateur, fichier) {
  const ext = path.extname(fichier).toLowerCase();
  const mime = ext === '.svg' ? 'image/svg+xml' : ext === '.png' ? 'image/png' : 'image/jpeg';
  const url = `data:${mime};base64,${fs.readFileSync(fichier).toString('base64')}`;
  // SVG sans largeur explicite : taille tirée du viewBox (sinon le navigateur le réduit à 300 × 150)
  const vb = ext === '.svg' ? fs.readFileSync(fichier, 'utf8').match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/) : null;
  const page = await navigateur.newPage();
  try {
    await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 2 });
    await page.setContent(`<body style="margin:0;background:#fff"><img id="i" src="${url}" style="display:block"></body>`);
    const taille = await page.evaluate(async (vb) => {
      const i = document.getElementById('i'); await i.decode();
      let [w, h] = vb ?? [i.naturalWidth || 760, i.naturalHeight || 400];
      if (w > 1500) { h = (h * 1500) / w; w = 1500; }
      i.style.width = `${w}px`; i.style.height = `${h}px`;
      return { w, h };
    }, vb ? [Number(vb[1]), Number(vb[2])] : null);
    const data = await (await page.$('#i')).screenshot({ type: 'png' });
    return { data, ...taille };
  } finally { await page.close(); }
}

export async function genererFicheDocx({ meta, corps, fichierSource, navigateur, cheminSortie }) {
  const enfants = [
    new Paragraph({ children: [new TextRun({ text: `${meta.niveau ?? ''}`, font: POLICE, size: 18, color: GRIS })] }),
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: meta.titre, font: POLICE, size: 32, bold: true })], spacing: { after: 120 } }),
  ];
  if (meta.accroche) enfants.push(new Paragraph({ children: [new TextRun({ text: meta.accroche, font: POLICE, size: 20, italics: true, color: GRIS })], spacing: { after: 160 } }));
  enfants.push(new Paragraph({
    children: ['Nom : ', 'Prénom : ', 'Classe : ', 'Date : '].map((t) => new TextRun({ text: `${t}…………………………   `, font: POLICE, size: 20, bold: true })),
    spacing: { after: 200 },
  }));
  for (const c of [].concat(meta.consignes ?? [])) enfants.push(new Paragraph({ children: runs(`• ${c}`), spacing: { after: 40 } }));

  const lignes = corps.split(/\r?\n/);
  const pile = [];
  const cache = (nom) => pile.some((b) => ['prof', 'dire', 'reponse'].includes(b));
  let code = false;
  let tab = [];
  const vider = () => { if (tab.length) enfants.push(tableau(tab), new Paragraph({ children: [] })); tab = []; };
  const encadre = (titre, couleur) => new Paragraph({
    children: [new TextRun({ text: titre, bold: true, font: POLICE, size: 22, color: couleur })],
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: couleur, space: 8 } }, spacing: { before: 160, after: 60 },
  });

  for (const brut of lignes) {
    const l = brut.trim();
    if (/^(`{3,}|~{3,})/.test(l)) { vider(); if (!cache()) code = !code; continue; }
    if (code) {
      if (!cache()) enfants.push(new Paragraph({ children: [new TextRun({ text: brut.replace(/\t/g, '  '), font: 'Consolas', size: 19 })], shading: { fill: 'F6F8FA' }, spacing: { after: 0 } }));
      continue;
    }
    const ouv = l.match(/^:{3,}\s*([\wéè-]+)\s*(.*)$/);
    if (ouv) {
      vider();
      const [, nom, args] = ouv;
      pile.push(nom);
      if (cache()) continue;
      if (nom === 'question') {
        const n = args.match(/^\d+/)?.[0] ?? '';
        enfants.push(new Paragraph({ children: [new TextRun({ text: `Question ${n}`, bold: true, font: POLICE, size: 22, color: VERT })], spacing: { before: 200, after: 60 }, keepNext: true }));
      } else if (nom === 'zone') {
        const n = Number(args) || 3;
        // Une ligne pointillée par ligne de réponse ; un séparateur sans bordure empêche Word de fusionner les bordures
        for (let k = 0; k < n; k++) enfants.push(
          new Paragraph({ children: [new TextRun({ text: '', font: POLICE, size: 22 })], border: { bottom: { style: BorderStyle.DOTTED, size: 4, color: '94A3B8', space: 4 } }, spacing: { before: 120, after: 0 } }),
          new Paragraph({ children: [new TextRun({ text: '', size: 4 })], spacing: { before: 0, after: 0, line: 60, lineRule: 'exact' } }),
        );
      } else if (nom === 'retenir') enfants.push(encadre('À retenir', '15803D'));
      else if (!['variante', 'activite', 'slide'].includes(nom)) enfants.push(encadre(args.split('|')[0].trim() || nom.charAt(0).toUpperCase() + nom.slice(1), '2563EB'));
      continue;
    }
    if (/^:{3,}\s*$/.test(l)) { vider(); pile.pop(); continue; }
    if (cache()) continue;
    if (l.startsWith('|')) { tab.push(l); continue; }
    vider();
    if (!l) continue;
    // Balises HTML de mise en page : ignorées, sauf la ligne de modalité d'une activité (sans la durée)
    if (/^<\/?(section|div)\b[^>]*>$/.test(l)) continue;
    if (/^<p class="act-meta">/.test(l)) {
      const t = l.replace(/<span class="act-duree">.*?<\/span>/, '').replace(/<[^>]+>/g, '').trim();
      if (t) enfants.push(new Paragraph({ children: [new TextRun({ text: t, italics: true, font: POLICE, size: 19, color: GRIS })], spacing: { after: 80 } }));
      continue;
    }
    const img = l.match(/^!\[[^\]]*\]\(([^)\s]+)\)/);
    if (img) {
      const f = path.resolve(path.dirname(fichierSource), img[1]);
      if (navigateur && fs.existsSync(f)) {
        const { data, w, h } = await imagePng(navigateur, f);
        const k = Math.min(620 / w, 330 / h);
        enfants.push(new Paragraph({ children: [new ImageRun({ type: 'png', data, transformation: { width: Math.round(w * k), height: Math.round(h * k) } })], alignment: AlignmentType.CENTER, spacing: { before: 80, after: 120 } }));
      }
      continue;
    }
    const titre = l.match(/^(#{2,4})\s+(.*)$/);
    if (titre) {
      const niv = titre[1].length;
      enfants.push(new Paragraph({
        heading: niv === 2 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2,
        children: [new TextRun({ text: titre[2].replace(/\*\*/g, ''), bold: true, font: POLICE, size: niv === 2 ? 28 : 24, color: niv === 2 ? '0F172A' : '334155' })],
        spacing: { before: niv === 2 ? 320 : 200, after: 80 }, keepNext: true,
      }));
      continue;
    }
    let texte = l;
    if (/^- \[[ xX]\]\s/.test(l)) texte = `☐ ${l.replace(/^- \[[ xX]\]\s/, '')}`;
    else if (/^[-*]\s/.test(l)) texte = `• ${l.slice(2)}`;
    else if (/^>\s?/.test(l)) texte = l.replace(/^>\s?/, '');
    enfants.push(new Paragraph({ children: runs(texte.replace(/<[^>]+>/g, '')), spacing: { after: 60 } }));
  }
  vider();

  const document = new Document({
    creator: 'SNT', title: meta.titre,
    styles: { default: { document: { run: { font: POLICE, size: 21 } } } },
    sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children: enfants }],
  });
  fs.mkdirSync(path.dirname(cheminSortie), { recursive: true });
  fs.writeFileSync(cheminSortie, await Packer.toBuffer(document));
}
