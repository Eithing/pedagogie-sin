# Suivi du projet — à lire en début de session

Ce fichier remplace la mémoire de conversation entre les postes (PC fixe, portable du lycée). Claude le lit au démarrage (voir `CLAUDE.md`) et le met à jour en fin de session : décisions prises, travail fait, questions en attente.

## 27 novembre 2026 : interrogation Web des 2nde (4 décembre) refaite en très simple

- **Demande de l'enseignant** : une interrogation « très simple » pour la semaine prochaine, et une fiche de révision.
- `EVAL_SNT_Web` **réécrit à la place de l'ancien sujet**, qui n'avait pas servi et reste dans l'historique git. Le nouveau sujet a les mêmes noms de fichiers dans `output/Eval/2nde/` et garde les sujets A et B, sur 30 min (45 min avec tiers-temps). Barème :
  - questions 1 et 2 : 2 × 5 cases à cocher (10 pt) ;
  - question 3 : lire un code HTML, trouver le titre et le lien (3 pt) ;
  - question 4 : nom de domaine d'une URL et page sécurisée ou non (3 pt) ;
  - question 5 : licence CC BY-NC, oui ou non, et pourquoi (2 pt) ;
  - question 6 : cookies publicitaires (2 pt).
  
  3 pages par sujet.
- Nouvelle fiche **`REVISION_SNT_Web_Essentiel`** : 7 encadrés qui correspondent aux questions de l'interrogation, avec des exemples différents, et un auto-test de 7 questions corrigé. Recto-verso. L'ancienne `REVISION_SNT_Web` (distribuée le 20) est gardée. Pronote : le nom de fichier est nouveau.
- La progression 2nde a été mise à jour (évaluation, ressources, journal du 27).
- **À faire par l'enseignant** : déposer `REVISION_SNT_Web_Essentiel.pdf` sur l'ENT et Pronote, et imprimer les sujets A et B.

## 26 novembre 2026 (après-midi) : bilan du 20 novembre et séances du 27 refaites pour les Terminales

- **Bilan de l'enseignant** :
  - 2nde : le TP « coulisses » s'est bien passé ; le cours a tout vu, mais vite, et les élèves ne sont pas prêts pour l'interrogation (4 décembre).
  - D1 : un peu de travail, mais seulement 9 fiches rendues sur 14 présents.
  - D2 + D3 : heure commune « atroce » (bavardages, chamailleries, ordre très dur à tenir) ; 14 copies avec nom, 5 sans nom, sur 23 présents.
  - D2, TP : correct, mais les élèves sont à relancer sans cesse ; 10 rendus sur 12. Ils ont du mal avec la programmation et aiment les jeux vidéo.
  - Toutes les classes : il manque le sens (« pourquoi on fait ça »). D'où, dans chaque séance, un **temps de présentation au tableau** dès les premières minutes, avec sa fiche contexte. **Objectif : des notes pour tout le monde avant Noël.**
- **Principes contre le non-rendu et le désordre** :
  - fiches **nominatives** (le nom est écrit par le professeur), posées sur les tables : c'est aussi le plan de classe ;
  - le contrat est dit en une minute ; on sort en rendant sa fiche à la porte ;
  - la meilleure des deux notes (20 ou 27) compte.
- **2nde** : l'escape game `COURS_SNT_Web_Escape` est gardé, avec un plan de bataille ajouté dans sa fiche contexte.
- **D1** : `COURS_TermSIN_Lampadaire_Panne` est réécrit en 5 min de présentation, **15 min de cours** (lire / décider / agir, variable, if / else, deux questions éclair), puis **30 min d'activité** en trois étapes : exécuter à la main, tournoi des bugs, réparer sur Wokwi (+ le crépuscule). Chaque étape a un **visa** du professeur, noté aussi sur une grille. Nouvelle fiche `CONTEXTE_TermSIN_Lampadaire_Panne`.
- **D2 + D3** : `COURS_TermSIN_Reseau_PasAPas` est réécrit en « le réseau du parking en quatre règles ».
  - Sur table, individuel, en silence : une règle montrée au tableau, puis un exercice, quatre fois (rue et numéro, direct ou routeur, passerelle, aller et retour du ping), et un quiz.
  - Réponses au bleu, correction au vert (le vert ne rapporte rien).
  - Plus de jeu des enveloppes en classe entière ni d'enquête par équipes. Nouvelle figure `img/reseau/rues-parking.svg`.
  - La fiche contexte est réécrite (plan de bataille, notation du 20 novembre : copies sans nom, non-rendus, meilleure des deux notes).
- **D2, bloc de 3 h** :
  - nouveau `COURS_TermSIN_Python_Jeu`, « Python, le moteur des jeux vidéo » : au tableau, sans PC, non noté, avec un tableau des scores par équipes (barre de vie, game over, boss mal programmé, partie au dé jouée à la main, tournoi des bugs) ;
  - puis nouveau `TP_TermSIN_Python_Reflexes`, « le jeu des réflexes », 2 h, noté /20 : LED au hasard, bouton, temps de réaction, commentaires, anti-triche, record et moyenne, amélioration personnelle. Fichiers `diagram_jeu_reflexes.json` et `jeu_reflexes.py` (noms nouveaux).
  - La **solution a été testée dans Wokwi le 26 novembre** (5 manches, commentaires, triche, record, moyenne : justes). Le programme de départ n'a pas été lancé seul, mais il n'est qu'un extrait de la solution.
  - Nouvelle fiche `CONTEXTE_TermSIN_Python_Jeu` (anecdotes vraies : Tennis for Two, Super Mario Bros. en 40 Ko, Space Invaders, niveau 256 de Pac-Man, faux départ au 100 m).
  - Séquence T2 (programmation) : `TP_TermSIN_ChambreFroide_Missions` et `COURS_TermSIN_I2C_PasAPas` sont **reportés** (leurs PDF restent prêts).
- Progressions : journal du 26 novembre dans les quatre ; ressources ajoutées (Panne pour D1, Python pour D2).
- **À demander à l'enseignant** :
  - comment se sont passées les séances du 27 ;
  - le nombre de fiches rendues ;
  - quand reprendre la chambre froide (D2) ;
  - les notes prévues d'ici Noël : TP réseau C1 le 4 décembre, interrogation Web des 2nde le 4 décembre, et pour D1 et D3 ?

## 26 novembre 2026 : 2nde du 27, l'escape game remplace « le voyage d'un clic »

- **Constat de l'enseignant** : « le voyage d'un clic » faisait redite (mêmes schémas que la synthèse du 20, jeu de rôle du clic déjà joué le 2 novembre). Remplacé, à sa demande (format choisi parmi trois), par **`COURS_SNT_Web_Escape`**, « Panique à la MDL » : escape game par équipes de 4 ou 5, sur papier, cinq énigmes qui donnent chacune un chiffre du cadenas **3 5 4 9 2** (lien d'hameçonnage, journal d'un serveur avec 200 / 404, page HTML et CSS cassée, licence d'une image, cookies tiers et résultat sponsorisé), puis un verrou final en QCM (histoire du Web, robots, navigation privée). Carnet du détective (méthode) projeté et imprimé à chaque énigme, 2 jokers par équipe, tableau des scores. Notée /20 (4 + 4 + 4 + 3 + 3 + 2), peut remplacer la note du 20. Exemples tous nouveaux et différents de l'interrogation.
- Sources renommées : `COURS_SNT_Web_PasAPas` → `COURS_SNT_Web_Escape`, `CONTEXTE_SNT_Web_PasAPas` → `CONTEXTE_SNT_Web_Escape` (fiche contexte réécrite : lancer le jeu, tenir le rythme, anecdotes à placer entre les énigmes). Nouvelles figures `img/web/escape-alerte.svg` et `escape-cadenas.svg`. Progression 2nde (ressources + journal du 26) et note de l'interrogation mises à jour.
- Facultatif pour l'enseignant : une boîte fermée par un cadenas à 5 chiffres réglé sur 3 5 4 9 2.

## 25 novembre 2026 : vendredi 27 rendu plus attractif (demande de l'enseignant ; remplace ci-dessous ce qui est prévu pour le 27)

- **2nde** : TP « coulisses » inchangé à 8 h. `COURS_SNT_Web_PasAPas` ne couvrait que 9 points sur 20 de l'interrogation : activités resserrées, quiz de sortie remplacé par un **quiz par équipes** de 13 min (histoire, licences, moteurs, cookies ; questions différentes de l'interrogation).
- **D1** : nouveau `COURS_TermSIN_Lampadaire_Panne` (enquête par équipes, rappel Python de 5 min). Le « pas à pas » reste celui des D3 (fait le 24).
- **D2 + D3** : `COURS_TermSIN_Reseau_PasAPas` réécrit en enquête (cinq indices, deux passerelles fautives).
- **D2, 3 h** : `COURS_TermSIN_I2C_PasAPas` réécrit (20 min de rappel de code comme avec les D3, appel I2C, nombres négatifs) ; ses anciens exemples donnaient les réponses des questions 2, 4a et 7 du TP. Puis `TP_TermSIN_ChambreFroide_Missions` (2 h, /20), reprise guidée des étapes 4 à 6 du TP du 20.
- **Chambre froide testée dans Wokwi le 25 novembre** : scan [104], WHO_AM_I 0x68, −18 °C, valeurs négatives et alarme à hystérésis bonnes. Sans complément à 2 : +174,8 °C (calculé), corrigé dans le TP du 20 (écrit +190).
- **Questions sans réponse** : rappel de 15-20 min aussi pour D1 ? où en étaient les D2 dans le TP le 20, et quelle note pour ce TP ? les notes du 27 remplacent-elles celles du 20 ? qu'est-ce qui a bien marché mardi avec les D3 ?

## Semaine du 23 novembre 2026 : reprendre les élèves par la main (première ébauche, à retravailler avec l'enseignant)

- **Constat de l'enseignant (20 novembre)** : les Terminales ont peu travaillé ; les 2nde étaient perdus, la synthèse est allée trop vite. Les élèves ne comprennent pas **à quoi sert** ce qu'on fait : il manque du contexte.
- **Décisions** : les Terminales **reprennent les mêmes notions plus lentement** (on n'avance pas dans la progression cette semaine) ; l'**interrogation Web des 2nde est reportée au 4 décembre** (réseaux sociaux à partir du 11 décembre). Chaque fiche de reprise est notée /20 et peut remplacer la note du 20 novembre (à confirmer par l'enseignant).
- **Principe commun des séances** : une image concrète comme fil rouge, d'abord **sans ordinateur** (jeu de rôle, exécution à la main), puis un exemple fait par le professeur, puis le même exercice seul (« je fais, on fait, vous faites ») ; sur Wokwi, geste par geste, mains levées.
- **Nouvelles séances** (`sources/cours/`) :
  - mardi 24, D3, et vendredi 27, 12 h, D1 : `COURS_TermSIN_Lampadaire_PasAPas` (être le microcontrôleur sur papier, chasse aux trois erreurs Python, Wokwi ensemble, le piéton écrit d'abord sur la fiche) ;
  - vendredi 27, heure commune D2 + D3 : `COURS_TermSIN_Reseau_PasAPas`, sur papier (la box de la maison, l'adresse postale « rue + numéro », **jeu des enveloppes** : 6 cartes machines et un élève routeur, fiche de configuration, aller et retour), nouvelle figure `img/reseau/box-maison.svg` ;
  - vendredi 27, D2, 1re heure du bloc : `COURS_TermSIN_I2C_PasAPas` (décoder une trame série, **l'appel en classe** pour l'I2C, complément à 2 avec le compteur kilométrique ; trame et octets différents du TP), puis 2 h pour finir `TP_TermSIN_I2C_Wokwi` ;
  - vendredi 27, 9 h, 2nde : `COURS_SNT_Web_PasAPas`, « le voyage d'un clic » (URL, DNS, requête et réponse HTTP **jouées par trois élèves**, être le navigateur devant un code HTML), avec `fiche_docx: true`. Le TP « coulisses » du 2e demi-groupe reste à 8 h.
- **Nouveau type `contexte`** (`sources/contexte/`, sortie `prof/<séq>_Contexte_<court>/CONTEXTE_<nom>.pdf`, ni version élève ni Pronote) : une fiche enseignant par séance, avec la phrase à dire aux élèves, comment amener la séance, le fil rouge (image), des **anecdotes vraies** (premier bug de 1947, LO d'ARPANET, épuisement des adresses IPv4, Baudot, Philips et l'I2C, Ariane 501, Gangnam Style, naissance du Web au CERN, info.cern.ch…), à quoi ça leur sert, les blocages fréquents et le plan B. Modifs : `TYPES` (`document.mjs`), `sorties` et Pronote (`build.mjs`), `TYPES_DOSSIER` et avertissement Pronote (`commun.mjs`), en-tête (`render.mjs`).
- **À vérifier avant d'en parler** : l'adresse de la box selon l'opérateur (fiche contexte réseau).
- **23 novembre, lampadaire pas à pas** : à la demande de l'enseignant, rappel Python de 6 min pour ceux qui repartent de zéro (une diapo « les grandes lignes », texte à dire minuté dans le déroulé) et « Mémo Python » d'une demi-page sur la fiche élève. Nouveau drapeau de la chaîne : `::: tableau Titre | papier` (imprimé sur la fiche, jamais projeté, possible après un slide). Durées resserrées pour rester à 55 min (allée et chaîne 2 min, activités 1 et 4 à 7 min, activité 2 à 5 min, bilan 4 min). Corrigés : activité 2 (une ligne annoncée fausse était juste) et tableau des pièges (le décalage ne se voyait pas). Le mémo montre `and`, `elif` et `else` : les trous de la question 5 s'y retrouvent.
- **24 novembre, lampadaire pas à pas** (demande de l'enseignant) : question 4 clarifiée (régler le seuil, ajouter la condition `if / else` selon $N$, tester ; tableau situation / comparaison / lampe) ; question 5 remplacée par une **variante de code**, le crépuscule (variable `N_CREPUSCULE = 2500`, `elif` à placer au bon endroit, lampe à 10 %, vérification à la main), à partir du programme du piéton fourni. Barème inchangé (6 et 4 points) ; fiche élève : 7 pages. Pas lancé dans Wokwi.
- Le circuit `circuit_lampadaire_jour_nuitv2.json` réarrangé par l'enseignant (position des fils) est reporté dans `sources/autonomie/fichiers/lampadaire_jour_nuit/` ; circuit et programme renommés `…v2` par l'enseignant, fiches mises à jour.
- **Reprise prévue le 24 au matin, sur le portable, en commençant par le lampadaire (mardi D3).** Questions posées à l'enseignant, sans réponse encore : 1) rythme : couper le piéton (activité 4) pour la prochaine fois et donner plus de temps à Wokwi ? 2) les D3 ont-ils bien un poste pour deux mardi, sinon activité 3 au tableau (le professeur tape, la classe dicte) ? 3) garder la note /20 ou faire un entraînement non noté ? 4) l'accroche « éclairage public éteint la nuit » convient-elle, ou partir d'autre chose (couloir du lycée, fait local) ?
- **À faire ensuite** : retravailler ces ébauches avec l'enseignant ; décider si la note de reprise remplace celle du 20 ; TP noté C1 du 4/12 ; séances du 4/12 pour les Terminales ; début des réseaux sociaux le 11/12.

## 20 novembre 2026 : plus de guidage pour les Terminales

- À la demande de l'enseignant (les élèves manquaient d'instructions), pas-à-pas ajoutés, projetés pendant les activités et imprimés sur la fiche (blocs `tableau … | fiche`) :
  - `COURS_TermSIN_Lampadaire_Programme` (D1) : deux diapos « Ouvrir Wokwi et charger les fichiers » et « Lancer, régler, modifier » (navigateur, adresse, onglets, Bloc-notes, Ctrl + A / C / V, ▶ / ■, moniteur série, réglage de la lumière) ; tableau « Si ça ne marche pas » (SyntaxError, IndentationError, simulation non lancée…) ; « Tester le piéton » pas à pas. Activité 3 : 12 → 11 min.
  - `COURS_TermSIN_Reseau_Routeur` (D2 + D3, sur papier) : méthodes « réseau d'une adresse /24 », « passerelle d'une machine » (exemple résolu), « prévoir un ping en trois questions », et « lire le message du simulateur » (messages exacts de `reseau_routeur.html`).

## 19 novembre 2026 : diapos projetables sur n'importe quel ordinateur

- Le HTML de projection des diapos (`slides/<nom>.html`, avec le minuteur T et le plein écran F) est maintenant **autonome** : styles recopiés dans la page, images et polices des formules intégrées, plus aucun lien vers le poste qui l'a généré (`scripts/lib/autonome.mjs`). Il s'ouvre depuis une clé USB ou l'ENT, sur le PC de la salle. Taille : 50 Ko environ, 450 Ko avec des formules. Testé hors du projet. Le PDF `SLIDES_<nom>.pdf` reste la solution de secours.

## 19 novembre 2026 : versions élèves sans les infos du professeur

- **Décision de l'enseignant** : le barème, les points et les durées sont pour le professeur. La chaîne les retire désormais de **toutes** les versions élèves (`sansInfosProf` dans `scripts/lib/render.mjs` ; durée des activités de séance masquée par `style.css`). La case « / 20 » reste. Le champ `points_masques` devient inutile. Règle ajoutée à la charte ; tout a été régénéré.
- `TP_TermSIN_I2C_Wokwi`, question 4 : la figure de la trame I2C donnait déjà la réponse. La question demande maintenant de construire le premier octet d'une **lecture** à l'adresse `0x49` (`0x93`).
- **Portable** : Edge ne se lance plus en mode sans fenêtre (Edge en cours de mise à jour). **Google Chrome installé le 19 novembre** : la chaîne l'utilise en priorité.

## Vendredi 20 novembre 2026 : retour en présentiel, plan de rattrapage (préparé le 18 novembre)

- **Décisions de l'enseignant** : coller au programme et rattraper le retard ; **tous les TP et toutes les activités sont notés**. Les progressions sont resserrées (journal du 18 novembre dans chaque progression).
- **Chaîne** : une séance de cours peut maintenant être notée : `bareme: 20` dans le front matter, des points sur toutes les questions, barème dans un bloc `::: prof Barème` (il s'imprime dans le déroulé et à la fin de la fiche d'activités prof). Modifications dans `scripts/lib/document.mjs` (`estNote`) et `scripts/lib/seance.mjs` ; règle ajoutée à la charte.
- **2nde** : le Web se termine le 27 novembre, les réseaux sociaux commencent le 4 décembre.
  - 20/11, 8 h, 1er demi-groupe : `TP_SNT_Web_Coulisses` (outils de développement : code source, HTML / CSS modifiés en direct, requêtes HTTP, URL et certificat, cookies), noté /20. **Vérifier que F12 n'est pas bloqué sur les postes du labo.** Le 2e groupe le fait le 27/11 à 8 h, avant l'interro.
  - 20/11, 9 h, classe entière : `COURS_SNT_Web_Synthese` (tout le thème WEB.1 à WEB.9, cookies et licences compris), fiche notée /20 ; distribuer `REVISION_SNT_Web` (`output/Eval/2nde/`).
    - Le 19 novembre, à la demande de l'enseignant : plus aucune question à l'écran. Chaque partie commence par des diapos de présentation avec un schéma en couleurs (frise des dates, licences CC, anatomie d'une balise HTML, règle CSS, URL, dialogue HTTP, client / serveur, moteur, cookies, navigation privée : `sources/cours/img/web/`), et un bloc `::: dire` « À dire / Peut ajouter » par diapo dans le déroulé. Pendant chaque activité, la diapo affiche seulement un résumé utile (nouveau bloc `::: tableau Titre | fiche` de la chaîne, recopié sur la fiche élève avec `fiche`). Activités 3 et 4 raccourcies d'1 min pour la présentation. Fiche élève aussi en Word éditable (`ELEVE_COURS_SNT_Web_Synthese.docx`, nouveau champ `fiche_docx: true`, module `genererFicheDocx` de `scripts/lib/docx.mjs`). Activité 3 : seconde diapo au tableau, code HTML à gauche et rendu dans le navigateur à droite (`img/web/rendu-judo.svg`) ; une activité peut maintenant avoir plusieurs blocs `tableau`, une diapo chacun, avec un minuteur partagé.
  - 27/11, 9 h : `EVAL_SNT_Web`, sujets A / B, 30 min (45 min pour les PAI), dans `output/Eval/2nde/`.
- **Terminales** :
  - D1, 20/11, 12 h : `COURS_TermSIN_Lampadaire_Programme` (jour / nuit puis piéton, if / elif / else sur Wokwi), fiche notée /20, seul ou à deux selon les présents. Fichiers Wokwi : ceux de la fiche D3 du 10/11 (`T2_Distanciel_Lampadaire-programme-jour-nuit/`). T2 se termine le 4/12 pour D1 et D3, puis T3.
  - Heure commune D2 + D3, 20/11 : `COURS_TermSIN_Reseau_Routeur` (simulateur `reseau_routeur.html`), fiche notée /20. Le 20 novembre, à la demande de l'enseignant : **pas de PC pour les élèves**, tout sur la fiche papier. Le professeur manipule le simulateur projeté ; avant chaque ping, les élèves écrivent leur prévision, puis le résultat. Poste de l'accueil fixé à `10.0.0.25` ; cases « validé à l'écran » remplacées par le tableau des passerelles (Q7) et le résultat attendu après correction (Q8). Barème inchangé. C1 se termine le 4/12 (TP noté de configuration d'un réseau **à préparer**), C2 commence le 11/12.
  - D2, 20/11, 3 h : `TP_TermSIN_I2C_Wokwi` (T3 : typologie, trame UART à décoder, trame I2C, MPU6050 sur Wokwi : scan, WHO_AM_I, complément à 2, alarme à hystérésis), noté /20. Il remplace le TP TMP102, qui supposait du matériel. **Circuit et corrigé pas lancés dans Wokwi : à tester une fois** (broches du MPU6050, réglage de la température, valeurs négatives).
- À préparer ensuite : séances du 27/11 pour les Terminales, TP noté C1 du 4/12, début des réseaux sociaux (2nde) le 4/12.

## Vendredi 13 novembre 2026 : tout est noté, à distance (préparé le 12 novembre)

- **Décision de l'enseignant** : toujours en distanciel, il faut des notes. Les 5 créneaux du vendredi sont notés /20, avec un barème dans chaque version prof. Les fiches non notées prévues pour ce jour (cookies, lampadaire programme pour D1, routeur et passerelle) sont **reportées**.
- **Principe contre la copie** : les valeurs dépendent du **jour de naissance J** de l'élève (à vérifier dans Pronote), et la version prof contient un tableau des réponses attendues pour J = 1 à 31. Les parties personnelles (recherche choisie, amélioration du programme) sont notées sur grille.
  - 2nde, TP du 2e demi-groupe (8 h) : `AUTO_SNT_Web_MoteursRecherche_Note`, avec des exemples différents de la fiche du 6 novembre (nouvelle figure `img/web/liens-pages-note.svg`) et sans réponses en fin de fiche ; 11 points sur l'enquête personnelle.
  - 2nde, classe entière (9 h) : `AUTO_SNT_Internet_Distance`, dans `output/Eval/2nde/`. Le 12 novembre, à la demande de l'enseignant : points et barème masqués dans la version élève (nouveau champ `points_masques: true`), étape 5 et question 7 retirées (le point passe à la justification de la question 4 c), lignes pour écrire sur le sujet imprimé, IA interdite, une heure au plus, copies à rendre dans l'application **Casier** de l'ENT (document réponse, sujet imprimé en photo, ou copie en photo).
  - D1 (12 h) et heure commune D2 + D3 (13 h) : `AUTO_TermSIN_CAN_CNA_Distance`, dans `output/Eval/Terminale/`. Les sujets A et B sur table restent pour le retour. Le 12 novembre, comme pour les 2nde : points et barème masqués pour les élèves, étape 4 et question 7 retirées (le point passe à la question 4), lignes pour écrire, IA interdite, une heure au plus, rendu dans le **Casier** ; questions 2 à 6 reformulées. Tableaux de correction A et B recalculés pour J = 1 à 31 : justes.
  - D2, 3 h : `AUTO_TermSIN_Lampadaire_Pieton` (suite notée du TP du 6 novembre : état PRÉSENCE, temporisation non bloquante, protocole de test, amélioration personnelle, bilan énergétique), avec `lampadaire_pieton.py`. **Pas relancé dans Wokwi** : à tester une fois. Pronote : rattacher `diagram_lampadaire.json`, déjà déposé le 6 novembre. Le 12 novembre : notation pas décidée, donc la version élève ne parle plus de note (ni titre « TP noté », ni points, ni barème, ni case « / 20 », nouveau champ `note_masquee: true`) ; la grille reste dans la version prof. Dossier de sortie renommé `T2_Distanciel_Lampadaire-pieton/`.
- Portable : Node.js LTS installé le 12 novembre (`C:\Program Files\nodejs`, à ajouter au PATH d'un terminal déjà ouvert) ; Chrome absent, la chaîne utilise Edge, ce qui marche.
- À faire après le 13 : relever les taux de rendu ; décider si la note du TP de 2nde compte comme celle du TP « première page web » du 1er groupe (9 octobre).

## Semaine du 9 novembre 2026 : distanciel jusqu'à nouvel ordre

- **Constat** : très peu de travail rendu les 3 et 6 novembre. Les fiches de cette semaine sont donc **très guidées** : chaque notion suit le même plan (méthode, exemple résolu, exercice aux mêmes étapes) et les réponses sont en fin de fiche pour que l'élève se corrige.
- **Décision du 9 novembre** : on ne prend plus de temps de cours sur le CAN et le CNA ; il faut avancer. `AUTO_TermSIN_CAN_CNA_Guide` (avec `entrainement_can_cna.html`, testé dans Chrome) reste une révision **facultative** sur l'ENT.
- **Mardi 10 novembre, D3** : `AUTO_TermSIN_Lampadaire_Programme` (T2, premier programme du lampadaire sur Wokwi, très guidé : if / elif / else). **Solution pas relancée dans Wokwi** (simulateur trop lent le 9 novembre) : la tester une fois.
- **Vendredi 13 novembre, présentiel ou distanciel (pas encore connu)** :
  - en présentiel : les évaluations prévues (Internet pour les 2nde, CAN et CNA pour D1 et pour l'heure commune D2 + D3) ; pour le TP de 2nde et le bloc de 3 h des D2, les mêmes fiches qu'à distance, faites en classe ;
  - à distance : 2nde TP (2e demi-groupe) `AUTO_SNT_Web_MoteursRecherche` ; 2nde classe entière `AUTO_SNT_Web_Cookies` (WEB.9, cookies et confidentialité ; `AUTO_SNT_Internet_Guide` reste en révision facultative) ; D1 `AUTO_TermSIN_Lampadaire_Programme` ; heure commune `AUTO_TermSIN_Reseau_Routeur` avec le nouveau simulateur `reseau_routeur.html` (routeur et passerelle, testé dans Chrome) ; D2 3 h : suite de `AUTO_TermSIN_Lampadaire_Wokwi`. Les évaluations sont alors reportées au retour.
- **Pronote** : un fichier déjà déposé (même nom) ne peut pas être renvoyé. Pour une fiche réutilisée (moteurs de recherche, lampadaire Wokwi), rattacher le document déjà présent dans Pronote.
- En attente : confirmer l'alternance des demi-groupes de TP en 2nde (supposée : une semaine sur deux, le 2e groupe le 13 novembre).

## État au 2 novembre 2026 (rentrée de la Toussaint)

### Semaine du 2 novembre : retour en présentiel
- **Constat** : environ 3 élèves sur 4 n'ont rien rendu du travail à distance. Les tensions continuent et beaucoup d'élèves sont absents, mais il faut faire cours en présentiel au maximum. Chaque fiche d'activités est donc autosuffisante, pour être déposée sur l'ENT à l'intention des absents.
- **PC fixe reformaté** et réinstallé le 2 novembre : Node 24, Git, Chrome, `npm install`. Sur ce poste, `npm` marche directement (politique d'exécution RemoteSigned). Reste à faire une fois : `git push` pour se connecter à GitHub.
- **2nde** :
  - `COURS_SNT_Web_Reprise` (classe entière) : révision express d'Internet, reprise de la découverte du Web (Internet ≠ Web, repères, URL), puis client / serveur et requête HTTP, avec un jeu de rôle « le clic au ralenti » ;
  - `TP_SNT_Web_PagePerso` : le TP « page web » refait au lycée en demi-groupe, noté sur grille (note de travail) ; ceux qui l'avaient rendu passent à « Pour aller plus loin ».
- **D1 (vendredi 12 h) et D3 (mardi)** : `COURS_TermSIN_Lampadaire_Etats`, une même séance pour les deux classes. Elle ouvre T2 (lampadaire autonome) par une reprise du CAN (seuil jour / nuit), puis le diagramme d'états.
- **Heure commune D2 + D3** : `COURS_TermSIN_Reseau_Parking`, qui ouvre C1 : switch / routeur, adresses MAC et IP, masque /24, puis Filius et ping (**vérifier que Filius est installé au labo**).
- **D2, bloc de 3 h** : `TP_TermSIN_Lampadaire_Wokwi` (MicroPython, capteur de lumière + PIR, hystérésis, machine à états, temporisation non bloquante). Non noté. **À tester une fois sur Wokwi** : les codes N du corrigé sont calculés d'après la documentation du module, pas mesurés.
- **Évaluations de la semaine du 9 novembre** : interro Internet (2nde, sujets A/B, vendredi 13 novembre) ; interro CAN le **vendredi 13 novembre** (sujet A pour D1 à 12 h, sujet B pour l'heure commune D2 + D3 à 13 h). Le **TD noté CO₂ des D3 est abandonné** comme note.
- **Mise en forme revue le 2 novembre** (à la demande de l'enseignant, qui trouvait que les documents « faisaient IA ») : style sobre de fiche classique pour tous les documents (Calibri, texte noir, cadres fins, sans fonds pastel, barres colorées, badges ni émojis), diapos sur fond blanc. Une question ne se sépare plus de sa zone de réponse ou de son corrigé en bas de page, et l'en-tête d'une activité reste avec sa première question. Sur les diapos, les questions non projetées sont rappelées sous la consigne de l'activité.
- Pour vérifier la mise en page, ne pas se fier aux contrôles de la chaîne seuls : regarder les PDF page par page. Dans un SVG, écrire `&lt;` et `&gt;` dans les textes (un `<` brut rend l'image invisible), et ne pas mettre de formule LaTeX dans un trou `[[…]]` (elle n'est pas mise en forme).
- **Vendredi 6 novembre : encore en distanciel (blocus)**, annoncé la veille. Documents utilisés : 2nde TP `AUTO_SNT_Web_MoteursRecherche` (les deux groupes ont déjà fait « Ma première page web » avant les vacances) ; 2nde classe entière `AUTO_SNT_Web_ClicPage` ; D1 `AUTO_TermSIN_Lampadaire_Etats` ; heure commune `AUTO_TermSIN_Reseau_Parking` (simulateur `reseau_parking.html`, Filius n'étant pas installable à distance) ; D2 `AUTO_TermSIN_Lampadaire_Wokwi`, testé sur Wokwi le 5 novembre. Les versions en classe (`COURS_…`, `TP_…`) restent disponibles pour le retour. **Si le blocus continue, les évaluations du vendredi 13 ne pourront pas se faire sur table : à décider.**
- **Évaluations (préparées le 5 novembre)**, dans `output/Eval/2nde/` et `output/Eval/Terminale/` : sujets A/B élève et prof, plus une fiche de révision recto-verso à distribuer le vendredi 6 novembre. Internet : 30 min. CAN / CNA : 40 min, avec une question sur le CNA ajoutée à la demande de l'enseignant (le CNA n'est pas dans le programme enregistré ni dans les documents du projet : à neutraliser si une classe ne l'a pas vu). **Terminales : vendredi 13 novembre, confirmé par l'enseignant.** **2nde : vendredi 13 novembre également, confirmé par l'enseignant.**
- Les zones de réponse sont maintenant de vraies lignes (plus de dégradé CSS), et chaque question est enveloppée avec sa réponse dans un bloc insécable.
- Progressions : T1 et C0 closes au 16 octobre ; T2 en cours depuis le 3 novembre (D3) ou le 6 novembre (D1, D2) ; C1 en cours depuis le 6 novembre.

## État au 14 octobre 2026

### Fait
- Chaîne de production (Node + CSS + KaTeX → PDF via Chrome) : TP, TD, évaluations à sujets A/B, cours en séance rythmée (diapos + déroulé + fiche élève), progressions annuelles.
- Progressions 2026-2027 : 2nde Rapinoe, TSTI2D1, TSTI2D2, TSTI2D3 (`sources/progression/`), calées sur le calendrier zone B et les programmes officiels (`referentiels/bo/`).
- **Sorties rangées par séquence** : `output/<classe>/<séquence>/` (ex. `2nde_SNT/S2_Le_Web/`), d'après le champ `sequence:` du front matter.
- **Un dossier par document** dans `eleve/`, `prof/` et `slides/` : `<séquence>_<Type>_<nom court>` (champ `court:`), par exemple `T1_Distanciel_Voyant-Aerez-CO2/`, avec tout ce qu'il faut déposer sur l'ENT.
- **Fichier Pronote** : `prof/<dossier>/PRONOTE_<nom>.txt` (titre + description courte de séance), tiré du champ `pronote:`. Il est rempli pour les 10 documents existants. Sans ce champ, le texte est construit automatiquement et un avertissement s'affiche.
- **Nouveau type `autonomie`** (distanciel, commande `/autonomie`) : plan de travail à cocher, dépôt ENT, aide ; fichiers joints (`fichiers:`).
- **2nde, Web en distanciel (vendredi 9 octobre)** : `AUTO_SNT_Web_Decouverte` (classe entière, non noté, rendu obligatoire) et `AUTO_SNT_Web_PremierePage` (TP noté /20, demi-groupe, avec `editeur_web.html`, éditeur HTML/CSS sans compte). L'autre demi-groupe fera le TP à sa prochaine séance de TP.
- **Terminales en distanciel (vendredi 9 octobre)** : `AUTO_TermSIN_CAN_PasAPas` (remédiation CAN, non notée, pour D1 et pour l'heure commune D2 + D3, avec `simulateur_can.html`) ; `AUTO_TermSIN_TMP36_Tinkercad` (TP noté /20 pour D2, individuel, captures d'écran, `station_temperature.ino`). Le TP TMP36 a quitté `sources/tp/` pour `sources/autonomie/`.
- **Wokwi testé le 12/10** : en Arduino (C++), la compilation gratuite fait la queue plus de 70 s à chaque lancement, c'est trop long. **En MicroPython sur ESP32** (`wokwi.com/projects/new/micropython-esp32`), la simulation démarre en 5 s environ, sans compte : c'est le choix par défaut pour le distanciel. On colle `diagram.json` et `main.py` dans les onglets. Sans compte, le travail n'est pas enregistré.
- **Vendredi 16 octobre (distanciel, dernier jour avant la Toussaint, tout non noté, rendu obligatoire)** :
  - 2nde : l'heure en classe entière est annulée ; le 2e groupe de TP fait `AUTO_SNT_Web_PremierePage` ;
  - TSTI2D1 (12 h) : `AUTO_TermSIN_CO2_Wokwi`, le même TP que les D3 le 13/10 ;
  - heure commune D2 + D3 (13 h) : `AUTO_TermSIN_CAN_Entrainement`, avec `entrainement_can.html`, un outil autocorrigé dont les valeurs sont tirées au hasard ;
  - TSTI2D2 (3 h) : `AUTO_TermSIN_Cuve_Lissage` (moyenne glissante, compromis stabilité / temps de réaction, hystérésis), testé sur Wokwi.
- `PRONOTE_<nom>.txt` contient aussi, pour les travaux en autonomie, un « Travail à faire » prêt à coller, tiré de la fiche.
- **Attention sur le portable** : PowerShell 5.1 lit les fichiers en ANSI. Pour modifier une source, passer par Node ou par l'outil d'édition, jamais par `Get-Content` / `Set-Content`.
- Les documents réponse .docx convertissent les formules LaTeX en texte et les tableaux Markdown en vrais tableaux Word.
- Évaluations avant la Toussaint :
  - 2nde : interro Internet (sujets A/B), **à la première heure en présentiel** (reportée à cause du blocus) ;
  - D3 : TP « Voyant Aérez ! » sur Wokwi, mardi 13 octobre (`AUTO_TermSIN_CO2_Wokwi`, **non noté**, rendu obligatoire, étape de calcul très guidée) ; le **TD noté CO₂ est reporté au retour en présentiel** ;
  - D1 : interro CAN, sujet A, **au retour en présentiel** (prévue le vendredi 16 octobre) ;
  - D2 + D3 : interro CAN, sujet B, heure commune, **au retour en présentiel** ;
  - D2 : TP noté Tinkercad TMP36, vendredi après-midi.

### Décisions
- **Cours jamais descendants** : séances rythmées, au moins 40 % du temps en activités (vérifié par la chaîne).
- **Terminales** : mêmes séquences T pour D1, D2 et D3 sur les mêmes semaines, profondeur variable selon l'horaire (D1 1 h, D3 2 h, D2 4 h). L'heure commune D2 + D3 a son propre fil (réseaux, client/serveur, IoT). Projet de D2 : 2 h par semaine de janvier à mai.
- **Matériel** : tout en simulation pour l'instant (Wokwi, Tinkercad, Filius, Packet Tracer). **Capytale indisponible** (académie de Lille, Nord) : outils sans compte uniquement.
- **Distanciel = tout sur PC** : pas d'impression. Document réponse .docx généré, ou photos du cahier au choix de l'élève, avec des conditions de rendu écrites dans la fiche. Une étape par page.
- **Distanciel** : on ne note à distance que des productions personnelles (grille, coefficient réduit) ; les connaissances s'évaluent sur table au retour.
- **Évaluation** : échelle à 4 niveaux (Non acquis / En cours / Acquis / Maîtrisé). Les sigles TI/TS/WA/NA ont été abandonnés.
- **Convention CAN** : q = PE / 2ⁿ (les deux conventions acceptées à la correction).

### En attente (à demander ou à confirmer)
- Bilan de la semaine du 2 novembre : comment se sont passées les séances, qui était absent, et faut-il décaler les interros du 9 au 13 novembre ?
- 2nde : quel demi-groupe a TP le vendredi 6 novembre.
- Les D1 : que faire du TP « Voyant Aérez ! » donné à distance (le reprendre en classe ou l'abandonner) ?
- Tinkercad : vérifier que les circuits des D2 sont visibles depuis l'espace classe (sinon, demander le lien de partage). D1 et D3 n'ont pas d'accès Tinkercad : en créer un si on veut leur faire faire des TP en simulation (Wokwi est une alternative sans compte).
- QCM Pronote : l'enseignant ne le maîtrise pas encore. Proposer un guide pas à pas, ou des QCM prêts à saisir.
- Dates des séances perdues pendant le blocus de début octobre, à saisir en `annulations:` dans les progressions.
- Jours des créneaux de la 2nde Rapinoe (classe entière et TP) et date de fin des cours (supposée : 4 juin).
- Avec l'équipe : partage du programme SIN (qui traite les réseaux pour D1 ?), dates des revues de projet et du bac blanc.
- À vérifier : pont de l'Ascension du 7 mai 2027 ; codes N du TP TMP36 dans Tinkercad (±1).
- Le TP I2C (TMP102) suppose du matériel réel : à adapter en simulation. Sa question 12 utilise Shannon, qui dépasse le programme.
- Référentiel de 1ère STI2D pas encore vérifié sur le BO.
