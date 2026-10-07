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
    etat: en-cours
    evaluation: "TD noté « CO₂ d'une salle de classe » (mardi 13 octobre) + interrogation sur le CAN (sujet B, heure commune du vendredi 16 octobre)."
    ressources: [TD_TermSIN_CAN_QualiteAir, EVAL_TermSIN_CAN]
  - { ref: T2, semaines: 7 }
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
---

## Organisation

- **Deux pistes indépendantes.**
  - Le **mardi** suit les séquences T, communes aux trois Terminales et sur les mêmes semaines.
  - L'**heure commune du vendredi** (avec D2, 26 élèves en labo, 1 poste pour 2) suit un fil propre : réseaux, client/serveur, objets connectés. Ce fil ne dépend pas de l'avancement de chaque classe, donc le décalage entre D2 et D3 ne gêne plus.
- **Profondeur** : l'essentiel (cours, TD, simulations courtes) ; D2 approfondit les mêmes séquences en TP longs.
- **Partage du programme SIN avec l'équipe : proposition à confirmer.**
- **Démarche** : séquences problématisées sur les thèmes de la ressource Éduscol, progression spiralaire, simulation systématique (Wokwi, Filius, Packet Tracer).
