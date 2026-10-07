# Charte de Rendu et Directives Didactiques SII / SIN

## 1. Objectifs de la Charte
Assurer que tout document produit (Cours, TP, TD, Fiche de Cadrage) respecte une présentation homogène, un niveau scientifique irréprochable et les formats requis par l'inspection pédagogique.

Chaque document est écrit **une seule fois** en Markdown dans `sources/<type>/`. La chaîne de production (`npm run build`) en tire automatiquement :

| Type | Fichiers produits |
| :--- | :--- |
| `tp`, `td`, `cadrage` | version **élève** (zones de réponse) + version **prof** (corrigé + barème) |
| `cours` | **diapos** 16:9 (PDF + HTML de projection avec minuteur) + **fiche de déroulé** enseignant + **fiche d'activités** élève et sa version corrigée |

La couleur d'accent dépend du niveau (SNT, 1ère, Term) : voir `pipeline.config.json > themes`.

---

## 2. Directives de Mise en Forme (Markdown & LaTeX)

* **Équations et Mathématiques :** syntaxe LaTeX exclusivement, rendue par KaTeX.
  * Inline : `$f_c = \frac{1}{2 \pi R C}$` (pas d'espace juste après le `$` ouvrant ni juste avant le `$` fermant).
  * Bloc :
    $$N = \frac{V_{in}}{V_{ref}} \times (2^n - 1)$$
  * Décimales à la française dans les formules : `0{,}5` (les accolades évitent l'espace après la virgule).
* **Notations Techniques :**
  * Signaux numériques : `HIGH`, `LOW`, `0b1011`, `0x4F`.
  * Adresses IP et masques : `192.168.1.0/24`.
  * Unités : Système International, séparées de la valeur (ex. $5\text{ V}$, $10\text{ k}\Omega$, $115200\text{ baud}$, $-18\text{ °C}$).
* **Code :** blocs ```` ```cpp ````, ```` ```python ````, ```` ```text ```` (colorés automatiquement). Commentaires du code sans accents si le code doit être copié dans l'IDE.
* **Images :** `![](img/<sujet>/schema.svg)` ; taille optionnelle `{width=60%}` juste après.
* **Saut de page forcé :** `<div class="saut-page"></div>` sur une ligne seule.

---

## 3. Grille Taxonomique pour la Rédaction des Questions
Utiliser les verbes d'action adaptés à la taxonomie de Bloom selon le niveau, **en gras** en début de consigne :

| Niveau Taxonomique | Verbes d'action préconisés | Cible privilégiée |
| :--- | :--- | :--- |
| **Restituer / Identifier** | Nommer, lister, repérer, donner, relever | SNT / 1ère STI2D |
| **Comprendre / Appliquer** | Expliquer, calculer, mesurer, configurer, compléter | 1ère & Term STI2D |
| **Analyser / Modéliser** | Déduire, comparer, valider, interpréter, modéliser (SysML) | Term STI2D / BTS |
| **Concevoir / Évaluer** | Proposer, optimiser, critiquer, concevoir, programmer | Term STI2D (Projet) |

---

## 4. Balises

### 4.1 Questions et corrigés (tous types)

| Balise | Rôle | Version élève | Version prof |
| :--- | :--- | :--- | :--- |
| `::: question N [x pt]` | Question numérotée 1, 2, 3… sans trou ; points obligatoires en TP / TD, absents en cours | affichée | affichée |
| `::: reponse L` | Corrigé de la question qui précède ; `L` = lignes de la zone élève (défaut 6, **0** pour un QCM) | `L` lignes vides | encadré vert « Corrigé » |
| `- [ ] choix` / `- [x] bon choix` | QCM (dans une question) | cases vides | bonne réponse cochée |
| `[[mot]]` | Texte à trous (traces écrites, bilans) | trait à compléter | mot surligné |
| `::: prof` | Note réservée à l'enseignant | supprimée | encadré violet |

### 4.2 Mise en page et personnalisation (tous types)

| Balise | Rendu |
| :--- | :--- |
| `::: contexte Titre` | Mise en situation encadrée ; une image seule sur sa ligne s'affiche à droite du texte |
| `::: problematique` | La question technique à résoudre, mise en valeur |
| `::: doc DR1 \| Titre` | Document ressource numéroté (datasheet, extrait de norme, chronogramme…) |
| `::: figure Légende` | Figure numérotée automatiquement (« Figure 1 — … ») |
| `::: retenir` | Encadré « À retenir » (peut contenir des `[[trous]]`) |
| `::: info` / `::: rappel` / `::: attention` | Encadrés ; titre personnalisable : `::: rappel Loi d'Ohm` |

Front matter facultatif pour personnaliser le cartouche : `illustration:` (image affichée à droite du titre, et sur la couverture des diapos) et `accroche:` (une phrase d'accroche).

### 4.3 Règles de syntaxe

* Chaque bloc s'ouvre par `::: nom …` et se ferme par `:::` seul sur sa ligne.
* Un bloc `reponse` suit **directement** sa question (ligne vide autorisée), jamais à l'intérieur.
* Pour imbriquer des blocs, ouvrir le bloc extérieur avec **plus** de deux-points : `:::: doc DR1 | Titre` … `::: info` … `:::` … `::::`.
* TP / TD : la somme des `[x pt]` doit être égale au champ `bareme` (20 par défaut).
* Le code de départ élève se place dans la **question** ; la solution complète dans la **réponse**.

---

## 5. Structure d'un TP / TD

```markdown
---
titre: [Titre de l'activité, sans préfixe « TP — »]
niveau: [SNT / 1ère STI2D / Term STI2D SIN]
type: [tp / td / cadrage]
duree: [X h YY min]
bareme: 20
competences: [codes tels qu'écrits dans referentiels/]
materiel: [outils de materiel/labo-baggio.md]     # obligatoire pour un TP
illustration: img/<sujet>/illustration.svg
accroche: [une phrase]
---

## 1. Contextualisation & Système Étudié

::: contexte Titre
![](img/<sujet>/illustration.svg)
[Système réel, chiffres concrets, enjeu]
:::

::: problematique
[La question technique à résoudre]
:::

::: figure Synoptique du système
![](img/<sujet>/synoptique.svg)
:::

::: doc DR1 | Titre
[Document ressource]
:::

## 2. Activité / Travail Demandé

::: question 1 [2 pt]
**Calculer** …
:::

::: reponse 8
[Correction complète avec équations, code ou schémas]
:::

## 3. Bilan & Synthèse des Acquis

::: retenir
[Synthèse avec [[trous]] : complétée automatiquement dans la version prof]
:::

## 4. Barème & Grille d'Évaluation
[Barème par question + grille critériée (templates/grille-evaluation.md)]
```

* **Pas de titre `#` dans le corps** : le cartouche (titre, niveau, durée, compétences, Nom / Prénom / Classe / Note) est généré depuis le front matter.

---

## 6. Structure d'un Cours (séance rythmée)

Un cours n'est **jamais descendant** : c'est une séance qui alterne exposés courts, activités élèves et trace écrite. La source est une **suite plate d'étapes** ; chaque étape a une durée et la somme doit être égale à `duree`.

| Bloc | Rôle | Diapos | Fiche de déroulé | Fiche élève |
| :--- | :--- | :--- | :--- | :--- |
| `## Titre de phase` | Grande partie de la séance | intercalaire | bandeau | — |
| `::: slide 4 min \| Titre` | Exposé projeté (contenu de la diapo) | 1 diapo | horaire + titre | — (sauf drapeau `fiche`) |
| `::: activite 8 min \| Titre \| binome` | Activité élève : consigne | diapo avec minuteur | « ▶ LANCER » + consigne + réponses attendues | section « Activité N » |
| `::: question N` / `::: reponse L` | Questions de l'activité qui précède | 1 diapo par question si `projeter` | réponses attendues | questions + zones |
| `::: retenir 5 min` | Trace écrite à `[[trous]]` | diapo complétée | texte complété | texte à trous |
| `::: dire` | Ce que l'enseignant dit / fait à cette étape | — | sous l'étape | — |
| `::: prof` | Note de préparation ou de vigilance | — | encadré « Note » | — |

* **Modalités** d'activité : `individuel`, `binome`, `groupe`, `classe`. **Drapeaux** : `projeter` (questions projetées une par une, réponse à main levée), `fiche` sur un slide (son contenu est recopié sur la fiche élève, utile pour un schéma de référence).
* **Colonnes** dans une diapo : une ligne `|||` seule sépare la colonne gauche de la droite.
* **Rythme vérifié automatiquement** (`pipeline.config.json > rythme`) : au moins 40 % du temps en activités, jamais plus de 10 min d'affilée sans activité, au moins une trace écrite `::: retenir`.
* Varier les formats d'activité : quiz projeté de démarrage et de sortie, jeu de rôle débranché, exercice en binôme, simulation (outils de `materiel/labo-baggio.md`), mise en commun.
* Front matter supplémentaire : `objectifs`, `prerequis`, `preparation` (liste de cases à cocher « avant la séance » sur la fiche de déroulé).

```markdown
---
titre: …
niveau: SNT (2nde)
type: cours
duree: 55 min
illustration: img/<sujet>/couverture.svg
accroche: …
competences: [ … ]
objectifs: [ … ]
prerequis: [ … ]
preparation: [ Imprimer la fiche d'activités, … ]
---

## Se poser la question

::: slide 3 min | Accroche
![](img/<sujet>/accroche.svg)
:::

::: dire
- Laisser 30 s de réflexion, recueillir 2-3 hypothèses.
:::

::: activite 4 min | Ce que je sais déjà | individuel | projeter
Consigne courte.
:::

::: question 1
Énoncé…
- [ ] choix A
- [x] choix B
:::

::: reponse 0
Explication.
:::
```

---

## 7. Illustrations

* Chaque TP, TD et cours comporte **au moins une illustration** (la validation le signale sinon) : illustration de mise en situation, synoptique, chronogramme, schéma de principe…
* Les schémas sont des fichiers **SVG** rangés dans `sources/<type>/img/<sujet>/`, dessinés à la main dans le SVG : texte en français, police `Inter, Segoe UI, sans-serif`, couleurs de la palette (accent du niveau, orange `#ea580c` pour l'action, vert `#15803d` pour le résultat, gris ardoise pour le neutre). Pas de dégradés complexes ni de texte trop petit (≥ 11 px à l'échelle du `viewBox`).
* Les photos réelles (format `.jpg`, `.png`, `.webp`) sont fournies par l'enseignant dans le même dossier ; citer la source et la licence si elle n'est pas personnelle.
* Remplacer tout schéma ASCII par un SVG.

---

## 8. Progressions annuelles

* Une progression par classe dans `sources/progression/PROGRESSION_<classe>.md` (`type: progression`), rendue en A4 paysage.
* **Pistes** : chaque créneau régulier d'une classe (jour, durée, période de validité `du` / `au`, fréquence 0,5 pour une semaine sur deux). Une piste `partagee` est décrite une seule fois dans le catalogue (heure commune de deux classes).
* **Séquences** : durée en `semaines` de cours (ou `fin` : jusqu'au dernier créneau). Les dates sont **calculées** depuis le calendrier ; seules les dates réellement constatées sont saisies (`debut`, `fin`). `etat` : `fait`, `en-cours`, `prevu`.
* Chaque séquence cite les identifiants du programme officiel (`programme:`) et les compétences (`competences:`) ; la chaîne produit la **matrice de couverture du BO** et signale tout élément non couvert. Un élément volontairement non traité va dans `hors_perimetre` avec sa raison.
* Les imprévus vont dans `annulations:` (la suite se décale) et toute décision dans `journal:` (daté, justifié).
