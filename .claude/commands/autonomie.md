# Skill: /autonomie

Génère un **travail en autonomie** pour les séances à distance (blocus, absence, distanciel) : l'élève suit seul un plan de travail, l'enseignant reste joignable sur la messagerie de l'ENT et l'élève dépose sa production sur l'ENT.

## Principe
- **Une fiche autosuffisante** : personne n'est là pour expliquer. Apports courts et clairs (`::: contexte`, `::: doc DRn | Titre`, `::: retenir`), schémas SVG, consignes pas à pas.
- **Un plan de travail à cocher** : le corps est découpé en `## Étape N — Titre (x min)` ; la chaîne en tire automatiquement l'encadré « Mon plan de travail », avec « À déposer sur l'ENT » (`rendu:`) et « Besoin d'aide ? » (`aide:`).
- **Toujours actif** : défi de départ, lecture puis questions, manipulation (navigateur, simulateur, éditeur), bilan à trous, dépôt.
- **Ne noter que ce qui ne se copie pas** : production personnelle (sujet choisi par l'élève, parcours propre à chacun), évaluée sur une grille avec un coefficient réduit. Les connaissances s'évaluent sur table, au retour en classe (`/td` ou évaluation à sujets A/B).
- **Outils sans compte** : rien qui exige Capytale (indisponible dans l'académie de Lille). Pour HTML/CSS : `sources/autonomie/fichiers/editeur_web.html`. Prévoir le cas « l'élève n'a qu'un téléphone ».

## Procédure (obligatoire)
1. Lire `SUIVI.md`, la progression de la classe (`sources/progression/`), `referentiels/charte-rendu.md` (§ 6 bis) et le programme dans `referentiels/bo/`.
2. Dessiner les SVG dans `sources/autonomie/img/<sujet>/`.
3. Écrire `sources/autonomie/AUTO_<Niveau>_<Sujet>.md` avec `type: autonomie`, `sequence:`, `duree`, `competences`, `rendu`, `aide`, et si besoin `fichiers` et `bareme`. Questions en `::: reponse 0` (réponses sur feuille ou dans un fichier). Ajouter un bloc `::: prof` de mise en œuvre : devoir ENT à créer, fichiers à déposer, comment corriger.
4. `npm run build -- sources/autonomie/<fichier>.md` et corriger toutes les erreurs.
5. Ajouter le document aux `ressources:` de la séquence et une ligne au `journal:` de la progression.
6. Donner à l'enseignant la liste exacte de ce qu'il faut déposer sur l'ENT (PDF élève, fichiers joints).
