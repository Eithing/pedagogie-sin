---
titre: "Le Web : histoire, droit d'auteur, HTML, URL, HTTP, moteurs et cookies"
niveau: SNT (2nde)
sequence: S2
court: Interro Web
rangement: Eval/2nde
pronote:
  titre: "Le Web — Interrogation : tout le thème"
  description: "S2 Le Web : interrogation écrite de 30 min (45 min avec tiers-temps), deux sujets (A/B), sur tout le thème : histoire, licences, HTML et CSS, URL, requête HTTP et client / serveur, moteurs de recherche, cookies. Notée."
type: evaluation
duree: 30 min
bareme: 20
variantes: [A, B]
competences: [WEB.1, WEB.2, WEB.3, WEB.4, WEB.5, WEB.6, WEB.7, WEB.8, WEB.9]
consignes:
  - "Durée : 30 minutes (45 minutes avec tiers-temps). Répondre directement sur le sujet."
  - "Questions à cocher : une seule case par item."
---

::: prof
**Date** : vendredi 4 décembre, 9 h, classe entière (reportée du 27 novembre : les élèves étaient perdus après la synthèse du 20 ; séance de reprise « le voyage d'un clic » le 27). Prévoir 30 min ; **45 min pour les élèves avec un PAI** (tiers-temps) : le sujet est calibré pour 30 min, sans question longue ni calcul. La fiche de révision `REVISION_SNT_Web` (même dossier) a été distribuée le 20 novembre ; chaque question correspond à une de ses parties.

**Mise en œuvre** : distribuer les sujets A et B en alternance selon les rangs. Même structure, même difficulté, même barème ; seuls les exemples changent.
:::

## Partie 1 — Connaissances

:::: question 1 [4 pt]
Cocher la bonne réponse.

::: variante A
**a)** Le Web a été inventé…

- [ ] en 1969, aux États-Unis, par l'armée
- [x] en 1989, au CERN, par Tim Berners-Lee
- [ ] en 2004, par Mark Zuckerberg

**b)** Internet et le Web…

- [ ] sont deux noms de la même chose
- [x] sont différents : le Web est un service qui utilise Internet
- [ ] sont différents : Internet est un service qui utilise le Web

**c)** Pour trouver rapidement les pages qui contiennent un mot, un moteur de recherche utilise…

- [x] un index construit à l'avance par ses robots
- [ ] une lecture de toutes les pages du Web à chaque recherche
- [ ] la liste des sites que l'utilisateur a déjà visités

**d)** Un cookie tiers est déposé…

- [ ] par le site que l'on visite, pour garder le panier
- [x] par un autre domaine, souvent une régie publicitaire, pour suivre la navigation
- [ ] par le navigateur, pour accélérer l'affichage
:::

::: variante B
**a)** En 1993, le CERN…

- [ ] a inventé Internet
- [x] a placé le Web dans le domaine public
- [ ] a créé le premier moteur de recherche

**b)** Le courrier électronique…

- [x] utilise Internet, mais ne fait pas partie du Web
- [ ] fait partie du Web
- [ ] n'utilise pas Internet

**c)** Les robots d'un moteur de recherche…

- [ ] répondent aux questions des utilisateurs
- [x] parcourent le Web de lien en lien pour construire l'index
- [ ] suppriment les pages fausses

**d)** En navigation privée…

- [ ] personne ne peut voir les sites que je visite
- [x] l'historique et les cookies ne sont pas conservés sur mon appareil
- [ ] les sites ne peuvent pas déposer de cookies
:::
::::

::: reponse 0
1 point par bonne réponse. {{1989, CERN ; le Web est un service d'Internet ; index ; cookie d'un autre domaine qui suit la navigation.|Domaine public ; courriel hors du Web ; les robots construisent l'index ; rien n'est conservé sur l'appareil.}}
:::

::: question 2 [2 pt]
{{Une photo est publiée sous licence **CC BY-NC**. Peut-on **a)** la mettre dans un exposé, en citant l'auteur ? **b)** l'utiliser sur l'affiche publicitaire d'un magasin ? Justifier.|Un dessin est publié sous licence **CC BY-ND**. Peut-on **a)** le mettre tel quel sur le blog du lycée, en citant l'auteur ? **b)** le recadrer et le recolorier pour une affiche ? Justifier.}}
:::

::: reponse 4
{{a) **Oui** : BY impose de citer l'auteur, c'est fait. b) **Non** : NC interdit l'usage commercial.|a) **Oui** : BY impose de citer l'auteur, c'est fait. b) **Non** : ND interdit la modification.}} (1 pt par cas, justification comprise)
:::

## Partie 2 — Le code et l'adresse

:::: question 3 [3 pt]
Voici le code d'une page :

```html
<h1>{{Le club de théâtre|La radio du lycée}}</h1>
<p>{{Répétition le jeudi soir.|Émission tous les lundis.}}</p>
<a href="{{https://www.theatre-exemple.fr|https://www.radio-exemple.fr}}">{{Notre spectacle|Écouter en direct}}</a>
```

**a)** Que fait la dernière ligne ? Quel texte voit-on à l'écran ?

::: zone 2
:::

**b)** Écrire la règle CSS qui met les paragraphes en {{vert (`green`)|rouge (`red`)}}. Dans quel fichier, HTML ou CSS, l'écrit-on ?

::: zone 2
:::
::::

::: reponse 0
**a)** Un **lien hypertexte** : on voit « {{Notre spectacle|Écouter en direct}} », qui mène à `{{https://www.theatre-exemple.fr|https://www.radio-exemple.fr}}`. (1,5 pt)

**b)** `p { color: {{green|red}}; }`, dans le fichier **CSS** (le style), sans toucher au HTML (le contenu). (1,5 pt)
:::

::: question 4 [3 pt]
Décomposer l'URL `{{https://www.cinema-exemple.fr/seances?film=dune&jour=samedi|https://www.bus-exemple.fr/horaires?ligne=12&arret=gare}}` : protocole, nom de domaine, chemin, paramètres. Cette page est-elle sécurisée ? Qu'est-ce que cela garantit ?
:::

::: reponse 5
Protocole `https` ; domaine `{{www.cinema-exemple.fr|www.bus-exemple.fr}}` ; chemin `{{/seances|/horaires}}` ; paramètres `{{film=dune` et `jour=samedi|ligne=12` et `arret=gare}}`. (2 pt) Oui, `https` : les échanges sont **chiffrés** ; cela ne garantit pas que le site est honnête. (1 pt)
:::

## Partie 3 — Le dialogue client / serveur

:::: question 5 [3 pt]
Un navigateur envoie la requête suivante et reçoit cette réponse :

```text
GET {{/recherche?q=volley&page=1|/produits?taille=M&couleur=bleu}} HTTP/1.1
Host: {{www.sport-exemple.fr|www.boutique-exemple.fr}}

HTTP/1.1 {{200 OK|404 Not Found}}
```

**a)** Quel serveur est interrogé ? Quels paramètres sont envoyés ?

::: zone 2
:::

**b)** Que signifie la réponse ?

::: zone 1
:::

**c)** Qui **fabrique** la page de résultats à partir de la base de données : le client ou le serveur ? Qui l'**affiche** avec ses couleurs ?

::: zone 1
:::
::::

::: reponse 0
**a)** `{{www.sport-exemple.fr|www.boutique-exemple.fr}}` ; paramètres `{{q=volley` et `page=1|taille=M` et `couleur=bleu}}`. (1 pt)

**b)** {{`200 OK` : tout s'est bien passé, la page est envoyée.|`404 Not Found` : la ressource demandée est introuvable sur le serveur.}} (1 pt)

**c)** Le **serveur** fabrique la page ; le **client** (le navigateur) l'affiche. (1 pt)
:::

## Partie 4 — Recherche et cookies

::: question 6 [3 pt]
{{Un site de vente de compléments alimentaires arrive en premier dans un moteur de recherche, avec la mention « Sponsorisé ». **a)** Pourquoi est-il en premier ? **b)** Citer deux questions à se poser pour juger si ses informations sur la santé sont fiables.|Une page qui affirme qu'un jeu vidéo rend plus intelligent arrive en deuxième position d'une recherche. **a)** Citer une raison pour laquelle une page peut être bien classée. **b)** Citer deux questions à se poser pour juger si cette affirmation est fiable.}}
:::

::: reponse 4
**a)** {{C'est une **publicité** : le site a payé pour apparaître en premier.|Elle reçoit beaucoup de **liens** d'autres pages (des « votes »), ou c'est une publicité.}} (1 pt) **b)** Deux questions parmi : **qui** écrit ? **quand** ? **d'où** viennent les informations (sources) ? **pourquoi** la page existe-t-elle (informer, vendre, convaincre) ? (2 pt)
:::

::: question 7 [2 pt]
{{Après avoir regardé des chaussures sur un site, Lina voit des publicités pour ces chaussures sur tous les autres sites. Expliquer ce qui permet cela, et un réglage du navigateur qui l'éviterait.|Tom se croit invisible en navigation privée sur l'ordinateur du lycée. A-t-il raison ? Expliquer ce que fait vraiment la navigation privée.}}
:::

::: reponse 4
{{Un **cookie tiers**, déposé par une régie publicitaire présente sur de nombreux sites, permet de suivre sa navigation d'un site à l'autre (1 pt). Bloquer les cookies tiers, ou refuser les cookies publicitaires dans la bannière (1 pt).|**Non** (1 pt) : la navigation privée n'enregistre ni historique ni cookies **sur l'ordinateur** une fois la fenêtre fermée, mais les sites visités et le réseau du lycée voient toujours passer ses connexions (1 pt).}}
:::
