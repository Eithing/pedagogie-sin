// Moteur Markdown commun à tous les rendus (documents, diapos, déroulé).
// Le comportement dépend de env.cible : 'eleve' | 'prof' | 'slides'.
import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import attrs from 'markdown-it-attrs';
import texmath from 'markdown-it-texmath';
import katex from 'katex';
import hljs from 'highlight.js';
import { parseArgsQuestion, fmt } from './document.mjs';

export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// `::: nom a | b | c` -> ['a', 'b', 'c'] (sans le nom du bloc)
export function argsBloc(info, nom) {
  const reste = info.trim().slice(nom.length).trim();
  return reste ? reste.split('|').map((s) => s.trim()) : [];
}

const ENCADRES = { info: 'Information', attention: 'Attention', rappel: 'Rappel' };

// Texte à trous : [[mot]] -> ligne vide (élève) ou mot surligné (prof, diapos)
function trous(md) {
  md.inline.ruler.before('link', 'trou', (state, silent) => {
    const s = state.src;
    const p = state.pos;
    if (s.charCodeAt(p) !== 0x5b || s.charCodeAt(p + 1) !== 0x5b) return false;
    const fin = s.indexOf(']]', p + 2);
    if (fin <= p + 2 || s.slice(p + 2, fin).includes('\n')) return false;
    if (!silent) state.push('trou', '', 0).content = s.slice(p + 2, fin);
    state.pos = fin + 2;
    return true;
  });
  md.renderer.rules.trou = (tokens, idx, _o, env) => {
    const mot = tokens[idx].content;
    return env.cible === 'eleve'
      ? `<span class="trou" style="--car:${Math.max(mot.length, 4)}"></span>`
      : `<mark class="trou-rempli">${esc(mot)}</mark>`;
  };
}

// QCM : `- [ ] choix` / `- [x] bonne réponse` -> cases à cocher (cochées seulement en version prof)
function qcm(md) {
  md.core.ruler.push('qcm', (state) => {
    const tk = state.tokens;
    for (let i = 2; i < tk.length; i++) {
      const t = tk[i];
      if (t.type !== 'inline' || tk[i - 1].type !== 'paragraph_open' || tk[i - 2].type !== 'list_item_open') continue;
      const m = t.content.match(/^\[([ xX])\]\s+/);
      const premier = t.children?.[0];
      if (!m || premier?.type !== 'text' || !premier.content.startsWith(m[0])) continue;
      premier.content = premier.content.slice(m[0].length);
      const coche = m[1] !== ' ' && state.env?.cible === 'prof';
      const boite = new state.Token('html_inline', '', 0);
      boite.content = `<span class="case${coche ? ' coche' : ''}"></span>`;
      t.children.unshift(boite);
      tk[i - 2].attrJoin('class', `choix${coche ? ' bon' : ''}`);
      for (let j = i - 3; j >= 0; j--) {
        if (/^(bullet|ordered)_list_open$/.test(tk[j].type) && tk[j].level === tk[i - 2].level - 1) {
          tk[j].attrJoin('class', 'qcm');
          break;
        }
      }
    }
  });
}

function bloc(md, nom, ouvrir, fermer) {
  md.use(container, nom, {
    render(tokens, idx, _o, env) {
      const t = tokens[idx];
      return t.nesting === 1 ? ouvrir(argsBloc(t.info, nom), env) : (typeof fermer === 'function' ? fermer(env) : fermer);
    },
  });
}

export function creerMarkdown() {
  const md = new MarkdownIt({
    html: true,
    typographer: false,
    highlight(code, lang) {
      const langue = lang && hljs.getLanguage(lang) ? lang : null;
      const html = langue ? hljs.highlight(code, { language: langue, ignoreIllegals: true }).value : esc(code);
      return `<pre class="hljs${langue ? ` langue-${langue}` : ''}"><code>${html}</code></pre>`;
    },
  });

  md.use(texmath, { engine: katex, delimiters: 'dollars', katexOptions: { throwOnError: false, strict: false } });
  md.use(attrs, { allowedAttributes: ['id', 'class', 'width', 'style'] });
  md.use(trous);
  md.use(qcm);

  // --- Questions / réponses ---
  bloc(md, 'question', (a) => {
    const q = parseArgsQuestion(a.join(' ')) ?? {};
    const pts = q.points != null ? `<span class="question-points">${fmt(q.points)} pt${q.points > 1 ? 's' : ''}</span>` : '';
    return `<section class="question"><header class="question-titre"><span>Question ${q.numero ?? ''}</span>${pts}</header><div class="question-corps">\n`;
  }, '</div></section>\n');
  bloc(md, 'reponse', () => '<section class="reponse"><header class="reponse-titre">Corrigé</header><div class="reponse-corps">\n', '</div></section>\n');
  bloc(md, 'zone', (a) => `<div class="zone-reponse" style="--lignes:${Number(a[0]) || 6}" aria-label="Zone de réponse"></div>\n`, '');

  // --- Notes enseignant ---
  bloc(md, 'prof', () => '<aside class="note-prof"><header>Note enseignant</header>\n', '</aside>\n');
  bloc(md, 'dire', () => '<aside class="note-dire"><header>À dire</header>\n', '</aside>\n');

  // --- Encadrés de mise en page ---
  for (const [nom, titre] of Object.entries(ENCADRES)) {
    bloc(md, nom, (a) => `<aside class="encadre encadre-${nom}"><header>${esc(a.join(' — ') || titre)}</header>\n`, '</aside>\n');
  }
  bloc(md, 'contexte', (a) => `<section class="contexte"><header>${esc(a[0] || 'Mise en situation')}</header><div class="contexte-corps">\n`, '</div></section>\n');
  bloc(md, 'problematique', () => '<aside class="problematique"><header>Problématique</header>\n', '</aside>\n');
  bloc(md, 'retenir', () => '<section class="retenir"><header>À retenir</header>\n', '</section>\n');
  bloc(md, 'doc', (a) => `<section class="doc-ressource"><header><span class="dr-code">${esc(a[0] ?? 'DR')}</span><span>${esc(a[1] ?? '')}</span></header><div class="dr-corps">\n`, '</div></section>\n');
  bloc(md, 'figure', (a, env) => {
    (env.figures ??= []).push(a.join(' | '));
    return '<figure class="figure"><div class="figure-contenu">\n';
  }, (env) => {
    const legende = env.figures?.pop();
    return `</div>${legende ? `<figcaption>${md.renderInline(legende, env)}</figcaption>` : ''}</figure>\n`;
  });

  // Blocs propres aux séances : neutralisés si rencontrés ailleurs (la validation les signale).
  for (const nom of ['slide', 'activite', 'variante']) bloc(md, nom, () => '<div>\n', '</div>\n');
  return md;
}

export const md = creerMarkdown();
// « \newpage » seul sur sa ligne : saut de page (tous types de documents)
export const rendre = (texte, cible) => md.render(texte.replace(/^\\newpage[ \t]*$/gm, '<div class="saut-page"></div>'), { cible });

// Couleur d'accent selon le niveau (pipeline.config.json > themes)
export function accentPour(niveau, config) {
  const themes = config.themes ?? {};
  const cle = Object.keys(themes).find((k) => String(niveau ?? '').toLowerCase().includes(k.toLowerCase()));
  return themes[cle] ?? config.accentParDefaut ?? '#2563eb';
}
