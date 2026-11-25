---
titre: "Amener la séance : la passerelle pas à pas"
niveau: Term STI2D SIN
sequence: C1
court: Passerelle pas a pas
type: contexte
competences: [2.4.4b, 5.3.4a, 3.4.3c, CO3.2]
accroche: "Heure commune D2 + D3, vendredi 27 novembre. À lire avant la séance : ce que vous pouvez raconter, et comment rendre concrètes des adresses qui ne disent rien aux élèves."
---

::: info En une phrase, pour les élèves
« Vous avez tous un routeur chez vous : la box. Aujourd'hui, on comprend ce qu'elle fait quand votre téléphone va sur YouTube, et pourquoi, sans elle, il ne sortirait jamais de la maison. »
:::

### Pourquoi ça leur paraît abstrait

Des suites de nombres (`192.168.20.1`, `255.255.255.0`) sans rien à quoi les accrocher. Tout l'enjeu de la séance est de **raccrocher chaque nombre à une image** : la rue, le numéro, le bureau de poste. Une fois l'image installée, ne plus la lâcher : chaque question se pose dans ces mots-là (« même rue ? », « quel bureau de poste ? »).

### Amener la séance (les 3 premières minutes)

1. « Vendredi, 18 h : l'écran de l'accueil du parking est figé, deux machines sont mal réglées. Vous menez l'enquête. »
1. « Levez la main si vous avez une box à la maison. » Presque toutes les mains se lèvent.
2. « Votre box, c'est un **routeur**. Celui du parking qu'on étudie depuis trois semaines, c'est le même objet, en plus gros. »
3. « Quand votre téléphone va sur YouTube, il ne sait pas où est YouTube. Il sait juste une chose : "pour tout ce qui n'est pas dans la maison, je donne à la box". Cette box, c'est sa **passerelle**. »
4. « Aujourd'hui, pas d'ordinateur. On va **jouer** le trajet d'un paquet, enveloppe en main. »

### Le fil rouge : l'adresse postale

| Réseau | Poste |
| :--- | :--- |
| Le réseau (`192.168.20.0`) | La **rue** |
| Le dernier nombre de l'adresse | Le **numéro** de la maison |
| Le switch | Le **facteur** de la rue, qui ne sort pas de sa rue |
| Le routeur | Le **bureau de poste**, qui a une porte sur chaque rue |
| La passerelle | **La porte du bureau de poste qui donne sur ma rue** |

L'image a ses limites (une vraie adresse postale n'a pas de masque) : ne pas la pousser plus loin que ce tableau.

### Anecdotes vraies, à placer au bon moment

| Quand | Anecdote |
| :--- | :--- |
| En ouverture | **Le premier message d'Internet** (ARPANET, 29 octobre 1969) devait être « LOGIN », envoyé d'une université de Los Angeles vers Stanford. Le système a planté après deux lettres : le premier message de l'histoire d'Internet est « LO ». |
| Sur les adresses en 192.168 | **Il n'y a pas assez d'adresses pour tout le monde.** Une adresse IPv4, c'est 4 nombres de 0 à 255 : environ 4,3 milliards d'adresses, moins que d'humains et bien moins que d'appareils. Le stock mondial d'adresses libres a été épuisé en 2011. La parade : les adresses `192.168.…` sont **privées**, réutilisées dans des millions de maisons ; seule la box a une adresse publique, et elle fait l'intermédiaire. C'est pour ça que tous les téléphones de la classe ont peut-être la même adresse chez eux. |
| Sur le ping | Le nom **ping** vient du bruit du sonar des sous-marins : on envoie un son, on attend l'écho. Son auteur, Mike Muuss, l'a écrit en 1983. |
| En fin d'heure | **Chez soi, ce soir** : sur iPhone, *Réglages → Wi-Fi → ⓘ* affiche « Adresse IP » et « Routeur ». Sur Android, c'est dans les détails du réseau Wi-Fi (le chemin dépend du modèle). Le « Routeur » affiché est la passerelle. Selon l'opérateur, la box est souvent en `192.168.1.1` ou `192.168.1.254` (à vérifier sur un ou deux exemples avant d'en parler). |

### Pourquoi c'est utile pour eux

- **Le TP noté du 4 décembre** : configurer tout le réseau du parking. Sans la notion de passerelle, impossible.
- **Le quotidien** : « le Wi-Fi est connecté mais Internet ne marche pas » : souvent, c'est la box (la passerelle) qui ne sort plus. Ils sauront maintenant ce que ça veut dire.
- **Les métiers** : technicien réseau, installateur fibre, technicien de maintenance informatique : c'est le premier réglage qu'ils vérifient.

### Ce qui bloque souvent, et comment débloquer

| Blocage | Ce que je dis ou je fais |
| :--- | :--- |
| « Le routeur a deux adresses ? » | « Il a un pied dans chaque rue. Une porte sur la rue du parking, une porte sur la rue de l'accueil. » Le montrer avec l'élève-routeur, une carte dans chaque main. |
| L'élève donne la passerelle de l'autre rue | « Ta lettre, tu la déposes au bureau de poste **de ta rue** ou de celle d'en face ? » |
| L'élève met une passerelle pour parler dans sa rue | « Pour donner une lettre à ton voisin, tu passes par la poste ? » |
| « Pourquoi la réponse ne revient pas ? » | Rejouer avec les enveloppes : l'accueil veut répondre, mais personne ne lui a dit où est le bureau de poste. |

### Pendant l'enquête

L'indice B innocente le routeur, la Supervision et la caisse ; l'indice D montre que c'est le **retour** qui manque ; l'indice E accuse la caméra. Si une équipe bloque, lui faire rejouer l'envoi avec les enveloppes. N'ouvrir la configuration qu'après les verdicts.

### Si la classe décroche

Refaire **un seul envoi** avec les enveloppes, très lentement, en faisant dire à toute la classe, à chaque étape : « Même rue ? — Non ! — Alors à qui ? — Au routeur, à la main de sa rue ! »
