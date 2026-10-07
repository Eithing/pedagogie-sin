// Usage : npm run validate [-- fichier.md ...]
// Vérifie la structure des sources sans rien générer. Code de sortie 1 si une erreur est trouvée.
import { chargerConfig, listerSources, analyser } from './lib/commun.mjs';

const config = chargerConfig();
const fichiers = listerSources(process.argv.slice(2), config);
if (!fichiers.length) console.log('Aucun fichier source trouvé.');

let ok = true;
for (const f of fichiers) ok = analyser(f, config).ok && ok;
process.exit(ok ? 0 : 1);
