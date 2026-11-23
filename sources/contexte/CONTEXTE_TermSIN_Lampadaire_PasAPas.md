---
titre: "Amener la séance : le lampadaire pas à pas"
niveau: Term STI2D SIN
sequence: T2
court: Lampadaire pas a pas
type: contexte
competences: [CO5.8-SIN2, 2.4.3b, 4.3.5b, 4.3.5c]
accroche: "Pour D3 (mardi 24 novembre) et D1 (vendredi 27 novembre, 12 h). À lire avant la séance : ce que vous pouvez raconter, et comment donner du sens à ce qu'on fait."
---

::: info En une phrase, pour les élèves
« Aujourd'hui, vous écrivez la décision d'un objet qui fonctionne tout seul, nuit après nuit, sans que personne ne le touche : c'est ça, l'informatique embarquée. »
:::

### Le problème de départ : pourquoi on fait ça

- **Le constat** : beaucoup de communes françaises éteignent ou baissent l'éclairage public une partie de la nuit, pour économiser l'énergie (le mouvement s'est accéléré avec la hausse du prix de l'électricité en 2022). Mais une rue noire inquiète les habitants et les piétons.
- **La solution technique** : un lampadaire qui **veille** à faible puissance et **s'allume à fond** quand quelqu'un passe. Il en existe déjà dans des parkings, des allées, des pistes cyclables.
- **Le lien avec eux** : la lumière de la cage d'escalier qui s'allume au passage, l'éclairage du couloir du lycée, la lampe du jardin à détecteur. Ils en croisent tous les jours sans se demander qui a écrit la décision.

### Amener la séance (les 3 premières minutes)

1. Éteindre la lumière de la salle quelques secondes (si possible) : « Si c'était une rue, est-ce qu'on laisserait tout allumé toute la nuit ? Qui paie ? »
2. Rallumer : « Et si la lampe décidait toute seule ? Il faudrait qu'elle sache trois choses : **est-ce qu'il fait nuit, est-ce que quelqu'un passe, et quoi faire**. »
3. Montrer la diapo de l'allée : « Ce dessin, c'est le cahier des charges. Aujourd'hui, on le transforme en programme, **pas à pas**, et d'abord sans ordinateur. »

### Le fil rouge à répéter : lire, décider, agir

Le microcontrôleur n'est **pas intelligent** : il exécute une recette, dans l'ordre, des millions de fois. Revenir à cette phrase à chaque blocage : « Qu'est-ce qu'il **lit** ? Qu'est-ce qu'il **décide** ? Qu'est-ce qu'il **fait** ? »

### Anecdotes vraies, à placer au bon moment

| Quand | Anecdote |
| :--- | :--- |
| Avant les pièges de Python | **Le premier « bug »** : le 9 septembre 1947, l'équipe de Grace Hopper trouve un papillon de nuit coincé dans un relais du calculateur Harvard Mark II. Il est scotché dans le cahier de bord avec la mention « First actual case of bug being found ». Le mot « bug » existait déjà chez les ingénieurs ; ce papillon l'a rendu célèbre. Message : **tout le monde fait des bugs**, le métier consiste à les trouver. |
| Pendant l'activité 1 | **Ada Lovelace**, en 1843, écrit pour une machine qui n'a jamais été construite (la machine analytique de Babbage) ce qu'on considère comme le premier programme publié. Elle l'a déroulé à la main, comme eux dans l'activité 1. |
| Quand on écrit en Python | **Python ne doit pas son nom au serpent** : son créateur, Guido van Rossum, était fan des **Monty Python**, la troupe comique britannique. |
| En ouvrant Wokwi | **La carte ESP32** vient de l'entreprise chinoise Espressif ; elle coûte quelques euros et contient le Wi-Fi et le Bluetooth. On la trouve dans des prises connectées, des ampoules connectées, des capteurs de jardin. |
| Pour les curieux | **Arduino**, l'autre carte célèbre, porte le nom d'un bar d'Ivrea, en Italie, où ses créateurs se retrouvaient ; le bar lui-même portait le nom d'un roi d'Italie du Moyen Âge. |

### Pourquoi c'est utile pour eux

- **Le bac** : l'épreuve de spécialité 2I2D demande de lire et de compléter un algorithme ou un programme ; les structures `si / sinon` sont partout.
- **Le projet** : en janvier, ils programmeront leur propre objet ; cette séance est la base.
- **Les métiers** : technicien en domotique, en éclairage public, en maintenance de bâtiments connectés ; les villes recrutent sur la « smart city ».

### Ce qui bloque souvent, et comment débloquer

| Blocage | Ce que je dis ou je fais |
| :--- | :--- |
| « $N$ augmente quand il fait **sombre** ? C'est bizarre. » | « Oui, c'est le capteur qui est câblé comme ça. Retenez : grand $N$ = nuit. » L'écrire en gros dans un coin du tableau pour toute l'heure. |
| L'élève lit le `if` mais exécute aussi le `else` | Lui faire mettre le doigt sur **une seule** ligne : « Oui → je ne lis que ce qui est sous le if, je saute le else. » |
| Message rouge, élève découragé | « Le message dit quelle ligne. On la lit ensemble. » 90 % des cas : deux-points ou décalage. |
| La carte n'apparaît pas dans Wokwi | Le `.json` est collé dans `main.py`. |
| L'élève ne fait rien | Lui confier un rôle : « Tu me dictes les lignes, j'écris au tableau. » |

### Si la classe décroche

Repasser à l'oral, tous ensemble, sur une seule question : « Il est 23 h, quelqu'un passe. Que fait le lampadaire, et **quelle ligne** du programme le décide ? » Faire monter un élève au tableau pour pointer la ligne.
