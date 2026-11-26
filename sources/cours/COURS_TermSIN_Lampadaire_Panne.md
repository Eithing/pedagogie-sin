---
titre: "Panne dans l'allée : 15 minutes de cours, 30 minutes d'enquête"
niveau: Term STI2D SIN
sequence: T2
court: Lampadaire en panne
pronote:
  pour: "TSTI2D1 (vendredi 27 novembre, 12 h)"
  titre: "T2 Traiter l'information par programme — Séance : panne dans l'allée, le lampadaire (cours Python puis enquête sur Wokwi)"
  description: "T2 : 15 min de cours au tableau (variable, if / else, grand N = nuit), puis 30 min d'enquête : exécuter un programme à la main, corriger des erreurs, réparer le lampadaire sur Wokwi. Fiche notée /20, avec visas du professeur."
type: cours
duree: 55 min
bareme: 20
illustration: img/lampadaire/couverture.svg
accroche: "22 h, l'allée est noire. En plein jour, la lampe est allumée. Le matériel va bien : c'est le programme qu'il faut interroger."
competences: [CO5.8-SIN2, 2.4.3b, 4.3.5b, 4.3.5c]
objectifs:
  - Dire ce que fait un microcontrôleur (lire, décider, agir) et à quoi il sert dans un lampadaire
  - Exécuter à la main un programme avec une variable et un if / else
  - Repérer et corriger les erreurs les plus fréquentes en Python
  - Réparer et tester le programme du lampadaire sur Wokwi
prerequis:
  - "T1 : code N d'un CAN, seuil en code (N augmente quand il fait sombre)"
  - "T2 : séance « lampadaire » du 20 novembre"
preparation:
  - "Imprimer la fiche d'activités (1 par élève) et **écrire le nom de chaque élève en haut de sa fiche** : en entrant, chacun cherche sa fiche, et sa place (plan de classe) ; déposer le PDF sur l'ENT pour les absents"
  - "Imprimer la grille des visas (bloc prof ci-dessous) ou l'écrire sur la liste d'appel"
  - "Mettre à disposition `circuit_lampadaire_jour_nuitv2.json` et `lampadaire_jour_nuitv2.py` (dossier `output/Term_STI2D_SIN/T2_Programmer_un_uC/eleve/T2_Distanciel_Lampadaire-programme-jour-nuit/`)"
  - "Ouvrir Wokwi à l'avance sur le poste du professeur, circuit chargé ; postes élèves allumés, écrans éteints pendant le cours"
  - "Lire la fiche « contexte » (`CONTEXTE_TermSIN_Lampadaire_Panne`) : présentation au tableau et plan de bataille"
---

::: prof
**Pourquoi cette séance.** Le 20 novembre, 9 fiches rendues sur 14 présents. Cette fois : **15 minutes de cours** au tableau pour que tout le monde ait les outils, puis **30 minutes d'activité** en trois étapes courtes, chacune validée par un **visa** du professeur.

**Contre les fiches qui « disparaissent »** :

1. La fiche porte déjà le nom de l'élève (écrit par vous) : plus de fiche anonyme, et le plan de classe est fait.
2. **Visa** : à la fin de chaque étape, vous passez et vous paraphez la case « Visa » de la fiche, **et** vous cochez la grille ci-dessous. Une fiche non rendue garde les points de ses visas sur votre grille, et rien d'autre ; une fiche rendue est notée en entier. Les élèves comprennent vite qu'il vaut mieux la rendre.
3. **Sortie** : vous êtes à la porte, on sort en posant sa fiche dans votre main. Annoncé dès la 1re minute : « Pas de fiche rendue, c'est un non-rendu dans Pronote. »

**Note** : elle peut remplacer celle du 20 novembre si elle est meilleure (à annoncer en début d'heure : cela redonne une chance à ceux qui n'avaient rien rendu).
:::

::: prof Grille des visas (à recopier sur la liste d'appel)
| Élève | Visa 1 : exécuter à la main (5 pt) | Visa 2 : les bugs (4 pt) | Visa 3 : Wokwi (6 pt) | Fiche rendue |
| :--- | :---: | :---: | :---: | :---: |
| … | ☐ | ☐ | ☐ | ☐ |

Le visa se donne quand l'étape est **faite** (même avec des erreurs) : il note l'effort. Les points de l'étape se calculent ensuite à la correction de la fiche ; pour une fiche perdue, on compte la moitié des points des étapes visées.
:::

::: prof Barème
| Étape | Questions | Ce qui est évalué | Points |
| :--- | :--- | :--- | :---: |
| Cours | Q1, Q2 | Variable, if / else (questions éclair) | 2 |
| 1. Interroger le programme | Q3 | Exécution à la main, panne trouvée et corrigée | 5 |
| 2. Le tournoi des bugs | Q4 | Quatre erreurs corrigées | 4 |
| 3. Réparer sur Wokwi | Q5 | Seuil et condition, validés à l'écran | 6 |
| 3 bis. Le crépuscule | Q6 | Cas ajouté à la bonne place | 3 |
| **Total** | | | **20** |
:::

## Présentation

::: slide 5 min | Le message du gardien
![](img/lampadaire/couverture.svg){width=62%}

« Depuis la mise à jour, l'allée est **noire la nuit**, et la lampe **brille en plein jour**. J'ai changé l'ampoule : rien. »
:::

::: dire
**Présentation au tableau (3 min, voir la fiche contexte)** : « Beaucoup de communes éteignent l'éclairage la nuit pour économiser l'électricité. La solution : un lampadaire qui décide **tout seul**. Dedans, il y a une petite carte, un microcontrôleur, et un programme d'une dizaine de lignes. Aujourd'hui, ce programme est en panne et vous êtes l'équipe de dépannage. »

**Les règles, en 1 minute** (les écrire dans un coin du tableau) : « 15 minutes de cours, écrans éteints. Puis trois étapes. À la fin de chaque étape, je passe mettre un **visa** sur votre fiche. On sort en me donnant sa fiche à la porte. La note peut remplacer celle du 20. »
:::

## 15 minutes de cours

::: slide 5 min | Lire, décider, agir | fiche
| Le lampadaire… | En Python |
| :--- | :--- |
| **lit** la lumière : un nombre $N$ | `n = capteur.read()` |
| **décide** | `if n > N_SEUIL:` |
| **agit** sur la lampe | `regler_lampe(30)` |
| et **recommence** sans arrêt | `while True:` |

**Une variable = une boîte avec une étiquette.** `n = 950` : « range 950 dans la boîte `n` ».
:::

::: dire
**Au tableau (dessiner trois cases : capteur → carte → lampe)** : « Le microcontrôleur n'est **pas intelligent**. Il lit un nombre, il compare, il agit, et il recommence, des milliers de fois par seconde. »

**La variable (1 min)** : dessiner une boîte, écrire `n` sur l'étiquette, 950 dedans. « Quand le capteur lit une nouvelle valeur, on vide la boîte et on met la nouvelle. »

Écrire en gros dans un coin, pour toute l'heure : **grand N = nuit** (le capteur est câblé comme ça).
:::

::: activite 2 min | Question éclair : la boîte | individuel | projeter
Répondez sur la fiche, sans parler. Main levée au signal.
:::

::: question 1 [1 pt]
Après ces trois lignes, que vaut `a` ?

```python
a = 5
a = a + 2
a = a * 10
```

- [ ] 5
- [ ] 7
- [x] 70
- [ ] 52
:::

::: reponse 0
`a` vaut 5, puis 5 + 2 = 7, puis 7 × 10 = **70**. La boîte garde toujours la **dernière** valeur rangée.
:::

::: slide 6 min | Si… sinon : décider | fiche
```python
if n > N_SEUIL:        # SI il fait nuit   (deux-points !)
    regler_lampe(30)   #    decale de 4 espaces = obeit au if
else:                  # SINON
    regler_lampe(0)
```

- Python teste la condition : **vraie** → il fait le bloc du `if` ; **fausse** → le bloc du `else`. **Jamais les deux.**
- `=` **range** dans une boîte ; `==` **pose la question** « est-ce égal ? ».
- Les trois pièges : les **deux-points**, le **décalage** de 4 espaces, `=` au lieu de `==`.
:::

::: dire
**Exemple au tableau (2 min)** : prendre $n = 3\,900$ et `N_SEUIL = 3413`. « 3 900 est plus grand que 3 413 ? Oui. Je fais le bloc du if : lampe à 30 %. Je saute le else. » Puis $n = 950$ : « Non : je saute le bloc du if, je fais le else. » Mettre le doigt sur **une seule** ligne à la fois.

**Les pièges (1 min)** : « 9 fois sur 10, un message d'erreur rouge, c'est l'un de ces trois. Le message vous dit même la ligne. »
:::

::: tableau Mémo Python | papier
| Idée | Comment on l'écrit | Ce que ça veut dire |
| :--- | :--- | :--- |
| Variable | `age = 17` | Range 17 dans la boîte `age`. |
| Comparer | `==` `!=` `>` `<` `>=` `<=` | La réponse est vrai ou faux. |
| Décider | `if …:` `elif …:` `else:` | si · sinon, si · sinon (avec les deux-points) |
| Répéter | `while True:` | Recommence les lignes décalées (4 espaces). |
:::

::: activite 2 min | Question éclair : la décision | individuel | projeter
Répondez sur la fiche, sans parler. Main levée au signal.
:::

::: question 2 [1 pt]
Avec `N_SEUIL = 3413`, le capteur lit `n = 2000`. Que fait la lampe avec le programme de la diapo ?

- [ ] Elle s'allume à 30 %
- [x] Elle reste éteinte (0 %)
- [ ] Les deux, l'une après l'autre
:::

::: reponse 0
2 000 > 3 413 est **faux** : on saute le bloc du `if`, on fait le `else`. Lampe éteinte : il fait jour (petit $N$).
:::

## 30 minutes d'enquête

::: activite 8 min | Étape 1 : interroger le programme | individuel
Voici le programme installé dans le lampadaire. Exécutez-le à la main, ligne par ligne, et trouvez la ligne coupable. Puis levez la main : visa 1.
:::

::: tableau Le programme installé dans le lampadaire | fiche
```python
N_SEUIL = 3413

while True:
    n = capteur.read()
    if n < N_SEUIL:
        regler_lampe(30)
    else:
        regler_lampe(0)
```
:::

::: question 3 [5 pt]
**a)** Complétez le tableau avec **ce programme**.

| Moment | `n` lu | `n < N_SEUIL` vrai ? | Lampe (%) |
| :--- | :---: | :---: | :---: |
| midi | 950 | | |
| fin d'après-midi | 2 100 | | |
| minuit | 3 900 | | |

**b)** Quelle ligne est coupable ? Réécrivez-la corrigée.

☐ Visa 1 du professeur
:::

::: reponse 2
a) 950 : oui, 30 % · 2 100 : oui, 30 % · 3 900 : non, 0 % (1 pt par ligne). b) `if n < N_SEUIL:` : la comparaison est à l'envers (1 pt) ; il faut `if n > N_SEUIL:` (1 pt).
:::

::: dire
Pendant l'étape : passer **d'abord** aux élèves qui n'ont rien écrit après 2 minutes : « Midi, $n$ = 950. 950 est plus petit que 3 413 ? » Visa dès que le tableau est rempli. Correction express au tableau (1 min) : « Python n'a signalé **aucune erreur** : le programme est bien écrit, mais il fait le contraire. Il faut tester. »
:::

::: activite 5 min | Étape 2 : le tournoi des bugs | individuel
Quatre manches, une erreur par manche. Écrivez la ligne corrigée. Au signal, toute la classe lève sa fiche : un point au tableau par bonne réponse. Puis visa 2.
:::

::: tableau Manches 1 et 2 | fiche
```python
if presence == 1          # manche 1
    regler_lampe(100)

if presence = 0:          # manche 2
    regler_lampe(30)
```
:::

::: tableau Manches 3 et 4 | fiche
```python
if n > N_SEUIL:           # manche 3
regler_lampe(30)

if n > N_SEUIL:           # manche 4
    regler_lampe(30)
else
    regler_lampe(0)
```
:::

::: question 4 [4 pt]
Pour chaque manche, réécrivez la ligne corrigée.

☐ Visa 2 du professeur
:::

::: reponse 4
1 : `if presence == 1:` · 2 : `if presence == 0:` · 3 : `    regler_lampe(30)` (4 espaces) · 4 : `else:`. (1 pt par manche)
:::

::: activite 17 min | Étape 3 : réparer sur Wokwi | binome
Allumez l'écran. Chargez le lampadaire (gestes ci-dessous), réglez `N_SEUIL` à 3413, puis remplacez `regler_lampe(0)`, dans la boucle, par le `if / else` corrigé. Testez, puis appelez le professeur : visa 3. Les plus rapides : le crépuscule (question 6).
:::

::: tableau Wokwi en quatre gestes | fiche
1. **Barre d'adresse** : `wokwi.com/projects/new/micropython-esp32`. Pas de compte.
2. `circuit_lampadaire_jour_nuitv2.json` (Bloc-notes, **Ctrl + A**, **Ctrl + C**) dans l'onglet `diagram.json` (**Ctrl + A**, **Ctrl + V**).
3. Même chose : `lampadaire_jour_nuitv2.py` dans l'onglet `main.py`.
4. **▶** lance, **■** arrête. On modifie **à l'arrêt**. Cliquez sur le capteur pour régler la lumière.
:::

::: tableau Si ça ne marche pas | fiche
| Ce que je vois | Ce que je fais |
| :--- | :--- |
| `SyntaxError` et un numéro de ligne | Deux-points oubliés, ou `=` au lieu de `==`. |
| `IndentationError` | 4 espaces de plus sous le `if` et le `else`. |
| La lampe ne change jamais | `N_SEUIL` est-il réglé ? La comparaison est-elle dans le bon sens ? |
| La carte n'apparaît pas | Le `.json` va dans `diagram.json`. |
:::

::: question 5 [6 pt]
**a)** Recopiez les lignes que vous avez écrites : nuit, lampe à 30 % ; jour, lampe éteinte.

**b)** Testez à 500 lux, puis à 5 lux. Notez ce que fait la lampe.

☐ Visa 3 du professeur, sur l'écran : éteinte à 500 lux, 30 % à 5 lux.
:::

::: reponse 4
```python
    if n > N_SEUIL:
        regler_lampe(30)
    else:
        regler_lampe(0)
```
Avec `N_SEUIL = 3413` (1 pt) ; condition, deux-points et décalage (2 pt) ; relevés notés (1 pt) ; validé à l'écran (2 pt).
:::

::: question 6 [3 pt]
Le gardien veut une lumière douce de **10 %** au crépuscule, quand $N$ est plus grand que 2 500 sans dépasser 3 413. **a)** Écrivez les deux lignes à ajouter (`elif` = « sinon, si »). **b)** Où les placez-vous : avant le `if`, entre le `if` et le `else`, ou après le `else` ?
:::

::: reponse 3
a) `    elif n > 2500:` puis `        regler_lampe(10)` (2 pt). b) Entre le bloc du `if` (nuit) et le `else` : Python s'arrête au premier cas vrai, la nuit doit être testée d'abord (1 pt).
:::

::: dire
Geste par geste au début, **mains levées** quand le circuit est chargé. Au bout de 3 minutes, aller d'abord aux postes sans carte à l'écran. Le visa 3 se donne **devant l'écran**, en réglant vous-même la lumière.
:::

## Bilan

::: retenir 5 min
- Le microcontrôleur [[lit]], [[décide]], [[agit]], et recommence sans arrêt.
- Une variable est une [[boîte]] : elle garde la dernière valeur rangée.
- `if` / `else` : Python ne fait qu'[[un seul]] des deux blocs.
- Un programme peut être bien écrit et faire le [[contraire]] de ce qu'on veut : il faut le [[tester]].
:::

::: dire
Compléter la trace écrite avec eux (3 min), puis **se placer à la porte** : chacun sort en donnant sa fiche (2 min). Cocher « Fiche rendue » sur la grille au fur et à mesure. « La prochaine fois, le lampadaire **compte le temps** : il reste allumé après le passage du piéton. »
:::
