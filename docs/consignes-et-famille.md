---
title: Consignes et famille
---

# Consignes et famille

La page du scénario donne accès, panneau « Secrets des personnages », au bouton
**Consignes et famille**. Il ouvre une vue d'ensemble du scénario en deux
onglets : le **tableau des consignes** et l'**arbre généalogique**. Elle est
pensée pour un écran d'ordinateur.

## Le tableau des consignes

Une ligne par **déclencheur**, une colonne par **personnage**. Chaque case dit
ce que fait le personnage une fois ce déclencheur actif (« cesse de sourire,
devient hostile »). Une case vide signifie qu'il garde sa consigne précédente.

- **Écrire une consigne** : cliquez une case vide et tapez le texte. Il est
  validé en quittant la case (ou Ctrl + Entrée) ; Échap annule.
- **Modifier** : cliquez le texte d'une consigne.
- **Supprimer** : videz le texte d'une consigne qui ne dépend que de ce
  déclencheur.
- **Masquer un personnage** : cliquez sa puce au-dessus du tableau.

Une case montre aussi, en pastilles :

- les **conditions en plus** d'une consigne (« et seulement si… », « ou dès
  que… »), par exemple une étape qui attend une étape précédente ;
- l'étape qu'une consigne **remplace** ;
- les **révélations** (en vert) et les **actions** du personnage liées à ce
  déclencheur.

La ligne **Autres consignes**, en bas, regroupe ce qui se débloque sans
déclencheur (par des mots-clés, par exemple).

Rien n'est enregistré avant **Enregistrer**. Quitter la page avec des
modifications en cours demande confirmation. Seul un **administrateur**
modifie le tableau ; un opérateur le consulte.

Les déclencheurs se créent, se renomment et se suppriment sur la page du
scénario.

## L'arbre généalogique

L'onglet **Famille** dessine la famille des personnages du scénario, une
génération par ligne : les couples côte à côte, les enfants sous leurs
parents.

Il se construit à partir des **relations** de chaque fiche. Dans la fiche
d'un personnage, partie « Relations », la colonne **Ce personnage est son /
sa** propose les liens de parenté (père ou mère, fils ou fille, frère ou sœur,
conjoint, grand-parent, petit-enfant, oncle ou tante, neveu ou nièce, cousin)
et **Autre…** pour tout autre lien, écrit à la main (« employeur », « se
méfie de »). Le lien se lit depuis la fiche : sur la fiche de René, « Édouard
Valcourt : Neveu » veut dire que René est le neveu d'Édouard.

- Quand un lien suppose un parent qui n'est pas un personnage (deux cousins
  ont forcément des parents frère et sœur), l'arbre l'ajoute **en pointillés**,
  marqué « Hors jeu ».
- Les personnages sans lien de parenté apparaissent à côté, **hors du cadre
  Famille**, avec leurs autres liens.

Les fiches écrites avant cette version sont reprises telles quelles : un lien
qui commence par un mot de parenté (« Cousin jaloux ») est reconnu comme tel.
À la prochaine modification de la fiche, il prend le libellé de la liste
(« Cousin ») ; la nuance trouve sa place dans le caractère du personnage.

## Pendant la partie

- Une **révélation** débloquée le reste jusqu'à la fin de la partie, même si le
  déclencheur qui l'a permise s'éteint.
- Une **consigne** s'applique tant que son déclencheur est actif. Une étape qui
  en attend une autre ne compte comme jouée qu'après un échange avec son
  personnage.
- Une **action** part une seule fois par partie. Voir
  [les actions](borne-joueur#les-actions-des-personnages).
- La **réinitialisation** de la salle remet toute la progression à zéro.
