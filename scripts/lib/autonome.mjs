// HTML autonome : un seul fichier qui s'ouvre sur n'importe quel ordinateur (salle de classe, clé USB),
// sans le projet ni node_modules. Les feuilles de style sont recopiées dans la page, les images et les
// polices des formules sont intégrées en data URI, et la balise <base> (qui pointe vers ce poste) disparaît.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TYPES = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.woff2': 'font/woff2' };

// Polices inutiles hors du poste : la mise en page utilise Calibri / Consolas, présentes sous Windows.
const FEUILLES_IGNOREES = /@fontsource/;

function dataUri(fichier) {
  const type = TYPES[path.extname(fichier).toLowerCase()];
  if (!type || !fs.existsSync(fichier)) return null;
  return `data:${type};base64,${fs.readFileSync(fichier).toString('base64')}`;
}

// Recopie une feuille de style ; ses polices woff2 sont intégrées, les formats de repli (woff, ttf) retirés.
function feuille(fichier, avecFormules) {
  if (/katex/.test(fichier) && !avecFormules) return '';
  const dossier = path.dirname(fichier);
  return fs.readFileSync(fichier, 'utf8')
    .replace(/,\s*url\(([^)]+?\.(?:woff|ttf|eot))\)\s*format\([^)]*\)/g, '')
    .replace(/url\((['"]?)([^)'"]+)\1\)/g, (m, q, cible) => {
      if (/^(data:|https?:|#)/.test(cible)) return m;
      const uri = dataUri(path.resolve(dossier, cible));
      return uri ? `url(${uri})` : m;
    });
}

export function htmlAutonome(html) {
  const base = html.match(/<base href="([^"]+)">/)?.[1];
  const dossierBase = base ? fileURLToPath(base) : null;
  const avecFormules = /class="katex/.test(html);

  return html
    .replace(/<base href="[^"]*">\n?/, '')
    .replace(/<link rel="stylesheet" href="(file:[^"]+)">/g, (m, href) => {
      const fichier = fileURLToPath(href);
      if (FEUILLES_IGNOREES.test(fichier.replace(/\\/g, '/'))) return '';
      const css = feuille(fichier, avecFormules);
      return css ? `<style>\n${css}\n</style>` : '';
    })
    // Images relatives au dossier de la source (balises img et images de fond en ligne)
    .replace(/(<img\b[^>]*?\ssrc=")([^"]+)(")/g, (m, avant, src, apres) => {
      if (!dossierBase || /^(data:|https?:)/.test(src)) return m;
      const uri = dataUri(path.resolve(dossierBase, src));
      return uri ? avant + uri + apres : m;
    });
}
