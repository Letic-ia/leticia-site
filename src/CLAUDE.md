# src/ : code du site

`pages/index.tsx` : la vitrine, une grande chaîne HTML rendue par `dangerouslySetInnerHTML` (voulu, ne pas convertir en JSX). Seules les parties interactives deviennent des composants React.
`components/` : îlots React (`ContactForm.tsx` via Web3Forms, `LatestVersionBadge.tsx`). `theme/` : composants Docusaurus enveloppés (`SearchBar` limité à `/docs/*`).
`css/custom.css` (thème global, navbar) et `css/landing.css` (classes `.lt-*` de la vitrine, révélation au scroll en CSS pur). Garder la palette `--lt-*` en clair et sombre.
Les autres fichiers de `pages/` (`.mdx` légaux) sont publiés tels quels. Règles : [../AGENTS.md](../AGENTS.md), [../CLAUDE.md](../CLAUDE.md).
