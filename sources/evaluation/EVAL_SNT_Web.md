---
titre: "Le Web : l'essentiel"
niveau: SNT (2nde)
sequence: S2
court: Interro Web
rangement: Eval/2nde
pronote:
  titre: "S2 Le Web — Interrogation : l'essentiel du thème"
  description: "S2 Le Web : interrogation courte de 30 min (45 min avec tiers-temps), sujets A et B, surtout des questions à cocher : Internet et Web, histoire, licences, HTML et CSS, URL, client / serveur, moteurs, cookies. Notée."
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
**Date** : vendredi 4 décembre, 9 h, classe entière. Sujet **volontairement simple** (demande de l'enseignant, 27 novembre) : les élèves n'étaient pas prêts après la synthèse du 20. Il remplace la première version, plus longue (dans l'historique git). La moitié des points vient des cases à cocher ; aucune question ne demande d'écrire plus de deux lignes.

**Révision** : fiche `REVISION_SNT_Web_Essentiel` (même dossier), à déposer sur l'ENT et Pronote dès le 27 novembre. Chaque question de l'interrogation correspond à un encadré de la fiche, avec un exemple différent.

**Mise en œuvre** : distribuer les sujets A et B en alternance selon les rangs. Même structure, même difficulté, même barème ; seuls les exemples changent.
:::

## Partie 1 — Questions à cocher

:::: question 1 [5 pt]
Cocher la bonne réponse.

::: variante A
**a)** Le Web, c'est…

- [ ] le réseau mondial de câbles et de routeurs
- [x] un service d'Internet : des pages reliées par des liens
- [ ] un autre nom de Google

**b)** Le Web a été inventé…

- [x] en 1989, au CERN, par Tim Berners-Lee
- [ ] en 1969, par l'armée américaine
- [ ] en 2004, par Mark Zuckerberg

**c)** Le langage qui décrit le **contenu** d'une page (titres, paragraphes, liens) est…

- [x] HTML
- [ ] CSS
- [ ] HTTP

**d)** Le langage qui décrit le **style** d'une page (couleurs, polices) est…

- [ ] HTML
- [x] CSS
- [ ] URL

**e)** Une photo trouvée sur Internet…

- [ ] est libre : on peut en faire ce qu'on veut
- [x] est protégée par le droit d'auteur, sauf si une licence autorise autre chose
- [ ] n'appartient à personne

:::

::: variante B
**a)** Internet, c'est…

- [x] le réseau mondial qui transporte les données
- [ ] uniquement les pages web
- [ ] un logiciel installé sur l'ordinateur

**b)** Le Web a été inventé par…

- [ ] Bill Gates, chez Microsoft
- [x] Tim Berners-Lee, au CERN
- [ ] Steve Jobs, chez Apple

**c)** La balise `<a href="…">` sert à faire…

- [ ] un titre
- [ ] une image
- [x] un lien hypertexte

**d)** Pour mettre tous les titres en rouge, on écrit une règle…

- [x] CSS
- [ ] HTML
- [ ] HTTP

**e)** Dans une licence Creative Commons, **BY** veut dire…

- [x] citer l'auteur
- [ ] pas d'utilisation commerciale
- [ ] pas de modification
:::
::::

::: reponse 0
1 point par item. {{a) un service d'Internet ; b) 1989, CERN ; c) HTML ; d) CSS ; e) droit d'auteur.|a) le réseau ; b) Tim Berners-Lee ; c) lien ; d) CSS ; e) citer l'auteur.}}
:::

:::: question 2 [5 pt]
Cocher la bonne réponse.

::: variante A
**a)** Le navigateur (Firefox, Chrome…) est…

- [x] le client : il demande la page et l'affiche
- [ ] le serveur : il stocke les pages
- [ ] un moteur de recherche

**b)** Le serveur répond `404`. Cela veut dire…

- [ ] tout s'est bien passé
- [x] la page demandée est introuvable
- [ ] la page est sécurisée

**c)** Pour trouver vite les pages qui contiennent un mot, un moteur de recherche utilise…

- [x] un index construit à l'avance par des robots
- [ ] une lecture de tout le Web à chaque recherche
- [ ] l'historique de l'utilisateur

**d)** Un résultat marqué « Sponsorisé »…

- [ ] est le site le plus fiable
- [x] est une publicité payée
- [ ] est le site le plus ancien

**e)** Un cookie, c'est…

- [ ] un virus
- [x] un petit fichier déposé par un site pour me reconnaître
- [ ] un mot de passe
:::

::: variante B
**a)** Le serveur web…

- [ ] affiche la page avec ses couleurs
- [x] stocke ou fabrique la page, puis l'envoie
- [ ] est l'écran de l'ordinateur

**b)** Le serveur répond `200 OK`. Cela veut dire…

- [x] tout s'est bien passé, la page est envoyée
- [ ] la page est introuvable
- [ ] il y a un virus

**c)** Les robots d'un moteur de recherche…

- [x] parcourent le Web de lien en lien pour construire l'index
- [ ] répondent aux questions des utilisateurs
- [ ] suppriment les fausses informations

**d)** Deux moteurs de recherche différents…

- [ ] donnent toujours les mêmes résultats
- [x] ne donnent pas forcément les mêmes résultats
- [ ] utilisent le même index

**e)** En navigation privée…

- [ ] personne ne peut voir les sites que je visite
- [x] l'historique et les cookies ne sont pas gardés sur mon appareil
- [ ] Internet est plus rapide
:::
::::

::: reponse 0
1 point par item. {{a) client ; b) introuvable ; c) index ; d) publicité ; e) petit fichier qui me reconnaît.|a) stocke ou fabrique, puis envoie ; b) tout va bien ; c) construisent l'index ; d) pas forcément les mêmes ; e) rien n'est gardé sur l'appareil.}}
:::

## Partie 2 — Lire et comprendre

:::: question 3 [3 pt]
Voici le code d'une page :

```html
<h1>{{Le club photo|Le foyer du lycée}}</h1>
<p>{{Rendez-vous le mardi à midi.|Ouvert de 10 h à 16 h.}}</p>
<a href="{{https://www.photo-exemple.fr|https://www.foyer-exemple.fr}}">{{Voir nos photos|Le menu du jour}}</a>
```

**a)** Quel est le **titre** de la page ?

::: zone 1
:::

**b)** Quel texte est un **lien** ? Vers quelle adresse mène-t-il ?

::: zone 1
:::
::::

::: reponse 0
**a)** « {{Le club photo|Le foyer du lycée}} » (balise `<h1>`). (1 pt)

**b)** « {{Voir nos photos|Le menu du jour}} » (balise `<a>`), qui mène à `{{https://www.photo-exemple.fr|https://www.foyer-exemple.fr}}`. (2 pt : 1 pour le texte, 1 pour l'adresse)
:::

:::: question 4 [3 pt]
Voici une adresse : `{{https://www.piscine-exemple.fr/horaires|http://www.jeux-exemple.fr/gagner}}`

**a)** Quel est le **nom de domaine** (le nom du serveur) ?

::: zone 1
:::

**b)** Cette page est-elle **sécurisée** ? Comment le sait-on ?

::: zone 1
:::
::::

::: reponse 0
**a)** `{{www.piscine-exemple.fr|www.jeux-exemple.fr}}`. (1 pt)

**b)** {{**Oui** : l'adresse commence par `https`, les échanges sont chiffrés (cadenas).|**Non** : l'adresse commence par `http` sans « s », les échanges ne sont pas chiffrés.}} (2 pt : 1 pour la réponse, 1 pour la raison)
:::

::: question 5 [2 pt]
{{Une image est sous licence **CC BY-NC** (citer l'auteur, pas d'usage commercial). Léa veut la mettre dans son exposé de SNT, en citant l'auteur. **A-t-elle le droit ?** Pourquoi ?|Une image est sous licence **CC BY-NC** (citer l'auteur, pas d'usage commercial). Un magasin veut la mettre sur sa publicité. **A-t-il le droit ?** Pourquoi ?}}
:::

::: reponse 2
{{**Oui** : elle cite l'auteur (BY) et un exposé n'est pas commercial (NC respecté).|**Non** : une publicité est un usage commercial, interdit par NC.}} (1 pt la réponse, 1 pt la raison)
:::

::: question 6 [2 pt]
{{Après avoir regardé un vélo sur un site, Noé voit des publicités pour ce vélo sur d'autres sites. **Qu'est-ce qui permet cela ?** Donner un moyen de l'éviter.|Sur un site, une bannière demande « Accepter tous les cookies ? ». **À quoi servent les cookies publicitaires ?** Que peut-on faire pour les éviter ?}}
:::

::: reponse 2
{{Les **cookies** (cookies tiers, publicitaires) qui suivent sa navigation d'un site à l'autre (1 pt).|À **suivre** ma navigation pour me montrer des publicités ciblées (1 pt).}} Pour l'éviter : **refuser** les cookies dans la bannière, ou bloquer les cookies tiers dans le navigateur (1 pt).
:::
