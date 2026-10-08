// Document réponse .docx (travail en autonomie, champ « document_reponse: true ») :
// l'élève répond à l'ordinateur, sous Word ou LibreOffice, puis dépose le fichier sur l'ENT.
// Une section par question (énoncé rappelé en gris, zone « Ma réponse »), puis les bilans à trous.
import fs from 'node:fs';
import path from 'node:path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } from 'docx';
import { reperer } from './document.mjs';

const GRIS = '64748B';
const POLICE = 'Arial';

// Texte Markdown simple → morceaux { texte, gras, code }
function morceaux(ligne) {
  return ligne
    .replace(/!\[[^\]]*\]\([^)]*\)(\{[^}]*\})?/g, '')
    .replace(/\[\[([^\]]+)\]\]/g, '……………')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/)
    .filter(Boolean)
    .map((m) => (m.startsWith('**') ? { texte: m.slice(2, -2), gras: true }
      : m.startsWith('`') ? { texte: m.slice(1, -1), code: true } : { texte: m }));
}
const runs = (ligne, opts = {}) => morceaux(ligne).map((m) => new TextRun({
  text: m.texte, bold: m.gras, font: m.code ? 'Consolas' : POLICE, size: 21, color: opts.couleur, italics: opts.italique,
}));

// Lignes d'un bloc → paragraphes (listes à cocher, puces, tableaux en texte)
function paragraphes(lignes, opts) {
  const sortie = [];
  for (const brut of lignes) {
    const l = brut.trim();
    if (!l || /^\|?\s*:?-{2,}/.test(l)) continue;
    let texte = l;
    if (/^- \[[ xX]\]\s/.test(l)) texte = `☐ ${l.replace(/^- \[[ xX]\]\s/, '')}`;
    else if (/^[-*]\s/.test(l)) texte = `• ${l.slice(2)}`;
    else if (l.startsWith('|')) texte = l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()).join('   |   ');
    sortie.push(new Paragraph({ children: runs(texte, opts), spacing: { after: 60 } }));
  }
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

