# Inventaire du laboratoire SIN — Lycée César Baggio

> **Mode actuel : tout en simulation.** Les activités pratiques (TP, activités de cours) s'appuient uniquement sur les outils ci-dessous, utilisables depuis un navigateur ou un poste élève standard. Le matériel physique sera ajouté plus tard dans la section « Matériel physique ».
>
> Règle pour la génération : proposer en priorité un outil de cette liste. Tout outil ou composant non listé (ou marqué « à vérifier ») doit être signalé à l'enseignant.

## Simulateurs électroniques et microcontrôleurs

| Outil | Accès | Ce qu'on peut simuler | Remarques |
| :--- | :--- | :--- | :--- |
| **Wokwi** | wokwi.com (navigateur, compte gratuit pour sauvegarder) | ESP32, Arduino Uno, Raspberry Pi Pico ; C/C++ Arduino et MicroPython ; LED, boutons, potentiomètre, servomoteur, écran OLED SSD1306 (I2C), capteurs courants | Analyseur logique virtuel (export VCD lisible dans PulseView). Accès Internet simulé via le Wi-Fi « Wokwi-GUEST » (MQTT, HTTP). Le TMP102 n'est pas dans la bibliothèque de base : à vérifier avant un TP I2C |
| **Tinkercad Circuits** | tinkercad.com (compte élève via la classe) | Arduino Uno, capteur de température analogique TMP36, LCD, moteurs, multimètre et oscilloscope virtuels | Bien pour la 1ère / SNT ; pas d'ESP32 |

## Réseaux

| Outil | Accès | Usage | Remarques |
| :--- | :--- | :--- | :--- |
| **Filius** | logiciel libre, à installer (Windows / Linux) | Réseaux locaux, adressage IP, routage, DNS, serveur web, échanges client-serveur | Très adapté SNT et 1ère ; simulation pas à pas des échanges |
| **Cisco Packet Tracer** | à installer, compte Cisco NetAcad requis | Switchs, routeurs, VLAN, routage statique/dynamique, IoT | Plutôt Term SIN / BTS |
| **Wireshark** | à installer | Analyse de trames à partir de fichiers de capture `.pcap` fournis | Pas de capture en direct sur le réseau du lycée sans autorisation |

## Programmation et données

| Outil | Accès | Usage |
| :--- | :--- | :--- |
| **Thonny** | à installer | Python pour débutants (SNT) |
| ~~Capytale~~ | **indisponible** | Pas proposé par l'ENT de l'académie de Lille : utiliser l'éditeur web maison (`sources/autonomie/fichiers/editeur_web.html`) pour HTML/CSS, Thonny ou Basthon pour Python |
| **VS Code** | à installer | Python, HTML/CSS, Arduino (Term) |
| **PulseView** | à installer (sigrok) | Lecture de chronogrammes VCD exportés de Wokwi, décodeurs I2C / SPI / UART |
| **MQTT Explorer** | à installer | Observer les messages MQTT d'un broker public de test |

## Activités débranchées (sans ordinateur)

| Matériel | Usage |
| :--- | :--- |
| Papier, enveloppes, cartes imprimées | Jeux de rôle : paquets réseau, routage, tri, codage binaire |
| Tableau blanc + feutres | Schémas collectifs, mise en commun |
| Ardoises (si disponibles) | Quiz de classe à main levée |

## Matériel physique

*À compléter plus tard (références, quantités, état). Tant que cette section est vide, aucun TP ne doit exiger de matériel réel.*

| Désignation | Référence | Quantité | Remarques |
| :--- | :--- | :---: | :--- |
| | | | |
