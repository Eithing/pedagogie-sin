// Document réponse .docx (travail en autonomie, champ « document_reponse: true ») :
// l'élève répond à l'ordinateur, sous Word ou LibreOffice, puis dépose le fichier sur l'ENT.
// Une section par question (énoncé rappelé en gris, zone « Ma réponse »), puis les bilans à trous.
import fs from 'node:fs';
import path from 'node:path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx';
import { reperer } from './document.mjs';

const GRIS = '64748B';
const POLICE = 'Arial';

// Formule LaTeX → texte lisible dans Word (fractions en a / b, exposants et indices simples)
const EXPOSANTS = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', n: 'ⁿ', '-': '⁻', '+': '⁺' };
function texteMath(tex) {
  // D'abord ce qui contient des accolades internes (texte, indices, {,}), puis les fractions
  let t = tex
    .replace(/\\(?:text|mathrm|operatorname)\{([^{}]*)\}/g, '$1')
    .replace(/_\{([^{}]*)\}/g, '$1').replace(/\{,\}/g, ',');
  for (let i = 0; i < 5; i++) t = t.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1) / ($2)');
  return t
    .replace(/\(([\w.,^ ]+)\) \/ \(([\w.,^ ]+)\)/g, (_, a, b) => `${/\s/.test(a.trim()) ? `(${a.trim()})` : a.trim()} / ${/\s/.test(b.trim()) ? `(${b.trim()})` : b.trim()}`)
    .replace(/\\,/g, ' ')
    .replace(/\\times/g, '×').replace(/\\le(q)?/g, '≤').replace(/\\ge(q)?/g, '≥').replace(/\\approx/g, '≈')
    .replace(/\\Delta\s*/g, 'Δ').replace(/\\cdot/g, '·')
    .replace(/\^\{?([0-9n+-]+)\}?/g, (_, e) => [...e].map((c) => EXPOSANTS[c] ?? c).join(''))
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

