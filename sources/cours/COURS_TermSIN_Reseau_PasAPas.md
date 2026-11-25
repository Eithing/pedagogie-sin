---
titre: "Panne au parking : l'enquête réseau"
niveau: Term STI2D SIN
sequence: C1
court: Passerelle pas a pas
pronote:
  pour: "TSTI2D2 + TSTI2D3, heure commune (vendredi 27 novembre)"
  titre: "C1 Mettre en réseau des objets — Séance : panne au parking, l'enquête réseau (routeur et passerelle)"
  description: "C1, heure commune D2 + D3, reprise sur papier : adresse IP « rue + numéro », jeu des enveloppes (routeur et passerelle), puis enquête par équipes pour localiser deux pannes de configuration. Fiche d'activités notée /20."
type: cours
duree: 55 min
bareme: 20
illustration: img/reseau/box-maison.svg
accroche: "L'écran de l'accueil est figé. Six machines, cinq indices, deux pannes. À vous de trouver les coupables."
competences: [2.4.4b, 5.3.4a, 3.4.3c, CO3.2]
objectifs:
  - Lire une adresse IP /24 comme une adresse postale (la rue, puis le numéro)
  - Décider si un paquet va directement à son destinataire ou passe par la passerelle
  - Localiser une panne de réseau à partir de résultats de ping
  - Expliquer pourquoi il faut une passerelle des deux côtés (l'aller et le retour)
prerequis:
  - "C1 : switch, routeur, adresse IP, masque /24 (séances du parking connecté et du 20 novembre)"
preparation:
  - Imprimer la fiche d'activités (1 par élève) ; déposer le PDF sur l'ENT pour les absents
  - "Jeu des enveloppes : préparer 6 cartes A5 (une adresse IP par carte, voir le bloc prof de l'activité 2), 2 cartes pour le routeur, et 4 enveloppes (ou feuilles pliées)"
  - "Pousser les tables pour faire deux « rues » de part et d'autre d'un couloir, le routeur au milieu"
  - "Enquête : former des équipes de 4 (tables en îlots après le jeu)"
  - "Lire la fiche « contexte » de la séance (`CONTEXTE_TermSIN_Reseau_PasAPas`)"
---

::: prof
**Pourquoi cette séance.** Le 20 novembre, « routeur et passerelle » est resté abstrait. Ici, tout sert à **résoudre une affaire** : on apprend les règles (la rue, la passerelle), on les joue avec les enveloppes, puis on enquête par équipes. Aucun PC. Chacun remplit **sa** fiche.

**Fil rouge** : les trois premiers nombres sont la **rue** (le réseau), le dernier est le **numéro** (la machine). Pour une autre rue, on dépose la lettre au **bureau de poste de sa rue** (la passerelle).

**Les deux coupables** : le poste de l'accueil n'a **pas de passerelle** (l'aller passe, le retour non) ; la caméra a une passerelle **de l'autre rue** (`10.0.0.1`).
:::

::: prof Barème
| Activité | Questions | Ce qui est évalué | Points |
| :--- | :--- | :--- | :---: |
| 1. Rue et numéro | Q1 | Réseau et machine d'une adresse /24 | 2 |
| 2. Le jeu des enveloppes | Q2 | Trajet direct ou par la passerelle | 4 |
| 3. L'enquête | Q3, Q4 | Lecture des indices, hypothèses justifiées | 7 |
| 4. Le verdict | Q5 | Réparation, aller et retour | 4 |
| 5. Quiz de sortie | Q6 à Q8 | Rue, passerelle, routeur | 3 |
| **Total** | | | **20** |
:::

## L'affaire

::: slide 3 min | Vendredi, 18 h : l'écran de l'accueil est figé
![](img/reseau/box-maison.svg){width=70%}

- Le poste de Supervision n'arrive plus à joindre l'**accueil** du parking.
- Câbles branchés, machines allumées : **où est la panne ?**
- L'outil du détective : le routeur, le même genre d'appareil que votre box.
:::

::: dire
**À dire** : « Le technicien est en congé, l'agent d'accueil ne voit plus les places libres, et la file de voitures s'allonge. Vous avez une heure. Pour résoudre l'affaire, il vous faut deux règles : la rue, et le bureau de poste. »
:::

::: slide 2 min | Règle n° 1 : la rue et le numéro | fiche
| Adresse IP (masque /24) | La **rue** (réseau) | Le **numéro** (machine) |
| :--- | :--- | :--- |
| `192.168.1.23` | `192.168.1.0` | 23 |

Dans la **même rue**, on se parle **directement** (le switch est le facteur de la rue).
:::

::: activite 5 min | Rue et numéro | individuel
Écrivez la rue et le numéro de chaque machine.
:::

::: question 1 [2 pt]
Donnez la rue et le numéro de : **a)** `192.168.20.11` · **b)** `10.0.0.25` · **c)** `192.168.20.2`. Lesquelles sont dans la même rue ?
:::

::: reponse 3
a) `192.168.20.0`, 11 · b) `10.0.0.0`, 25 · c) `192.168.20.0`, 2 (0,5 pt chacune). a) et c) (0,5 pt).
:::

## Jouer le trajet

::: slide 2 min | Règle n° 2 : le bureau de poste de ma rue | fiche
- **Autre rue** : on confie la lettre au **routeur**, qui a **une adresse dans chaque rue**.
- L'adresse du routeur **dans ma rue**, c'est ma **passerelle**.
- La passerelle est donc **toujours dans la même rue** que la machine.
:::

::: dire
**À dire** : « Pour une lettre à Marseille, vous ne marchez pas jusqu'à Marseille : vous la déposez à la poste **de votre quartier**. »
:::

::: activite 14 min | Le jeu des enveloppes | classe
Six élèves jouent les machines, un élève joue le routeur, les autres sont **contrôleurs** : ils notent chaque trajet (question 2).
:::

::: prof
**Les cartes à préparer** :

- **Rue du parking** (`192.168.20.0`) : Capteur P01 `192.168.20.11` · Supervision `192.168.20.2` · Caméra `192.168.20.50`.
- **Rue de l'accueil** (`10.0.0.0`) : Poste de l'accueil `10.0.0.25` · Caisse `10.0.0.30` · Imprimante `10.0.0.40`.
- **Routeur**, dans le couloir, une carte dans chaque main : `192.168.20.1` (vers le parking) et `10.0.0.1` (vers l'accueil).

**Jouer les quatre envois de la question 2**, lentement, en faisant dire à toute la classe : « Même rue ? » Puis un envoi **piégé** : la Supervision tend l'enveloppe à la mauvaise main (`10.0.0.1`) ; le routeur refuse. Cela prépare l'enquête.
:::

::: tableau Les règles du jeu | fiche
1. **Même rue** que le destinataire : je donne l'enveloppe directement.
2. **Autre rue** : je la donne au routeur, à la main **de ma rue** (ma passerelle).
3. Le routeur la passe à son autre main, qui la remet au destinataire.
:::

::: question 2 [4 pt]
Pour chaque envoi : direct ou par le routeur ? Si routeur, quelle adresse du routeur l'expéditeur utilise-t-il ?

| Envoi | Direct ou routeur ? | Adresse du routeur utilisée |
| :--- | :---: | :---: |
| P01 (`192.168.20.11`) → Supervision (`192.168.20.2`) | | |
| Supervision → Accueil (`10.0.0.25`) | | |
| Accueil → Supervision (la réponse) | | |
| Caisse (`10.0.0.30`) → Imprimante (`10.0.0.40`) | | |
:::

::: reponse 0
Direct · routeur, `192.168.20.1` · routeur, `10.0.0.1` · direct. (1 pt par ligne)
:::

## Enquêter

::: slide 2 min | Un ping : un aller ET un retour | fiche
- Un `ping` envoie une **demande** et attend une **réponse**.
- « Échec » veut dire : la demande **ou** la réponse s'est perdue.
- L'aller utilise la passerelle de l'**expéditeur**, le retour celle du **destinataire**.
:::

::: activite 14 min | L'enquête | groupe
En équipe : lisez les cinq indices. Pour chacun, écrivez ce qu'il **innocente** ou ce qu'il **accuse**. Il y a **deux** machines mal configurées.
:::

::: tableau Le dossier : cinq indices | fiche
| Indice | Test | Résultat |
| :---: | :--- | :--- |
| A | Supervision (`192.168.20.2`) → Accueil (`10.0.0.25`) | échec |
| B | Supervision → Caisse (`10.0.0.30`) | réussi |
| C | Caisse → Accueil | réussi |
| D | Pendant le test A, on voit la demande **arriver** à l'Accueil | aucune réponse ne revient |
| E | Caméra (`192.168.20.50`) → Supervision : réussi | Caméra → Caisse : échec |
:::

::: prof
**Relances** : « B marche : qui pouvez-vous rayer de la liste ? » · « C marche : l'accueil est-il allumé et branché ? Dans quelle rue est la caisse ? » · « D : l'aller est bon. Qu'est-ce qui manque au retour ? » · « E : la caméra parle dans sa rue, pas en dehors. »
:::

::: question 3 [4 pt]
Que nous apprend chaque indice ? **B** : …  **C** : …  **D** : …  **E** : …
:::

::: reponse 7
B : la Supervision, sa passerelle, le routeur et la caisse (avec sa passerelle) fonctionnent. C : l'accueil est allumé et communique dans sa rue. D : l'aller passe, le problème est au retour. E : la caméra fonctionne dans sa rue, mais ne sort pas. (1 pt par indice)
:::

::: question 4 [3 pt]
Quelles sont les **deux** machines coupables ? Pour chacune, quel réglage soupçonnez-vous ? Justifiez avec les indices.
:::

::: reponse 5
Le poste de l'accueil (0,5 pt) et la caméra (0,5 pt) : leur **passerelle** est absente ou fausse (1 pt). Indices C et D pour l'accueil, E pour la caméra, B innocentant le routeur (1 pt).
:::

::: activite 5 min | Le verdict | classe
Chaque équipe annonce ses coupables. Puis on ouvre la configuration : réparez-la.
:::

::: tableau La configuration relevée sur place
| Machine | Adresse | Passerelle |
| :--- | :--- | :--- |
| Supervision | `192.168.20.2` | `192.168.20.1` |
| Caméra | `192.168.20.50` | `10.0.0.1` |
| Accueil | `10.0.0.25` | *(vide)* |
| Caisse | `10.0.0.30` | `10.0.0.1` |
:::

::: question 5 [4 pt]
**a)** Donnez la bonne passerelle de chaque machine coupable. **b)** Pourquoi la demande arrivait-elle à l'accueil, mais pas la réponse à la Supervision ?
:::

::: reponse 4
a) Accueil : `10.0.0.1` (1 pt) ; caméra : `192.168.20.1`, dans sa rue (1 pt). b) La Supervision a une passerelle, l'aller passe (1 pt) ; l'accueil n'en a pas, sa réponse ne peut pas sortir de sa rue (1 pt).
:::

::: dire
« Retenez l'affaire : quand un ping échoue, pensez **aussi** au retour. »
:::

## Faire le bilan

::: retenir 4 min
- Une adresse IP /24 : la [[rue]] (le réseau, 3 premiers nombres), puis le [[numéro]] (la machine).
- Dans la même rue, les machines se parlent [[directement]].
- Pour sortir de sa rue, une machine passe par sa [[passerelle]], toujours dans la [[même]] rue qu'elle.
- Un ping est un aller et un retour : il faut une passerelle des [[deux]] côtés.
:::

::: activite 4 min | Quiz de sortie | individuel | projeter
Répondez sur votre fiche.
:::

::: question 6 [1 pt]
`172.16.5.40` et `172.16.5.7` (masque /24) sont…

- [x] dans la même rue : ils se parlent directement
- [ ] dans deux rues différentes
- [ ] impossibles à comparer sans le routeur
:::

::: reponse 0
Même rue `172.16.5.0` : envoi direct.
:::

::: question 7 [1 pt]
La passerelle de `172.16.5.40` peut être…

- [x] `172.16.5.1`
- [ ] `172.16.6.1`
- [ ] `10.0.0.1`
:::

::: reponse 0
`172.16.5.1` : dans la même rue que la machine.
:::

::: question 8 [1 pt]
À la maison, le routeur qui sert de passerelle à votre téléphone, c'est…

- [ ] l'antenne 4G
- [x] la box
- [ ] le serveur de YouTube
:::

::: reponse 0
La **box** : elle relie le réseau de la maison à Internet.
:::

::: dire
Ramasser les fiches. Annoncer : « Le 4 décembre, **TP noté** : vous configurez tout le réseau du parking. »
:::
