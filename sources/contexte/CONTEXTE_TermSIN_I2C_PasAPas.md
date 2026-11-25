---
titre: "Amener la séance : comment deux puces se parlent"
niveau: Term STI2D SIN
sequence: T3
court: I2C pas a pas
type: contexte
competences: [3.4.3a, 3.4.3b, 5.3.4b, CO7.3-SIN2]
accroche: "D2, vendredi 27 novembre, première partie du bloc de 3 h (rappel de code, I2C, nombres négatifs), avant le TP en missions. À lire avant la séance : ce que vous pouvez raconter, et comment donner du sens aux trames et aux octets."
---

::: info En une phrase, pour les élèves
« Un objet électronique, c'est une équipe de puces qui se parlent sans arrêt. Aujourd'hui, on apprend leur langue : comment un nombre passe d'une puce à l'autre sur un ou deux fils. »
:::

### Le problème de départ : pourquoi on fait ça

- **La chambre froide** : une porte mal fermée un vendredi soir, des centaines d'euros de surgelés perdus. Le capteur **sait** que la température monte ; encore faut-il qu'il le **dise** au microcontrôleur, puis que le microcontrôleur le dise au PC et déclenche l'alarme. Toute la séance, c'est ce « dire ».
- **Le lien avec eux** : leur téléphone. Quand ils le tournent, l'écran pivote : un accéléromètre a envoyé trois nombres au processeur, par un bus. Le capteur de luminosité règle l'écran, le capteur d'empreinte déverrouille… Tout ça passe par des bus comme l'I2C.

### Amener la séance (les 4 premières minutes)

1. « Sortez votre téléphone, tournez-le. L'écran a pivoté. Qui a décidé ça, et comment il l'a su ? »
2. « Un petit capteur a mesuré, puis il a **envoyé des nombres** au processeur, sur deux fils, en quelques millièmes de seconde. »
3. « Le capteur du TP de vendredi dernier, le MPU6050, est exactement ce genre de capteur. On s'en sert pour son thermomètre. »
4. « Vendredi, c'était trop d'un coup. Aujourd'hui, on reprend d'abord le code, puis une notion à la fois, sans ordinateur. Ensuite, quatre missions sur Wokwi. »

### Les trois images à installer

| Notion | Image |
| :--- | :--- |
| Liaison série asynchrone | Le **morse** : un seul fil, pas d'horloge commune, on se met d'accord sur la vitesse avant ; le bit de start, c'est le « Allô ? ». |
| Bus I2C | **L'appel en classe** : le maître donne le rythme (SCL), appelle un nom (l'adresse), seul l'élève appelé répond « présent » (ACK). |
| Complément à 2 | Le **compteur kilométrique** qui recule après zéro : `00000` moins 1 donne `99999`. Les grands nombres servent à écrire les négatifs. |

### Anecdotes vraies, à placer au bon moment

| Quand | Anecdote |
| :--- | :--- |
| Sur les bauds | Le **baud** porte le nom d'**Émile Baudot**, ingénieur français du télégraphe, qui a inventé dans les années 1870 un code où chaque caractère s'écrit sur 5 signaux : un ancêtre direct de la trame série. |
| Sur l'I2C | Le bus **I2C** a été inventé par **Philips** en 1982, pour faire parler entre elles les puces d'un téléviseur avec très peu de fils. Aujourd'hui, on le trouve dans presque tous les objets électroniques. |
| Sur les bus en général | Dans les voitures, le **bus CAN** (inventé par Bosch dans les années 1980) relie les calculateurs (moteur, freins, airbags) sur une paire de fils au lieu de dizaines de câbles séparés. Le garagiste branche sa valise de diagnostic sur ce bus. |
| Sur le complément à 2 | **Gangnam Style** (décembre 2014) : le compteur de vues de YouTube était un entier signé sur 32 bits, maximum 2 147 483 647. Le clip s'en est approché, et YouTube a dû passer le compteur sur 64 bits. Sur 16 bits, notre limite est 32 767 : même histoire, en plus petit. |
| Pour montrer que ça compte | **Ariane 5, vol 501** (4 juin 1996) : la fusée s'est autodétruite environ 40 secondes après le décollage. Cause : une valeur trop grande pour un entier signé sur 16 bits a provoqué une erreur dans le logiciel de navigation. Une erreur de taille de nombre, exactement le sujet du complément à 2. |

### Pourquoi c'est utile pour eux

- **Le bac** : décoder une trame (série ou I2C) et convertir un octet reviennent très souvent dans les sujets de 2I2D SIN.
- **Le projet** : dès qu'ils brancheront un capteur numérique (température, distance, écran OLED), ce sera en I2C.
- **Les métiers** : électronicien, technicien de maintenance automobile ou industrielle : lire une trame à l'oscilloscope est un geste de base.

### Ce qui bloque souvent, et comment débloquer

| Blocage | Ce que je dis ou je fais |
| :--- | :--- |
| L'élève lit les bits dans l'ordre d'arrivée | « Le premier arrivé, c'est D0, le plus petit. On écrit toujours le plus grand à gauche, comme en décimal : on retourne. » |
| Le passage binaire → hexadécimal | Revenir aux paquets de 4 bits ; écrire au tableau 8 4 2 1 au-dessus de chaque paquet. |
| « Pourquoi 65 536 ? » | « C'est le nombre de valeurs sur 16 bits : $2^{16}$. Le compteur a 65 536 positions, la moitié haute sert aux négatifs. » |
| Hexadécimal → décimal trop long | Donner les puissances au tableau : 4 096, 256, 16, 1, et A = 10… F = 15. Calculatrice autorisée. |
| L'élève est perdu dans le TP | Lui faire dire à quelle étape il en est, et lui montrer la méthode de cette fiche qui correspond. |

### Si la classe décroche

Refaire l'appel en classe avec trois élèves, en écrivant au tableau, à chaque appel, l'octet envoyé en binaire. Faire deviner à la classe le bit R/W avant de l'écrire.
