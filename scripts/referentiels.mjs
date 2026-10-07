// Usage : node scripts/referentiels.mjs
// Régénère les fiches lisibles referentiels/referentiel_*.md à partir des programmes officiels
// referentiels/bo/*.yaml (seule source de vérité, texte du BO mot pour mot).
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { RACINE } from './lib/render.mjs';

const CIBLES = {
  'snt.yaml': 'referentiel_snt_seconde.md',
  '2i2d_sin_terminale.yaml': 'referentiel_term_sti2d_sin.md',
};

for (const [source, cible] of Object.entries(CIBLES)) {
  const bo = yaml.load(fs.readFileSync(path.join(RACINE, 'referentiels', 'bo', source), 'utf8'));
  const l = [
    `# ${bo.titre}`,
    '',
    `> Fichier généré depuis \`referentiels/bo/${source}\` par \`node scripts/referentiels.mjs\` — ne pas modifier à la main.`,
    `> Référence : ${bo.reference}. Les identifiants entre crochets sont ceux à citer dans les progressions et les documents.`,
    '',
  ];
  if (bo.principes?.length) l.push('## Principes', '', ...bo.principes.map((p) => `- ${p}`), '');
  if (bo.competences?.length) l.push('## Compétences', '', '| Code | Compétence |', '| :--- | :--- |', ...bo.competences.map((c) => `| **${c.id}** | ${c.texte} |`), '');
  l.push('## Connaissances', '');
  for (const g of bo.groupes) {
    l.push(`### ${g.titre}`, '');
    for (const it of g.items) {
      l.push(`- **[${it.id}]** ${it.contenu}`);
      for (const c of it.capacites ?? []) l.push(`  - ${c}`);
    }
    l.push('');
  }
  fs.writeFileSync(path.join(RACINE, 'referentiels', cible), l.join('\n'));
  console.log(`→ referentiels/${cible}`);
}
