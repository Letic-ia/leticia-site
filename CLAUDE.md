# leticia-site : vitrine et documentation utilisateur

Docusaurus 3 (TypeScript), publié sur GitHub Pages à https://leticia-app.com. Aucun code applicatif ici.
**[AGENTS.md](AGENTS.md) fait foi** (architecture, conventions, commandes) : le lire avant de modifier.
Pas de CI sur PR : `npm run build` en local est la seule vérification (`onBrokenLinks: 'throw'`). Warnings d'ancres `/#features` préexistants, à ignorer. PR vers `main`.
`docs/` : pages pour un exploitant non développeur, sans chemin de fichier interne. Toute nouvelle page se déclare à la main dans `sidebars.ts`. `{#id}` casse le build MDX. Pas de CLAUDE.md dans `docs/` ni `src/pages/` (ils seraient publiés).
Tout en français, jamais d'em dash. Code du site : [src/](src/CLAUDE.md). Application documentée : dépôt `leticia` ([CLAUDE.md](https://github.com/Letic-ia/leticia/blob/dev/CLAUDE.md)).
