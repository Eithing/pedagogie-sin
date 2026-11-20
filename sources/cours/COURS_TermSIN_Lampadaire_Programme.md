---
titre: "Du diagramme d'états au programme : le lampadaire, le jour et la nuit"
niveau: Term STI2D SIN
sequence: T2
court: Lampadaire programme
pronote:
  pour: "TSTI2D1 (vendredi 20 novembre, 12 h)"
  titre: "T2 Traiter l'information par programme — Séance : du diagramme d'états au programme, le lampadaire jour / nuit (Wokwi)"
  description: "T2, retour en présentiel : premier programme du lampadaire en MicroPython sur Wokwi (lire un capteur, comparer à un seuil, décider avec if / elif / else). Fiche d'activités notée /20."
type: cours
duree: 55 min
bareme: 20
illustration: img/lampadaire/couverture.svg
accroche: "Le diagramme d'états dit ce que le lampadaire doit faire. Aujourd'hui, vous l'écrivez en programme."
competences: [CO5.8-SIN2, 2.4.3b, 4.3.5b, 4.3.5c]
objectifs:
  - Traduire des règles de fonctionnement en conditions (if / elif / else)
  - Comparer une mesure à un seuil pour prendre une décision
  - Programmer et tester la commande d'une lampe sur un microcontrôleur simulé
prerequis:
  - "T1 : code N d'un CAN, seuil en code"
  - "T2 : diagramme d'états du lampadaire (séance ou fiche du 6 novembre)"
preparation:
  - Imprimer la fiche d'activités (1 par élève) ; déposer le PDF sur l'ENT pour les absents
  - "Mettre à disposition des élèves `circuit_lampadaire_jour_nuit.json` et `lampadaire_jour_nuit.py` (dossier `output/Term_STI2D_SIN/T2_Programmer_un_uC/eleve/T2_Distanciel_Lampadaire-programme-jour-nuit/`), sur l'ENT ou dans le dossier partagé du labo"
  - "Tester une fois le programme corrigé sur Wokwi (MicroPython sur ESP32), sur un poste du labo"
  - "Ouvrir le HTML de projection des diapos — F : plein écran, T : minuteur"
---

::: prof
**TSTI2D1, vendredi 20 novembre, 12 h : retour en présentiel.** La fiche à distance du 13 novembre (« jour et nuit ») a été remplacée par l'interrogation CAN : cette séance la reprend en classe, et **la fiche d'activités est notée /20**. Les D3 ont fait la même chose à distance le 10 novembre.

**Seul ou à deux** selon le nombre de présents et de postes : les activités 3 et 4 se font à un ou deux par poste, mais **chaque élève remplit et rend sa propre fiche**. Les points « validé par le professeur » se donnent en passant dans les rangs, sur l'écran du poste : cocher la case de la fiche et parapher.

**Sans poste ou sans Wokwi** (panne réseau) : faire les activités 3 et 4 sur la fiche, puis projeter la solution sur Wokwi depuis le poste du professeur ; les points de validation sont alors donnés pour les lignes écrites justes.
:::

::: prof Barème
| Activité | Questions | Ce qui est évalué | Points |
| :--- | :--- | :--- | :---: |
| 1. Échauffement | Q1 | Appliquer les règles du diagramme d'états | 2 |
| 2. Lire avant d'écrire | Q2, Q3 | Rôle du seuil, condition juste justifiée par le sens de variation de $N$ | 4 |
| 3. Le jour et la nuit | Q4, Q5 | Relevés cohérents, programme jour / nuit écrit et validé sur l'écran | 6 |
| 4. Le piéton | Q6, Q7 | if / elif / else avec `and`, validé sur l'écran ; ordre des cas justifié | 5 |
| 5. Quiz de sortie | Q8 à Q10 | Syntaxe et sens des conditions | 3 |
| **Total** | | | **20** |
:::

## Se poser la question

::: slide 3 min | L'allée du lycée, 22 h
![](img/lampadaire/etats.svg){width=88%}

> Aujourd'hui, on programme une **version simplifiée**, sans les 60 secondes : le jour, lampe **éteinte** ; la nuit, lampe à **30 %** ; la nuit, si quelqu'un passe, lampe à **100 %**.
:::

::: dire
- « Ce diagramme, c'est le cahier des charges. Un microcontrôleur ne lit pas un dessin : il faut l'écrire en instructions. »
- Rappeler : le capteur de lumière donne un code $N$ **grand quand il fait sombre** ; la nuit tombe quand $N$ dépasse $N_{seuil} = 3\,413$ (calculé en T1 : 2,75 V avec un CAN 12 bits de 3,3 V).
:::

::: activite 5 min | Échauffement : que fait la lampe ? | individuel
Appliquez les trois règles de la diapo. Rappel : la nuit tombe quand $N > 3\,413$.
:::

::: question 1 [2 pt]
À combien est la lampe dans chaque cas ?

**a)** $N = 1\,000$, personne · **b)** $N = 3\,800$, personne · **c)** $N = 3\,800$, quelqu'un passe · **d)** $N = 1\,000$, quelqu'un passe
:::

::: reponse 2
a) 0 % (jour) ; b) 30 % (nuit) ; c) 100 % (nuit et présence) ; d) 0 % : c'est le jour, la présence ne change rien. (0,5 pt par cas)
:::

## Décider avec if et else

::: slide 5 min | Décider en Python : if et else | fiche
```python
if bouton == 1:          # si on appuie sur le bouton...
    regler_lampe(100)    # ...la lampe s'allume
else:                    # sinon...
    regler_lampe(0)      # ...elle s'eteint
```

- Les lignes `if` et `else` finissent par **deux-points** `:`.
- Les lignes « à faire » sont **décalées de 4 espaces** : c'est l'**indentation**.
- `==` **compare** (est-ce égal ?) ; `=` **range** une valeur dans une variable. On compare aussi avec `>` et `<`.
:::

::: dire
- Exemple de la minuterie de l'escalier : le lire à voix haute en français (« si…, sinon… »).
- Montrer l'erreur classique au tableau : `if bouton = 1:`. « Le simple égal range, il ne compare pas : Python refuse la ligne. »
:::

::: activite 7 min | Lire avant d'écrire | individuel
Voici le début du programme de départ, puis la boucle qui se répète sans arrêt.

```python
N_SEUIL = 0   # TODO : seuil jour / nuit

while True:
    n = capteur.read()        # code du CAN : grand quand il fait sombre
    presence = pir.value()    # 1 si quelqu'un passe, 0 sinon
    # TODO : decider, puis regler la lampe
```
:::

::: question 2 [2 pt]
À quoi sert la ligne `N_SEUIL = 0` ? Quelle valeur faudra-t-il y mettre, et pourquoi ?
:::

::: reponse 3
Elle range le seuil jour / nuit dans la variable `N_SEUIL` (1 pt). Il faut y mettre **3413** : c'est le code du CAN à la tombée de la nuit (1 pt).
:::

::: question 3 [2 pt]
Pour dire « s'il fait nuit » en Python, quelle ligne est juste ? Entourez-la, puis justifiez avec le sens de variation de $N$.

`if n = N_SEUIL:` · `if n > N_SEUIL:` · `if n < N_SEUIL:`
:::

::: reponse 3
`if n > N_SEUIL:` (1 pt) : il fait nuit quand $N$ est **plus grand** que le seuil, puisque $N$ augmente quand la lumière baisse. `=` n'est pas une comparaison (1 pt).
:::

## Programmer et tester

::: slide 2 min | Ouvrir Wokwi et charger les fichiers | fiche
1. Ouvrez **Google Chrome** (ou Edge). Dans la **barre d'adresse** (pas dans Google), tapez `wokwi.com/projects/new/micropython-esp32`, puis Entrée. **Pas de compte** : si une fenêtre propose de se connecter, fermez-la.
2. À gauche, le **code**, avec deux onglets : `main.py` et `diagram.json`. À droite, le **schéma** (la carte ESP32).
3. Récupérez les deux fichiers du professeur (ENT ou dossier partagé du labo). **Clic droit** sur `circuit_lampadaire_jour_nuit.json` → **Ouvrir avec** → **Bloc-notes**, puis **Ctrl + A** (tout sélectionner) et **Ctrl + C** (copier).
4. Dans Wokwi, cliquez sur l'onglet `diagram.json`, puis **Ctrl + A** et **Ctrl + V** (coller) : la carte, le capteur de lumière, le détecteur PIR et la lampe apparaissent.
5. Même chose avec `lampadaire_jour_nuit.py`, collé dans l'onglet `main.py`.
:::

::: slide 2 min | Lancer, régler, modifier | fiche
- **▶ vert**, au-dessus du schéma : la simulation démarre en quelques secondes. Le **moniteur série**, sous le schéma, affiche `N = …` deux fois par seconde.
- **Régler la lumière** : pendant la simulation, cliquez sur le **capteur de lumière** (petit module à gauche de la carte) : un curseur règle l'éclairement en **lux**. Vous ne voyez pas les capteurs ? Faites glisser le fond du schéma, ou dézoomez avec la molette.
- **Modifier le code** : arrêtez d'abord la simulation (**■**), modifiez dans l'onglet `main.py`, puis relancez avec **▶**.
- **Wokwi n'enregistre rien** sans compte : recopiez vos lignes sur la fiche au fur et à mesure.
:::

::: dire
Montrer une fois toutes les étapes en direct sur le poste du professeur, en lisant chaque clic à voix haute, puis laisser faire. Passer d'abord voir les postes qui n'ont pas encore la carte à l'écran au bout de 3 minutes : le plus souvent, le fichier a été collé dans le mauvais onglet.
:::

::: activite 11 min | Le jour et la nuit | binome
Seul ou à deux sur un poste, mais **chacun remplit sa fiche**.

1. Lancez la simulation (▶), réglez la lumière, relevez $N$ (question 4).
2. Arrêtez (■). En haut de `main.py`, remplacez `N_SEUIL = 0` par `N_SEUIL = 3413`.
3. Plus bas, sous `# TODO etape 4`, **remplacez** la ligne `regler_lampe(0)` par la décision jour / nuit (diapo « if et else »), avec le même décalage que les lignes voisines.
4. Relancez (▶), testez de jour (500 lux) puis de nuit (5 lux).
5. **Appelez le professeur** pour faire valider votre écran.
:::

::: tableau Si ça ne marche pas | fiche
| Ce que je vois | Ce que je fais |
| :--- | :--- |
| Un message rouge `SyntaxError`, avec un numéro de ligne (`line 24`) | Je regarde cette ligne : il manque souvent les deux-points `:` à la fin du `if` ou du `else`, ou j'ai écrit `=` au lieu de `==`. |
| Un message `IndentationError` | Les lignes sous `if` et sous `else` doivent être décalées de **4 espaces de plus** que le `if`. |
| Rien ne s'affiche sous le schéma | La simulation n'est pas lancée : je clique sur **▶**. |
| La lampe ne change jamais | Je vérifie `N_SEUIL = 3413` et le sens de la comparaison : `n > N_SEUIL`. |
| La carte n'apparaît pas | Le fichier `.json` doit être collé dans l'onglet `diagram.json`, pas dans `main.py`. |
:::

::: question 4 [2 pt]
Relevez $N$ pour environ **500 lux** (jour), puis environ **5 lux** (nuit). Dans quel sens $N$ varie-t-il quand la nuit tombe ?
:::

::: reponse 2
Environ 1 000 à 500 lux et environ 3 650 à 5 lux (valeurs du simulateur, à quelques dizaines près) (1 pt). $N$ **augmente** quand il fait plus sombre (1 pt).
:::

::: question 5 [4 pt]
Recopiez vos lignes de décision : la nuit, lampe à 30 % ; le jour, lampe éteinte.

☐ Validé par le professeur sur l'écran : la lampe s'allume faiblement de nuit et s'éteint de jour.
:::

::: reponse 4
```python
    if n > N_SEUIL:
        regler_lampe(30)
    else:
        regler_lampe(0)
```
Lignes écrites justes, avec les deux-points et l'indentation (2 pt) ; fonctionnement validé sur l'écran (2 pt).
:::

::: slide 3 min | Un cas de plus : elif et and | fiche
```python
if bouton == 1 and nuit == 1:    # appui ET nuit
    regler_lampe(100)
elif nuit == 1:                  # sinon, si c'est la nuit
    regler_lampe(30)
else:                            # sinon (le jour)
    regler_lampe(0)
```

- `elif` veut dire « **sinon, si** » : un cas de plus entre `if` et `else`.
- `and` : vrai seulement si les **deux** conditions sont vraies.
- Python teste les cas **dans l'ordre** et s'arrête au **premier vrai**.
:::

::: activite 10 min | Le piéton | binome
Modifiez vos lignes : lampe à **100 %** la nuit **et** si quelqu'un passe (`presence == 1`), à 30 % la nuit sans personne, éteinte le jour.

Arrêtez la simulation (■) avant de modifier, puis relancez (▶) et testez. **Appelez le professeur** pour faire valider.
:::

::: tableau Tester le piéton | fiche
1. Simulation lancée (▶), lumière réglée vers **5 lux** : c'est la nuit, la lampe est à 30 %.
2. Cliquez sur le **détecteur PIR** (le module blanc à dôme, à gauche de la carte), puis sur le bouton **« Simulate motion »**.
3. Dans le moniteur série : `presence = 1` pendant **5 s environ**, et la lampe doit briller **à fond**.
4. Ensuite `presence = 0` : la lampe revient à 30 %.
5. Refaites le test **de jour** (500 lux) : la lampe doit rester éteinte, même avec un piéton.
:::

::: question 6 [3 pt]
Recopiez vos lignes `if`, `elif` et `else`.

☐ Validé par le professeur sur l'écran : 100 % de nuit avec `presence = 1`.
:::

::: reponse 5
```python
    if n > N_SEUIL and presence == 1:
        regler_lampe(100)
    elif n > N_SEUIL:
        regler_lampe(30)
    else:
        regler_lampe(0)
```
Lignes justes (2 pt) ; fonctionnement validé (1 pt).
:::

::: question 7 [2 pt]
Pourquoi faut-il écrire le cas « nuit **et** présence » **avant** le cas « nuit » ? Que se passerait-il si on les inversait ?
:::

::: reponse 3
Python s'arrête au premier cas vrai. Si « nuit » était testé en premier, il serait vrai dès qu'il fait nuit, même avec un piéton : la lampe resterait à 30 % (1 pt). Le cas le plus précis doit venir en premier (1 pt).
:::

::: dire
- Erreurs fréquentes à l'écran : « : » oublié, indentation différente des lignes voisines (message rouge avec le numéro de ligne), `=` à la place de `==`.
- Binômes en avance : ajouter un `print("etat :", ...)` qui affiche JOUR, NUIT ou PRESENCE.
:::

## Faire le bilan

::: retenir 4 min
- Un programme de microcontrôleur répète une [[boucle]] : il lit ses capteurs, décide, puis agit.
- `if` veut dire [[si]], `elif` veut dire [[sinon si]], `else` veut dire [[sinon]] ; ces lignes finissent par deux-points.
- `==` sert à [[comparer]] ; `=` sert à ranger une valeur dans une variable.
- Les cas sont testés dans l'[[ordre]] : le cas le plus précis s'écrit en premier.
:::

::: activite 3 min | Quiz de sortie | individuel | projeter
Répondez sur votre fiche.
:::

::: question 8 [1 pt]
Quelle ligne est correcte en Python ?

- [ ] `if n > N_SEUIL`
- [x] `if n > N_SEUIL:`
- [ ] `if n => N_SEUIL:`
:::

::: reponse 0
`if n > N_SEUIL:` : la ligne `if` finit par deux-points.
:::

::: question 9 [1 pt]
Avec `N_SEUIL = 3413`, `n = 3500` et `presence = 0`, que fait le programme de l'activité 4 ?

- [ ] lampe éteinte
- [x] lampe à 30 %
- [ ] lampe à 100 %
:::

::: reponse 0
Nuit sans piéton : le `elif` est le premier cas vrai, lampe à **30 %**.
:::

::: question 10 [1 pt]
Le signe `=` dans `N_SEUIL = 3413` sert à…

- [ ] comparer deux valeurs
- [x] ranger une valeur dans une variable
- [ ] afficher une valeur
:::

::: reponse 0
À **ranger** 3413 dans la variable `N_SEUIL`.
:::

::: dire
Ramasser les fiches. Annoncer la suite : la prochaine fois, le lampadaire **compte le temps** (les 60 s) sans s'arrêter de surveiller.
:::
