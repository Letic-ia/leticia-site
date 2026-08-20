import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar déclarée à la main plutôt qu'autogénérée : les pages sont
 * regroupées en catégories pliables sans être déplacées sur le disque, donc
 * les URLs (`/docs/<nom-du-fichier>`) et les liens relatifs entre pages
 * (`./sauvegarde`, `./providers-ia`...) restent valables.
 *
 * Conséquence : l'ordre vient d'ici, pas du `sidebar_position` du front
 * matter (qui est ignoré et a donc été retiré des pages). Une nouvelle page
 * doit être ajoutée ci-dessous, sinon elle n'apparaît pas dans le menu.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Découvrir',
      items: ['intro', 'fonctionnement'],
    },
    {
      type: 'category',
      label: 'Installer & configurer',
      items: ['installation', 'configuration', 'comptes', 'premiere-session'],
    },
    {
      type: 'category',
      label: 'IA & matériel',
      items: ['providers-ia', 'protocole-ia', 'dimensionnement-gpu'],
    },
    {
      type: 'category',
      label: 'Exploitation',
      items: ['sauvegarde', 'mise-a-jour', 'exploitation-avancee'],
    },
    'roadmap',
  ],
};

export default sidebars;
