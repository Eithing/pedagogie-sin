---
titre: "Amener la séance : le voyage d'un clic"
niveau: 2nde SNT
sequence: S2
court: Voyage d'un clic
type: contexte
competences: [WEB.1, WEB.3, WEB.4, WEB.5, WEB.6, WEB.7]
accroche: "2nde, classe entière, vendredi 27 novembre, 9 h. À lire avant la séance : ce que vous pouvez raconter, et comment relier tout le thème à une seule histoire."
---

::: info En une phrase, pour les élèves
« Vous cliquez des centaines de fois par jour. Aujourd'hui, on ralentit un seul clic pour voir tout ce qui se passe pendant la demi-seconde où la page apparaît. »
:::

### Pourquoi ils étaient perdus

Le 20 novembre, la synthèse a enchaîné neuf notions (histoire, licences, HTML, CSS, URL, HTTP, client / serveur, moteurs, cookies) : neuf petits morceaux sans lien entre eux. Aujourd'hui, **une seule histoire**, et chaque notion devient une **étape** de cette histoire. Quand un élève est perdu, la question à lui poser est toujours la même : « On en est à quelle étape du voyage ? »

### Amener la séance (les 4 premières minutes)

1. « Combien de fois avez-vous cliqué sur un lien depuis ce matin ? » Laisser répondre (beaucoup).
2. « Et que se passe-t-il, exactement, entre le moment où vous cliquez et le moment où la page s'affiche ? » Recueillir 2 ou 3 idées, même fausses (« ça télécharge », « ça va sur Internet »).
3. « En une demi-seconde, votre téléphone a cherché une adresse dans un annuaire, écrit une lettre à un ordinateur parfois à l'autre bout du monde, reçu un texte bizarre plein de chevrons, et l'a transformé en page. Aujourd'hui, on joue ce voyage, étape par étape. »
4. Annoncer : « L'interrogation est reportée au **4 décembre**. Le voyage d'un clic, puis un quiz par équipes sur le reste : tout le thème est là. »

### Le fil rouge : le restaurant

| Web | Restaurant |
| :--- | :--- |
| Le navigateur (client) | Le **client** qui commande |
| Le DNS | L'**annuaire** où l'on cherche l'adresse du restaurant |
| La requête `GET /menu.html` | La **commande** : « je voudrais le menu du lundi » |
| Le serveur web | Le **serveur** qui apporte le plat |
| Code 200 / 404 | « Voilà ! » / « Désolé, ce plat n'existe pas. » |
| Le HTML | La **recette** : ce qu'il y a dans l'assiette |
| Le CSS | La **présentation** de l'assiette |

### Anecdotes vraies, à placer au bon moment

| Quand | Anecdote |
| :--- | :--- |
| En ouverture | **Le Web est né d'un problème de rangement.** En mars 1989, au CERN, près de Genève, Tim Berners-Lee propose un système pour que les chercheurs retrouvent les documents des autres. Son chef, Mike Sendall, annote la proposition : « Vague but exciting… » (vague, mais passionnant). |
| Sur l'URL | **Le tout premier site web existe toujours** : `info.cern.ch`. Le CERN l'a remis en ligne ; on peut le projeter : du texte, des liens, pas une image. |
| Sur le partage | Le **30 avril 1993**, le CERN met le logiciel du Web dans le **domaine public** : tout le monde peut l'utiliser gratuitement. Sans cette décision, le Web aurait pu devenir payant (lien avec les licences de la fiche de révision). |
| Sur les images | **La première photo publiée sur le Web** (1992) est celle des « Horribles Cernettes », un groupe de musique parodique formé par des employées du CERN. |
| Sur le code 404 | Une légende raconte que « 404 » viendrait d'une salle 404 du CERN où était le serveur. C'est **faux** : c'est simplement un code de la norme HTTP. Bonne occasion de parler de vérification des sources. |
| Pour rire | Le **code 418 « I'm a teapot »** (je suis une théière) a été inventé comme poisson d'avril en 1998 ; il existe vraiment dans certains logiciels. |
| Sur les cookies | Les **cookies** ont été inventés en 1994 par Lou Montulli, chez Netscape, pour qu'un site de vente se souvienne du panier. |

### Pourquoi c'est utile pour eux

- **Se protéger** : savoir lire une URL, c'est repérer un faux site (une banque dont le serveur s'écrit avec une faute, un lien d'arnaque par SMS). Montrer un exemple inventé : `https://www.ameli-remboursement-info.com` n'est pas le site de l'Assurance maladie.
- **Comprendre les messages d'erreur** : 404, « connexion non sécurisée », « serveur introuvable » : ils sauront à quelle étape du voyage ça a cassé.
- **L'interrogation du 4 décembre** : URL, requête, client / serveur, HTML et CSS en sont la moitié.

### Ce qui bloque souvent, et comment débloquer

| Blocage | Ce que je dis ou je fais |
| :--- | :--- |
| Confusion Internet / Web | « Internet, ce sont les routes ; le Web, c'est un des services qui roulent dessus, comme les mails ou les jeux en ligne. » |
| « Le serveur, c'est Google ? » | « Le serveur, c'est l'ordinateur qui garde **ce** site. Google est un site comme un autre (avec beaucoup de serveurs). » |
| L'élève ne trouve pas où s'arrête le serveur dans l'URL | « Le serveur est entre `://` et le **premier** `/`. » Le surligner en couleur au tableau. |
| L'élève recopie les balises dans le rendu | « Les balises, c'est la recette ; vous ne mangez pas la recette, vous mangez le plat. » |
| Élève qui ne fait rien | Lui donner un rôle dans le jeu de la scène (navigateur, DNS, serveur). |

### Si la classe décroche

Refaire la scène avec un autre trio d'élèves, cette fois sur la page qui n'existe pas (`/menu-noel.html` → 404). Puis demander à un élève de **raconter** le voyage en cinq phrases, sans regarder la diapo.
