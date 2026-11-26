---
titre: "Amener la séance : panne dans l'allée (D1)"
niveau: Term STI2D SIN
sequence: T2
court: Lampadaire en panne
type: contexte
competences: [CO5.8-SIN2, 2.4.3b, 4.3.5b, 4.3.5c]
accroche: "TSTI2D1, vendredi 27 novembre, 12 h. À lire avant la séance : la présentation au tableau, le plan de bataille pour que tout le monde rende sa fiche, et de quoi raconter."
---

::: info En une phrase, pour les élèves
« Un lampadaire qui décide tout seul quand s'allumer, c'est une carte à quelques euros et dix lignes de Python. Aujourd'hui, ces dix lignes sont en panne : vous allez les réparer. »
:::

### Le plan de bataille

| Moment | Ce que je fais |
| :--- | :--- |
| **La veille** | J'écris le nom de chaque élève en haut de sa fiche (14 fiches + 1 pour l'absent). Je recopie la grille des visas sur ma liste d'appel. |
| **Avant qu'ils entrent** | Fiches posées sur les tables : **c'est mon plan de classe** (je sépare les plus bavards, deux par poste). Écrans éteints. Au tableau : « 15 min de cours, 3 étapes, 3 visas ». |
| **Minute 1** | Debout, porte fermée, j'attends le silence. J'annonce le contrat (ci-dessous), **une seule fois, calmement**. |
| **Les 15 min de cours** | Écrans éteints, stylos en main. Les deux questions éclair se font **sur la fiche** avant de lever la main : tout le monde écrit quelque chose. |
| **Les 30 min d'activité** | Je circule **avec ma liste** : chaque visa est coché devant l'élève. Je commence toujours par ceux qui n'ont rien écrit. |
| **Les 2 dernières minutes** | Je suis **à la porte**. On sort en me donnant sa fiche. Je coche « rendue ». |

**Le contrat, à dire en début d'heure** : « Votre nom est déjà sur votre fiche. Aujourd'hui, 15 minutes de cours, puis trois étapes. À chaque étape, je passe et je mets un visa : il compte même si vous perdez la fiche. On sort en me donnant sa fiche. Une fiche qui ne m'est pas rendue, c'est un non-rendu. Et la note peut remplacer celle du 20 novembre si elle est meilleure. »

**Pour ceux qui ne rendaient pas** : ils ne peuvent plus « oublier » une fiche qui porte déjà leur nom, et la sortie se fait fiche en main. S'il en manque une malgré tout, la grille des visas donne une note partielle (la moitié des points des étapes visées) : c'est juste pour celui qui a travaillé, et moins intéressant que de rendre.

### La présentation au tableau (3 minutes)

1. **Dessiner** au tableau trois cases reliées par des flèches : `capteur de lumière` → `carte (microcontrôleur)` → `lampe`. Écrire au-dessus : **lire → décider → agir**.
2. **Dire** : « Depuis 2022 et la hausse du prix de l'électricité, beaucoup de communes éteignent ou baissent l'éclairage la nuit. Mais une rue noire, ça inquiète. La solution : un lampadaire qui décide tout seul. Dans la boîte, une carte à quelques euros, l'ESP32, et un programme d'une dizaine de lignes. »
3. **Montrer la diapo** du gardien : « Depuis la mise à jour, la lampe brille le jour et s'éteint la nuit. Le matériel marche. Qui est coupable ? » Laisser répondre : le programme.
4. **Écrire en gros dans un coin**, pour toute l'heure : **grand N = nuit**.

### Pourquoi on fait ça (si un élève demande « à quoi ça sert ? »)

- **Le bac** : l'épreuve de spécialité demande de lire et de compléter un programme ; les `si / sinon` sont partout.
- **Le projet de janvier** : chaque groupe programmera son propre objet. Ce qu'on fait aujourd'hui, c'est la base.
- **La vie** : la lumière de la cage d'escalier, l'éclairage du couloir, la lampe du jardin à détecteur, le thermostat. Tous ont un programme de ce genre.

### Anecdotes vraies, à placer au bon moment

| Quand | Anecdote |
| :--- | :--- |
| Avant le tournoi des bugs | **Le premier « bug »** : le 9 septembre 1947, l'équipe de Grace Hopper trouve un papillon de nuit coincé dans un relais du calculateur Harvard Mark II, et le scotche dans le cahier de bord avec la mention « First actual case of bug being found ». Message : tout le monde fait des bugs ; le métier, c'est de les trouver. |
| Pendant l'étape 1 | Un programme peut être bien écrit et faire le contraire de ce qu'on veut, et ça arrive aussi aux professionnels : en 1999, la sonde Mars Climate Orbiter a été perdue parce qu'une équipe calculait en unités anglaises et l'autre en unités du système international. Le programme marchait ; personne n'avait vérifié que les deux parlaient la même langue. |
| En écrivant du Python | **Python ne doit pas son nom au serpent** : son créateur, Guido van Rossum, était fan des Monty Python. |
| En ouvrant Wokwi | **L'ESP32** vient de l'entreprise chinoise Espressif ; il coûte quelques euros et contient le Wi-Fi et le Bluetooth. On le trouve dans des prises et des ampoules connectées. |

### Ce qui bloque souvent, et comment débloquer

| Blocage | Ce que je dis ou je fais |
| :--- | :--- |
| « $N$ augmente quand il fait sombre ? » | « Oui, c'est le capteur qui est câblé comme ça. » Montrer le coin du tableau : grand N = nuit. |
| L'élève exécute le `if` **et** le `else` | Lui faire poser le doigt sur **une seule** ligne : « Vrai → je fais ce qui est sous le if, et je saute le else. » |
| Message rouge, élève découragé | « Le message dit quelle ligne. On la lit ensemble. » 9 fois sur 10 : deux-points ou décalage. |
| La carte n'apparaît pas dans Wokwi | Le `.json` est collé dans `main.py` au lieu de `diagram.json`. |
| L'élève ne fait rien | Lui donner un rôle tout de suite : « Tu me lis la ligne 5, je t'écoute. » Puis rester 30 secondes à côté de lui, sans parler. |

### Si la classe décroche

Tout le monde éteint son écran. Une seule question au tableau : « Il est minuit, $N$ = 3 900. Que fait la lampe, et **quelle ligne** le décide ? » Faire venir un élève pointer la ligne. Puis reprendre l'étape en cours.
