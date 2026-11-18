---
titre: "Relier deux réseaux : le routeur et la passerelle"
niveau: Term STI2D SIN
sequence: C1
court: Routeur et passerelle
pronote:
  pour: "TSTI2D2 + TSTI2D3, heure commune (vendredi 20 novembre, 13 h)"
  titre: "C1 Mettre en réseau des objets — Séance : relier deux réseaux, le routeur et la passerelle"
  description: "C1, heure commune D2 + D3, retour en présentiel : rôle du routeur, adresse de réseau et masque /24, passerelle par défaut, configuration et dépannage de deux réseaux sur un simulateur. Fiche d'activités notée /20."
type: cours
duree: 55 min
bareme: 20
illustration: img/reseau/parking.svg
accroche: "Les capteurs du parking marchent, mais l'écran de l'accueil n'affiche rien. Il manque une seule ligne de configuration."
competences: [2.4.4b, 5.3.4a, 3.4.3c, CO3.2, CO7.3-SIN2]
objectifs:
  - Déterminer si deux machines sont dans le même réseau à partir du masque /24
  - Expliquer le rôle du routeur et de la passerelle par défaut
  - Configurer deux réseaux reliés par un routeur et les tester par ping
  - Diagnostiquer une erreur de passerelle
prerequis:
  - "C1 : switch, routeur, adresses MAC et IP, masque (séance du parking connecté)"
preparation:
  - Imprimer la fiche d'activités (1 par élève) ; déposer le PDF sur l'ENT pour les absents
  - "Copier `reseau_routeur.html` (dossier `output/Term_STI2D_SIN/C1_Reseau_local/eleve/C1_Distanciel_Routeur-et-passerelle/`) dans le dossier partagé du labo, ou le déposer sur l'ENT : il s'ouvre par un double-clic, sans installation ni compte"
  - "Ouvrir le HTML de projection des diapos — F : plein écran, T : minuteur"
---

::: prof
**Heure commune D2 + D3, vendredi 20 novembre (26 élèves, labo, 1 poste pour 2) : retour en présentiel.** La fiche à distance « routeur et passerelle » a été remplacée par l'interrogation CAN le 13 novembre : cette séance la reprend en classe. **La fiche d'activités est notée /20** ; elle clôt presque C1 (fin prévue le 4 décembre avec le TP noté de configuration d'un réseau).

**Simulateur** : `reseau_routeur.html` (testé dans Chrome). Les points « validé par le professeur » se donnent en passant dans les rangs, sur l'écran du binôme : cocher la case de la fiche et parapher. Le poste de l'accueil a une adresse propre à chaque binôme (jour de naissance de l'un des deux + 20) : deux écrans identiques signalent une copie.
:::

::: prof Barème
| Activité | Questions | Ce qui est évalué | Points |
| :--- | :--- | :--- | :---: |
| 1. Même réseau ? | Q1 | Adresse de réseau avec le masque /24 | 3 |
| 2. Trouver la passerelle | Q2 à Q4 | Rôle du routeur, choix de la passerelle justifié, cas sans passerelle | 5 |
| 3. Configurer et tester | Q5 à Q7 | Tests interprétés, passerelle des deux côtés, ping réussi validé à l'écran | 6 |
| 4. Trouver la panne | Q8 | Message lu, erreur expliquée par la règle, correction validée | 3 |
| 5. Quiz de sortie | Q9 à Q11 | Routeur, passerelle, même réseau | 3 |
| **Total** | | | **20** |
:::

## Se poser la question

::: slide 3 min | L'écran de l'accueil reste vide
![](img/reseau/parking.svg){width=82%}

> Les 40 capteurs et le poste de supervision communiquent. Mais l'écran de l'**accueil**, sur un **autre réseau**, n'affiche rien. Le technicien jure que tous les câbles sont branchés.
:::

::: dire
- « Les câbles sont bons. Alors qu'est-ce qui peut manquer ? » Recueillir 2 ou 3 idées.
- Rappeler la séance du parking : Ⓐ est un switch, Ⓑ un routeur. Aujourd'hui, on fait passer les paquets **à travers** Ⓑ.
:::

::: activite 7 min | Même réseau ? | individuel
Masque `255.255.255.0` (**/24**) : les **3 premiers nombres** de l'adresse désignent le **réseau**, le dernier désigne la **machine**.
:::

::: question 1 [3 pt]
Ces machines sont-elles dans le même réseau ? Répondez par oui ou non et écrivez le réseau de chacune.

**a)** `192.168.20.11` et `192.168.20.2` · **b)** `192.168.20.2` et `10.0.0.25` · **c)** `10.0.0.1` et `10.0.0.25`
:::

::: reponse 3
a) oui, `192.168.20.0` ; b) non, `192.168.20.0` et `10.0.0.0` ; c) oui, `10.0.0.0`. (1 pt par cas : réponse et réseaux justes)
:::

## La passerelle

::: slide 4 min | Le routeur et la passerelle | fiche
- Le **routeur** relie des **réseaux différents** : il a une carte, donc une **adresse IP, dans chaque réseau** (ici `192.168.20.1` et `10.0.0.1`).
- Une machine qui veut joindre une adresse **hors de son réseau** confie le paquet à sa **passerelle** : l'adresse du **routeur de son côté**.
- **Règle** : la passerelle est **toujours dans le même réseau que la machine**.
- Pour un échange entre deux réseaux, il faut une passerelle **des deux côtés** : l'aller et le retour.
:::

::: dire
- La comparaison de la poste : pour une lettre à l'étranger, on la dépose à la poste **de son quartier**, qui s'occupe de la suite.
- Exemple au tableau : Supervision `192.168.20.2` → passerelle `192.168.20.1`, la carte du routeur dans **son** réseau.
:::

::: activite 9 min | Trouver la passerelle | individuel
Utilisez le schéma du parking et la règle de la diapo.
:::

::: question 2 [2 pt]
Le routeur Ⓑ a deux adresses : `192.168.20.1` et `10.0.0.1`. Expliquez pourquoi.
:::

::: reponse 3
Il est branché sur les **deux réseaux** (1 pt) : il a une carte dans chacun, et chaque carte a une adresse **de son réseau** (1 pt).
:::

::: question 3 [2 pt]
Le poste de l'accueil a l'adresse `10.0.0.25`. Quelle passerelle doit-il avoir ? Justifiez avec la règle.
:::

::: reponse 3
`10.0.0.1` (1 pt) : c'est la carte du routeur qui est dans **son** réseau, `10.0.0.0` (1 pt).
:::

::: question 4 [1 pt]
Le capteur P01 (`192.168.20.11`) envoie une mesure à Supervision (`192.168.20.2`). Passe-t-il par la passerelle ? Pourquoi ?
:::

::: reponse 2
**Non** : même réseau `192.168.20.0`, le switch suffit ; la passerelle ne sert qu'à **sortir** du réseau.
:::

## Configurer et dépanner

::: slide 1 min | Le simulateur
- Ouvrez **`reseau_routeur.html`** par un double-clic : ni compte, ni installation.
- Remplissez le tableau **sans passerelle**, puis faites les tests **dans l'ordre**.
- Poste de l'accueil : adresse propre au binôme, `10.0.0.` suivi du **jour de naissance de l'un de vous + 20** (né le 7 : `10.0.0.27`).
:::

::: slide 2 min | Les adresses à saisir | fiche
| Machine | Adresse IP | Masque |
| :--- | :--- | :--- |
| Capteur P01 | `192.168.20.11` | `255.255.255.0` |
| Supervision | `192.168.20.2` | `255.255.255.0` |
| Routeur, côté parking | `192.168.20.1` | `255.255.255.0` |
| Routeur, côté accueil | `10.0.0.1` | `255.255.255.0` |
| Poste de l'accueil | `10.0.0.` (jour de naissance + 20) | `255.255.255.0` |
:::

::: dire
Montrer une fois sur le poste du professeur : saisie d'une adresse, choix « Depuis : … », bouton ping, lecture du message. Puis passer dans les rangs.
:::

::: activite 14 min | Configurer et tester | binome
Tests depuis **Supervision**, dans l'ordre :

1. `ping 192.168.20.11` ;
2. `ping` vers **votre** poste de l'accueil ;
3. passerelle de Supervision : `192.168.20.1`, puis le même ping ;
4. passerelle du poste de l'accueil (question 3), puis le même ping.
:::

::: question 5 [2 pt]
Notez le résultat des tests 1 et 2. Pourquoi le premier marche-t-il et pas le deuxième ?
:::

::: reponse 3
Test 1 : réponses de P01, même réseau (1 pt). Test 2 : « Réseau inaccessible » : le poste de l'accueil est dans un autre réseau et Supervision n'a pas de passerelle (1 pt).
:::

::: question 6 [2 pt]
Test 3 : la demande arrive au poste de l'accueil, mais le ping échoue encore. Que manque-t-il ? Expliquez.
:::

::: reponse 3
La **réponse** ne peut pas revenir : le poste de l'accueil doit répondre à Supervision, hors de son réseau, et il n'a **pas de passerelle** (1 pt). Il faut une passerelle **des deux côtés** (1 pt).
:::

::: question 7 [2 pt]
Test 4 : notez le résultat et l'adresse de votre poste de l'accueil.

☐ Validé par le professeur sur l'écran : ping réussi vers le poste de l'accueil du binôme.
:::

::: reponse 2
Réponses « via la passerelle 192.168.20.1 », avec l'adresse personnelle du binôme (1 pt) ; validé sur l'écran (1 pt).
:::

::: activite 6 min | Trouver la panne | binome
Un technicien règle la passerelle du **capteur P01** sur `10.0.0.1`. Faites de même, choisissez « Depuis : Capteur P01 », puis lancez un ping vers votre poste de l'accueil.
:::

::: question 8 [3 pt]
Quel message obtenez-vous ? Expliquez l'erreur du technicien avec la règle, puis corrigez la passerelle de P01.

☐ Validé par le professeur sur l'écran : ping réussi depuis P01 après correction.
:::

::: reponse 3
« Passerelle inaccessible » (0,5 pt) : `10.0.0.1` n'est **pas dans le réseau de P01** ; la passerelle doit être la carte du routeur de son côté (1 pt) : `192.168.20.1` (0,5 pt). Ping réussi après correction, validé (1 pt).
:::

::: dire
- Erreurs fréquentes : masque oublié, faute de frappe dans une adresse, passerelle mise dans le mauvais champ.
- Binômes en avance : trouver une **autre** erreur de configuration qui donne « Réseau inaccessible », et l'expliquer au dos de la fiche.
:::

## Faire le bilan

::: retenir 5 min
- Le [[routeur]] relie des réseaux différents ; il a une adresse IP dans [[chaque]] réseau.
- Pour joindre une machine d'un autre réseau, une machine envoie le paquet à sa [[passerelle]].
- La passerelle est toujours dans le [[même]] réseau que la machine.
- Pour qu'un échange réussisse entre deux réseaux, il faut une passerelle des [[deux]] côtés : l'aller et le retour.
:::

::: activite 4 min | Quiz de sortie | individuel | projeter
Répondez sur votre fiche.
:::

::: question 9 [1 pt]
Une machine `172.16.5.40/24` doit sortir de son réseau. Sa passerelle peut être…

- [x] `172.16.5.1`
- [ ] `172.16.6.1`
- [ ] `10.0.0.1`
:::

::: reponse 0
`172.16.5.1` : la passerelle est dans le **même réseau** (`172.16.5.0`).
:::

::: question 10 [1 pt]
Deux machines du même réseau /24 communiquent…

- [x] directement, par le switch
- [ ] seulement par la passerelle
- [ ] seulement si le routeur est allumé
:::

::: reponse 0
**Directement**, par le switch : la passerelle sert à sortir du réseau.
:::

::: question 11 [1 pt]
Un routeur qui relie trois réseaux a…

- [ ] une seule adresse IP
- [x] trois adresses IP, une par réseau
- [ ] aucune adresse IP
:::

::: reponse 0
**Trois** : une carte, donc une adresse, dans chaque réseau.
:::

::: dire
Ramasser les fiches. Annoncer la suite : le 4 décembre, **TP noté** : configurer tout le réseau du parking selon un cahier des charges.
:::
