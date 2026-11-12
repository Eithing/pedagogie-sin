# Suivi du projet — à lire en début de session

Ce fichier remplace la mémoire de conversation entre les postes (PC fixe, portable du lycée). Claude le lit au démarrage (voir `CLAUDE.md`) et le met à jour en fin de session : décisions prises, travail fait, questions en attente.

## Vendredi 13 novembre 2026 : tout est noté, à distance (préparé le 12 novembre)

- **Décision de l'enseignant** : toujours en distanciel, il faut des notes. Les 5 créneaux du vendredi sont notés /20, avec un barème dans chaque version prof. Les fiches non notées prévues pour ce jour (cookies, lampadaire programme pour D1, routeur et passerelle) sont **reportées**.
- **Principe contre la copie** : les valeurs dépendent du **jour de naissance J** de l'élève (à vérifier dans Pronote), et la version prof contient un tableau des réponses attendues pour J = 1 à 31. Les parties personnelles (recherche choisie, amélioration du programme) sont notées sur grille.
  - 2nde, TP du 2e demi-groupe (8 h) : `AUTO_SNT_Web_MoteursRecherche_Note`, avec des exemples différents de la fiche du 6 novembre (nouvelle figure `img/web/liens-pages-note.svg`) et sans réponses en fin de fiche ; 11 points sur l'enquête personnelle.
  - 2nde, classe entière (9 h) : `AUTO_SNT_Internet_Distance`, dans `output/Eval/2nde/`.
  - D1 (12 h) et heure commune D2 + D3 (13 h) : `AUTO_TermSIN_CAN_CNA_Distance`, dans `output/Eval/Terminale/`. Les sujets A et B sur table restent pour le retour.
  - D2, 3 h : `AUTO_TermSIN_Lampadaire_Pieton` (suite notée du TP du 6 novembre : état PRÉSENCE, temporisation non bloquante, protocole de test, amélioration personnelle, bilan énergétique), avec `lampadaire_pieton.py`. **Pas relancé dans Wokwi** : à tester une fois. Pronote : rattacher `diagram_lampadaire.json`, déjà déposé le 6 novembre.
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
