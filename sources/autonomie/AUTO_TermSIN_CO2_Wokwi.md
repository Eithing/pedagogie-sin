---
titre: Le voyant « Aérez ! » — du capteur de CO₂ au programme, sur Wokwi
niveau: Term STI2D SIN
sequence: T1
type: autonomie
duree: 55 min
bareme: 20
illustration: img/co2/voyant.svg
accroche: Ta salle de classe sature en CO₂. Programme le voyant qui dira quand ouvrir les fenêtres.
competences: [CO7.3-SIN1, CO5.8-SIN2, 2.4.2c, 5.3.1d]
materiel: [Wokwi (Arduino Uno, potentiomètre), ordinateur]
document_reponse: true
fichiers: [fichiers/diagram.json, fichiers/voyant_co2.ino]
consignes:
  - "TP noté, individuel, à distance, sur ordinateur. Une étape par page : suis-les dans l'ordre."
  - "Wokwi s'utilise sans compte, dans le navigateur. Les validations se font par captures d'écran 📸 (Windows + Maj + S, puis Ctrl + V dans ton document réponse)."
  - "Rédige les calculs : formule, application numérique, résultat avec unité."
rendu:
  - "Ton document réponse REPONSES_NOM_Prenom (Word ou LibreOffice), avec tes calculs, tes lignes de code et les 3 captures d'écran 📸 demandées."
  - "Dépôt dans le devoir « Voyant CO₂ » de l'ENT, avant la date indiquée."
aide:
  - "Pendant l'heure, je suis disponible sur la messagerie de l'ENT. Envoie-moi une capture d'écran de ton écran Wokwi si quelque chose ne marche pas."
  - "Bloqué plus de 10 minutes sur une question ? Écris « bloqué » dans ta réponse, passe à la suivante et préviens-moi."
---

::: prof
**Mise en œuvre (mardi 13 octobre, TSTI2D3, 1 h en distanciel)** : application pratique de la remédiation « Le CAN pas à pas » du vendredi. Déposer sur l'ENT ce PDF élève, le document réponse `REPONSES_AUTO_TermSIN_CO2_Wokwi.docx`, `diagram.json` et `voyant_co2.ino` (dossier `eleve/`).

**Testé sur Wokwi le 12 octobre** : le circuit (`diagram.json`) se charge et le programme corrigé fonctionne sans compte. Le serveur gratuit de Wokwi met **1 à 2 minutes** à compiler, voire plus si toute la classe compile en même temps : la fiche prévient les élèves.

**Le TD noté sur le CO₂** (`TD_TermSIN_CAN_QualiteAir`, CAN 12 bits 3,3 V et capteur 0,4–2,0 V) est **reporté au retour en présentiel**. Ce TP utilise un autre capteur (0–4 V) et le CAN de l'Uno : il ne donne pas les réponses du TD. Le TD noté se fera donc au retour, en classe.

**Valeurs** : le capteur de ce TP est **simplifié** (linéaire, 0 V à 0 ppm, 4 V à 2 000 ppm) pour garder des calculs simples ; ce n'est pas un modèle réel. Les ordres de grandeur sont réalistes : environ 420 ppm dans l'air extérieur ; 1 500 ppm est le seuil choisi par le lycée dans le TD.

**Note** : TP noté sur 20, en note de travail (coefficient réduit). Les captures viennent de la simulation de chaque élève.
:::

::: info Comment répondre et rendre ton travail
1. Télécharge sur l'ENT le document réponse **`REPONSES_AUTO_TermSIN_CO2_Wokwi.docx`** et ouvre-le avec Word ou LibreOffice Writer. Enregistre-le tout de suite sous le nom **`REPONSES_NOM_Prenom`**, puis enregistre régulièrement.
2. Télécharge aussi **`diagram.json`** (le circuit) et **`voyant_co2.ino`** (le programme de départ). Tu les ouvriras avec le Bloc-notes pour les copier dans Wokwi (étape 3).
3. Aux étapes marquées **📸**, fais une **capture d'écran** (touches **Windows + Maj + S**) et colle-la (**Ctrl + V**) dans ton document réponse, sous la question.

**Attention** : sans compte, Wokwi **n'enregistre pas** ton travail. Copie tes lignes de code dans ton document réponse au fur et à mesure, et ne ferme pas l'onglet Wokwi avant la fin.

**Règles** : travail individuel ; les captures doivent venir de **ta** simulation. Une réponse que tu n'as pas trouvée s'écrit « je n'ai pas trouvé » : c'est mieux qu'une case vide.
:::

## Étape 1 — Découvrir la situation (5 min)

::: contexte Quand faut-il ouvrir les fenêtres ?
Mardi, 10 h, salle de SIN : 26 élèves, porte fermée, fenêtres closes depuis 8 h. Chaque personne rejette du CO₂ en respirant, et la concentration monte : environ **420 ppm** (parties par million) dans l'air extérieur, bien plus dans une salle fermée et pleine. Trop de CO₂, c'est de la fatigue et du mal à se concentrer.

Le lycée veut un **voyant « Aérez ! »** dans chaque salle, qui s'allume au-dessus de **1 500 ppm**. Tu vas prototyper ce voyant en simulation, avec une carte **Arduino Uno**.
:::

::: problematique
Comment transformer la tension d'un capteur de CO₂ en une concentration en ppm, puis en une décision : allumer ou non le voyant ?
:::

::: figure La chaîne du voyant « Aérez ! »
![](img/co2/voyant.svg){width=95%}
:::

:::: doc DR1 | Caractéristiques de la chaîne (capteur simplifié)
| Constituant | Caractéristique |
| :--- | :--- |
| Capteur de CO₂ | Sortie analogique **linéaire** : 0 V pour 0 ppm, 4,0 V pour 2 000 ppm (étendue de mesure : 0 à 2 000 ppm) |
| CAN de l'Arduino Uno | 10 bits, pleine échelle 5 V. `analogRead(A0)` renvoie le code $N$, de 0 à 1 023 |
| Voyant | LED « L » de la carte (broche 13), allumée si la concentration dépasse 1 500 ppm |
::::

## Étape 2 — Prévoir par le calcul (10 min)

::: question 1 [3 pt]
**a)** Calculer la **sensibilité** $s$ du capteur, en V/ppm puis en mV/ppm.

**b)** Calculer la tension de sortie du capteur dans l'air extérieur (420 ppm), puis au seuil d'alerte (1 500 ppm).
:::

::: reponse 0
**a)** $s = \dfrac{\Delta V}{\Delta C} = \dfrac{4{,}0 - 0}{2\,000 - 0} = 0{,}002\text{ V/ppm} = 2\text{ mV/ppm}$. (1 pt)

**b)** $V = s \times C$ : $V(420) = 0{,}002 \times 420 = 0{,}84\text{ V}$ ; $V(1\,500) = 0{,}002 \times 1\,500 = 3{,}0\text{ V}$. (1 pt chacune)
:::

::: question 2 [3 pt]
**a)** Calculer le quantum $q$ du CAN de l'Arduino Uno.

**b)** En déduire le code $N$ que le CAN doit fournir au seuil d'alerte (1 500 ppm).
:::

::: reponse 0
**a)** $q = \dfrac{\text{PE}}{2^n} = \dfrac{5}{1\,024} \approx 4{,}88\text{ mV}$. (1 pt)

**b)** $\dfrac{3{,}0}{0{,}004\,88} \approx 614{,}4$, donc $N = 614$. (2 pt)
:::

## Étape 3 — Construire la simulation (15 min)

1. Ouvre **https://wokwi.com/projects/new/arduino-uno** : un projet Arduino Uno vide s'ouvre, sans compte.
2. Clique sur l'onglet **`diagram.json`**, sélectionne tout (Ctrl + A) et remplace-le par le contenu du fichier **`diagram.json`** (ouvert avec le Bloc-notes). Un potentiomètre apparaît, relié à **5V**, **A0** et **GND**.
3. Clique sur l'onglet **`sketch.ino`** et remplace tout par le contenu de **`voyant_co2.ino`**.
4. Clique sur le bouton vert ▶ pour lancer la simulation.

::: attention
La **première compilation prend 1 à 2 minutes** (le serveur gratuit de Wokwi fait la queue) : clique **une seule fois** sur ▶ et patiente. Profites-en pour relire tes calculs de l'étape 2.
:::

::: question 3 [3 pt]
Pendant la simulation, clique sur le potentiomètre et tourne-le. Le **moniteur série** (en bas à droite) affiche le code $N$ ; pour l'instant, $V$ et $C$ valent 0, c'est normal.

**a)** Quel code $N$ obtiens-tu potentiomètre tourné à fond à gauche, puis à fond à droite ? Pourquoi la valeur maximale est-elle celle-ci ?

📸 **Capture 1** : le circuit en simulation et le moniteur série.
:::

::: reponse 0
À fond à gauche : $N = 0$ (0 V). À fond à droite : $N = 1\,023$ (5 V), car un CAN 10 bits fournit $2^{10} = 1\,024$ codes, de 0 à $2^{10} - 1 = 1\,023$. (1 pt capture, 2 pt valeurs et justification)
:::

## Étape 4 — Programmer la conversion (10 min)

::: question 4 [4 pt]
Arrête la simulation (bouton ■). Dans `sketch.ino`, complète les deux lignes `TODO Q4` pour calculer la tension `v` (en V) à partir du code `n`, puis la concentration `c` (en ppm) à partir de `v`. Relance la simulation et tourne le potentiomètre pour obtenir environ 420 ppm.

Aide : $V = N \times q = N \times \dfrac{\text{PE}}{\text{nombre de codes}}$, puis $C = \dfrac{V}{s}$. Les constantes `PLEINE_ECHELLE`, `NB_CODES` et `SENSIBILITE` sont déjà écrites en haut du programme.

📸 **Capture 2** : tes deux lignes de calcul et le moniteur série autour de 420 ppm. **Copie aussi tes deux lignes** dans ta réponse.
:::

::: reponse 0
```cpp
  float v = n * PLEINE_ECHELLE / NB_CODES;   // tension en V
  float c = v / SENSIBILITE;                 // concentration en ppm
```
(1,5 pt par ligne, 1 pt capture cohérente : vers $N \approx 172$, $V \approx 0{,}84$ V, $C \approx 420$ ppm.) Pénaliser une division entière (`n / NB_CODES * PLEINE_ECHELLE`, qui donne 0) ; c'est l'occasion d'en expliquer la cause.
:::

## Étape 5 — Déclencher le voyant (10 min)

::: question 5 [4 pt]
**a)** Complète la zone `TODO Q5` pour que la LED « L » de la carte s'allume quand `c` dépasse `SEUIL`, et s'éteigne sinon.

**b)** Tourne **très doucement** le potentiomètre autour du seuil et note le code $N$ pour lequel la LED s'allume. Compare-le à ta prévision de la question 2.

📸 **Capture 3** : la LED « L » allumée et le moniteur série juste au-dessus de 1 500 ppm. **Copie aussi ton code** dans ta réponse.
:::

::: reponse 0
```cpp
  if (c > SEUIL) {
    digitalWrite(PIN_VOYANT, HIGH);
  } else {
    digitalWrite(PIN_VOYANT, LOW);
  }
```
(2 pt code et capture) La LED s'allume à $N = 615$. Le code 614 représente $614 \times 4{,}88 \approx 2{,}998$ V, soit environ 1 499 ppm, encore sous le seuil ; à 615, on passe à 1 501 ppm. Prévision et mesure sont cohérentes **à un code près** : c'est l'effet de la quantification. (2 pt ; accepter 614 ou 615 avec une comparaison argumentée.)
:::

## Étape 6 — Conclure, puis déposer (5 min)

::: question 6 [3 pt]
**a)** Calcule la **résolution** de la chaîne en ppm, c'est-à-dire la plus petite variation de CO₂ qu'elle peut détecter : $\dfrac{q}{s}$.

**b)** Est-elle suffisante pour un voyant qui s'allume à 1 500 ppm ? Justifie en une phrase.

**c)** Potentiomètre à fond, le programme affiche environ 2 500 ppm. Pourquoi cette valeur n'a-t-elle pas de sens avec le vrai capteur du DR1 ?
:::

::: reponse 0
**a)** $\dfrac{q}{s} = \dfrac{4{,}88\text{ mV}}{2\text{ mV/ppm}} \approx 2{,}4\text{ ppm}$. (1 pt)

**b)** Oui : 2,4 ppm est très petit devant le seuil de 1 500 ppm. Le voyant se déclenche à quelques ppm près. (1 pt)

**c)** Le capteur ne mesure que de 0 à 2 000 ppm et ne sort jamais plus de 4 V. Au-delà de 4 V, le potentiomètre simule une tension que le vrai capteur ne fournirait pas : on est hors de son **étendue de mesure**. (1 pt)
:::

::: retenir
- La chaîne d'acquisition va de la grandeur physique (CO₂ en ppm) à une tension [[analogique]], puis au code numérique $N$ fourni par le [[CAN]].
- Le programme fait le chemin inverse : $V = N \times q$, puis $C = \dfrac{V}{s}$, où $s$ est la [[sensibilité]] du capteur.
- La résolution de la chaîne en ppm vaut $\dfrac{q}{s}$ : la décision « Aérez ! » se fait à un [[quantum]] près.
:::

Pour finir : vérifie que les **3 captures** et tes **lignes de code** sont dans ton document réponse, **enregistre-le** et **dépose-le sur l'ENT**, dans le devoir « Voyant CO₂ ». Ajoute en une phrase, à la fin du document, ce qui t'a paru difficile.

## Barème & grille d'évaluation

| Compétence | Questions | Critères | Points |
| :--- | :--- | :--- | :---: |
| **CO7.3-SIN1** — Caractériser une chaîne d'acquisition | Q1, Q2, Q3, Q6 | Sensibilité, quantum, code au seuil, résolution justes et rédigés ; codes extrêmes expliqués ; étendue de mesure comprise | 12 |
| **CO5.8-SIN2** — Programmer le traitement de l'information | Q4, Q5 | Conversion code → tension → ppm juste (pas de division entière), voyant fonctionnel, captures cohérentes | 8 |
| **Total** | | | **20** |
