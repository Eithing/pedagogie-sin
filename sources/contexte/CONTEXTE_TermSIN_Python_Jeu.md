---
titre: "Amener la séance : Python, le moteur des jeux vidéo, et le jeu des réflexes (D2)"
niveau: Term STI2D SIN
sequence: T2
court: Python jeu video
type: contexte
competences: [CO5.8-SIN2, 2.4.3b, 2.4.5, 4.3.5a, 4.3.5b]
accroche: "TSTI2D2, vendredi 27 novembre, bloc de 3 h : une heure au tableau, puis deux heures de TP noté sur Wokwi. À lire avant : la présentation, le plan de bataille, et des anecdotes de jeux vidéo vraies."
---

::: info En une phrase, pour les élèves
« Votre jeu préféré, c'est une boucle qui tourne 60 fois par seconde, des variables et des si. Ce matin, vous apprenez ces trois outils ; cet après-midi, vous programmez un vrai jeu, et le meilleur temps de la classe gagne. »
:::

### Le plan de bataille pour les 3 heures

| Moment | Ce que je fais |
| :--- | :--- |
| **0 h 00 à 0 h 55 : cours au tableau** | Écrans **éteints**, tables face au tableau. 4 équipes de 3, un tableau des scores au tableau : 1 point par bonne réponse aux questions projetées, 1 par manche du tournoi. Le score ne compte pas dans la note, mais c'est lui qui les fait répondre. |
| **Pause** | Pendant la pause : j'ouvre Wokwi sur mon poste, le jeu chargé, prêt à projeter. |
| **1 h 05 à 1 h 20 : démarrage ensemble** | **Geste par geste, mains levées** à chaque étape (« Main levée quand vous voyez la carte »). Personne ne part devant. Je fais une partie au vidéoprojecteur, en annonçant mon temps : « Battez-moi. » |
| **1 h 20 à 2 h 50 : missions** | Un binôme par poste, une fiche chacun (c'est elle qui est notée). Chaque mission se **valide à l'écran** : je coche la fiche et ma liste. Je ne reste jamais plus d'une minute à un poste. |
| **Le tableau des records** | Dès la mission 3 finie, le binôme écrit son meilleur temps au tableau. **Seuls ceux qui ont l'anti-triche (mission 4) peuvent jouer la finale.** C'est le moteur des 2 heures. |
| **2 h 50 à 3 h 00 : la finale** | Les trois meilleurs binômes rejouent une manche sur le poste projeté. Puis ramassage des fiches **à la porte**. |

**Pour les relancer sans menacer** (ils travaillent quand on les relance, mais il faut le faire souvent) : passer toutes les 10 minutes à chaque poste avec la même question : « Tu en es à quelle mission ? Montre-moi. » Afficher au tableau les missions validées de chaque binôme (un trait par mission) : ceux qui sont en retard le voient.

### La présentation au tableau (4 minutes)

1. « Qui joue à des jeux vidéo ? À quoi ? » Écrire 3 ou 4 noms de jeux au tableau.
2. « Dans **tous** ces jeux, il y a la même chose. » **Dessiner** au tableau trois cases en rond : **lire** (la manette) → **décider** (touché ? plus de vie ?) → **afficher** (l'image), et écrire au milieu : **60 fois par seconde**.
3. « Les décisions, ce sont des lignes de code, avec trois outils seulement : la **variable** (la barre de vie), le **si** (game over ?), la **boucle** (la partie continue tant que…). »
4. « Et c'est exactement ce que fait un objet technique : le lampadaire lisait son capteur, décidait, réglait sa lampe. Cet après-midi, vous programmez un jeu sur la même carte que le lampadaire, l'ESP32. Il sera noté, et le meilleur temps de réaction de la classe sera au tableau. »

### Anecdotes vraies, à placer au bon moment

| Quand | Anecdote |
| :--- | :--- |
| En ouverture | **Le premier jeu vidéo d'action**, *Tennis for Two*, a été créé en 1958 par le physicien William Higinbotham pour la journée portes ouvertes de son laboratoire, sur l'écran d'un **oscilloscope**. Des files d'attente se sont formées pour y jouer. |
| Sur les variables | ***Super Mario Bros.*** (1985) tient en **40 Ko** : 32 Ko de programme et 8 Ko de graphismes. Une seule photo de votre téléphone pèse cent fois plus. Les programmeurs comptaient chaque octet. |
| Sur la boucle | Dans ***Space Invaders*** (1978), les envahisseurs accélèrent quand il en reste peu. Au départ, ce n'était pas voulu : le processeur avait moins de dessins à faire à chaque tour de boucle, donc la boucle tournait plus vite. Le créateur, Tomohiro Nishikado, a gardé l'effet, qui rend la fin de partie stressante. |
| Sur les bugs | Le **niveau 256 de *Pac-Man*** est injouable : la moitié droite de l'écran est remplie de symboles. Le numéro du niveau était rangé dans un octet, qui ne dépasse pas 255. Un bug de variable, trouvé par les meilleurs joueurs du monde. |
| Sur le premier bug | Le 9 septembre 1947, l'équipe de Grace Hopper trouve un papillon de nuit coincé dans un relais du calculateur Harvard Mark II, et le scotche dans le cahier de bord : « First actual case of bug being found ». |
| Pendant le TP | **Le temps de réaction** d'un humain à une lumière est d'environ un quart de seconde. Au départ d'un 100 m, un sprinteur qui part moins de 0,1 s après le coup de pistolet est disqualifié pour faux départ : on considère qu'il a anticipé. C'est exactement l'anti-triche de la mission 4. |

### Pourquoi c'est utile pour eux

- **Le bac** : lire et compléter un programme, avec des `si` et des boucles, tombe à l'épreuve de spécialité.
- **Le projet de janvier** (2 h par semaine) : chaque groupe programmera son objet. Ceux qui savent écrire un `if` et une boucle ne dépendront pas des autres.
- **Les métiers** : développeur de jeux, mais aussi tous les métiers de l'informatique embarquée (automobile, domotique, robotique) ; c'est la même boucle « lire, décider, agir ».

### Ce qui bloque souvent, et comment débloquer

| Blocage | Ce que je dis ou je fais |
| :--- | :--- |
| `pv = pv - 30` : « C'est faux en maths ! » | « En Python, `=` veut dire "range dans". On calcule à droite avec l'ancienne valeur, puis on range à gauche. » Dessiner la boîte. |
| L'élève fait tous les cas du `if / elif / else` | « Python s'arrête au premier vrai. Le doigt sur la ligne : vrai ? Alors on saute tout le reste. » |
| Il oublie de remonter au `while` | Faire une flèche au tableau de la dernière ligne décalée vers le `while`. « À chaque tour, on revient ici et on repose la question. » |
| `IndentationError` dans Wokwi | 4 espaces de plus sous le `if`. Faire sélectionner les lignes et montrer la touche Tab. |
| Mission 4 : « Je ne sais pas où écrire » | « Tu effaces les deux lignes marquées TODO mission 4, et tu écris à leur place, avec le même décalage. » |
| Le jeu affiche « TRICHE » sans raison | L'élève garde le bouton appuyé entre deux manches : c'est normal, il faut le lâcher. |

### Si la classe décroche pendant le TP

Écrans éteints 2 minutes. Au tableau, je projette le programme d'un binôme qui a fini la mission 3 (avec son accord) : « Qui me dit ce que fait cette ligne ? » Puis : « Il reste 40 minutes, la finale est dans 30 minutes, et seuls ceux qui ont l'anti-triche la jouent. » On rallume.
