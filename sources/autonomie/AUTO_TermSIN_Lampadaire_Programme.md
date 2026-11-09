---
titre: Du diagramme d'états au programme — le jour et la nuit, pas à pas
niveau: Term STI2D SIN
sequence: T2
court: Lampadaire programme jour nuit
pronote:
  - pour: "TSTI2D3 (mardi 10 novembre)"
    titre: "T2 Traiter l'information par programme — Travail à distance : du diagramme d'états au programme, le jour et la nuit (Wokwi)"
    description: "T2 (distanciel, blocus) : premier programme du lampadaire en MicroPython sur Wokwi, guidé pas à pas : lire un capteur, comparer à un seuil, décider avec if / elif / else. Non noté, rendu obligatoire."
  - pour: "TSTI2D1 (vendredi 13 novembre, si distanciel)"
    titre: "T2 Traiter l'information par programme — Travail à distance : du diagramme d'états au programme, le jour et la nuit (Wokwi)"
    description: "T2 (distanciel, blocus) : premier programme du lampadaire en MicroPython sur Wokwi, guidé pas à pas : lire un capteur, comparer à un seuil, décider avec if / elif / else. Non noté, rendu obligatoire."
type: autonomie
duree: 55 min
illustration: ../cours/img/lampadaire/couverture.svg
accroche: "Le diagramme d'états dit ce que le lampadaire doit faire. Aujourd'hui, tu l'écris en programme, ligne par ligne."
competences: [CO5.8-SIN2, 2.4.3b, 4.3.5b, 4.3.5c, 3.4.2b]
document_reponse: true
fichiers: [fichiers/lampadaire_jour_nuit/circuit_lampadaire_jour_nuit.json, fichiers/lampadaire_jour_nuit/lampadaire_jour_nuit.py]
consignes:
  - "Travail individuel, à distance, sur ordinateur, pendant l'heure de cours. Suis les étapes dans l'ordre, une par page."
  - "Wokwi s'utilise sans compte, dans le navigateur. Aux étapes marquées 📸, fais une capture d'écran (Windows + Maj + S) et colle-la (Ctrl + V) dans ton document réponse."
  - "Tu n'as jamais programmé en Python ? Pas de problème : chaque ligne à écrire est expliquée, avec un exemple juste avant."
rendu:
  - "Ton document réponse REPONSES_NOM_Prenom (Word ou LibreOffice), avec les questions 1 à 6, ton programme final et les 2 captures d'écran 📸."
  - "Dépôt dans le devoir « Lampadaire : jour et nuit » de l'ENT, avant la date indiquée."
  - "Ce travail n'est pas noté, mais il est obligatoire."
aide:
  - "Pendant l'heure, je suis disponible sur la messagerie de l'ENT. Envoie-moi une capture d'écran de ton écran Wokwi si quelque chose ne marche pas."
  - "Message rouge dans le moniteur série ? Regarde le numéro de ligne indiqué : c'est souvent un « : » oublié à la fin d'un if, ou un décalage (indentation) qui n'est pas le même que dans l'exemple."
  - "Tu n'as qu'un téléphone ? Préviens-moi dès le début de l'heure, et fais les questions 1, 2 et 3, qui ne demandent pas Wokwi."
---

::: prof
**Mise en œuvre** : TSTI2D3 le mardi 10 novembre (1 h, distanciel) ; TSTI2D1 le vendredi 13 novembre si le blocus continue. Suite de la séance sur le diagramme d'états du lampadaire. On ne revient plus sur le calcul du CAN : le seuil $N_{seuil} = 3\,413$ est donné. Déposer sur l'ENT ce PDF, le document réponse `REPONSES_AUTO_TermSIN_Lampadaire_Programme.docx`, `circuit_lampadaire_jour_nuit.json` et `lampadaire_jour_nuit.py` (dossier `eleve/`). Ces fichiers portent des noms propres à cette fiche, pour que Pronote les accepte.

**Très guidé** : chaque structure (`if`, `else`, `elif`, `and`) est présentée sur un exemple qui n'est pas le lampadaire (la minuterie de l'escalier), puis l'élève l'applique. Les D2 ont le TP complet (`AUTO_TermSIN_Lampadaire_Wokwi`), avec la temporisation non bloquante ; ici, il n'y a pas de temporisation.

**Tests** : le circuit est celui du TP des D2, testé sur Wokwi le 5 novembre (N = 1 001 à 500 lux, N = 3 646 à 5 lux, « Simulate motion »). Le programme de départ se compile sans erreur, et la logique de la solution finale a été vérifiée sur ces valeurs (jour : 0 % ; nuit : 30 % ; nuit et présence : 100 %). **La solution n'a pas pu être relancée dans Wokwi le 9 novembre**, car le simulateur tournait trop lentement : la faire tourner une fois avant de diffuser.
:::

::: info Comment répondre et rendre ton travail
1. Télécharge sur l'ENT **`REPONSES_AUTO_TermSIN_Lampadaire_Programme.docx`** et ouvre-le avec Word ou LibreOffice Writer. Enregistre-le sous le nom **`REPONSES_NOM_Prenom`**.
2. Télécharge aussi **`circuit_lampadaire_jour_nuit.json`** (le circuit) et **`lampadaire_jour_nuit.py`** (le programme de départ). Tu les ouvriras avec le Bloc-notes à l'étape 2.

**Attention** : sans compte, Wokwi **n'enregistre pas** ton travail. Copie ton programme dans ton document réponse avant de fermer l'onglet.

Une réponse que tu n'as pas trouvée s'écrit « je n'ai pas trouvé » : c'est mieux qu'une case vide.
:::

## Étape 1 — Ce que le programme doit faire (5 min)

::: figure Le diagramme d'états du lampadaire
![](../cours/img/lampadaire/etats.svg){width=100%}
:::

Aujourd'hui, on programme une version simplifiée, **sans compter les 60 secondes** :

- le jour, la lampe est **éteinte** ;
- la nuit, elle est à **30 %** ;
- la nuit, si quelqu'un passe, elle est à **100 %**.

Le capteur de lumière donne un code $N$ **grand quand il fait sombre**. La nuit tombe quand $N$ dépasse le seuil $N_{seuil} = 3\,413$.

::: question 1
D'après ces règles, à combien est la lampe dans chaque cas ? **a)** $N = 1\,000$, personne · **b)** $N = 3\,800$, personne · **c)** $N = 3\,800$, quelqu'un passe · **d)** $N = 1\,000$, quelqu'un passe
:::

::: reponse 0
a) 0 % (jour) ; b) 30 % (nuit) ; c) 100 % (nuit et présence) ; d) 0 % (c'est le jour : la présence ne change rien).
:::

## Étape 2 — Démarrer dans Wokwi (10 min)

1. Ouvre `wokwi.com/projects/new/micropython-esp32`. Aucun compte n'est nécessaire.
2. Ouvre **`circuit_lampadaire_jour_nuit.json`** avec le Bloc-notes, copie tout, puis colle-le **à la place** du contenu de l'onglet `diagram.json` de Wokwi.
3. Ouvre **`lampadaire_jour_nuit.py`** avec le Bloc-notes, copie tout, puis colle-le **à la place** du contenu de l'onglet `main.py`.
4. Clique sur ▶ : le moniteur série, en bas, affiche `N = …` deux fois par seconde.
5. **Tu ne vois pas les capteurs ?** Ils sont à gauche de la carte : fais glisser le fond du schéma avec la souris, ou dézoome avec la molette.
6. Pendant la simulation, **clique sur le capteur de lumière** : un curseur permet de changer l'éclairement (en lux). Il n'est pas très précis : une valeur proche suffit.

::: question 2
Relève $N$ pour un éclairement d'environ **500 lux** (le jour), puis d'environ **5 lux** (la nuit). Dans quel sens $N$ varie-t-il quand la nuit tombe ?
:::

::: reponse 0
Environ 1 000 à 500 lux, et environ 3 650 à 5 lux. $N$ augmente quand il fait plus sombre.
:::

## Étape 3 — Lire le programme : décider avec if et else (10 min)

Le programme répète sans arrêt la boucle `while True:`. À chaque tour, il lit le capteur (`n = capteur.read()`), puis il doit **décider**. Pour cela, Python utilise `if` (« si ») et `else` (« sinon »).

::: info Exemple : la minuterie de l'escalier
```python
if bouton == 1:          # si on appuie sur le bouton...
    regler_lampe(100)    # ...la lampe s'allume
else:                    # sinon...
    regler_lampe(0)      # ...elle s'eteint
```

Trois règles à respecter :

- la ligne `if` et la ligne `else` se terminent par **deux-points** `:` ;
- les lignes « à faire » sont **décalées de 4 espaces** vers la droite : ce décalage s'appelle l'**indentation** ;
- `==` sert à **comparer** (est-ce égal ?), `=` sert à **ranger** une valeur dans une variable. On compare aussi avec `>` (plus grand que) et `<` (plus petit que).
:::

::: question 3
**a)** Dans le programme de départ, à quoi sert la ligne `N_SEUIL = 0` ? Quelle valeur faudra-t-il y mettre ?

**b)** Pour dire « s'il fait nuit » en Python, laquelle de ces trois lignes est juste : `if n = N_SEUIL:`, `if n > N_SEUIL:` ou `if n < N_SEUIL:` ? Explique avec le sens de variation de $N$.
:::

::: reponse 0
a) Elle range le seuil jour / nuit dans la variable `N_SEUIL` ; il faut y mettre 3413. b) `if n > N_SEUIL:` : il fait nuit quand $N$ est plus grand que le seuil, puisque $N$ augmente quand la lumière baisse. `=` n'est pas une comparaison.
:::

## Étape 4 — Programmer le jour et la nuit (15 min)

Dans l'onglet `main.py` de Wokwi :

1. Remplace `N_SEUIL = 0` par `N_SEUIL = 3413`.
2. Dans la boucle, **remplace** la ligne `regler_lampe(0)` qui suit le commentaire `# TODO etape 4` par ces quatre lignes, en gardant le même décalage que les lignes autour :

```python
    if n > N_SEUIL:
        regler_lampe(30)
    else:
        regler_lampe(0)
```

3. Relance la simulation (▶). Fais varier l'éclairement : la lampe jaune doit s'allumer faiblement quand il fait sombre et s'éteindre quand il fait jour.

::: question 4
📸 Colle une capture d'écran de Wokwi **de nuit**, avec la lampe allumée et la valeur de $N$ visible dans le moniteur série. Explique en une phrase ce que font tes quatre lignes.
:::

::: reponse 0
Capture : lampe allumée faiblement, $N$ supérieur à 3 413. Les lignes signifient : s'il fait nuit (N plus grand que le seuil), lampe à 30 % ; sinon, lampe éteinte.
:::

## Étape 5 — Ajouter le piéton (10 min)

::: info Deux nouvelles idées
- `elif` veut dire « sinon, si… » : il permet d'ajouter un cas entre `if` et `else`. Python teste les cas **dans l'ordre** et s'arrête au premier qui est vrai.
- `and` veut dire « et » : `if a > 5 and b == 1:` est vrai seulement si les **deux** conditions sont vraies.

```python
if bouton == 1 and nuit == 1:    # appui ET nuit
    regler_lampe(100)
elif nuit == 1:                  # sinon, si c'est la nuit
    regler_lampe(30)
else:                            # sinon (le jour)
    regler_lampe(0)
```
:::

Sur le même modèle, **modifie tes quatre lignes** pour que la lampe soit à **100 %** quand il fait nuit **et** que quelqu'un passe (`presence == 1`), à 30 % la nuit sans personne, et éteinte le jour. Teste ensuite : de nuit, clique sur le **détecteur de présence** (PIR), puis sur **« Simulate motion »**. Sa sortie passe à 1 pendant 5 s environ.

::: question 5
Recopie tes lignes `if`, `elif` et `else`. 📸 Colle une capture d'écran de nuit avec `presence = 1` dans le moniteur série et la lampe allumée à fond.
:::

::: reponse 0
```python
    if n > N_SEUIL and presence == 1:
        regler_lampe(100)
    elif n > N_SEUIL:
        regler_lampe(30)
    else:
        regler_lampe(0)
```
Capture : `presence = 1`, N supérieur à 3 413, lampe à pleine luminosité.
:::

::: question 6
Pourquoi faut-il écrire le cas « nuit **et** présence » **avant** le cas « nuit » ? Aide : Python s'arrête au premier cas vrai. Que se passerait-il si on les inversait ?
:::

::: reponse 0
Si le cas « nuit » était testé en premier, il serait vrai dès qu'il fait nuit, même avec un piéton : Python s'arrêterait là et la lampe resterait à 30 %. Le cas le plus précis doit donc venir en premier.
:::

## Étape 6 — Ce que je retiens, puis je dépose (5 min)

Complète ce bilan dans ton document réponse, où il est déjà recopié.

::: retenir
- Un programme de microcontrôleur répète une [[boucle]] : il lit ses capteurs, décide, puis agit.
- `if` veut dire [[si]], `elif` veut dire [[sinon si]], `else` veut dire [[sinon]]. Les lignes `if`, `elif` et `else` finissent par deux-points.
- `==` sert à [[comparer]] ; `=` sert à ranger une valeur dans une variable.
- Les cas sont testés dans l'[[ordre]] : le cas le plus précis s'écrit en premier.
:::

Copie ton programme complet dans ton document réponse, **enregistre-le** et **dépose-le sur l'ENT**, dans le devoir « Lampadaire : jour et nuit ».

::: info Réponses des étapes 1 et 3, pour te corriger
**Q1.** a) 0 % ; b) 30 % ; c) 100 % ; d) 0 %. **Q3.** a) Elle range le seuil jour / nuit ; il faut y mettre 3413. b) `if n > N_SEUIL:`, car $N$ augmente quand il fait sombre.
:::
