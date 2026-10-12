---
title: Graphe du scénario
---

# Graphe du scénario

Le formulaire de chaque fiche suffit tant qu'un personnage avoue un secret
quand on lui parle d'un sujet, ou quand un déclencheur est actif. Dès que
l'enquête s'enchaîne (« il n'avoue le couteau qu'après avoir parlé de la
serre, et seulement si la police est arrivée »), le **graphe** montre tout le
scénario d'un coup d'œil et permet de régler ces enchaînements.

On l'ouvre depuis la page du scénario, panneau « Secrets des personnages »,
bouton **Voir en graphe**. Il est pensé pour un écran d'ordinateur : sur
téléphone il s'affiche, mais reste peu pratique à modifier.

## Ce qu'on y voit

Chaque élément du scénario est un **bloc** :

| Bloc | Rôle |
| --- | --- |
| Déclencheur | Interrupteur allumé pendant la partie par l'opérateur ou le logiciel de salle. Rangés en ligne en haut. |
| Révélation | Ce qu'un personnage peut avouer. |
| Comportement | Une consigne de jeu donnée à l'IA (« tu deviens nerveux »), une étape de la progression d'un personnage. |
| Action | Ce que le personnage fait dans la salle (ouvrir un cadenas, lancer un son). |

Chaque personnage a sa colonne et sa couleur ; les puces en haut filtrent
l'affichage par personnage.

Une **flèche** va d'un prérequis vers le bloc qui l'attend. Un bloc peut
attendre :

- des **mots-clés** prononcés par les joueurs devant ce personnage ;
- un **déclencheur** actif ;
- une **révélation**, un **comportement** ou une **action**, de ce personnage
  ou d'un autre. C'est ainsi qu'un aveu de l'un débloque la parole d'un autre.

Quand un bloc a plusieurs prérequis, on choisit la combinaison :
**« Un seul »** (n'importe lequel suffit) ou **« Tous »** (il les faut tous,
ce qui impose un ordre).

## Modifier

- **Ajouter un bloc** : choisissez le personnage, puis Révélation,
  Comportement ou Action.
- **Relier** : tirez une flèche depuis le point du bas d'un bloc jusqu'au point
  du haut de celui qui l'attend. On peut aussi, dans le panneau du bloc,
  utiliser « Ajouter un prérequis ».
- **Retirer une flèche** : cliquez-la puis touche Suppr, ou la croix dans le
  panneau du bloc.
- **Modifier un bloc** : cliquez-le. Le panneau de droite (sous le graphe sur un
  petit écran) montre son texte, ses
  mots-clés, ses prérequis et, pour un comportement, ceux qu'il remplace.
- **Remplace** : un comportement peut faire taire les étapes précédentes du
  même personnage (« méfiant », puis « coopératif » qui remplace
  « méfiant »). Sans cela, les deux consignes s'additionnent.
- **Réorganiser** range automatiquement les blocs ; sinon, déplacez-les à la
  main, leur place est gardée.

Rien n'est enregistré avant **Enregistrer**. Quitter la page avec des
modifications en cours demande confirmation.

Les déclencheurs se créent, se renomment et se suppriment sur la page du
scénario ; le graphe sert à dire ce qui les attend.

Seul un **administrateur** modifie le graphe. Un opérateur le consulte en
lecture seule.

## Les vérifications

Quand aucun bloc n'est sélectionné, le panneau de droite affiche la liste
**Vérifications**, qui signale en direct ce qui ne pourra
pas se passer comme dessiné. Cliquer une alerte centre le graphe sur le bloc,
qui est entouré en pointillés :

- une flèche pointe vers un élément supprimé ;
- un bloc ne peut jamais se produire (ses prérequis ne sont jamais réunis,
  par exemple deux blocs qui s'attendent l'un l'autre) ;
- un comportement ou une action sans aucune condition ;
- un déclencheur qu'aucun bloc n'attend ;
- un comportement qui suit un autre du même personnage sans le remplacer.

Ce sont des avertissements : l'enregistrement reste possible.

## Pendant la partie

- Une **révélation** débloquée le reste jusqu'à la fin de la partie, même si le
  déclencheur qui l'a permise s'éteint.
- Un **comportement** s'applique tant que ses prérequis sont réunis. Il ne
  compte comme « joué », pour débloquer la suite, qu'après un échange avec son
  personnage : une progression avance d'au plus une étape par question.
- Un bloc dont les prérequis sont réunis plus tard (un déclencheur allumé après
  coup) s'active à ce moment-là.
- Une **action** part une seule fois par partie. Ses mots-clés ne comptent que
  dans la dernière question des joueurs. Voir
  [les actions](borne-joueur#les-actions-des-personnages).
- La **réinitialisation** de la salle remet toute la progression à zéro.

Les fiches existantes sont reprises telles quelles : une révélation qui
attendait des mots-clés ou un déclencheur garde exactement la même condition,
dessinée en flèche.
