import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Leticia',
  tagline: "Interrogatoires narratifs assistés par IA pour l'escape game",
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Custom domain (static/CNAME) fronted by GitHub Pages: url is the domain
  // itself and baseUrl is '/' since nothing is served from a repo-name path.
  url: 'https://leticia-app.com',
  baseUrl: '/',

  organizationName: 'JaceTheBlu',
  projectName: 'leticia-site',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  // The site ships its own light + dark theme (Docusaurus color mode). Declare
  // both schemes and lock out theme extensions (Dark Reader et al.) so they
  // don't re-tint an already-dark page.
  headTags: [
    {tagName: 'meta', attributes: {name: 'color-scheme', content: 'light dark'}},
    {tagName: 'meta', attributes: {name: 'darkreader-lock', content: 'true'}},
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Bare /docs has no page of its own (the docs plugin's routeBasePath
        // is /docs, but nothing lives at its root) - send it straight to the
        // actual landing doc instead of a 404.
        redirects: [{from: '/docs', to: '/docs/intro'}],
      },
    ],
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        // "mod+k" resolves to Ctrl+K on Windows/Linux and Cmd+K on macOS.
        searchBarShortcutHint: true,
        searchBarShortcutKeymap: 'mod+k',
      },
    ],
  ],

  themeConfig: {
    // Social card + shared SEO tags. `image` becomes og:image / twitter:image;
    // `metadata` fills the description, keywords and card type on every page.
    image: 'img/logo.png',
    metadata: [
      {
        name: 'description',
        content:
          "Leticia : interrogatoires narratifs assistés par IA pour escape games. Les joueurs parlent, les personnages répondent en rôle, sur votre propre serveur.",
      },
      {
        name: 'keywords',
        content: 'escape game, IA, interrogatoire, narration, on-premise, RGPD, borne joueur, RFID',
      },
      {property: 'og:type', content: 'website'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Leticia',
      logo: {
        alt: 'Leticia',
        src: 'img/logo.png',
      },
      // One-page navigation: shortcuts to the landing sections + a demo CTA.
      // Still no links to the documentation - it stays off the vitrine.
      // Kept to the essentials (Fonctionnement/Souveraineté/Déploiement stay
      // as page sections, just without their own navbar entry).
      items: [
        {to: '/#features', label: 'Fonctionnalités', position: 'left'},
        {to: '/#pricing', label: 'Tarifs', position: 'left'},
        {to: '/#faq', label: 'FAQ', position: 'left'},
        {to: '/#contact', label: 'Demander une démo', position: 'right', className: 'navbar-cta'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Légal',
          items: [
            {label: 'RGPD & données personnelles', to: '/docs/rgpd'},
            {label: 'Mentions légales', to: '/docs/mentions-legales'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Leticia.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
