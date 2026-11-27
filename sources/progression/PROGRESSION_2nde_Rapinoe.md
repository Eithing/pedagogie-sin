---
type: progression
titre: Sciences numériques et technologie
classe: 2nde Rapinoe
niveau: SNT (2nde)
annee: 2026-2027
calendrier: referentiels/calendrier_2026-2027.yaml
programme: referentiels/bo/snt.yaml
fin_cours: 2027-06-04
horaire: "1 h 30 / élève / semaine : 1 h en classe entière + 1 h en demi-groupe une semaine sur deux"
pistes:
  - id: snt
    nom: SNT — 2nde Rapinoe
    resume: 1 h classe entière + TP 1 sem./2
    creneaux:
      - { heures: 1, libelle: "1 h en classe entière, chaque semaine" }
      - { heures: 1, frequence: 0.5, libelle: "1 h de TP en demi-groupe, une semaine sur deux (groupes A et B en alternance)" }
sequences:
  - id: S1
    titre: Internet
    court: Internet
    couleur: "#0d9488"
    theme: Thème « Internet »
    problematique: Comment une photo traverse-t-elle Internet en moins d'une seconde ?
    programme: [INT.1, INT.2, INT.3, INT.4]
    activites:
      - "TP diagnostique de rentrée (niveau en numérique)"
      - "Séance rythmée « Paquets, adresses IP et TCP » : jeu des paquets débranché, quiz projeté (classe entière)"
      - "TP Filius : construire un petit réseau, observer le routage et la perte de paquets (demi-groupe)"
      - "TP DNS et routage : retrouver l'adresse IP d'un site à partir de son nom, suivre le chemin des paquets"
      - "Réseaux physiques (fibre, 4G, Wi-Fi…) et ordre de grandeur du trafic ; pair-à-pair et usages illicites"
    outils: [Filius, navigateur, activités débranchées]
    evaluation: "Interrogation de 30 min (sujets A / B), vendredi 13 novembre (reportée à cause du blocus) : QCM, adresses IPv4, DNS, routage, TCP."
    ressources: [COURS_SNT_TCP_IP, EVAL_SNT_Internet, AUTO_SNT_Internet_Guide]
    etat: fait
    debut: 2026-09-01
    fin: 2026-10-08

  - id: S2
    titre: Le Web
    court: Le Web
    couleur: "#2563eb"
    theme: Thème « Le Web »
    problematique: Que se passe-t-il entre le clic sur un lien et l'affichage d'une page ?
    programme: [WEB.1, WEB.2, WEB.3, WEB.4, WEB.5, WEB.6, WEB.7, WEB.8, WEB.9]
    activites:
      - "Frise des étapes du Web (1965 → 2010) et notions juridiques (licences, droit d'auteur)"
      - "TP : créer puis modifier une page HTML avec liens hypertextes et feuille CSS (demi-groupe)"
      - "Décomposer des URL, reconnaître une page sécurisée (HTTPS), lire une requête HTTP dans les outils du navigateur"
      - "Indexer à la main quelques textes puis répondre à une requête ; comparer plusieurs moteurs de recherche"
      - "Régler cookies et confidentialité du navigateur ; visualiser les traqueurs"
    outils: [navigateur (outils de développement), éditeur web maison (fichier HTML, sans compte)]
    evaluation: "Interrogation simple de 30 min (sujets A / B, 45 min avec tiers-temps, surtout des cases à cocher), vendredi 4 décembre (reportée du 27 novembre). Notes de TP : page web (9 octobre), moteurs de recherche (13 novembre), coulisses d'une page (20 et 27 novembre) ; fiche de synthèse notée (20 novembre)."
    ressources: [AUTO_SNT_Web_Decouverte, AUTO_SNT_Web_PremierePage, AUTO_SNT_Web_ClicPage, AUTO_SNT_Web_MoteursRecherche, AUTO_SNT_Web_MoteursRecherche_Note, AUTO_SNT_Web_Cookies, COURS_SNT_Web_Reprise, TP_SNT_Web_PagePerso, COURS_SNT_Web_Synthese, TP_SNT_Web_Coulisses, COURS_SNT_Web_Escape, REVISION_SNT_Web, REVISION_SNT_Web_Essentiel, EVAL_SNT_Web]
    semaines: 4
    etat: en-cours
    debut: 2026-10-09
    fin: 2026-12-04

  - id: S3
    titre: Les réseaux sociaux
    court: Réseaux sociaux
    couleur: "#7c3aed"
    theme: Thème « Les réseaux sociaux »
    problematique: Qui choisit ce que je vois sur mon fil d'actualité ?
    programme: [RS.1, RS.2, RS.3, RS.4, RS.5, RS.6, PY.1]
    activites:
      - "Identité numérique, e-réputation, paramétrage de la confidentialité d'un compte"
      - "Modèle économique : « quand c'est gratuit, c'est vous le produit » (étude de documents)"
      - "Graphes en débranché : rayon, diamètre, centre, notion de « petit monde »"
      - "Python : représenter un graphe d'amis (dictionnaire) et calculer le degré d'un sommet (demi-groupe)"
      - "Cyberviolence : article 222-33-2-2 du code pénal et ressources d'aide"
    outils: [Python (Thonny ou Basthon), activités débranchées]
    evaluation: "Évaluation écrite : caractéristiques d'un graphe simple et analyse d'une situation de cyberviolence."
    semaines: 4

  - id: S4
    titre: Les données structurées et leur traitement
    court: Données structurées
    couleur: "#ea580c"
    theme: Thème « Les données structurées et leur traitement »
    problematique: Comment interroger un grand jeu de données ouvertes pour répondre à une question ?
    programme: [DON.1, DON.2, DON.3, DON.4, DON.5, PY.1]
    activites:
      - "Donnée personnelle, descripteurs et valeurs, formats (CSV, JSON)"
      - "Récupérer un jeu de données ouvertes (data.gouv.fr) et le trier / filtrer au tableur"
      - "Python : lire un fichier CSV, filtrer et calculer (boucles, conditions) (demi-groupe)"
      - "Métadonnées d'un fichier personnel ; stockage dans le nuage et consommation énergétique des centres de données"
    outils: [tableur, Python (module csv)]
    evaluation: "TP noté : répondre à trois questions sur un jeu de données à l'aide d'un programme."
    semaines: 4

  - id: S5
    titre: Localisation, cartographie et mobilité
    court: Localisation
    couleur: "#0891b2"
    theme: Thème « Localisation, cartographie et mobilité »
    problematique: Comment mon téléphone sait-il où je suis et quel chemin prendre ?
    programme: [LOC.1, LOC.2, LOC.3, LOC.4, LOC.5, PY.1]
    activites:
      - "Principe de la géolocalisation par satellites (GPS, Galileo) en débranché"
      - "Couches d'information de Géoportail ; contribution collaborative à OpenStreetMap"
      - "Python : décoder une trame NMEA 0183 pour obtenir latitude et longitude (demi-groupe)"
      - "Calcul d'itinéraire : logiciel puis modélisation par un graphe pondéré"
      - "Paramétrer le partage de position d'un téléphone"
    outils: [Géoportail, OpenStreetMap, Python]
    evaluation: "Évaluation écrite : décodage d'une trame NMEA et plus court chemin sur un graphe."
    semaines: 4

  - id: S6
    titre: La photographie numérique
    court: Photographie
    couleur: "#db2777"
    theme: Thème « La photographie numérique »
    problematique: Une photo de smartphone est-elle une copie fidèle de la réalité ?
    programme: [PHO.1, PHO.2, PHO.3, PHO.4, PY.1]
    activites:
      - "Photosites et pixels : comparer résolution du capteur et de l'image ; profondeur de couleur et poids d'une image"
      - "Retrouver les métadonnées EXIF d'une photo (et ce qu'elles révèlent)"
      - "Python : transformer une image pixel par pixel (niveaux de gris, négatif) (demi-groupe)"
      - "Étapes de construction de l'image finale par les algorithmes de l'appareil"
    outils: [Python (bibliothèque PIL), lecteur EXIF]
    evaluation: "TP noté : programme de traitement d'image ; question sur les métadonnées."
    semaines: 4

  - id: S7
    titre: Informatique embarquée et objets connectés
    court: Objets connectés
    couleur: "#16a34a"
    theme: Thème « Informatique embarquée et objets connectés »
    problematique: Comment un objet du quotidien réagit-il à son environnement ?
    programme: [IOT.1, IOT.2, IOT.3, PY.1]
    activites:
      - "Identifier capteurs, actionneurs, IHM et algorithme de contrôle d'un objet courant"
      - "Simulation Wokwi : programmer en MicroPython l'acquisition d'un capteur et la commande d'une LED (demi-groupe)"
      - "Réaliser une IHM simple (boutons, affichage) pour un objet connecté"
    outils: [Wokwi (MicroPython)]
    evaluation: "Mini-projet en binôme : objet connecté simulé, évalué sur grille."
    semaines: 4

  - id: S8
    titre: Bilan de l'année
    court: Bilan
    couleur: "#475569"
    problematique: Qu'ai-je appris sur le numérique cette année ?
    programme: [PY.1]
    activites:
      - "Présentation orale des mini-projets"
      - "Quiz de synthèse sur les sept thèmes"
    evaluation: "Oral de présentation du mini-projet."
    semaines: fin

journal:
  - date: 2026-10-07
    texte: "Blocus du lycée : plusieurs séances perdues début octobre, aucune note posée. Faits : TP diagnostique (peu exploitable), TP Filius, TP DNS / routage. Interrogation sur le thème Internet programmée avant la Toussaint."
  - date: 2026-10-07
    texte: "Mise en forme de la progression. Thème Internet en voie d'achèvement (séance TCP/IP réalisée) ; le Web suivra après les vacances de la Toussaint."
  - date: 2026-10-08
    texte: "Blocus : cours en distanciel. Thème Internet terminé (INT.3 et INT.4 traités à distance) ; l'interrogation Internet (sujets A/B) est reportée à la première heure en présentiel. Le Web démarre le 9 octobre en autonomie : fiche « Le Web n'est pas Internet » (classe entière) et TP noté « Ma première page web » (demi-groupe, éditeur web sans compte, Capytale n'étant pas disponible dans l'académie)."
  - date: 2026-10-16
    texte: "Blocus, distanciel : l'heure en classe entière est annulée. TP en demi-groupe : le 2e groupe fait « Ma première page web » (même TP que le 1er groupe le 9 octobre)."
  - date: 2026-11-02
    texte: "Retour en présentiel après la Toussaint. Environ trois élèves sur quatre n'ont rien rendu à distance : le début du Web est repris en classe. Séance « Du clic à la page » (reprise de la découverte du Web, URL, puis client / serveur et HTTP, avec une révision express d'Internet) et TP « Ma page web » refait au lycée en demi-groupe. L'interrogation Internet est fixée au vendredi 13 novembre."
  - date: 2026-11-06
    texte: "Blocus, distanciel. TP en demi-groupe (8 h) : moteurs de recherche (index à la main, classement, comparaison de deux moteurs, analyse critique d'une source), non noté, rendu obligatoire ; les deux groupes ont déjà fait « Ma première page web » avant les vacances. Classe entière (9 h) : fiche « Du clic à la page » (reprise d'Internet et du Web, URL, client / serveur, HTTP), non notée, rendu obligatoire. Fiche de révision déposée pour l'interrogation Internet du vendredi 13 novembre."
  - date: 2026-11-09
    texte: "Blocus : distanciel jusqu'à nouvel ordre, et peu de travail rendu le 6 novembre. Vendredi 13 novembre : en présentiel, interrogation Internet ; à distance, suite du thème Web avec « Cookies et confidentialité » (WEB.9), et l'interrogation est reportée au retour ; une révision guidée d'Internet reste sur l'ENT, en facultatif. TP de 8 h : le 2e demi-groupe fait le TP sur les moteurs de recherche."
  - date: 2026-11-13
    texte: "Toujours en distanciel, et besoin de notes. Vendredi 13 novembre : TP du 2e demi-groupe noté sur grille (`AUTO_SNT_Web_MoteursRecherche_Note`, enquête personnelle sur deux moteurs et une source) ; classe entière : interrogation Internet à distance, notée (`AUTO_SNT_Internet_Distance`, valeurs propres à chaque élève tirées du jour de naissance). La fiche « cookies » est reportée."
  - date: 2026-11-18
    texte: "Retour en présentiel prévu le 20 novembre ; il faut rattraper le retard. Le Web se termine le 27 novembre : séance de synthèse notée (20 novembre, avec la fiche de révision), TP noté « coulisses d'une page » (1er groupe le 20, 2e groupe le 27 avant l'interrogation), interrogation Web de 30 min le 27 novembre. Les cookies, vus seulement à distance, sont repris dans la synthèse. Les réseaux sociaux commencent le 4 décembre. Tous les TP et toutes les activités sont désormais notés."
  - date: 2026-11-23
    texte: "Le 20 novembre, la synthèse est allée trop vite : les élèves étaient perdus. L'interrogation Web est reportée au 4 décembre. Vendredi 27 novembre, 9 h : séance de reprise très guidée « le voyage d'un clic » (URL, DNS, requête et réponse HTTP jouées en classe, lire un code HTML), fiche notée /20, qui peut remplacer la note de la synthèse. Le TP du 2e demi-groupe reste le 27 à 8 h. Les réseaux sociaux commencent le 11 décembre."
  - date: 2026-11-25
    texte: "La séance du 27 novembre (9 h) est complétée par un quiz par équipes sur l'histoire du Web, les licences, les moteurs et les cookies, pour couvrir tout le thème avant l'interrogation du 4 décembre."
  - date: 2026-11-26
    texte: "La séance « le voyage d'un clic » ressemblait trop à la synthèse du 20 novembre et au jeu de rôle du 2 novembre : elle est remplacée par un escape game par équipes, « Panique à la MDL » (lien piégé, journal d'un serveur, page HTML cassée, licence d'une image, cookies tiers et publicité, verrou final sur l'histoire du Web), avec des exemples nouveaux. Fiche notée /20, qui peut remplacer la note de la synthèse."
  - date: 2026-11-26
    texte: "Bilan du 20 novembre : le TP « coulisses » s'est bien passé ; la synthèse a couvert tout le contenu, mais trop vite, et les élèves ne sont pas prêts pour l'interrogation. L'escape game du 27 novembre est confirmé comme séance de révision, notée ; l'interrogation reste le 4 décembre."
  - date: 2026-11-27
    texte: "L'interrogation Web du 4 décembre est refaite en version très simple, à la demande de l'enseignant : 10 questions à cocher (10 points), puis lire un code HTML, une URL, une licence et une question sur les cookies. Nouvelle fiche de révision courte (7 encadrés et un auto-test corrigé), à déposer sur l'ENT."
---

## Intentions pédagogiques

- **Programme** : les sept thèmes du BO, environ quatre semaines chacun ; l'ordre est au choix du professeur.
- **Ordre retenu** : Internet → Web → réseaux sociaux (les réseaux sociaux sont des applications du Web) → données → localisation → photographie → objets connectés. Chaque thème réinvestit le précédent : graphes (réseaux sociaux puis itinéraires), données (CSV puis métadonnées EXIF), programmation de plus en plus autonome jusqu'au mini-projet.
- **Python** est travaillé tout au long de l'année, surtout en TP de demi-groupe (notions transversales du programme).
- **Démarche** : séances rythmées (exposés courts, activités, trace écrite), activités débranchées et simulations. Pas de matériel physique pour l'instant.
- **Évaluation** : quiz de sortie formatifs, une évaluation sommative par thème, mini-projet final.
