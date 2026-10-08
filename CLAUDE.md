# Pédagogie SIN — production de cours, TD, TP

Ressources de l'enseignant STI2D SIN / SNT du Lycée César Baggio. Chaque document est écrit une seule fois en Markdown, puis la chaîne Node en tire automatiquement toutes les versions en HTML et PDF.

Les sorties sont rangées **par classe puis par séquence** dans `output/<classe>/<séquence>/`, ex. `output/2nde_SNT/S2_Le_Web/`, `output/Term_STI2D_SIN/T1_Capteurs_et_CAN/`.
- Classe : `2nde_SNT`, `1ere_STI2D`, `Term_STI2D_SIN`, `Term_STI2D_2I2D` (voir `pipeline.config.json > classes`, ou champ `dossier:` du front matter).
- Séquence : champ **`sequence:`** du front matter (identifiant de la progression : `S2`, `T1`, `C0`…), dont le nom de dossier vient du champ `court` de la progression ou du catalogue. À défaut : la séquence qui cite le document dans ses `ressources`, sinon `Hors_sequence/`.

| Type | Sorties dans `output/<classe>/<séquence>/` |
| :--- | :--- |
| `tp`, `td`, `cadrage` | `eleve/ELEVE_<nom>.pdf` (zones de réponse) · `prof/PROF_<nom>.pdf` (corrigé + barème) |
| `cours` (séance) | `slides/SLIDES_<nom>.pdf` + `slides/<nom>.html` (projection : ←/→, F plein écran, T minuteur) · `prof/DEROULE_<nom>.pdf` (fiche de suivi de séance) · `eleve/ELEVE_` et `prof/PROF_<nom>.pdf` (fiche d'activités) |
| `autonomie` (distanciel) | `eleve/ELEVE_<nom>.pdf` avec **plan de travail** (étapes à cocher, ce qu'il faut déposer sur l'ENT, comment obtenir de l'aide) · `prof/PROF_<nom>.pdf` · fichiers joints (`fichiers:`) copiés dans `eleve/` · noté seulement si `bareme:` est présent |
| `progression` | `PROGRESSION_<classe>.pdf` à la racine de `output/<classe>/` (A4 paysage : frise annuelle, séquences, couverture du BO, journal) |

`output/.manifest.json` mémorise ce que chaque source produit : une génération complète supprime d'elle-même les fichiers devenus inutiles (source renommée ou supprimée, ancien rangement).

## Arborescence

| Chemin | Contenu |
| :--- | :--- |
| `sources/{tp,td,cours,evaluation,autonomie,cadrage}/` | **Sources Markdown** — les seuls fichiers à écrire à la main |
| `sources/progression/` | Progressions annuelles (une par classe) + `_catalogue_TermSIN.yaml` (séquences communes aux Terminales et heure commune D2 + D3) |
| `sources/<type>/img/<sujet>/` | Illustrations SVG (dessinées par Claude) et photos fournies par l'enseignant |
| `output/` | Fichiers générés — ne jamais éditer |
| `referentiels/charte-rendu.md` | **Charte de rendu** : balises, structures TP/TD/cours, illustrations — à lire avant toute rédaction |
| `referentiels/bo/*.yaml` | **Programmes officiels** (texte du BO mot pour mot, identifiants à citer) — seule source de vérité |
| `referentiels/referentiel_*.md` | Version lisible, générée par `node scripts/referentiels.mjs` (la 1ère STI2D n'a pas encore été vérifiée sur le BO) |
| `referentiels/calendrier_2026-2027.yaml` | Calendrier zone B : vacances, fériés, examens |
| `materiel/labo-baggio.md` | Outils disponibles — **pour l'instant tout est en simulation** |
| `templates/entete-tp.md`, `gabarit-cours.md`, `grille-evaluation.md` | Gabarits à copier |
| `templates/style.css`, `slides.css` | Mise en forme A4 et diapos |
| `scripts/` | Chaîne de production (Node) |
| `pipeline.config.json` | Établissement, couleurs par niveau (`themes`), règles de rythme des cours (`rythme`) |
| `.claude/commands/` | Commandes `/tp`, `/td`, `/cours`, `/autonomie`, `/cadremont`, `/progression` |

Exemples de référence : `sources/tp/TP_TermSIN_I2C_ESP32_Temperature.md` (TP) et `sources/cours/COURS_SNT_TCP_IP.md` (séance de cours).

## Commandes

```bash
npm run validate                       # vérifie toutes les sources
npm run build -- sources/tp/<nom>.md   # valide puis génère toutes les sorties du fichier
npm run build                          # tout régénérer
npm run build:html                     # HTML seulement (aperçu rapide)
npm run watch                          # régénère à chaque enregistrement (sources, images, CSS)
```

Le PDF est produit par Chrome en mode headless (Edge refuse ce mode sur ce poste). Python n'est pas utilisé.

## Règles pour Claude

- **En début de session, lire `SUIVI.md`** (état du projet, décisions, questions en attente) ; **en fin de session, le mettre à jour**. Le projet est synchronisé par git entre plusieurs postes : la conversation ne suit pas, seul ce fichier fait le lien.

- Après avoir créé ou modifié une source : lancer `npm run build -- <fichier>` et **corriger toutes les erreurs** de validation avant de rendre la main, ainsi que les diapos signalées « trop longues ». Les avertissements doivent être justifiés.
- Nommage des sources : `<TYPE>_<Niveau>_<Sujet>.md`, ex. `TP_TermSIN_I2C_ESP32_Temperature.md`, `COURS_SNT_TCP_IP.md`.
- Respecter la charte : front matter complet (dont `sequence:`), pas de titre `#` dans le corps, `::: question N [x pt]` suivi de `::: reponse L`, somme des points = barème (TP/TD).
- **Cours = séance rythmée, jamais descendante** : alternance exposés courts / activités / trace écrite, vérifiée par la chaîne (≥ 40 % d'activités, ≤ 10 min sans activité). Rédiger des blocs `::: dire` concrets pour la fiche de déroulé.
- **Personnaliser** : mise en situation incarnée (lieu, acteurs, chiffres, incident), illustration SVG de contexte, schémas SVG pour les notions clés, `accroche` et `illustration` dans le front matter. Jamais de schéma ASCII.
- **Ne jamais inventer de codes de compétences officiels** : citer uniquement les identifiants de `referentiels/bo/*.yaml` (ex. `CO5.8-SIN2`, `2.4.2c`, `INT.1`). Si un programme manque, le construire depuis le texte officiel du BO, mot pour mot.
- **Progressions** : toute information sur ce qui s'est passé en classe (séquence finie, séance annulée, retard) se traduit par une mise à jour de la progression concernée via `/progression`, avec une ligne de journal.
- Matériel : s'appuyer sur `materiel/labo-baggio.md` (simulation) ; vérifier que les composants existent dans le simulateur choisi, sinon le signaler.
- Valeurs techniques (datasheets, normes, réglementation) : ne citer que des valeurs dont on est sûr ; sinon l'indiquer comme « à vérifier » dans un bloc `::: prof`.
- Le code fourni aux élèves doit compiler tel quel (sauf les zones `TODO`) ; la solution complète va dans la réponse. Commentaires du code sans accents.
- Ne pas éditer les fichiers de `output/` : ils sont régénérés.
