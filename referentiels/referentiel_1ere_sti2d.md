# Référentiel Officiel : Classe de 1ère STI2D (IT & I2D)

## 1. Contexte et Structure des Enseignements
En classe de Première STI2D, les élèves suivent deux enseignements de spécialité technologiques interconnectés :
1. **IT (Innovation Technologique - 3h) :** Démarche de projet, créativité, design, éco-conception, démarche d'investigation sur des systèmes pluritechnologiques.
2. **I2D (Ingénierie et Développement Durable - 9h) :** Approche sociétale, environnementale et matérielle des systèmes (matière, énergie, information).

---

## 2. Compétences Générales de la Fiche Programme (Trunk Commun Technologique)

* **CO1. Analyse & Modélisation :**
  * **CO1.1 :** Identifier le besoin, les exigences et les contraintes d'un système.
  * **CO1.2 :** Qualifier et quantifier les performances d'un système (fonctionnel, énergétique, temporel).
  * **CO1.3 :** Décrire le fonctionnement d'un système à l'aide de modèles SysML.
* **CO2. Expérimentation & Mesure :**
  * **CO2.1 :** Identifier et caractériser les grandeurs physiques d'un système (signaux, tensions, courants, débits, protocoles).
  * **CO2.2 :** Instrumenter un système, choisir les capteurs et régler la chaîne de mesure.
  * **CO2.3 :** Valider les performances d'un système par comparaison entre simulé et mesuré.
* **CO3. Communication & Démarche de projet :**
  * **CO3.1 :** Argumenter un choix technologique sous l'angle du développement durable (analyse du cycle de vie ACV, bilan carbone).
  * **CO3.2 :** Produire des documents techniques récapitulatifs (dossier technique, diaporama, schématisation).

---

## 3. Focus : La Chaîne d'Information (Spécialité SIN)

En 1ère STI2D, la chaîne d'information est étudiée conjointement avec la chaîne d'énergie.

```
+-----------------------------------------------------------------------------+
|                          CHAÎNE D'INFORMATION                               |
|                                                                             |
| +--------------+      +--------------+      +-----------------------------+ |
| |  ACQUÉRIR    | ---> |   TRAITER    | ---> |  COMMUNIQUER / INTERFACER   | |
| +--------------+      +--------------+      +-----------------------------+ |
|   Capteurs,              Cartes de              Bus de terrain,             |
|   Grandeurs              traitement,            Wi-Fi, Bluetooth,           |
|   Physiques              Microcontrôleurs       Réseaux locaux, IHM         |
+-----------------------------------------------------------------------------+
```

### A. Bloc ACQUÉRIR (Capteurs & Conditionnement)
* Nature des grandeurs physiques (Température, Pression, Humidité, Présence, Vitesse, Position).
* Capteurs analogiques vs numériques (Tout-Ou-Rien / TOR, Numérique).
* Conversion Analogique-Numérique (CAN / ADC) : Fréquence d'échantillonnage, quantification, résolution (bits), quantum.
* Conditionnement du signal : Amplification, filtrage analogique simple.

### B. Bloc TRAITER (Calculateurs & Algorithmique)
* Architecture logique des cartes de traitement (type ESP32, Arduino, Micro:bit, cartes propriétaires).
* Algorithmique de base appliquée aux systèmes physiques :
  * Structures séquentielles, conditionnelles et répétitives.
  * Organigrammes et algorithme sous forme de pseudo-code ou diagrammes d'état.
  * Implémentation sous C/C++ (Arduino) ou Python.

### C. Bloc COMMUNIQUER (Réseaux & Liaisons)
* Transmissions de données en série vs parallèle.
* Liaison série asynchrone (UART/RS232/RS485) : Baudrate, parité, bits de stop.
* Bus de communication locaux inter-composants : $I^2C$, SPI.
* Architecture réseau basique : Adresse IP, Masque, Switch, Routeur, Trame Ethernet.

---

## 4. Modélisation SysML (Langage de Modélisation Système)
L'outil de modélisation obligatoire en 1ère STI2D :
* **Diagramme d'Exigences (req - Requirement Diagram) :** Expression du besoin, critères d'évaluation, niveaux d'exigence.
* **Diagramme de Cas d'Utilisation (uc - Use Case Diagram) :** Interactions entre les acteurs (utilisateurs, systèmes externes) et le système.
* **Diagramme de Définition de Bloc (bdd - Block Definition Diagram) :** Structure interne globale, composition, héritage.
* **Diagramme de Bloc Interne (ibd - Internal Block Diagram) :** Connexions physiques et flux (énergie, matière, information) entre les sous-blocs.
* **Diagramme d'États (stm - State Machine Diagram) :** Comportement événementiel du système.

---

## 5. Le Projet Technologique de 1ère STI2D (IT)
* **Volume horaire :** ~36 heures consacrées à un projet collaboratif en groupe.
* **Objectif :** Répondre à une problématique concrète en appliquant une démarche de créativité (design, maquettage rapide, impression 3D, prototypage électronique).
* **Évaluation :** Revue de projet 1, revue de projet 2, présentation orale individuelle et collective.