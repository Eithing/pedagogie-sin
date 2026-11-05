---
type: progression
titre: Enseignement spécifique SIN
classe: TSTI2D2
niveau: Term STI2D — 2I2D, enseignement spécifique SIN
annee: 2026-2027
calendrier: referentiels/calendrier_2026-2027.yaml
programme: referentiels/bo/2i2d_sin_terminale.yaml
catalogue: sources/progression/_catalogue_TermSIN.yaml
fin_cours: 2027-06-11
horaire: "4 h / semaine avec moi : vendredi midi 1 h (heure commune avec TSTI2D3) + vendredi après-midi 3 h"
profondeur: approfondi
pistes:
  - id: classe
    nom: Cours SIN — D2
    resume: vendredi après-midi (3 h, puis 1 h à partir de janvier)
    creneaux:
      - { jour: vendredi, heures: 3, au: 2027-01-01, libelle: "Vendredi après-midi, 3 h, de septembre à décembre" }
      - { jour: vendredi, heures: 1, du: 2027-01-04, libelle: "Vendredi après-midi, 1 h, de janvier à juin (2 h passent au projet)" }
  - id: projet
    nom: Projet 72 h — D2
    resume: vendredi après-midi, 2 h, janvier → mai
    creneaux:
      - { jour: vendredi, heures: 2, du: 2027-01-04, au: 2027-05-28, libelle: "Vendredi après-midi, 2 h, de janvier à fin mai" }
  - id: commun
    partagee: true
sequences:
  - { ref: T0, semaines: 4, etat: fait }
  - ref: T1
    semaines: 7
    etat: fait
    fin: 2026-10-16
    evaluation: "Interrogation sur le CAN et le CNA (sujet B, 40 min, heure commune du vendredi 13 novembre, reportée à cause du blocus) + TP noté Tinkercad « salle serveur, TMP36 » (à distance, le 9 octobre)."
    ressources: [EVAL_TermSIN_CAN, AUTO_TermSIN_TMP36_Tinkercad, AUTO_TermSIN_Cuve_Lissage]
  - ref: T2
    semaines: 7
    etat: en-cours
    debut: 2026-11-06
    ressources: [TP_TermSIN_Lampadaire_Wokwi, AUTO_TermSIN_Lampadaire_Wokwi]
  - { ref: T3, semaines: 6 }
  - { ref: T4, semaines: 5 }
  - { ref: T5, semaines: fin }
  - { ref: P, piste: projet, semaines: fin }
journal:
  - date: 2026-10-07
    texte: "Blocus du lycée : plusieurs séances perdues début octobre dans toutes les classes (dates exactes à préciser), aucune note posée. Évaluations programmées avant les vacances de la Toussaint."
  - date: 2026-10-07
    texte: "Mise en forme de la progression. Mini-séquence SysML (T0) faite, non notée. CAN (T1) : cours complet fait, puis exercices Tinkercad en TP (relevés de mesure, quantum). Heure commune avec D3 : révisions et CAN jusqu'à la Toussaint."
  - date: 2026-10-09
    texte: "Blocus : cours en distanciel. Heure commune avec D3 : remédiation CAN en autonomie (« Le CAN pas à pas »). Bloc de 3 h : TP TMP36 sur Tinkercad, noté, en version individuelle à distance (captures d'écran à la place des validations). L'interrogation CAN (sujet B) est reportée au retour en présentiel."
  - date: 2026-10-16
    texte: "Blocus, distanciel. Heure commune avec D3 : entraînement autocorrigé sur le CAN (valeurs propres à chaque élève). Bloc de 3 h : TP « lisser une mesure bruitée » (cuve d'eau de pluie, moyenne glissante, hystérésis) sur Wokwi. Non notés, rendu obligatoire."
  - date: 2026-11-02
    texte: "Retour en présentiel après la Toussaint. Environ trois élèves sur quatre n'ont rien rendu à distance. T1 est close ; l'interrogation CAN (sujet B) est fixée à l'heure commune du vendredi 13 novembre. Heure commune : C0 terminée, C1 (réseau local) démarre le 6 novembre. Bloc de 3 h du 6 novembre : TP « lampadaire autonome » sur Wokwi (T2), dont la partie A reprend le CAN ; non noté."
  - date: 2026-11-06
    texte: "Blocus, distanciel. Heure commune avec D3 : fiche « Le parking connecté » avec un simulateur sans installation à la place de Filius. Bloc de 3 h : TP lampadaire sur Wokwi, individuel, testé le 5 novembre. Non notés, rendu obligatoire. Fiche de révision déposée pour l'évaluation du vendredi 13 novembre."
---

## Organisation

- **Mêmes séquences T que D1 et D3, sur les mêmes semaines**, mais approfondies.
  - **De septembre à décembre**, le bloc de 3 h du vendredi après-midi permet des TP longs et des mini-projets sur chaque séquence.
  - **De janvier à fin mai**, ce bloc devient 1 h de séquence + 2 h de projet (environ 32 h de projet sur mes créneaux, sur les 72 h prévues par le programme).
- **L'heure commune du vendredi midi** (avec D3, 26 élèves en labo, 1 poste pour 2) suit un fil propre : réseaux, client/serveur, objets connectés. Ce fil ne dépend pas de l'avancement de chaque classe.
- **Partage du programme SIN et du projet avec l'équipe : proposition à confirmer.**
- **Démarche** : séquences problématisées sur les thèmes de la ressource Éduscol, progression spiralaire, simulation systématique (Wokwi, Filius, Packet Tracer).
