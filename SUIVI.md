# Suivi du projet — à lire en début de session

Ce fichier remplace la mémoire de conversation entre les postes (PC fixe, portable du lycée). Claude le lit au démarrage (voir `CLAUDE.md`) et le met à jour en fin de session : décisions prises, travail fait, questions en attente.

## État au 8 octobre 2026 (soir)

### Fait
- Chaîne de production (Node + CSS + KaTeX → PDF via Chrome) : TP, TD, évaluations à sujets A/B, cours en séance rythmée (diapos + déroulé + fiche élève), progressions annuelles.
- Progressions 2026-2027 : 2nde Rapinoe, TSTI2D1, TSTI2D2, TSTI2D3 (`sources/progression/`), calées sur le calendrier zone B et les programmes officiels (`referentiels/bo/`).
- **Sorties rangées par séquence** : `output/<classe>/<séquence>/` (ex. `2nde_SNT/S2_Le_Web/`), d'après le champ `sequence:` du front matter.
- **Nouveau type `autonomie`** (distanciel, commande `/autonomie`) : plan de travail à cocher, dépôt ENT, aide ; fichiers joints (`fichiers:`).
- **2nde, Web en distanciel (vendredi 9 octobre)** : `AUTO_SNT_Web_Decouverte` (classe entière, non noté, rendu obligatoire) et `AUTO_SNT_Web_PremierePage` (TP noté /20, demi-groupe, avec `editeur_web.html`, éditeur HTML/CSS sans compte). L'autre demi-groupe fera le TP à sa prochaine séance de TP.
- **Terminales en distanciel (vendredi 9 octobre)** : `AUTO_TermSIN_CAN_PasAPas` (remédiation CAN, non notée, pour D1 et pour l'heure commune D2 + D3, avec `simulateur_can.html`) ; `AUTO_TermSIN_TMP36_Tinkercad` (TP noté /20 pour D2, individuel, captures d'écran, `station_temperature.ino`). Le TP TMP36 a quitté `sources/tp/` pour `sources/autonomie/`.
- Les documents réponse .docx convertissent les formules LaTeX en texte et les tableaux Markdown en vrais tableaux Word.
- Évaluations avant la Toussaint :
  - 2nde : interro Internet (sujets A/B), **à la première heure en présentiel** (reportée à cause du blocus) ;
  - D3 : TD noté CO₂, mardi 13 octobre ;
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
- Retour sur les séances du 9/10 en distanciel : taux de rendu, difficultés avec l'éditeur (téléphone ?), date du retour en présentiel (pour l'interro Internet).
- Tinkercad : vérifier que les circuits des D2 sont visibles depuis l'espace classe (sinon, demander le lien de partage). D1 et D3 n'ont pas d'accès Tinkercad : en créer un si on veut leur faire faire des TP en simulation (Wokwi est une alternative sans compte).
- QCM Pronote : l'enseignant ne le maîtrise pas encore. Proposer un guide pas à pas, ou des QCM prêts à saisir.
- Dates des séances perdues pendant le blocus de début octobre, à saisir en `annulations:` dans les progressions.
- Jours des créneaux de la 2nde Rapinoe (classe entière et TP) et date de fin des cours (supposée : 4 juin).
- Avec l'équipe : partage du programme SIN (qui traite les réseaux pour D1 ?), dates des revues de projet et du bac blanc.
- À vérifier : pont de l'Ascension du 7 mai 2027 ; codes N du TP TMP36 dans Tinkercad (±1).
- Le TP I2C (TMP102) suppose du matériel réel : à adapter en simulation. Sa question 12 utilise Shannon, qui dépasse le programme.
- Référentiel de 1ère STI2D pas encore vérifié sur le BO.
