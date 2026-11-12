---
titre: Interrogation à distance — le CAN et le CNA, avec tes valeurs personnelles
niveau: Term STI2D SIN
sequence: T1
court: Interro CAN CNA a distance
rangement: Eval/Terminale
pronote:
  - pour: "TSTI2D1 (vendredi 13 novembre, 12 h, distanciel)"
    titre: "T1 Acquérir une grandeur physique — Interrogation à distance : le CAN et le CNA"
    description: "T1 (distanciel, blocus) : interrogation notée /20, individuelle et sans IA, sur le CAN et le CNA (quantum, code N, binaire et hexadécimal, CNA, choix du nombre de bits), avec des valeurs propres à chaque élève. Une heure au plus, rendu dans le Casier de l'ENT."
  - pour: "TSTI2D2 + TSTI2D3, heure commune (vendredi 13 novembre, 13 h, distanciel)"
    titre: "T1 Acquérir une grandeur physique — Interrogation à distance : le CAN et le CNA"
    description: "T1 (distanciel, blocus) : interrogation notée /20, individuelle et sans IA, sur le CAN et le CNA (quantum, code N, binaire et hexadécimal, CNA, choix du nombre de bits), avec des valeurs propres à chaque élève. Une heure au plus, rendu dans le Casier de l'ENT."
type: autonomie
duree: 55 min
bareme: 20
points_masques: true
illustration: ../revision/img/can/chaine-can-cna.svg
accroche: "Tes valeurs dépendent de ton jour de naissance : personne n'a exactement le même sujet que toi."
competences: [2.4.2c, 5.3.1d, 2.4.3a, CO7.3-SIN1]
document_reponse: true
consignes:
  - "Interrogation notée, individuelle, à distance. Prévois environ 45 minutes de travail et n'y consacre pas plus d'une heure en tout, dépôt compris."
  - "L'intelligence artificielle (ChatGPT, assistants…) est interdite : une réponse qui en vient vaut zéro. Calculatrice, cours et fiche de révision autorisés."
  - "Tous tes calculs utilisent ton nombre J, ton jour de naissance (de 1 à 31). Je vérifie J dans Pronote."
  - "Pour chaque calcul, écris la formule, puis le calcul avec tes valeurs, puis le résultat avec son unité."
rendu:
  - "Au choix : le document réponse REPONSES_NOM_Prenom (Word ou LibreOffice) ; ou ce sujet imprimé et rempli à la main, en photo ou scanné ; ou ta copie écrite sur une feuille, en photo. Écris « J = … » tout en haut."
  - "Un seul dépôt, dans l'application Casier de l'ENT, avant la fin de l'heure."
  - "Ce travail est noté."
aide:
  - "Pendant l'heure, je suis disponible sur la messagerie de l'ENT pour un problème technique ou une consigne pas claire. Je ne donne pas les réponses."
  - "Bloqué sur une question ? Écris ce que tu as essayé, puis passe à la suivante : une démarche juste rapporte des points, même si le résultat est faux."
---

::: prof
**Mise en œuvre (vendredi 13 novembre, distanciel)** : TSTI2D1 à 12 h, heure commune TSTI2D2 + TSTI2D3 à 13 h. Elle remplace les sujets A et B sur table (`EVAL_TermSIN_CAN`), qui restent disponibles pour le retour en classe. Déposer sur l'ENT ce PDF et `REPONSES_AUTO_TermSIN_CAN_CNA_Distance.docx`. Les copies reviennent dans l'application **Casier** de l'ENT. Les points de chaque question et le barème ne figurent pas dans la version élève (`points_masques: true`) : ils sont seulement ici.

**Contre la copie** : toutes les valeurs dépendent du jour de naissance $J$ de l'élève, donc deux élèves n'ont en général pas les mêmes résultats. Vérifier $J$ dans Pronote (fiche élève, date de naissance). Une copie dont les résultats correspondent à un autre $J$ que celui de l'élève : 0 aux questions concernées. Seule la question 1 est commune à tous (3 points).

**Correction** : les tableaux à la fin de ce corrigé donnent les résultats attendus pour chaque valeur de $J$. Tolérance : arrondis et convention $q = \text{PE} / (2^n - 1)$ acceptés s'ils sont appliqués de façon cohérente (écart de 1 sur un code). Une erreur de calcul en début de question ne pénalise pas la suite si la démarche est juste (« erreur reportée »).

**CNA (question 5)** : même remarque que pour le sujet sur table. Si une classe n'a pas vu le CNA, neutraliser la question 5 et ramener la note sur 20 (note sur 16 × 20 / 16).
:::

::: info Comment répondre et rendre ton travail
Tu as **trois possibilités**, au choix :

1. **À l'ordinateur** : télécharge **`REPONSES_AUTO_TermSIN_CAN_CNA_Distance.docx`** sur l'ENT, ouvre-le avec Word ou LibreOffice, réponds sous chaque question et enregistre-le sous le nom **`REPONSES_NOM_Prenom`**.
2. **Sur ce sujet imprimé** : écris tes réponses sur les lignes, puis prends chaque page en photo (ou scanne-la).
3. **Sur une copie** : écris tes réponses sur une feuille, avec le **numéro de chaque question**, puis prends des **photos nettes**.

**Dans tous les cas** :

- **tout en haut**, écris **« Je suis né(e) le J = … »** (exemple : né(e) le 23 mars → $J = 23$) ;
- pour chaque calcul, écris la **formule**, le **calcul avec tes valeurs** et le **résultat avec son unité** : une démarche juste rapporte des points même si le résultat est faux ;
- travaille **seul**, **sans intelligence artificielle**, et n'y passe **pas plus d'une heure** ;
- **dépose ton travail dans l'application Casier de l'ENT** avant la fin de l'heure.
:::

## Étape 1 — Mes valeurs personnelles (5 min)

Ton nombre $J$ est le **jour** de ta date de naissance. Exemple : né(e) le 23 mars → $J = 23$.

Calcule tes cinq valeurs avec les formules ci-dessous, et recopie-les en haut de ta copie. Tu t'en serviras dans toute l'interrogation. La colonne de droite montre la méthode avec $J = 0$ : ce ne sont pas tes valeurs.

:::: doc DR1 | Mes valeurs (à recopier)
| Valeur | Formule | Méthode avec $J = 0$ |
| :--- | :--- | :--- |
| Tension d'entrée $V_{in}$ (question 2) | $V_{in} = 1 + \dfrac{J}{10}$ en V | $1 + 0 = 1{,}0$ V |
| Code reçu $N_3$ (question 3) | $N_3 = 30 \times J + 50$ | $50$ |
| Code envoyé au CNA $N_5$ (question 5) | $N_5 = 4 \times J + 60$ | $60$ |
| Tension visée en sortie du CNA (question 5) | $V_{cible} = 0{,}5 + \dfrac{J}{20}$ en V | $0{,}5$ V |
| Écart de température à distinguer (question 6) | voir le tableau ci-dessous | — |

| Si $J$ vaut… | ton écart $\Delta T$ vaut… |
| :--- | :--- |
| 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31 | 0,1 °C |
| 2, 5, 8, 11, 14, 17, 20, 23, 26, 29 | 0,02 °C |
| 3, 6, 9, 12, 15, 18, 21, 24, 27, 30 | 0,5 °C |
::::

:::: doc DR2 | Rappels autorisés
- Un CAN de $n$ bits fournit $2^n$ codes, de $N = 0$ à $N = 2^n - 1$.
- Quantum : $q = \dfrac{\text{PE}}{2^n}$. Code : $N$ = partie entière de $\dfrac{V_{in}}{q}$.
- CNA : tension de sortie $V_s = N \times q$.
- Pour passer en hexadécimal : regroupe les bits **par 4 en partant de la droite** (sur 10 bits, le groupe de gauche n'a que 2 bits), puis traduis chaque groupe : `0000` à `1001` donnent 0 à 9, puis `1010` = A, `1011` = B, `1100` = C, `1101` = D, `1110` = E, `1111` = F.
::::

## Étape 2 — Le CAN (20 min)

On utilise un **CAN de 10 bits**, de pleine échelle **PE = 5 V**.

:::: question 1 [3 pt]
**a)** Combien de codes différents ce CAN peut-il fournir ? Quel est le plus grand code $N$ possible ?

::: zone 2
:::

**b)** **Calcule** son quantum $q$, en mV, avec 3 chiffres significatifs.

::: zone 2
:::
::::

::: reponse 0
**a)** $2^{10} = 1\,024$ codes, de $N = 0$ à $N = 1\,023$. (1 pt)

**b)** $q = \dfrac{5}{1\,024} \approx 4{,}88\text{ mV}$ (valeur exacte 4,8828 mV). (2 pt)
:::

:::: question 2 [4 pt]
Le CAN de la question 1 reçoit **ta** tension d'entrée $V_{in}$, calculée dans le DR1.

**a)** **Calcule** le code $N$ qu'il fournit.

::: zone 3
:::

**b)** **Écris** ce code $N$ en binaire sur 10 bits, puis en hexadécimal (voir le DR2). Montre ta méthode : tableau des puissances de 2, ou divisions successives par 2.

::: zone 4
:::
::::

::: reponse 0
**a)** $N$ = partie entière de $\dfrac{V_{in}}{q} = \dfrac{V_{in}}{0{,}004\,882\,8}$ : voir le tableau A. (1,5 pt : formule 0,5, résultat 1)

**b)** Binaire sur 10 bits et hexadécimal : voir le tableau A. (1,5 pt binaire, 1 pt hexadécimal ; méthode visible exigée)
:::

:::: question 3 [3 pt]
Le même CAN fournit maintenant le code $N_3$, calculé dans le DR1.

**a)** **Calcule** la tension d'entrée qui correspond à ce code, environ.

::: zone 2
:::

**b)** **Explique** pourquoi on ne connaît cette tension qu'à un quantum près. Aide : quelles tensions donnent toutes le même code ?

::: zone 3
:::
::::

::: reponse 0
$V_{in} \approx N_3 \times q$ : voir le tableau A. (2 pt)

Toutes les tensions comprises entre $N_3 \times q$ et $(N_3 + 1) \times q$ donnent le même code : le CAN ne peut pas les distinguer, d'où une incertitude d'un quantum (environ 4,88 mV). (1 pt)
:::

::: question 4 [3 pt]
On augmente **ta** tension $V_{in}$ de seulement **3 mV** : le CAN reçoit maintenant $V_{in} + 0{,}003$ V. Fournit-il le **même code** $N$ qu'à la question 2 ? **Justifie** par un calcul, puis explique ton résultat en comparant 3 mV au quantum.
:::

::: reponse 4
On calcule $\dfrac{V_{in} + 0{,}003}{q}$ et on compare sa partie entière à $N$ (tableau A, colonne Q4). (1 pt calcul, 1 pt conclusion, 1 pt comparaison de 3 mV au quantum)

Attendu : 3 mV est plus petit que le quantum, donc le code ne change **pas toujours** ; il change seulement si $V_{in}$ était proche de la marche suivante. Accepter « même code » ou « code + 1 » s'il est justifié par le calcul.
:::

## Étape 3 — Le CNA et le choix d'un CAN (15 min)

On utilise maintenant un **CNA de 8 bits**, de pleine échelle **5 V**.

:::: question 5 [4 pt]
**a)** Quelle est la grandeur d'**entrée** d'un CNA ? Et sa grandeur de **sortie** ?

::: zone 2
:::

**b)** On envoie au CNA le code $N_5$, calculé dans le DR1. **Écris** ce code en hexadécimal sur 8 bits. Ensuite, **calcule** le quantum de ce CNA, puis sa tension de sortie $V_s$.

::: zone 3
:::

**c)** Quel code faut-il envoyer au CNA pour obtenir en sortie **ta** tension $V_{cible}$ (DR1) ? Donne l'entier le plus proche.

::: zone 2
:::
::::

::: reponse 0
**a)** Entrée : un nombre binaire (code numérique). Sortie : une tension analogique. (1 pt)

**b)** $q = \dfrac{5}{256} \approx 19{,}53\text{ mV}$ ; hexadécimal et $V_s = N_5 \times q$ : voir le tableau B. (0,5 pt hexadécimal, 1,5 pt $V_s$)

**c)** $N = \dfrac{V_{cible}}{q}$, arrondi à l'entier le plus proche : voir le tableau B. Accepter la partie entière. (1 pt)
:::

::: question 6 [3 pt]
Un capteur de température fournit **0 V à 0 °C** et **5 V à 100 °C** (relation linéaire). On veut que le CAN, de pleine échelle 5 V, puisse distinguer deux températures qui ne diffèrent que de **ton** écart $\Delta T$ (DR1). **Quel nombre de bits minimal** faut-il ? **Justifie** par un calcul.
:::

::: reponse 5
Sensibilité : $s = \dfrac{5}{100} = 50\text{ mV/°C}$. (1 pt)

Il faut $q \le s \times \Delta T$, puis $\dfrac{5}{2^n} \le s \times \Delta T$ : (1 pt démarche, 1 pt résultat)
- $\Delta T = 0{,}5$ °C : $q \le 25$ mV → $2^n \ge 200$ → **8 bits** ;
- $\Delta T = 0{,}1$ °C : $q \le 5$ mV → $2^n \ge 1\,000$ → **10 bits** ;
- $\Delta T = 0{,}02$ °C : $q \le 1$ mV → $2^n \ge 5\,000$ → **13 bits**.
:::

**Avant de déposer**, relis-toi : $J$ est écrit tout en haut, et chaque calcul a sa formule et son unité. Puis dépose ton travail dans l'application **Casier** de l'ENT.

::: prof
**Tableau A — questions 2 à 4** (CAN 10 bits, PE = 5 V, $q = 4{,}8828$ mV). Q4 : « oui » si le code reste le même avec 3 mV de plus ; sinon, le code obtenu.

| $J$ | $V_{in}$ | $N$ | binaire | hexa | $N_3$ | $V$ (Q3) | Q4 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | 1,1 V | 225 | `00 1110 0001` | `0x0E1` | 80 | 0,391 V | oui |
| 2 | 1,2 V | 245 | `00 1111 0101` | `0x0F5` | 110 | 0,537 V | non : 246 |
| 3 | 1,3 V | 266 | `01 0000 1010` | `0x10A` | 140 | 0,684 V | oui |
| 4 | 1,4 V | 286 | `01 0001 1110` | `0x11E` | 170 | 0,830 V | non : 287 |
| 5 | 1,5 V | 307 | `01 0011 0011` | `0x133` | 200 | 0,977 V | oui |
| 6 | 1,6 V | 327 | `01 0100 0111` | `0x147` | 230 | 1,123 V | non : 328 |
| 7 | 1,7 V | 348 | `01 0101 1100` | `0x15C` | 260 | 1,270 V | oui |
| 8 | 1,8 V | 368 | `01 0111 0000` | `0x170` | 290 | 1,416 V | non : 369 |
| 9 | 1,9 V | 389 | `01 1000 0101` | `0x185` | 320 | 1,563 V | oui |
| 10 | 2,0 V | 409 | `01 1001 1001` | `0x199` | 350 | 1,709 V | non : 410 |
| 11 | 2,1 V | 430 | `01 1010 1110` | `0x1AE` | 380 | 1,855 V | oui |
| 12 | 2,2 V | 450 | `01 1100 0010` | `0x1C2` | 410 | 2,002 V | non : 451 |
| 13 | 2,3 V | 471 | `01 1101 0111` | `0x1D7` | 440 | 2,148 V | oui |
| 14 | 2,4 V | 491 | `01 1110 1011` | `0x1EB` | 470 | 2,295 V | non : 492 |
| 15 | 2,5 V | 512 | `10 0000 0000` | `0x200` | 500 | 2,441 V | oui |
| 16 | 2,6 V | 532 | `10 0001 0100` | `0x214` | 530 | 2,588 V | non : 533 |
| 17 | 2,7 V | 552 | `10 0010 1000` | `0x228` | 560 | 2,734 V | non : 553 |
| 18 | 2,8 V | 573 | `10 0011 1101` | `0x23D` | 590 | 2,881 V | non : 574 |
| 19 | 2,9 V | 593 | `10 0101 0001` | `0x251` | 620 | 3,027 V | non : 594 |
| 20 | 3,0 V | 614 | `10 0110 0110` | `0x266` | 650 | 3,174 V | non : 615 |
| 21 | 3,1 V | 634 | `10 0111 1010` | `0x27A` | 680 | 3,320 V | non : 635 |
| 22 | 3,2 V | 655 | `10 1000 1111` | `0x28F` | 710 | 3,467 V | oui |
| 23 | 3,3 V | 675 | `10 1010 0011` | `0x2A3` | 740 | 3,613 V | non : 676 |
| 24 | 3,4 V | 696 | `10 1011 1000` | `0x2B8` | 770 | 3,760 V | oui |
| 25 | 3,5 V | 716 | `10 1100 1100` | `0x2CC` | 800 | 3,906 V | non : 717 |
| 26 | 3,6 V | 737 | `10 1110 0001` | `0x2E1` | 830 | 4,053 V | oui |
| 27 | 3,7 V | 757 | `10 1111 0101` | `0x2F5` | 860 | 4,199 V | non : 758 |
| 28 | 3,8 V | 778 | `11 0000 1010` | `0x30A` | 890 | 4,346 V | oui |
| 29 | 3,9 V | 798 | `11 0001 1110` | `0x31E` | 920 | 4,492 V | non : 799 |
| 30 | 4,0 V | 819 | `11 0011 0011` | `0x333` | 950 | 4,639 V | oui |
| 31 | 4,1 V | 839 | `11 0100 0111` | `0x347` | 980 | 4,785 V | non : 840 |

**Tableau B — questions 5 et 6** (CNA 8 bits, PE = 5 V, $q = 19{,}53$ mV).

| $J$ | $N_5$ | hexa | $V_s$ | $V_{cible}$ | code (Q5c) | $\Delta T$ | bits (Q6) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | 64 | `0x40` | 1,250 V | 0,55 V | 28 | 0,1 °C | 10 |
| 2 | 68 | `0x44` | 1,328 V | 0,60 V | 31 | 0,02 °C | 13 |
| 3 | 72 | `0x48` | 1,406 V | 0,65 V | 33 | 0,5 °C | 8 |
| 4 | 76 | `0x4C` | 1,484 V | 0,70 V | 36 | 0,1 °C | 10 |
| 5 | 80 | `0x50` | 1,563 V | 0,75 V | 38 | 0,02 °C | 13 |
| 6 | 84 | `0x54` | 1,641 V | 0,80 V | 41 | 0,5 °C | 8 |
| 7 | 88 | `0x58` | 1,719 V | 0,85 V | 44 | 0,1 °C | 10 |
| 8 | 92 | `0x5C` | 1,797 V | 0,90 V | 46 | 0,02 °C | 13 |
| 9 | 96 | `0x60` | 1,875 V | 0,95 V | 49 | 0,5 °C | 8 |
| 10 | 100 | `0x64` | 1,953 V | 1,00 V | 51 | 0,1 °C | 10 |
| 11 | 104 | `0x68` | 2,031 V | 1,05 V | 54 | 0,02 °C | 13 |
| 12 | 108 | `0x6C` | 2,109 V | 1,10 V | 56 | 0,5 °C | 8 |
| 13 | 112 | `0x70` | 2,188 V | 1,15 V | 59 | 0,1 °C | 10 |
| 14 | 116 | `0x74` | 2,266 V | 1,20 V | 61 | 0,02 °C | 13 |
| 15 | 120 | `0x78` | 2,344 V | 1,25 V | 64 | 0,5 °C | 8 |
| 16 | 124 | `0x7C` | 2,422 V | 1,30 V | 67 | 0,1 °C | 10 |
| 17 | 128 | `0x80` | 2,500 V | 1,35 V | 69 | 0,02 °C | 13 |
| 18 | 132 | `0x84` | 2,578 V | 1,40 V | 72 | 0,5 °C | 8 |
| 19 | 136 | `0x88` | 2,656 V | 1,45 V | 74 | 0,1 °C | 10 |
| 20 | 140 | `0x8C` | 2,734 V | 1,50 V | 77 | 0,02 °C | 13 |
| 21 | 144 | `0x90` | 2,813 V | 1,55 V | 79 | 0,5 °C | 8 |
| 22 | 148 | `0x94` | 2,891 V | 1,60 V | 82 | 0,1 °C | 10 |
| 23 | 152 | `0x98` | 2,969 V | 1,65 V | 84 | 0,02 °C | 13 |
| 24 | 156 | `0x9C` | 3,047 V | 1,70 V | 87 | 0,5 °C | 8 |
| 25 | 160 | `0xA0` | 3,125 V | 1,75 V | 90 | 0,1 °C | 10 |
| 26 | 164 | `0xA4` | 3,203 V | 1,80 V | 92 | 0,02 °C | 13 |
| 27 | 168 | `0xA8` | 3,281 V | 1,85 V | 95 | 0,5 °C | 8 |
| 28 | 172 | `0xAC` | 3,359 V | 1,90 V | 97 | 0,1 °C | 10 |
| 29 | 176 | `0xB0` | 3,438 V | 1,95 V | 100 | 0,02 °C | 13 |
| 30 | 180 | `0xB4` | 3,516 V | 2,00 V | 102 | 0,5 °C | 8 |
| 31 | 184 | `0xB8` | 3,594 V | 2,05 V | 105 | 0,1 °C | 10 |
:::

::: prof
## Barème

| Compétence | Questions | Critères | Points |
| :--- | :--- | :--- | :---: |
| **2.4.2c / 5.3.1d** — Caractériser un CAN | Q1, Q3, Q4 | Nombre de codes, quantum, tension retrouvée à partir d'un code, effet de la quantification justifié par le calcul | 9 |
| **2.4.3a** — Encodage binaire et hexadécimal | Q2 | Code juste, conversions binaire et hexadécimale avec méthode visible | 4 |
| CNA (hors programme enregistré) | Q5 | Grandeurs d'entrée et de sortie, $V_s = N \times q$, code pour une tension visée | 4 |
| **CO7.3-SIN1** — Choisir un constituant d'une chaîne d'acquisition | Q6 | Sensibilité, condition $q \le s \times \Delta T$, nombre de bits justifié | 3 |
| **Total** | | | **20** |
:::
