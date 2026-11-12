---
type: progression
titre: Enseignement spécifique SIN
classe: TSTI2D1
niveau: Term STI2D — 2I2D, enseignement spécifique SIN
annee: 2026-2027
calendrier: referentiels/calendrier_2026-2027.yaml
programme: referentiels/bo/2i2d_sin_terminale.yaml
catalogue: sources/progression/_catalogue_TermSIN.yaml
fin_cours: 2027-06-11
horaire: "1 h / semaine avec moi (vendredi midi) — partie SIN de la spécialité 2I2D, en équipe"
profondeur: socle
pistes:
  - id: classe
    nom: Cours SIN — D1
    resume: vendredi midi, 1 h
    creneaux:
      - { jour: vendredi, heures: 1, libelle: "Vendredi midi, 1 h" }
sequences:
  - { ref: T0, semaines: 4, etat: fait }
  - ref: T1
    semaines: 7
    etat: fait
    fin: 2026-10-16
    ressources: [AUTO_TermSIN_CAN_CNA_Guide]
    evaluation: "Interrogation sur le CAN et le CNA (sujet A, 40 min), vendredi 13 novembre (reportée à cause du blocus)."
  - ref: T2
    semaines: 7
    etat: en-cours
    debut: 2026-11-06
    ressources: [COURS_TermSIN_Lampadaire_Etats, AUTO_TermSIN_Lampadaire_Etats, AUTO_TermSIN_Lampadaire_Programme]
  - { ref: T3, semaines: 6 }
  - { ref: T4, semaines: 5 }
  - { ref: T5, semaines: fin }
hors_perimetre:
  - items: [2.4.4b, 2.4.4c, 3.4.3c, 3.4.3d, 5.3.4a, 5.3.4c, 5.3.3b, 5.3.3c, 5.3.2b, 2.4.3d, 6.1b]
    raison: "Réseaux, client/serveur et objets connectés : traités en heure commune pour D2 et D3 ; pour D1, à confirmer avec l'équipe (collègue ou séquence ajoutée au 2e semestre)."
  - items: [6.1a, 6.2a, 6.2b, 6.3a, 6.3b]
    raison: "Mis en œuvre dans le projet de 72 h, encadré par l'équipe (organisation à confirmer)."
journal:
  - date: 2026-10-07
    texte: "Blocus du lycée : plusieurs séances perdues début octobre dans toutes les classes (dates exactes à préciser), aucune note posée. Évaluations programmées avant les vacances de la Toussaint."
  - date: 2026-10-07
    texte: "Mise en forme de la progression. Mini-séquence SysML (T0) faite, non notée. CAN (T1) : cours complet fait."
  - date: 2026-10-09
    texte: "Blocus : cours en distanciel. Remédiation CAN en autonomie (« Le CAN pas à pas », simulateur de CAN sans compte), non notée. Le cours était allé trop vite pour la majorité. L'interrogation CAN (sujet A) est reportée au retour en présentiel."
  - date: 2026-10-16
    texte: "Blocus, distanciel : TP « Voyant Aérez ! » sur Wokwi (ESP32 en MicroPython), application de la remédiation CAN. Non noté, rendu obligatoire."
  - date: 2026-11-02
    texte: "Retour en présentiel après la Toussaint. Environ trois élèves sur quatre n'ont rien rendu à distance. T1 est close (cours fait avant le blocus, remédiation à distance) ; l'interrogation CAN (sujet A) est fixée au vendredi 13 novembre. T2 démarre le 6 novembre par la séance « lampadaire autonome », qui commence par une reprise du CAN."
  - date: 2026-11-06
    texte: "Blocus, distanciel : fiche « Le lampadaire autonome » en autonomie (reprise du CAN, diagramme d'états), non notée, rendu obligatoire. Fiche de révision déposée pour l'évaluation du vendredi 13 novembre."
  - date: 2026-11-09
    texte: "Blocus : distanciel jusqu'à nouvel ordre, et peu de travail rendu le 6 novembre. Vendredi 13 novembre : en présentiel, interrogation CAN et CNA (sujet A) ; à distance, suite de T2 avec « Du diagramme d'états au programme : le jour et la nuit » sur Wokwi, et l'interrogation est reportée au retour. On ne reprend plus de temps sur le CAN et le CNA : une révision guidée facultative reste sur l'ENT."
  - date: 2026-11-13
    texte: "Toujours en distanciel, et besoin de notes. Vendredi 13 novembre, 12 h : interrogation CAN et CNA à distance, notée (`AUTO_TermSIN_CAN_CNA_Distance`, valeurs propres à chaque élève tirées du jour de naissance), à la place du sujet A sur table. Le premier programme du lampadaire est reporté."
---

## Organisation

- **Mêmes séquences pour les trois Terminales**, dans le même ordre et sur les mêmes semaines. La profondeur varie avec le volume horaire : D1 et D3 suivent l'essentiel (cours, TD, simulations courtes), D2 ajoute des TP longs et des mini-projets.
- **D1 n'a qu'une heure par semaine avec moi** : chaque séance est un temps court et rythmé (rappel, activité, trace écrite). Les TP longs sont remplacés par des simulations guidées.
- **Partage du programme SIN avec l'équipe : proposition à confirmer.** Je prends la chaîne d'information (acquisition, traitement, communication, régulation) ; réseaux et objets connectés sont traités en heure commune D2 + D3.
- **Démarche** : séquences problématisées sur les thèmes de la ressource Éduscol, progression spiralaire, simulation systématique (Wokwi, Filius, Packet Tracer).
