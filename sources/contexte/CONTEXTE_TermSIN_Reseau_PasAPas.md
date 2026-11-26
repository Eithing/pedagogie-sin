---
titre: "Amener la séance : le réseau du parking en quatre règles (D2 + D3)"
niveau: Term STI2D SIN
sequence: C1
court: Passerelle pas a pas
type: contexte
competences: [2.4.4b, 5.3.4a, 3.4.3c, CO3.2]
accroche: "Heure commune D2 + D3, vendredi 27 novembre. À lire avant la séance : le plan de bataille pour tenir la classe, la présentation au tableau, et comment noter la fiche du 20 novembre."
---

::: info En une phrase, pour les élèves
« Vous avez tous un routeur chez vous : la box. Aujourd'hui, vous comprenez ce qu'elle fait quand votre téléphone va sur YouTube. Quatre règles, quatre exercices, et c'est noté. »
:::

### Le plan de bataille : une heure cadrée comme une interrogation

Le 20 novembre, le travail en groupe et les échanges oraux ont laissé place aux bavardages et aux chamailleries. Cette heure ne laisse **aucun temps mort** et **aucun travail de groupe** : je montre, ils font seuls, on corrige, on recommence. Le rythme fait la discipline.

| Moment | Ce que je fais |
| :--- | :--- |
| **La veille** | J'écris le nom de chaque élève sur sa fiche (25 fiches). Je prépare le plan de classe : rangées face au tableau, D2 et D3 en alternance, les élèves qui se chamaillent aux deux bouts de la salle. |
| **Avant qu'ils entrent** | Fiches posées sur les tables : chacun cherche **sa** fiche, c'est sa place. Au tableau : le plan de l'heure et « Sacs par terre, téléphones dans le sac ». |
| **À la porte** | J'accueille un par un : « Ta fiche est au 3e rang. » On n'entre pas en groupe. |
| **Minute 1** | J'attends le silence complet, debout, sans parler. Puis le contrat (ci-dessous), une seule fois. |
| **Chaque règle (3 min)** | Je montre au tableau, **un exemple seulement**. Pas de question ouverte à la classe : c'est là que ça part en bavardage. Je fais répondre en chœur (« La rue ? » « 192.168.20 ! »), c'est plus court et ça occupe tout le monde. |
| **Chaque exercice (6 à 9 min)** | **Seuls et en silence.** Minuteur projeté (touche T). Je circule dans les rangs, j'aide à voix basse. Je commence toujours par ceux qui n'ont rien écrit. |
| **Chaque correction (1 à 2 min)** | « Stylos posés. » Je corrige au tableau, ils corrigent **en vert**. Seul le bleu ou le noir rapporte des points : recopier la correction ne sert à rien, mais la correction occupe tout le monde. |
| **Si ça parle** | Je ne crie pas, je ne menace pas d'une note : je m'arrête, je regarde, j'attends. Si ça continue, je vais poser la main sur la table de l'élève et je reste à côté de lui jusqu'à la fin de l'exercice. |
| **Les 2 dernières minutes** | Je suis à la porte : on sort en me donnant sa fiche. |

**Le contrat, à dire en début d'heure** : « Aujourd'hui, c'est noté, et c'est simple. Quatre règles, quatre exercices. Je montre, vous faites seuls, en silence, puis on corrige. Réponses au bleu, correction au vert : seul le bleu compte. Votre nom est déjà sur votre fiche. Vous me la rendez en sortant. Si votre note est meilleure que celle du 20, elle la remplace. »

**Pourquoi « la meilleure des deux notes » marche** : un élève qui a raté le 20 a enfin une raison de travailler aujourd'hui, et ça ne coûte rien à celui qui avait réussi.

### Comment noter la fiche du 20 novembre

Bilan : 23 présents, 14 copies avec nom, 5 sans nom, 4 rien rendu.

1. **Les 14 copies avec nom** : je les note normalement.
2. **Les 5 copies sans nom** : je compare l'écriture avec les fiches de ce vendredi, qui portent toutes un nom. En général, ça suffit à les attribuer. Sinon, je les pose sur le bureau à la fin de l'heure : « Ces cinq copies n'ont pas de nom. Celui qui reconnaît la sienne vient l'écrire devant moi. » Une copie non réclamée compte comme non rendue.
3. **Les 4 qui n'ont rien rendu, et les copies non réclamées** : « non rendu » dans Pronote. Selon le réglage de l'établissement, cette mention compte zéro ou ne compte pas : à vérifier, et à appliquer de la même façon pour tout le monde.
4. **Ce qui compte dans la moyenne** : la meilleure des deux notes, celle du 20 ou celle du 27 (c'est ce qui est annoncé aux élèves). Un élève non rendu le 20 a donc sa note du 27. Dans Pronote : saisir les deux devoirs, puis mettre « non noté » ou un coefficient 0 sur la moins bonne note de chaque élève. Plus simple : un seul devoir « Réseau, 20 et 27 novembre » où l'on saisit la meilleure note.
5. **Le dire aux élèves** dès le début de l'heure : « Cinq d'entre vous ont rendu une copie sans nom. À partir d'aujourd'hui, je mets le nom moi-même, et une fiche non rendue, c'est un non-rendu. »

### La présentation au tableau (3 minutes)

1. « Levez la main si vous avez une box à la maison. » Presque toutes les mains se lèvent.
2. **Dessiner** au tableau une maison avec trois appareils (téléphone, console, ordinateur) et une box sur le mur, reliée à un nuage « Internet ».
3. « Votre box, c'est un **routeur**. Quand votre téléphone va sur YouTube, il ne sait pas où est YouTube. Il sait **une seule chose** : "tout ce qui sort de la maison, je le donne à la box". »
4. « Au parking du lycée, c'est pareil, avec **deux** réseaux : celui des capteurs et celui de l'accueil. Le 4 décembre, en TP noté, c'est vous qui configurez ce réseau. Aujourd'hui, on apprend les quatre règles pour y arriver. »

### Le fil rouge : l'adresse postale

| Réseau | Poste |
| :--- | :--- |
| Le réseau (`192.168.20.0`) | La **rue** |
| Le dernier nombre de l'adresse | Le **numéro** de la maison |
| Le switch | Le **facteur** de la rue, qui ne sort pas de sa rue |
| Le routeur | Le **bureau de poste**, qui a une porte sur chaque rue |
| La passerelle | **La porte du bureau de poste qui donne sur ma rue** |

Ne jamais lâcher cette image : chaque question se pose dans ces mots-là (« Même rue ? », « Quelle porte du bureau de poste ? »). Elle a ses limites (une adresse postale n'a pas de masque) : ne pas la pousser plus loin que ce tableau.

### Anecdotes vraies, à placer entre deux exercices

| Quand | Anecdote |
| :--- | :--- |
| Après la règle 1 | **Il n'y a pas assez d'adresses pour tout le monde.** Une adresse IPv4, c'est 4 nombres de 0 à 255 : environ 4,3 milliards d'adresses, moins que d'humains. Le stock mondial d'adresses libres a été épuisé en 2011. La parade : les adresses en `192.168.…` sont **privées**, réutilisées dans des millions de maisons ; seule la box a une adresse publique. Les téléphones de la classe ont peut-être tous la même adresse chez eux. |
| Après la règle 4 | Le nom **ping** vient du bruit du sonar des sous-marins : on envoie un son, on attend l'écho. Son auteur, Mike Muuss, l'a écrit en 1983. |
| Pour les curieux | **Le premier message d'Internet** (ARPANET, 29 octobre 1969) devait être « LOGIN ». Le système a planté après deux lettres : le premier message de l'histoire d'Internet est « LO ». |
| En sortant | **Chez soi, ce soir** : sur iPhone, *Réglages → Wi-Fi → ⓘ* affiche « Adresse IP » et « Routeur » ; sur Android, c'est dans les détails du réseau Wi-Fi. Le « Routeur » affiché est la passerelle. |

### Pourquoi c'est utile pour eux

- **Le TP noté du 4 décembre** : configurer le réseau du parking. Les quatre règles suffisent.
- **Le quotidien** : « le Wi-Fi est connecté mais Internet ne marche pas » : souvent, c'est la box, la passerelle, qui ne sort plus.
- **Les métiers** : technicien réseau, installateur fibre, technicien de maintenance : c'est le premier réglage qu'ils vérifient.

### Ce qui bloque souvent, et comment débloquer

| Blocage | Ce que je dis ou je fais |
| :--- | :--- |
| « Le routeur a deux adresses ? » | « Il a une porte sur chaque rue. » Montrer le dessin des deux rues. |
| L'élève donne la passerelle de l'autre rue | « Ta lettre, tu la déposes à la poste de **ta** rue ou de celle d'en face ? » |
| L'élève met une passerelle pour parler dans sa rue | « Pour donner une lettre à ton voisin, tu passes par la poste ? » |
| « Pourquoi la réponse ne revient pas ? » | « Je t'envoie un SMS, tu le reçois, mais ton forfait est coupé : tu ne peux pas répondre. » |

### Si la classe décroche

Ne pas lancer la règle suivante. Tout le monde pose son stylo. Une seule question au tableau, réponse en chœur : « `10.0.0.25`, la rue ? — `10.0.0` ! — Le numéro ? — 25 ! — La passerelle ? — `10.0.0.1` ! » Puis reprendre l'exercice là où il en était.
