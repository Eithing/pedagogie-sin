# Skill: /progression

Crée ou **met à jour** une progression annuelle (une par classe), au format attendu par l'inspection : frise annuelle sur le calendrier réel, séquences problématisées, couverture du programme officiel, journal des ajustements.

Fichiers :
- `sources/progression/PROGRESSION_<classe>.md` : une classe (créneaux, profondeur, état d'avancement, journal).
- `sources/progression/_catalogue_TermSIN.yaml` : séquences partagées par les trois Terminales, dont la piste partagée « commun » (heure commune D2 + D3, à mettre à jour **une seule fois** pour les deux classes).
- `referentiels/calendrier_2026-2027.yaml` : vacances, jours fériés, examens (zone B).
- `referentiels/bo/*.yaml` : programmes officiels (texte du BO mot pour mot), avec les identifiants cités dans `programme:`.

## Mise à jour en cours d'année (cas le plus fréquent)

L'enseignant décrit en langage courant ce qui s'est passé, par exemple « D2 a fini le CAN vendredi », « les 2nde ont commencé le Web le 2/11 », « pas cours mardi avec les D3, grève », « je rallonge la régulation d'une semaine ».

1. Identifier la ou les classes concernées. « Les Terminales » = les trois fichiers ; l'heure commune = le catalogue (`pistes_partagees.commun`).
2. Traduire en modifications, **sans toucher aux dates des séquences futures** (elles sont recalculées automatiquement) :
   - séquence terminée → `etat: fait` + `fin: AAAA-MM-JJ` (date réelle de la dernière séance) ;
   - séquence commencée → `etat: en-cours` + `debut: AAAA-MM-JJ` si la date diffère du plan ;
   - séance annulée → entrée dans `annulations:` `{ date, piste (facultatif), raison }` ;
   - séquence rallongée ou raccourcie → modifier `semaines` ; ajout ou retrait d'une séquence → l'insérer ou la retirer de la liste ;
   - ajouter une ligne datée au `journal:` qui explique **pourquoi** (c'est ce que lira l'inspecteur).
3. Lancer `npm run build -- sources/progression/<fichier>.md` (ou `npm run build` si le catalogue a changé) et corriger toute erreur.
4. Résumer à l'enseignant ce qui a bougé : nouvelles dates des séquences suivantes, semaines de marge avant la fin des cours, avertissements (séquence qui ne tient plus, élément du programme non couvert). Proposer un arbitrage si la fin d'année est compromise (raccourcir une séquence, fusionner, passer une partie en autonomie).

## Création d'une progression

1. Lire le programme officiel dans `referentiels/bo/` (le créer depuis le texte du BO s'il manque : texte mot pour mot, jamais reformulé), le calendrier, `materiel/labo-baggio.md` et une progression existante comme modèle.
2. Demander à l'enseignant ce qui manque : créneaux exacts (jour, durée, alternance), date de fin des cours de la classe, ce qui a déjà été fait, contraintes (projet, groupes, collègues).
3. Écrire les séquences : problématique sur un thème sociétal, éléments du BO couverts (`programme:`), compétences, activités variées, outils, évaluation. Chaque élément du programme doit être couvert ou déclaré dans `hors_perimetre` avec sa raison.
4. Générer et vérifier : aucune erreur, aucune séquence qui dépasse la fin des cours, couverture complète.
