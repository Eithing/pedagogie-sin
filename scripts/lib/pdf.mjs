// HTML -> PDF avec le navigateur Chromium déjà installé (Chrome), via puppeteer-core.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const CANDIDATS = [
  process.env.PEDAGO_NAVIGATEUR,
  // Chrome en premier : Edge refuse parfois le mode headless piloté (sortie immédiate, code 0).
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];

export function trouverNavigateur(config) {
  const chemin = [config.navigateur, ...CANDIDATS].find((p) => p && fs.existsSync(p));
  if (!chemin) {
    throw new Error('Aucun navigateur Chromium trouvé : renseigner "navigateur" dans pipeline.config.json');
  }
  return chemin;
}

export async function ouvrirNavigateur(config) {
  return puppeteer.launch({ executablePath: trouverNavigateur(config), headless: true });
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const STYLE_MARGE = 'font-family:Segoe UI,Arial,sans-serif;font-size:7.5pt;color:#64748b;width:100%;padding:0 15mm;display:flex;justify-content:space-between;';

// format 'a4' / 'a4-paysage' : document avec en-tête / pied de page ; 'diapo' : pages 16:9 sans marge.
// Renvoie la liste des diapos dont le contenu déborde (format 'diapo').
export async function genererPdf(navigateur, fichierHtml, fichierPdf, { meta, config, libelle, format = 'a4' }) {
  const page = await navigateur.newPage();
  try {
    await page.goto(pathToFileURL(fichierHtml).href, { waitUntil: 'load' });
    await page.emulateMediaType('print');
    await page.evaluate(() => document.fonts.ready);

    if (format === 'diapo') {
      const debordements = await page.evaluate(() => [...document.querySelectorAll('.diapo')]
        .map((d, i) => {
          const c = d.querySelector('.diapo-corps');
          return c && c.scrollHeight > c.clientHeight + 2 ? i + 1 : null;
        })
        .filter(Boolean));
      await page.pdf({ path: fichierPdf, width: '1280px', height: '720px', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
      return debordements;
    }

    await page.pdf({
      path: fichierPdf,
      format: 'A4',
      landscape: format === 'a4-paysage',
      printBackground: true,
      displayHeaderFooter: true,
      margin: { top: '16mm', bottom: '16mm', left: '15mm', right: '15mm' },
      headerTemplate: `<div style="${STYLE_MARGE}"><span>${esc(config.etablissement)} — ${esc(meta.niveau ?? config.discipline)}</span><span>${esc(meta.titre)}</span></div>`,
      footerTemplate: `<div style="${STYLE_MARGE}"><span>${esc(libelle)}</span><span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    });
    return [];
  } finally {
    await page.close();
  }
}
