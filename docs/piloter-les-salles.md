---
title: Piloter les salles au quotidien
---

# Piloter les salles au quotidien

Cette page suit une journée d'exploitation : on ouvre la salle, on la vérifie,
un groupe joue, on surveille, puis on remet à zéro pour le groupe suivant.

## Voir toutes ses salles d'un coup d'œil

Le **tableau de bord** et la page **Salles** montrent une carte par salle,
rafraîchie toute seule toutes les quelques secondes. Chaque carte indique :

- l'**état** de la salle : « Libre, prête pour un groupe », « En cours depuis
  23 min » ou « Partie terminée » ;
- l'**alerte de groupe bloqué**, quand les joueurs ne posent plus de question
  (voir plus bas) ;
- la **borne** liée à la salle, connectée ou hors ligne (hors ligne en rouge si
  une partie est en cours) ;
- le **dernier suspect interrogé**, et combien de suspects l'ont été ;
- la **vérification du jour** : faite et à quelle heure, avec réserves, ou pas
  encore faite.

Sur le tableau de bord, les salles où une partie est en cours passent en
premier. Un clic sur une carte ouvre la console de la salle.

## Une partie visible sur tous les postes

Une partie peut être lancée depuis la console, depuis un autre poste ou par le
[logiciel de salle](borne-joueur#intégrations-externes). Dans tous les cas,
chaque console ouverte sur cette salle la voit démarrer sans recharger la page.

Le **chrono** de la partie est calculé par le serveur à partir de l'heure de
départ : deux postes affichent le même temps, et recharger la page ne le
remet pas à zéro. À l'arrêt, il se fige sur la durée réelle de la partie.

## Vérifier la salle avant le groupe

Le bouton **Vérifier la salle**, dans la console de la salle, teste toute la
chaîne avant l'arrivée des joueurs :

1. la **borne** liée à la salle répond-elle, et son **micro** est-il
   utilisable ;
2. chaque **suspect** répond-il en personnage, **avec sa voix** : chacun se
   présente, et vous pouvez écouter sa réplique ;
3. la **transcription** comprend-elle une phrase de test dans la langue de la
   partie.

Comptez quelques secondes par personnage. Rien n'est écrit dans les
conversations de la salle : les joueurs ne verront pas ces répliques.

Le résultat est gardé **avec son heure** (« Vérifiée à 09:42 », « avec
réserves », « Problème ») et s'affiche sur tous les postes, ainsi que sur la
carte de la salle. Le bouton **Voir la dernière vérification** retrouve le
détail de ce qui a échoué.

:::tip
Prenez l'habitude de vérifier chaque salle à l'ouverture. Une borne éteinte,
un micro bloqué ou une voix qui ne répond plus se découvrent alors avant le
groupe, pas pendant.
:::

## Prévenir quand un groupe tourne en rond

Un groupe qui ne pose plus de question est souvent un groupe bloqué. Dans la
page du **scénario**, la section **Groupe bloqué** règle ce délai, de 1 à 120
minutes (10 par défaut quand on l'active). L'alerte est propre au scénario :
une enquête courte et une enquête longue n'ont pas le même rythme.

Quand le délai est dépassé pendant une partie, la console de la salle affiche
« Aucune question depuis 12 min » et une notification apparaît ; la carte de
la salle le signale aussi. C'est le moment de relancer le groupe : activer un
déclencheur, ou faire dire une réplique à un personnage depuis la console.

L'alerte se règle par un administrateur. Sans réglage, aucune alerte.

## Réglages de la salle

Le bouton **Réglages de la salle** (l'icône d'engrenage en haut de la console
de la salle, réservé aux administrateurs), regroupe ce qui relie la salle au monde extérieur :

- les **liens pour le logiciel de salle** (jeton de webhook), voir
  [intégrations externes](borne-joueur#intégrations-externes) ;
- les **actions** envoyées vers la salle, voir
  [les actions](borne-joueur#dans-lautre-sens--les-actions).

L'affichage de la borne et les badges RFID ne se règlent plus ici : ils
suivent le scénario joué, voir [ce que vous pouvez configurer](borne-joueur#ce-que-vous-pouvez-configurer).

## À la fin de la partie

Quand le maître du jeu arrête la partie, la borne affiche **« Fin de
l'enquête »** pendant une minute, puis revient à son écran d'attente. Si les
joueurs viennent de faire l'[accusation finale](accusation-finale), le verdict
reste affiché.

Le débrief de la partie est conservé même après la remise à zéro de la salle :
c'est lui qui alimente les [chiffres de vos salles](statistiques).
