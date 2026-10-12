---
title: Première session
---

# Première session

Une fois l'IA et la voix configurées, voici le parcours pour animer une enquête.

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
- **Pendant les déclencheurs** : pour chaque déclencheur du scénario, comment
  il change quand celui-ci est actif (« tu entends les sirènes, tu deviens
  nerveux »). Laissez vide s'il n'est pas concerné.
- **Actions** (jusqu'à 8) : ce qu'il fait dans la salle, par exemple « quand
  on lui parle du coffre, il ouvre le sien ». Une action part quand les joueurs
  prononcent un de ses mots-clés devant lui, ou dès qu'une de ses révélations
  est débloquée. Le personnage l'annonce dans sa réponse, puis Leticia prévient
  le logiciel de salle, qui ouvre le cadenas ou lance le son : voir
  [les actions](borne-joueur#les-actions-des-personnages).

Une fois débloquée, une révélation le reste jusqu'à la fin de la partie.

Vous pouvez aussi générer un **portrait** du personnage.

## 3. Déclencheurs (optionnel)

Les **déclencheurs** sont des interrupteurs que l'opérateur, ou le logiciel de
salle, allume pendant la session (la police arrive, un indice est trouvé…).
Ils se créent au niveau du scénario avec un nom et une description, et
s'activent en direct depuis la salle.

Un déclencheur ne dit rien par lui-même : ce que chaque personnage fait quand
il est actif se règle dans **sa fiche**, partie « Pendant les déclencheurs ».
Tout ce que dit ou fait un personnage se trouve ainsi au même endroit. La liste
des déclencheurs indique chez quels personnages chacun est réglé, et supprimer
un déclencheur retire aussi ces réglages, après confirmation.

## 4. Lancer une salle

Créez une **salle** rattachée au scénario. C'est l'instance de jeu : les joueurs
y interrogent les personnages, chaque échange est enregistré.

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
