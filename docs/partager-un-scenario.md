---
title: Partager un scénario
---

# Partager un scénario

Un scénario peut sortir de votre installation sous forme d'un fichier, puis être
ajouté à une autre : un second site de votre enseigne, une enseigne partenaire,
ou un client à qui vous livrez un scénario clé en main.

Ce n'est pas une sauvegarde. La [sauvegarde](./sauvegarde) copie toute la base
et la remplace au retour ; le partage ne transporte qu'**un** scénario et ne
remplace **jamais** rien.

## Exporter

Dans **Scénarios**, chaque carte porte un bouton de téléchargement
(**Exporter le scénario**). Il enregistre un fichier
`nom-du-scenario.leticia-scenario.json`.

Le fichier contient :

- le scénario : titre, résumé, lieu, époque, ambiance, contexte ;
- ses **personnages**, avec leur portrait, leur voix et leurs relations entre
  eux (une relation vers un personnage d'un autre scénario n'est pas emportée) ;
- qui est coupable et qui est victime ;
- les **déclencheurs** et la **fiche** de chaque personnage (ce qu'il sait,
  cache, avoue, ses consignes et ses actions) ;
- le **dénouement** : accusation finale, suspects, essais et derniers mots du
  coupable ;
- l'apparence de la **borne** : couleur, image de fond, présentation, police.

Il ne contient **rien qui soit propre à votre salle** :

- ni les salles, ni les parties jouées, ni les conversations ;
- ni le jeton du logiciel de salle, ni les adresses appelées par les actions ;
- ni les badges RFID, qui désignent vos propres badges physiques.

:::tip
Le fichier est du texte lisible. Si vous vendez un scénario, ce que vous
envoyez est donc consultable par son destinataire, fiches secrètes comprises :
c'est le scénario lui-même.
:::

## Importer

Dans **Scénarios**, le bouton **Importer** ouvre le choix d'un fichier
`.leticia-scenario.json`. Le scénario est **ajouté** à ceux qui existent déjà :

- ses personnages sont créés à neuf, même si un personnage du même nom existe
  déjà chez vous ; aucun de vos personnages n'est modifié ;
- si un scénario porte déjà le même titre, la copie importée prend un numéro :
  « Le manoir (2) », puis « Le manoir (3) »… Vous pouvez la renommer ensuite ;
- un fichier abîmé ou qui n'est pas un scénario est refusé, et rien n'est
  ajouté.

L'export et l'import sont réservés aux **administrateurs**.

## Après l'import

Le scénario est prêt à jouer, mais ce qui dépend de votre salle reste à
régler :

1. **Créer une salle** sur ce scénario (voir [Première session](./premiere-session)).
2. **Associer les badges** RFID aux personnages, dans la section **Borne des
   joueurs** du scénario, si votre borne en utilise (voir
   [Borne joueur](./borne-joueur#badges-rfid)).
3. **Renseigner les adresses des actions** dans les **Réglages de la salle**,
   si les personnages déclenchent des effets en salle.
4. **Vérifier les voix** : une voix choisie sur l'autre installation peut ne
   pas exister chez vous si vous n'utilisez pas le même fournisseur de synthèse
   vocale. Ouvrez chaque personnage et choisissez-en une au besoin.
