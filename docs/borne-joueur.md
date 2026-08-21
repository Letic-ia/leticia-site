---
title: La borne joueur
---

# La borne joueur

La **borne** est l'écran que les joueurs ont sous les yeux dans la salle. Elle
n'est pas une application à part : c'est la même instance de Leticia, ouverte
sur l'adresse `/kiosk`. N'importe quel appareil doté d'un navigateur fait
l'affaire (tablette, mini-PC, vieux portable), du moment qu'il atteint le
serveur sur le réseau local.

## À quoi elle sert

Côté joueur, la borne fait trois choses :

1. **Choisir un personnage** à interroger (par la grille à l'écran, ou par
   badge RFID, voir plus bas).
2. **Poser une question à la voix** : maintenir le bouton (ou la barre
   d'espace), parler, relâcher. L'audio part en transcription, la réponse est
   générée, puis prononcée.
3. **Écouter la réponse**, qui commence dès la première phrase terminée sans
   attendre la fin de la génération.

Côté maître du jeu, la console reste le poste de pilotage : elle démarre et
arrête la partie, suit les échanges en direct, et peut
[faire parler un personnage](#faire-parler-un-personnage-depuis-la-console) à
votre place.

## Appairage

Une borne s'appaire **une seule fois** :

1. Sur l'appareil, ouvrez l'adresse de la borne (voir ci-dessous).
2. Elle affiche un **code à 6 caractères**.
3. Dans **Administration → Bornes** de la console, vérifiez que le code
   correspond, nommez la borne (« Salle 1 », « Le manoir »…) et validez.

Ensuite, elle est réutilisable sans reconfiguration : elle retient son jeton
d'appareil et se reconnecte toute seule.

Le raccourci **« Ouvrir la vue borne »** dans Administration ouvre `/kiosk`
directement, et les adresses réseau affichées à côté se copient en un clic :
ce sont elles qu'il faut saisir sur un **autre** appareil (sur la borne,
`localhost` désignerait la borne elle-même, pas le serveur).

## Micro : le blocage HTTP et comment le contourner

C'est le point qui bloque le plus souvent une installation.

Les navigateurs ne donnent accès au **micro** que dans un *contexte sécurisé* :
HTTPS, ou `http://localhost`. Or une borne sur le réseau local atteint le
serveur par une adresse du type `http://192.168.1.42` — donc en HTTP simple, sur
une IP. Résultat : **l'API micro n'existe même pas**, le navigateur ne propose
jamais l'autorisation, et la borne signale que le micro est indisponible.

Trois façons de s'en sortir, de la plus simple à la plus propre :

### 1. Déclarer l'origine comme sûre (Chrome / Edge)

Le plus rapide, et suffisant pour une borne dédiée. Lancez le navigateur de la
borne avec ces deux drapeaux :

```
--unsafely-treat-insecure-origin-as-secure=http://192.168.1.42
--user-data-dir=C:\leticia-borne
```

Remplacez l'adresse par celle de **votre** serveur (celle copiée depuis
Administration), avec le port s'il y en a un : `http://192.168.1.42:8000`.

Deux remarques qui font gagner du temps :

- `--user-data-dir` est **obligatoire**, pas décoratif : sans lui, Chrome
  réutilise un profil déjà lancé et ignore purement et simplement le premier
  drapeau. C'est la cause n°1 de « j'ai mis le flag et ça ne marche toujours
  pas ».
- L'adresse doit être **exactement** celle utilisée dans la barre d'adresse.
  `http://192.168.1.42` et `http://192.168.1.42:8000` sont deux origines
  différentes ; `leticia.local` et l'IP aussi.

Sur Windows, le plus commode est de créer un raccourci vers le navigateur et
d'ajouter les drapeaux à la fin de la cible :

```
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --unsafely-treat-insecure-origin-as-secure=http://192.168.1.42 --user-data-dir=C:\leticia-borne --app=http://192.168.1.42/kiosk
```

`--app=` ouvre la borne en fenêtre sans barre d'adresse ni onglets, ce qui
évite qu'un joueur curieux navigue ailleurs.

### 2. Passer la borne en HTTPS

Plus propre, plus long : mettre un reverse-proxy (Caddy, nginx) devant Leticia
avec un certificat. Sur un réseau local sans nom de domaine public, cela
implique un certificat auto-signé et son installation dans le magasin de
certificats de la borne. À réserver aux installations permanentes.

### 3. Faire tourner la borne sur la machine serveur

Si l'écran joueur est branché sur la machine qui héberge Leticia, ouvrez
simplement `http://localhost/kiosk` : `localhost` est un contexte sécurisé
d'office, aucun drapeau nécessaire.

:::tip
Le micro n'est nécessaire que pour la question **parlée**. Une borne sans micro
reste utilisable pour l'affichage et l'écoute des réponses, notamment si vous
faites parler les personnages depuis la console.
:::

## Ce que vous pouvez configurer

Depuis la console, dans la salle, panneau **Configuration de la borne** :

| Réglage | Effet sur l'écran joueur |
|---|---|
| Couleur d'accent | Teinte du bouton, des cadres et des surlignages |
| Image de fond | Fond d'écran, avec opacité et mode de remplissage réglables |
| Mode de présentation | **Sous-titres**, **Portrait**, **Voix seule** ou **Plein écran** (voir ci-dessous) |
| Police des sous-titres | Choix parmi des polices système |

Les quatre modes de présentation :

| Mode | Écran joueur | Pour qui |
|---|---|---|
| **Sous-titres** | Médaillon + nom en haut, réplique en grand au centre | Salle bruyante, ou joueurs qui lisent plus qu'ils n'écoutent |
| **Portrait** | Portrait rond centré, réplique en légende discrète | Équilibre entre visage et texte |
| **Voix seule** | Portrait rond centré, **aucun texte** | Immersion maximale : les joueurs doivent écouter |
| **Plein écran** | Le portrait remplit l'écran, nom en haut, sous-titres en bas | Grand écran : le suspect semble présent dans la pièce |

En **plein écran**, deux dégradés assombrissent le haut et le bas de l'image
pour que le nom et les sous-titres restent lisibles quel que soit le portrait.
Un personnage sans portrait retombe simplement sur le fond sombre, en gardant
la même disposition.

Les polices proposées sont volontairement des **polices système** : la borne
tourne souvent hors ligne et sa politique de sécurité bloque les hébergeurs de
polices externes.

Le **mode enfant**, réglé au niveau de la salle, change la façon dont les
personnages répondent (mots simples, phrases courtes, ton bienveillant).

## Badges RFID

Plutôt que de choisir un personnage à l'écran, les joueurs peuvent poser un
badge sur un lecteur : la borne bascule directement sur le personnage
correspondant.

L'association badge → personnage se fait dans la salle, onglet **Badges RFID**.
Un lecteur RFID branché sur la borne se comporte généralement comme un clavier
et « tape » l'identifiant du badge, ce qui suffit.

## Intégrations externes

La borne n'est pas le seul moyen de piloter une partie : le **logiciel de salle**
(COGS, système de scénographie maison…) peut agir sur Leticia par HTTP.

Chaque salle possède son **jeton de webhook**, visible dans la salle, onglet
**Intégrations**. Les appels s'authentifient avec ce jeton, pas avec le compte
opérateur — le logiciel de salle n'a donc jamais besoin d'un mot de passe.

| Action | Appel |
|---|---|
| Démarrer la partie | `POST /api/cogs/rooms/{id}/game/start` |
| Arrêter la partie | `POST /api/cogs/rooms/{id}/game/stop` |
| Réinitialiser la salle | `POST /api/cogs/rooms/{id}/game/reset` |
| Activer un déclencheur | `POST /api/cogs/rooms/{id}/triggers/{trigger_id}/activate` |
| Désactiver un déclencheur | `POST /api/cogs/rooms/{id}/triggers/{trigger_id}/deactivate` |

Le jeton se transmet soit en paramètre d'URL (`?token=…`), soit en en-tête
`X-Room-Token`.

Il peut être régénéré, mais c'est une opération à effet immédiat et sans
retour en arrière : l'ancien jeton cesse aussitôt de fonctionner, et le
logiciel de salle ne peut plus rien piloter tant que les nouvelles URLs n'y
ont pas été recollées. Elle est donc **réservée à un administrateur**, et une
fenêtre de confirmation rappelle la conséquence avant d'agir. Un opérateur
non administrateur voit toujours les URLs (il en a besoin pour installer
l'intégration) mais pas le bouton de régénération.

Les **déclencheurs** sont ce qui rend l'intégration intéressante : quand la
salle signale qu'une énigme est résolue, activer le déclencheur correspondant
change ce que les personnages savent ou acceptent de dire, sans que le maître
du jeu ait à intervenir.

## Faire parler un personnage depuis la console

Dans la conversation avec un personnage, le bouton **mégaphone** bascule la
zone de saisie : votre texte n'est plus envoyé à l'IA, il est prononcé **tel
quel** par le personnage sur la borne.

Utile quand l'IA s'égare, bloque, ou quand vous voulez relancer une scène. La
réplique est enregistrée dans l'historique comme si le personnage l'avait dite,
ce qui est voulu : l'IA doit savoir ce que le joueur a réellement entendu pour
ne pas se contredire au tour suivant.

Si la salle n'est reliée à aucune borne, le son est joué sur la console
elle-même — une installation sans borne reste donc utilisable.

## En cas de souci

| Symptôme | Piste |
|---|---|
| La borne reste sur le code d'appairage | Elle n'a pas encore été validée dans Administration → Bornes |
| « Micro indisponible » | Contexte non sécurisé : voir [la section micro](#micro--le-blocage-http-et-comment-le-contourner) |
| La borne affiche « en attente » | Aucune partie n'est démarrée sur cette borne, ou la salle est liée à une autre |
| Rien ne se passe au clic sur un personnage | Vérifiez que la salle a bien des personnages participants dans son scénario |
