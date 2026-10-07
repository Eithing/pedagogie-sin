# Skill: /tp

Génère une activité de Travaux Pratiques complète pour la spécialité SIN (STI2D / BTS CIEL / SNT) en respectant la charte `referentiels/charte-rendu.md`.

## Structure imposée :
1. **En-tête pédagogique :** Classe, Durée, Matériel requis, Compétences exactes du référentiel.
2. **Mise en situation :** système pluritechnologique réel et incarné (lieu, acteurs, chiffres, incident déclencheur) dans un bloc `::: contexte` illustré, suivi d'un bloc `::: problematique`. Synoptique en `::: figure`, documents ressources en `::: doc DRn | Titre`.
3. **Travail demandé :** Questions problématisées découpées impérativement avec les balises `::: question N [x pt]` et `::: reponse L` (voir la charte), regroupées en parties avec une durée indicative.
4. **Bilan :** synthèse à trous dans un `::: retenir` + tableau d'auto-évaluation.
5. **Barème & Grille d'évaluation :** Tableau critérié par compétences (`templates/grille-evaluation.md`).

Inclus systématiquement le code C/C++ ou Python de départ pour l'élève et la solution fonctionnelle complète dans la partie réponse.

## Procédure (obligatoire)
1. Lire `referentiels/charte-rendu.md`, le référentiel du niveau concerné dans `referentiels/` et `materiel/labo-baggio.md` (pour l'instant tout est **en simulation** : Wokwi, Tinkercad, Filius, Packet Tracer…). Vérifier que chaque composant utilisé existe dans l'outil choisi ; sinon le signaler.
2. Dessiner en **SVG** dans `sources/tp/img/<sujet>/` : une illustration de mise en situation (aussi utilisée en `illustration:` du front matter), le synoptique, et les schémas utiles aux questions (chronogrammes, courbes). Charte § 7. Aucun schéma ASCII.
3. Écrire la source dans `sources/tp/` (nommage et front matter : voir `CLAUDE.md`), avec `type: tp`, `illustration`, `accroche`, des points `[x pt]` sur chaque question et une somme égale à `bareme`.
4. Lancer `npm run build -- sources/tp/<fichier>.md` et corriger toutes les erreurs jusqu'à obtenir les deux PDF.
5. Indiquer à l'enseignant les chemins des PDF élève et prof, et tout point « à vérifier » (codes de compétences absents du référentiel, matériel hors inventaire, valeurs incertaines).
