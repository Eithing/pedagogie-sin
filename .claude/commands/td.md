# Skill: /td

Génère un Travail Dirigé (TD) problématisé pour la spécialité SIN (STI2D / BTS CIEL / SNT) selon la charte `referentiels/charte-rendu.md`.

## Structure imposée :
1. **En-tête :** Niveau, Durée, Compétences visées.
2. **Mise en situation technique :** étude de cas sur un sous-système réel (ex. trame réseau, bus CAN, numérisation, conversion d'énergie), dans un bloc `::: contexte` illustré, suivi d'un `::: problematique`. Données techniques en `::: doc DRn | Titre`.
3. **Questions découpées :** Utilise obligatoirement les balises `::: question N [x pt]` et `::: reponse L` (voir la charte), avec une progression du plus simple (identifier) au plus complexe (analyser, justifier). Varier les formats : calcul, QCM (`- [ ]` / `- [x]`), tableau à compléter, schéma à annoter.
4. **Formules et calculs :** Utilise la notation LaTeX pour toutes les équations et variables.
5. **Bilan :** `::: retenir` à trous, puis barème.

## Procédure (obligatoire)
1. Lire `referentiels/charte-rendu.md`, le référentiel du niveau concerné dans `referentiels/`.
2. Dessiner en **SVG** dans `sources/td/img/<sujet>/` l'illustration de mise en situation et les schémas nécessaires (charte § 7). Aucun schéma ASCII.
3. Écrire la source dans `sources/td/` (nommage et front matter : voir `CLAUDE.md`), avec `type: td`, `illustration`, `accroche`, des points `[x pt]` sur chaque question et une somme égale à `bareme`.
4. Lancer `npm run build -- sources/td/<fichier>.md` et corriger toutes les erreurs jusqu'à obtenir les deux PDF.
5. Indiquer à l'enseignant les chemins des PDF élève et prof, et tout point « à vérifier » (codes de compétences absents du référentiel, matériel hors inventaire, valeurs incertaines).
