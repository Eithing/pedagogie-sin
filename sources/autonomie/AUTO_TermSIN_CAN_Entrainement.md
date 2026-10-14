---
titre: Entraînement CAN — des exercices à tes valeurs, corrigés en direct
niveau: Term STI2D SIN
sequence: C0
court: Entrainement CAN
pronote:
  titre: "C0 Révisions et CAN en classe commune — Entraînement autocorrigé sur le CAN (D2 + D3)"
  description: "C0 (distanciel, heure commune) : entraînement sur le CAN avec un outil autocorrigé (valeurs propres à chaque élève, méthode affichée en cas d'erreur), puis rédaction détaillée de deux exercices. Non noté, rendu obligatoire."
type: autonomie
duree: 55 min
illustration: img/can/entrainement.svg
accroche: "Douze exercices, tes propres valeurs, une correction immédiate. Objectif : être prêt pour l'interrogation au retour."
competences: [2.4.2c, 2.4.3a, 5.3.1d]
document_reponse: true
fichiers: [fichiers/can/entrainement_can.html]
consignes:
  - "Travail individuel, à distance, sur ordinateur. Une étape par page : suis-les dans l'ordre."
  - "Garde ton cahier ou une feuille de brouillon pour les calculs, et la calculatrice de l'ordinateur."
rendu:
  - "Ton document réponse REPONSES_NOM_Prenom (Word ou LibreOffice), avec la capture du bilan 📸 et tes deux exercices rédigés."
  - "Dépôt dans le devoir « Entraînement CAN » de l'ENT, avant la date indiquée."
  - "Ce travail n'est pas noté, mais il est obligatoire : il prépare l'interrogation sur le CAN, au retour en classe."
aide:
  - "Pendant l'heure, je suis disponible sur la messagerie de l'ENT : envoie-moi l'énoncé et ton calcul si tu bloques."
---

::: prof
**Mise en œuvre (vendredi 16 octobre, heure commune TSTI2D2 + TSTI2D3, 13 h, distanciel)** : dernière séance avant les vacances de la Toussaint. **Non noté**, rendu obligatoire. Déposer sur l'ENT ce PDF élève, le document réponse `REPONSES_AUTO_TermSIN_CAN_Entrainement.docx` et l'outil `entrainement_can.html` (dossier `eleve/`).

**L'outil** est un simple fichier HTML, sans compte, qui fonctionne hors connexion. Il tire **au hasard** 12 exercices (2 par notion : nombre de codes, quantum, tension → code, code → tension, binaire et hexadécimal, choix du nombre de bits). Les valeurs changent pour chaque élève et à chaque série : copier les réponses d'un camarade ne sert à rien. Après une erreur, il affiche la méthode ; après une deuxième, la correction. Le bilan final indique, par notion, ce qui est juste du premier coup. **Testé le 14 octobre** : les 6 types d'exercices acceptent les bonnes réponses (tolérance 1 % sur les calculs, ±1 sur le code N).

**Exploitation au retour** : les bilans déposés montrent les notions « à retravailler » de chaque élève. On peut les regrouper pour les 5 minutes de reprise avant l'interrogation CAN (sujet B, heure commune).
:::

::: info Comment répondre et rendre ton travail
1. Télécharge sur l'ENT le document réponse **`REPONSES_AUTO_TermSIN_CAN_Entrainement.docx`** et ouvre-le avec Word ou LibreOffice Writer. Enregistre-le tout de suite sous le nom **`REPONSES_NOM_Prenom`**.
2. Télécharge l'outil **`entrainement_can.html`** et ouvre-le par un **double-clic** : il s'ouvre dans ton navigateur, sans compte et sans installation.
3. À l'étape 📸, fais une **capture d'écran** (touches **Windows + Maj + S**) et colle-la (**Ctrl + V**) dans ton document réponse.

Une réponse que tu n'as pas trouvée s'écrit « je n'ai pas trouvé » : c'est mieux qu'une case vide.
:::

## Étape 1 — Revoir les méthodes (10 min)

Relis cette fiche avant de commencer. Tu peux revenir à cette page pendant l'entraînement.

::: retenir
| Notion | Formule ou méthode | Exemple |
| :--- | :--- | :--- |
| Nombre de codes | Un CAN de $n$ bits fournit $2^n$ codes, de $0$ à $2^n - 1$ | 8 bits : 256 codes, de 0 à 255 |
| Quantum | $q = \dfrac{\text{PE}}{2^n}$ (×1 000 pour l'avoir en mV) | 10 bits, 5 V : $q = 5 / 1\,024 \approx 4{,}88$ mV |
| Tension → code | $N$ = partie entière de $\dfrac{V_{in}}{q}$ | $q = 4{,}88$ mV, $V_{in} = 1$ V : $1 / 0{,}004\,88 \approx 204{,}9$, donc $N = 204$ |
| Code → tension | $V \approx N \times q$ (q en volts) | $N = 204$ : $V \approx 204 \times 0{,}004\,88 \approx 0{,}996$ V |
| Binaire | Tableau des poids 128, 64, 32, 16, 8, 4, 2, 1 | $37 = 32 + 4 + 1$ → `0010 0101` |
| Hexadécimal | Paquets de 4 bits ; 10 = A … 15 = F | `0010 0101` → `0x25` |
| Nombre de bits | Il faut $q \le s \times \Delta$ ; essayer $n$ = 8, 9, 10… | 10 mV/°C, 0,25 °C, 2,56 V : $q \le 2{,}5$ mV → $n = 10$ |
:::

## Étape 2 — S'entraîner avec l'outil (30 min)

1. Ouvre `entrainement_can.html` et écris ton **nom** et ton **prénom** en haut.
2. Fais les **12 exercices**. Pour chacun : calcule au brouillon, écris ta réponse, puis clique sur **Vérifier**.
3. Si c'est faux, l'outil affiche la **méthode** : corrige et vérifie à nouveau. Après une deuxième erreur, il affiche la **correction** : lis-la attentivement avant de passer à la suite.
4. À la fin, un **bilan** indique, pour chaque notion, ce que tu as réussi du premier coup.

::: question 1
📸 **Capture** : colle la capture d'écran de ton bilan (avec ton nom visible).

Si tu as moins de 9 exercices justes du premier coup, clique sur **Nouvelle série** (de nouvelles valeurs sont tirées) et refais-la : colle aussi la capture de ce deuxième bilan.
:::

::: reponse 0
Bilan personnel. Repérer les notions « à retravailler » pour la reprise en classe.
:::

## Étape 3 — Rédiger deux exercices en entier (10 min)

::: question 2
Choisis **deux exercices** de ta série : ceux où tu t'es trompé, ou sinon les deux qui t'ont paru les plus difficiles. Pour chacun, recopie l'**énoncé** (avec tes valeurs), puis rédige la **solution complète** : formule, calcul, résultat avec son unité.
:::

::: reponse 0
Vérifier la rédaction (formule, application numérique, unité) et la cohérence avec les valeurs de l'énoncé recopié.
:::

::: question 3
D'après ton bilan, quelle notion dois-tu encore retravailler avant l'interrogation ? Qu'est-ce qui te pose problème dans cette notion ?
:::

::: reponse 0
Réponse personnelle : elle sert à préparer la reprise en classe.
:::

## Étape 4 — Déposer (5 min)

Vérifie que ton document réponse contient la **capture du bilan**, tes **deux exercices rédigés** et ta réponse à la question 3. **Enregistre-le** et **dépose-le sur l'ENT**, dans le devoir « Entraînement CAN ».

Bonnes vacances ! Si tu veux t'entraîner encore, l'outil génère une nouvelle série à chaque clic sur « Nouvelle série ».
