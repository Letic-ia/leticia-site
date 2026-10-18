---
title: Personnages qui entrent et sortent
---

# Personnages qui entrent et sortent

Dans une vraie enquête, tous les témoins ne sont pas là dès la première
minute. L'avocat arrive quand la séance de spiritisme est terminée, la
gardienne quitte les lieux après avoir parlé, le fantôme n'apparaît qu'une
fois le miroir retourné. Leticia gère cela avec la **présence** de chaque
personnage sur la borne.

## Trois états

| État | Sur la borne |
|---|---|
| **Visible** | Le personnage s'affiche et les joueurs peuvent l'interroger. |
| **Grisé** | Le personnage reste affiché, en gris, avec un court texte (par exemple « A quitté les lieux »), mais on ne peut plus lui parler. |
| **Invisible** | Le personnage n'apparaît pas du tout. |

Quand un personnage devient visible en cours de partie, la borne l'annonce
quelques secondes en haut de l'écran (« Nouveau témoin : … », ou « De nouveau
là : … » s'il revient). Si les joueurs étaient en train de lui parler au moment
où il est grisé ou retiré, la borne revient au choix des personnages.

Un personnage qui revient **se souvient de tout** : la conversation
précédente, les secrets déjà lâchés, rien n'est perdu.

## Régler la présence dans la fiche du personnage

Dans **Scénarios**, ouvrez la fiche du personnage, partie **Présence sur la
borne** :

- **Au début de la partie** : visible, grisé ou invisible. Par défaut, un
  personnage est visible, et une victime est invisible.
- **Texte sous le personnage grisé** : ce que les joueurs lisent sous son
  portrait quand il est grisé. Sans texte, la borne affiche « Indisponible ».
- **Ajouter un changement** : ce que le personnage devient (visible, grisé ou
  invisible) et quand :
  - quand un **déclencheur** est actif (la salle signale qu'une énigme est
    résolue) ;
  - quand un **secret** a été obtenu, celui de ce personnage ou d'un autre
    (« l'avocat arrive quand le majordome a avoué ») ;
  - ou au bout d'un certain nombre de **minutes de jeu**.

Une phrase sous chaque changement résume ce qu'il fait. Si plusieurs
changements s'appliquent en même temps, c'est le dernier de la liste qui
l'emporte : placez donc les plus tardifs en bas (par exemple « visible quand
le miroir est retourné », puis « grisé au bout de 45 minutes »).

## Forcer un état pendant la partie

Le maître du jeu garde la main. Sur la page de la salle, chaque carte de
personnage porte trois boutons **Visible**, **Grisé** et **Invisible**. Un
clic s'applique tout de suite sur la borne. L'état forcé tient jusqu'à la
remise à zéro de la salle ; le lien **Forcé : rendre la main à la fiche**
laisse de nouveau la fiche décider.

Un badge « Grisé sur la borne » ou « Absent de la borne » signale d'un coup
d'œil les personnages que les joueurs ne peuvent pas interroger.

## Depuis le logiciel de salle

Le logiciel de salle peut faire la même chose par HTTP, avec le jeton de la
salle, comme pour les [autres intégrations](borne-joueur#intégrations-externes) :

| Action | Appel |
|---|---|
| Rendre visible | `POST /api/cogs/rooms/{id}/characters/{personnage}/visible` |
| Griser | `POST /api/cogs/rooms/{id}/characters/{personnage}/greyed` |
| Rendre invisible | `POST /api/cogs/rooms/{id}/characters/{personnage}/hidden` |
| Rendre la main à la fiche | `POST /api/cogs/rooms/{id}/characters/{personnage}/auto` |

Inutile de chercher les numéros : la fenêtre **Réglages de la salle** affiche,
pour chaque personnage, les URLs prêtes à coller dans le logiciel de salle.

Dans l'autre sens, une [action](borne-joueur#dans-lautre-sens--les-actions)
peut prévenir le logiciel de salle à chaque changement : « Personnage rendu
visible sur la borne », « Personnage grisé sur la borne » et « Personnage
retiré de la borne ». Pratique pour allumer la lumière d'une pièce quand son
occupant entre en scène. Ces événements ne partent que pendant une partie en
cours.

## Accusation finale

L'[accusation finale](accusation-finale) ne propose que les suspects **déjà
apparus** pendant la partie : un personnage grisé après avoir été vu reste
accusable, un personnage resté invisible ne l'est pas. Seule exception : le
**vrai coupable** est toujours proposé, même s'il n'est jamais apparu, sinon
la partie ne pourrait pas être gagnée.

## Débrief

Chaque entrée et chaque sortie est datée dans le [débrief](accusation-finale)
de la partie, avec les autres moments clés.
