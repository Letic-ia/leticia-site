---
title: Première session
---

# Première session

Une fois l'IA et la voix configurées, voici le parcours pour animer une enquête.

## La liste « Avant la première partie »

Tant que l'installation n'est pas prête, le **tableau de bord** d'un
administrateur affiche la liste **Avant la première partie**, en cinq étapes :

1. **Faire répondre l'IA** : dans **Paramètres**, « Tester le dialogue ».
2. **Faire parler et écouter la borne** : dans **Paramètres**, « Tester la
   transcription » (une phrase est dite, puis réécoutée).
3. **Préparer un scénario et ses suspects** : un scénario avec au moins un
   personnage.
4. **Ouvrir une salle**.
5. **Appairer la borne et la lier à une salle** : voir
   [l'appairage](borne-joueur#appairage).

Chaque étape mène à l'écran où elle se fait. La liste se masque d'un clic
(« Masquer pour l'instant ») et revient par son résumé ; elle disparaît
d'elle-même quand tout est prêt.

L'IA et la voix ne comptent comme prêtes qu'après avoir **vraiment répondu**
avec les réglages en place : un test réussi, ou une vraie réponse en partie.
Changer de fournisseur, d'adresse, de modèle ou de voix les remet à « pas
encore essayée ». Le badge de l'IA en haut du tableau de bord suit la même
règle : **vert** si elle a répondu, **orange** si elle n'a pas encore été
essayée, **rouge** si le dernier essai a échoué.

## 1. Créer un scénario

Dans **Scénarios → Nouveau scénario**, décrivez l'enquête : titre, résumé, lieu,
époque, ambiance, contexte. Le scénario est le cadre narratif que l'IA respecte.

## 2. Ajouter des personnages

Depuis la page du scénario, ajoutez les **personnages** à interroger. Pour
chacun : nom, rôle, personnalité, âge.

Remplissez ensuite sa **fiche secrets** (panneau « Secrets des personnages » de
la page du scénario) :

- **Ce qu'il sait** : les faits qu'il peut raconter.
- **Ce qu'il cache** : ce qu'il ne dira jamais de lui-même.
- **Révélations** (jusqu'à 8) : ce qu'il finit par avouer, et à quelle
  condition. Avec des **mots-clés**, il lâche le secret dès qu'un joueur a
  prononcé l'un d'eux (majuscules et accents ignorés, « gardien » couvre aussi
  « gardienne »). Avec un **déclencheur**, il le lâche quand vous activez ce
  déclencheur dans la salle. Sans condition, il ne cède que si on le presse
  vraiment.
- **Comportements** : comment il change pendant la partie. « Selon un
  déclencheur » ajoute la consigne à suivre quand ce déclencheur est actif
  (« tu entends les sirènes, tu deviens nerveux »). La corbeille retire le
  comportement de sa fiche, pas le déclencheur du scénario.
- **Actions** (jusqu'à 8) : ce qu'il fait dans la salle, par exemple « quand
  on lui parle du coffre, il ouvre le sien ». Une action part quand les joueurs
  prononcent un de ses mots-clés devant lui, ou dès qu'une de ses révélations
  est débloquée. Le personnage l'annonce dans sa réponse, puis Leticia prévient
  le logiciel de salle, qui ouvre le cadenas ou lance le son : voir
  [les actions](borne-joueur#les-actions-des-personnages).

Une fois débloquée, une révélation le reste jusqu'à la fin de la partie.

Pour voir d'un coup d'œil ce que fait chaque personnage à chaque déclencheur,
le bouton **Consignes et famille** ouvre le tableau des consignes et l'arbre
généalogique : voir [consignes et famille](consignes-et-famille).

Vous pouvez aussi générer un **portrait** du personnage.

## 3. Déclencheurs (optionnel)

Les **déclencheurs** sont des interrupteurs que l'opérateur, ou le logiciel de
salle, allume pendant la session (la police arrive, un indice est trouvé…).
Ils se créent au niveau du scénario avec un nom et une description, et
s'activent en direct depuis la salle.

Un déclencheur ne dit rien par lui-même : ce que chaque personnage fait quand
il est actif se règle dans **sa fiche** (partie « Comportements ») ou dans
le [tableau des consignes](consignes-et-famille).
Tout ce que dit ou fait un personnage se trouve ainsi au même endroit. La liste
des déclencheurs indique chez quels personnages chacun est réglé, et supprimer
un déclencheur retire aussi ces réglages, après confirmation.

## 4. Lancer une salle

Créez une **salle** rattachée au scénario. C'est l'instance de jeu : les joueurs
y interrogent les personnages, chaque échange est enregistré.

Avant l'arrivée du groupe, le bouton **Vérifier la salle** teste la borne, la
voix de chaque suspect et la transcription. Le suivi d'une journée de jeu
(cartes des salles, chrono, alerte de groupe bloqué) est décrit dans
[piloter les salles au quotidien](piloter-les-salles).

## 5. Interroger

Dans la salle, sélectionnez un personnage et ouvrez l'interrogatoire :

1. le joueur **parle** (micro) ;
2. Leticia **transcrit**, l'IA **répond** dans le rôle ;
3. la réponse est **lue à voix haute**.

L'opérateur suit l'échange en direct et active les déclencheurs au bon moment.

:::tip
En cas de souci provider (IA ou voix indisponible), l'opérateur voit l'erreur
dans la salle ; le joueur, lui, ne doit jamais rester bloqué. Vérifiez d'abord
la connexion depuis **Paramètres → Tester**.
:::
