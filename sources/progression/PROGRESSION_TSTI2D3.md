---
type: progression
titre: Enseignement spécifique SIN
classe: TSTI2D3
niveau: Term STI2D — 2I2D, enseignement spécifique SIN
annee: 2026-2027
calendrier: referentiels/calendrier_2026-2027.yaml
programme: referentiels/bo/2i2d_sin_terminale.yaml
catalogue: sources/progression/_catalogue_TermSIN.yaml
fin_cours: 2027-06-11
horaire: "2 h / semaine avec moi : mardi matin 1 h + vendredi midi 1 h (heure commune avec TSTI2D2)"
profondeur: socle
pistes:
  - id: classe
    nom: Cours SIN — D3
    resume: mardi matin, 1 h
    creneaux:
      - { jour: mardi, heures: 1, libelle: "Mardi matin, 1 h" }
  - id: commun
    partagee: true
sequences:
  - { ref: T0, semaines: 4, etat: fait }
  - ref: T1
    semaines: 7
    etat: fait
    fin: 2026-10-16
    evaluation: "Interrogation sur le CAN et le CNA (sujet B, 40 min, heure commune du vendredi 13 novembre, reportée à cause du blocus). Le TD « CO₂ d'une salle de classe » n'est plus noté : il reste un exercice d'entraînement."
    ressources: [TD_TermSIN_CAN_QualiteAir, EVAL_TermSIN_CAN]
  - ref: T2
    semaines: 7
    etat: en-cours
    debut: 2026-11-03
    ressources: [COURS_TermSIN_Lampadaire_Etats]
  - { ref: T3, semaines: 6 }
  - { ref: T4, semaines: 5 }
  - { ref: T5, semaines: fin }
hors_perimetre:
  - items: [6.1a, 6.2a, 6.2b, 6.3a, 6.3b]
    raison: "Mis en œuvre dans le projet de 72 h, encadré par l'équipe (organisation à confirmer)."
journal:
  - date: 2026-10-07
    texte: "Blocus du lycée : plusieurs séances perdues début octobre dans toutes les classes (dates exactes à préciser), aucune note posée. Évaluations programmées avant les vacances de la Toussaint."
  - date: 2026-10-07
    texte: "Mise en forme de la progression. Mini-séquence SysML (T0) faite, non notée. CAN (T1) : cours complet fait. Heure commune avec D2 : révisions et CAN jusqu'à la Toussaint, puis séquence réseaux (C1)."
  - date: 2026-10-09
    texte: "Blocus : cours en distanciel. Heure commune avec D2 : remédiation CAN en autonomie (« Le CAN pas à pas »), non notée. L'interrogation CAN (sujet B) est reportée au retour en présentiel ; le TD noté sur le CO₂ reste prévu le mardi."
  - date: 2026-10-13
    texte: "Blocus, distanciel : TP « Voyant Aérez ! » sur Wokwi (ESP32 en MicroPython, sans compte), application guidée de la remédiation CAN ; non noté, rendu obligatoire. Le TD noté sur le CO₂ est reporté au retour en présentiel."
  - date: 2026-10-16
    texte: "Blocus, distanciel. Heure commune avec D2 : entraînement autocorrigé sur le CAN (valeurs propres à chaque élève). Non noté, rendu obligatoire."
  - date: 2026-11-02
    texte: "Retour en présentiel après la Toussaint. Environ trois élèves sur quatre n'ont rien rendu à distance. T1 est close ; le TD noté sur le CO₂ est abandonné comme note (une seule note de connaissances : l'interrogation CAN, sujet B, à l'heure commune du vendredi 13 novembre). T2 démarre le mardi 3 novembre par la séance « lampadaire autonome », qui commence par une reprise du CAN. Heure commune : C0 terminée, C1 (réseau local) démarre le 6 novembre."
  - date: 2026-11-06
    texte: "Blocus, distanciel. Heure commune avec D2 : fiche « Le parking connecté » avec un simulateur sans installation à la place de Filius. Non notée, rendu obligatoire. Fiche de révision déposée pour l'évaluation du vendredi 13 novembre."
---

## Organisation

- **Deux pistes indépendantes.**
  - Le **mardi** suit les séquences T, communes aux trois Terminales et sur les mêmes semaines.
  - L'**heure commune du vendredi** (avec D2, 26 élèves en labo, 1 poste pour 2) suit un fil propre : réseaux, client/serveur, objets connectés. Ce fil ne dépend pas de l'avancement de chaque classe, donc le décalage entre D2 et D3 ne gêne plus.
- **Profondeur** : l'essentiel (cours, TD, simulations courtes) ; D2 approfondit les mêmes séquences en TP longs.
- **Partage du programme SIN avec l'équipe : proposition à confirmer.**
- **Démarche** : séquences problématisées sur les thèmes de la ressource Éduscol, progression spiralaire, simulation systématique (Wokwi, Filius, Packet Tracer).
