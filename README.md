# Pédagogie SIN / SNT — Lycée César Baggio

Cours, TD, TP, évaluations et progressions, écrits en Markdown et transformés automatiquement en PDF : version élève, version prof (corrigé + barème), diapos, fiches de déroulé.

- Les PDF prêts à imprimer sont dans `output/<classe>/`.
- Les règles du projet sont dans `CLAUDE.md`, l'état d'avancement et les questions en attente dans `SUIVI.md`.

---

## Installer le projet sur un nouveau PC (ex. portable du lycée)

À faire une seule fois.

### 1. Installer les logiciels

| Logiciel | Où le trouver | Pourquoi |
| :--- | :--- | :--- |
| **Git** | https://git-scm.com/download/win | Récupérer et envoyer le projet |
| **Node.js 22** (version « LTS ») | https://nodejs.org | Faire tourner la chaîne de génération |
| **Google Chrome** | https://www.google.com/chrome | Produire les PDF (Edge ne marche pas pour ça) |
| **Claude** (application de bureau, onglet Code) | https://claude.ai/download | Travailler avec Claude sur le projet |

Laisser les options par défaut pendant les installations.

> Si `winget` est disponible, tout peut s'installer depuis un terminal :
> ```bash
> winget install Git.Git OpenJS.NodeJS.LTS Google.Chrome
> ```

### 2. Récupérer le projet

Ouvrir **Git Bash** (installé avec Git), puis taper ces commandes une par une :

```bash
cd ~/Documents
```

```bash
git clone https://github.com/Eithing/pedagogie-sin.git
```

À la première fois, une fenêtre demande de se connecter à GitHub : se connecter avec le compte **Eithing**.

```bash
cd pedagogie-sin
```

```bash
npm install
```

```bash
npm run build
```

`npm run build` régénère tout pour ce PC. Il faut le faire au moins une fois, sinon les diapos HTML de projection ne s'afficheront pas correctement. Les PDF, eux, sont déjà dans le dépôt.

> **Si la génération des PDF échoue** (« Aucun navigateur Chromium trouvé ») : Chrome n'est pas installé à l'endroit habituel. Ouvrir `pipeline.config.json` et indiquer le chemin de Chrome dans `"navigateur"`, par exemple `"C:/Program Files/Google/Chrome/Application/chrome.exe"`.

### 3. Ouvrir le projet avec Claude

Dans l'application Claude, onglet **Code**, choisir le dossier `Documents/pedagogie-sin`, puis écrire par exemple :

> On reprend, lis SUIVI.md

La conversation d'un autre PC ne suit pas : c'est `SUIVI.md` (état, décisions, questions en attente) et `CLAUDE.md` (règles) qui font le lien entre les postes.

---

## Au quotidien : synchroniser entre les PC

**En arrivant**, pour récupérer ce qui a été fait sur l'autre PC :

```bash
git pull
```

**Avant de partir**, pour envoyer son travail :

```bash
git add -A
```

```bash
git commit -m "Ce que j'ai fait"
```

```bash
git push
```

On peut aussi demander à Claude : « synchronise avec git ».

> ⚠️ Toujours faire `git pull` avant de commencer à travailler. Si les deux PC ont été modifiés sans synchronisation, git demandera de fusionner les modifications : demander à Claude de s'en occuper.

---

## Commandes utiles

| Commande | Effet |
| :--- | :--- |
| `npm run build` | Tout régénérer (et supprimer les PDF devenus inutiles) |
| `npm run build -- sources/tp/<fichier>.md` | Régénérer un seul document |
| `npm run validate` | Vérifier les sources sans rien générer |
| `npm run watch` | Régénérer automatiquement à chaque enregistrement |

Dans Claude : `/tp`, `/td`, `/cours`, `/progression`, `/cadremont` pour créer ou mettre à jour un document.
