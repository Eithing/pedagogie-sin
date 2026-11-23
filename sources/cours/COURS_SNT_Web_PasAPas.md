---
titre: "Le voyage d'un clic : de l'adresse à la page affichée"
niveau: 2nde SNT
sequence: S2
court: Voyage d'un clic
pronote:
  titre: "S2 Le Web — Séance : le voyage d'un clic, de l'adresse à la page affichée"
  description: "S2, classe entière, reprise guidée avant l'interrogation du 4 décembre : décomposer une URL, jouer la requête et la réponse HTTP (client, DNS, serveur), lire un code HTML comme le navigateur. Fiche d'activités notée /20."
type: cours
duree: 55 min
bareme: 20
fiche_docx: true
illustration: img/web/dialogue-http.svg
accroche: "Vous cliquez, la page s'affiche en une demi-seconde. Entre les deux, cinq étapes : aujourd'hui, on les joue une par une."
competences: [WEB.3, WEB.4, WEB.5, WEB.6, WEB.7]
objectifs:
  - Décomposer une URL et reconnaître une page sécurisée
  - Raconter, dans l'ordre, ce qui se passe entre le clic et l'affichage (client, DNS, serveur, requête, réponse)
  - Lire un code HTML court comme le ferait le navigateur et distinguer contenu et style
prerequis:
  - "S1 Internet : adresse IP, paquets, DNS"
  - "S2 : séance de synthèse du 20 novembre"
preparation:
  - Imprimer la fiche d'activités (1 par élève) ; déposer le PDF sur l'ENT pour les absents
  - "Jeu de rôle de l'activité 2 : trois feuilles A4 écrites en gros, « NAVIGATEUR », « DNS (l'annuaire) », « SERVEUR WEB », et une enveloppe contenant le code HTML de la page (imprimer la diapo « Être le navigateur »)"
  - "Ouvrir le HTML de projection des diapos — F : plein écran, T : minuteur"
  - "Lire la fiche « contexte » de la séance (`CONTEXTE_SNT_Web_PasAPas`)"
---

::: prof
**Pourquoi cette séance.** Le 20 novembre, la synthèse a couvert tout le thème en une heure : trop vite, les élèves étaient perdus. L'interrogation est **reportée au 4 décembre**. Cette séance ne reprend **qu'une seule histoire** : ce qui se passe quand on clique sur un lien. Tout le reste du thème (URL, HTTP, client / serveur, HTML) s'y accroche. Les licences, les moteurs et les cookies restent sur la fiche de révision.

**Méthode** : pour chaque étape, le professeur fait l'exemple au tableau, la classe le refait à l'oral, puis chacun le fait seul sur la fiche. On n'avance que quand la majorité a fini.

**Note** : la note de cette fiche peut remplacer celle de la synthèse du 20 novembre si elle est meilleure (à annoncer en début d'heure).
:::

::: prof Barème
| Activité | Questions | Ce qui est évalué | Points |
| :--- | :--- | :--- | :---: |
| 1. Découper une adresse | Q1 | Protocole, serveur, chemin, paramètres ; page sécurisée | 4 |
| 2. Jouer la scène | Q2 | Ordre des étapes, requête GET, codes 200 et 404, client et serveur | 4 |
| 3. Être le navigateur | Q3, Q4 | Balises, rendu, lien ; contenu et style | 7 |
| 4. Quiz de sortie | Q5 à Q9 | Les étapes du voyage | 5 |
| **Total** | | | **20** |
:::

## Le voyage d'un clic

::: slide 4 min | Que se passe-t-il quand je clique ?
![](img/web/dialogue-http.svg){width=94%}

Cinq étapes, en une demi-seconde. Aujourd'hui, on les fait **une par une**.
:::

::: dire
**À dire** : « Vous cliquez sur un lien, la page apparaît. On a l'impression que c'est magique et immédiat. En réalité, votre navigateur a demandé une adresse à un annuaire, écrit une lettre à un ordinateur parfois à l'autre bout du monde, reçu un texte bizarre plein de chevrons, et l'a transformé en page. Aujourd'hui, on joue ce voyage. »

**Peut ajouter** : le tout premier site web existe encore et s'affiche toujours : `info.cern.ch` (fiche contexte).
:::

::: slide 2 min | Étape 1 : l'adresse de la page | fiche
![](../autonomie/img/web/url.svg){width=92%}

- **https** : le cadenas, les échanges sont **chiffrés** (page sécurisée) ; **http** sans s : pas chiffré.
:::

::: dire
**À dire** : « Une URL, c'est comme une adresse sur une enveloppe : le pays et la ville (le serveur), puis l'étage et la porte (le chemin). »
:::

::: activite 9 min | Découper une adresse | individuel
D'abord l'exemple au tableau, puis les deux adresses de la question 1, seuls.
:::

::: tableau Méthode : découper une URL | fiche
1. Avant `://` : le **protocole** (`https` = sécurisé).
2. Jusqu'au premier `/` : le **serveur** (nom de domaine).
3. Ensuite : le **chemin** de la page sur le serveur.
4. Après `?` (s'il y en a) : les **paramètres** envoyés.

**Exemple** : `https://fr.wikipedia.org/w/index.php?search=web` → protocole `https` (sécurisé) · serveur `fr.wikipedia.org` · chemin `/w/index.php` · paramètre `search=web`.
:::

::: question 1 [4 pt]
Découpez chaque adresse : protocole, serveur, chemin, paramètres. La page est-elle sécurisée ?

**a)** `https://www.monclub-judo.fr/horaires.html`

**b)** `http://cantine.lycee-exemple.fr/menu.html?jour=lundi`
:::

::: reponse 5
a) `https`, sécurisée · serveur `www.monclub-judo.fr` · chemin `/horaires.html` · pas de paramètre. b) `http`, **pas** sécurisée · serveur `cantine.lycee-exemple.fr` · chemin `/menu.html` · paramètre `jour=lundi`. (0,5 pt par élément juste)
:::

## Étapes 2 et 3 : la demande et la réponse

::: slide 3 min | Le client demande, le serveur répond | fiche
- Le **client**, c'est **votre navigateur** : il demande.
- Le **DNS**, c'est l'**annuaire** : il donne l'adresse IP du serveur.
- Le **serveur web** garde les pages : il répond.
- La demande : **`GET`** + le chemin de la page. La réponse : un **code** + la page.

| Code | Signification |
| :---: | :--- |
| **200** | OK, voici la page |
| **404** | page introuvable |
:::

::: dire
**À dire** : « Le client et le serveur, c'est un client et un serveur de restaurant : le client commande, le serveur apporte. Le DNS, c'est l'annuaire où l'on cherche l'adresse du restaurant. »

**Peut ajouter** : la page 404 de certains sites est devenue un petit jeu ou un dessin (fiche contexte).
:::

::: activite 13 min | Jouer la scène | classe
Trois élèves jouent le **navigateur**, le **DNS** et le **serveur web**. Les autres suivent et complètent le dialogue de la question 2.
:::

::: prof
**Le jeu de rôle** (5 minutes, puis 2 minutes pour la fiche, puis on recommence avec la page qui n'existe pas) :

1. Le navigateur lit l'URL `http://cantine.lycee-exemple.fr/menu.html?jour=lundi` au tableau.
2. Il va voir le DNS : « Quelle est l'adresse IP de `cantine.lycee-exemple.fr` ? » Le DNS répond : « `192.0.2.80` ».
3. Il écrit sur une feuille la requête `GET /menu.html?jour=lundi` et la porte au serveur.
4. Le serveur répond « 200 OK » et lui tend l'enveloppe avec le code HTML.
5. Le navigateur lit le code à voix haute, puis la classe dit ce qui s'affiche.

**Deuxième tour** : le navigateur demande `/menu-noel.html`. Le serveur cherche, ne trouve pas : « **404** ».
:::

::: tableau Le voyage, dans l'ordre | fiche
1. Le navigateur lit l'**URL**.
2. Il demande au **DNS** l'adresse IP du serveur.
3. Il envoie la **requête** : `GET` + le chemin.
4. Le serveur **répond** : un code (200, 404…) + le code HTML.
5. Le navigateur **affiche** la page.
:::

::: question 2 [4 pt]
Complétez le dialogue.

1. Navigateur → DNS : « Quelle est l'adresse IP de ………………………… ? »
2. Navigateur → serveur : « ……… `/menu.html?jour=lundi` »
3. Serveur → navigateur : « ……… OK, voici la page. »
4. Pour une page qui n'existe pas, le serveur répond le code ……… .

Qui est le client ? Qui est le serveur ?
:::

::: reponse 3
1. `cantine.lycee-exemple.fr` (0,5 pt) · 2. `GET` (1 pt) · 3. `200` (0,5 pt) · 4. `404` (1 pt). Client : le navigateur ; serveur : l'ordinateur qui héberge le site de la cantine (1 pt).
:::

## Étapes 4 et 5 : le navigateur construit la page

::: slide 3 min | Le code HTML : des balises autour du contenu | fiche
![](img/web/rendu-judo.svg){width=94%}

- Le **HTML** dit **quoi** afficher : titre, paragraphe, lien. Le **CSS** dit **comment** : couleur, taille, police.
:::

::: dire
**À dire** : « Le serveur n'envoie pas une image de la page : il envoie un texte, avec des balises. C'est votre navigateur qui dessine la page. C'est pour ça qu'un même site s'affiche différemment sur un téléphone et sur un ordinateur. »
:::

::: activite 12 min | Être le navigateur | individuel
Vous êtes le navigateur : voici le code reçu du serveur. Lisez-le, puis dessinez la page.

```html
<h1>Tournoi de judo</h1>
<p>Samedi 5 décembre, au gymnase.</p>
<a href="https://www.monclub-judo.fr/inscriptions.html">Inscriptions</a>
```
:::

::: tableau Méthode : lire un code HTML | fiche
1. Repérer les **balises** : entre chevrons `< >`, elles vont par deux, `<p>` ouvre, `</p>` ferme.
2. Ce qui est **entre** les deux balises s'affiche ; les balises, **jamais**.
3. `<h1>` : grand titre · `<p>` : paragraphe · `<a href="…">` : lien vers l'adresse écrite dans `href`.
:::

::: question 3 [5 pt]
**a)** Citez les trois balises de ce code et leur rôle. **b)** Écrivez exactement ce qui s'affiche à l'écran. **c)** Un visiteur clique sur « Inscriptions » : à quel serveur le navigateur envoie-t-il sa requête, et pour quel chemin ?
:::

::: reponse 5
a) `h1` grand titre, `p` paragraphe, `a` lien (1,5 pt). b) « Tournoi de judo » en grand, « Samedi 5 décembre, au gymnase. », puis « Inscriptions » souligné : les balises ne s'affichent pas (1,5 pt). c) Au serveur `www.monclub-judo.fr` (1 pt), pour le chemin `/inscriptions.html` (1 pt).
:::

::: question 4 [2 pt]
On ajoute la règle CSS `h1 { color: red; }`. Qu'est-ce qui change à l'écran ? Le texte de la page change-t-il ?
:::

::: reponse 2
Le grand titre s'affiche en rouge (1 pt). Le texte ne change pas : le CSS ne touche que le **style**, pas le contenu (1 pt).
:::

## Faire le bilan

::: retenir 5 min
- Une URL se découpe en [[protocole]], serveur, [[chemin]] et paramètres ; `https` signifie que la page est [[sécurisée]].
- Le navigateur est le [[client]] : il demande au DNS l'adresse IP du serveur, puis envoie une requête `GET`.
- Le [[serveur]] répond par un code (200 : OK, 404 : introuvable) et le code HTML de la page.
- Le HTML dit [[quoi]] afficher, le CSS dit [[comment]] l'afficher.
:::

::: activite 4 min | Quiz de sortie | individuel | projeter
Répondez sur votre fiche.
:::

::: question 5 [1 pt]
Dans `https://www.service-public.fr/particuliers`, le serveur est…

- [ ] `https`
- [x] `www.service-public.fr`
- [ ] `/particuliers`
:::

::: reponse 0
`www.service-public.fr` : entre `://` et le premier `/`.
:::

::: question 6 [1 pt]
Qui donne l'adresse IP d'un site à partir de son nom ?

- [ ] le serveur web
- [x] le DNS
- [ ] le navigateur
:::

::: reponse 0
Le **DNS**, l'annuaire.
:::

::: question 7 [1 pt]
Le code de réponse 404 signifie…

- [ ] OK, voici la page
- [x] page introuvable
- [ ] page sécurisée
:::

::: reponse 0
**Introuvable** : le chemin demandé n'existe pas sur le serveur.
:::

::: question 8 [1 pt]
Dans le modèle client / serveur, le client, c'est…

- [x] le navigateur de l'utilisateur
- [ ] l'ordinateur qui héberge le site
- [ ] le DNS
:::

::: reponse 0
Le **navigateur** : il demande, le serveur répond.
:::

::: question 9 [1 pt]
Pour mettre un titre en bleu, on modifie…

- [ ] le HTML
- [x] le CSS
- [ ] l'URL
:::

::: reponse 0
Le **CSS** : il gère le style.
:::

::: dire
Ramasser les fiches. Annoncer : « L'interrogation est le **vendredi 4 décembre**. Si vous savez raconter le voyage d'un clic en cinq étapes, vous avez la moitié de l'interrogation. Relisez la fiche de révision, partie par partie. »
:::
