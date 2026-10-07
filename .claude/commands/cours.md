# Skill: /cours

Génère une **séance de cours rythmée** (SNT / 1ère STI2D / Term STI2D SIN) : une seule source Markdown dont la chaîne tire les **diapos** à projeter, la **fiche de déroulé** de l'enseignant (ce qu'il dit, quand lancer chaque activité, réponses attendues) et la **fiche d'activités** élève (+ version corrigée).

## Principe pédagogique (non négociable)
Un cours n'est **jamais descendant**. La séance alterne :
- des **exposés courts** (`::: slide`, 2 à 5 min chacun, jamais plus de 10 min cumulées sans activité) ;
- des **activités élèves** variées (`::: activite`) : quiz projeté de démarrage, jeu de rôle débranché, exercice en binôme, simulation, mise en commun, quiz de sortie — au moins 40 % du temps ;
- une **trace écrite** à trous (`::: retenir`) construite avec les élèves.

Structure type d'une séance de 55 min : accroche + hypothèses → quiz « ce que je sais déjà » → découverte par l'activité → institutionnalisation (slide) → entraînement → trace écrite → quiz de sortie.

## Procédure (obligatoire)
1. Lire `referentiels/charte-rendu.md` (§ 6 : format des séances), le référentiel du niveau dans `referentiels/`, `materiel/labo-baggio.md` (tout est en simulation pour l'instant) et le gabarit `templates/gabarit-cours.md`. Le cours `sources/cours/COURS_SNT_TCP_IP.md` sert d'exemple de référence.
2. Dessiner les illustrations en **SVG** dans `sources/cours/img/<sujet>/` (couverture + au moins un schéma par notion clé), selon la charte § 7.
3. Écrire la source dans `sources/cours/` (nommage : `COURS_<Niveau>_<Sujet>.md`) avec `type: cours`, `objectifs`, `prerequis`, `preparation`. Pour chaque étape, rédiger les blocs `::: dire` : ce que l'enseignant dit, les questions à poser à la classe, les transitions, la mise en commun. Les activités contiennent leurs questions et des corrigés complets.
4. Lancer `npm run build -- sources/cours/<fichier>.md` et corriger toutes les erreurs (durées, rythme, images) et les diapos signalées comme trop longues.
5. Indiquer à l'enseignant les chemins des 4 PDF et du HTML de projection, et tout point « à vérifier » (compétence absente du référentiel, outil hors inventaire, valeur incertaine).
