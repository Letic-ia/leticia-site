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
serveur par une adresse du type `http://192.168.1.42`, donc en HTTP simple, sur
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

L'affichage de la borne se règle **dans le scénario**, pas dans la salle :
page du scénario, section **Borne des joueurs**, onglet **Affichage**
(réservé aux administrateurs). Une enquête garde ainsi son look dans toutes
les salles qui la jouent, et un aperçu montre le résultat avant d'enregistrer.
Depuis une salle, **Réglages de la salle → Ouvrir les réglages de la borne**
mène au bon scénario.

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

## Ce que voient les joueurs avant et après

- **Avant la partie**, la borne affiche le titre de la dernière enquête jouée
  sur elle, son lieu et son époque, aux couleurs du scénario : « Le maître du
  jeu va bientôt ouvrir l'enquête ». Une borne neuve affiche un écran d'attente
  neutre.
- **Pendant la partie**, chaque suspect sans portrait a un médaillon à ses
  initiales, d'une couleur propre. Pendant que l'IA réfléchit, des points
  animés montrent que la question a bien été entendue.
- **Après l'arrêt**, la borne affiche **« Fin de l'enquête »** et invite le
  groupe au débrief pendant une minute, puis revient à l'attente. Un verdict
  d'[accusation finale](accusation-finale) reste affiché.

## Langue de la partie

Chaque salle se joue en **français** (par défaut) ou en **anglais**. La langue
se choisit à la création de la salle, ou au lancement de la partie, à côté du
choix de la borne. Elle reste modifiable pendant la partie : la borne suit
d'elle-même.

La langue de la partie est indépendante de celle de la console. Un maître du
jeu qui travaille en français peut lancer une partie en anglais pour un groupe
de touristes ; elle change :

- les **réponses des personnages** : ils répondent en anglais, même si leurs
  fiches, le scénario et les déclencheurs sont rédigés en français (inutile de
  tout traduire) ;
- la **transcription** de ce que disent les joueurs ;
- l'**écran de la borne** (boutons, consignes) ;
- le **message d'attente** et la **réplique de repli**, qui ont chacun une
  version anglaise dans les réglages ;
- la **voix**, si un modèle de voix anglais est configuré (voir ci-dessous).

:::warning[Voix locale Piper : une voix par langue]
Les voix des fournisseurs cloud (OpenAI, Gemini) parlent toutes les langues :
rien à faire. Une voix **Piper** (IA locale), en revanche, ne parle qu'une
langue : la voix française installée par défaut lirait l'anglais avec un fort
accent. Pour des parties en anglais avec Piper, ajoutez une voix anglaise :

1. téléchargez une voix anglaise depuis le dépôt
   [Piper voices](https://huggingface.co/rhasspy/piper-voices/tree/main/en),
   par exemple `en_US-lessac-medium` : les **deux** fichiers `.onnx` et
   `.onnx.json` ;
2. posez-les dans le même dossier que la voix française (le champ **Modèle TTS**
   de l'onglet **TTS** donne son chemin) ;
3. dans **Réglages → TTS → Options**, renseignez **Modèle TTS des parties en
   anglais** avec le chemin complet du fichier `.onnx` anglais.
:::

La transcription locale (Whisper) n'a besoin de rien : le modèle installé est
multilingue.

:::tip[Mots-clés des fiches en partie anglaise]
Les mots-clés des fiches (révélations, comportements, actions) sont comparés
à ce que disent les joueurs, tels quels. Des joueurs anglophones ne diront pas
« couteau » mais « knife » : pour un scénario joué dans les deux langues,
ajoutez les mots anglais à côté des mots français (« couteau, knife »). Le
reste de la fiche peut rester en français.
:::

## Badges RFID

Plutôt que de choisir un personnage à l'écran, les joueurs peuvent poser un
badge sur un lecteur : la borne bascule directement sur le personnage
correspondant.

L'association badge → personnage se fait dans le scénario, section **Borne
des joueurs**, onglet **Badges RFID** : un badge désigne un personnage de ce
scénario, quelle que soit la salle.
Un lecteur RFID branché sur la borne se comporte généralement comme un clavier
et « tape » l'identifiant du badge, ce qui suffit.

## Intégrations externes

La borne n'est pas le seul moyen de piloter une partie : le **logiciel de salle**
(COGS, système de scénographie maison…) peut agir sur Leticia par HTTP.

Chaque salle possède son **jeton de webhook**, visible dans la console de la
salle, fenêtre **Réglages de la salle** (l'icône d'engrenage en haut de la
console). Les appels s'authentifient avec ce jeton, pas avec le compte
opérateur : le logiciel de salle n'a donc jamais besoin d'un mot de passe.

Ce jeton suffit à lancer, arrêter ou réinitialiser la salle et à basculer ses
déclencheurs. Il est donc **réservé aux administrateurs** : un opérateur non
administrateur ne voit pas le bouton **Réglages de la salle**, et c'est un
administrateur qui installe l'intégration dans le logiciel de salle.

| Action | Appel |
|---|---|
| Démarrer la partie | `POST /api/cogs/rooms/{id}/game/start` |
| Arrêter la partie | `POST /api/cogs/rooms/{id}/game/stop` |
| Réinitialiser la salle | `POST /api/cogs/rooms/{id}/game/reset` |
| Activer un déclencheur | `POST /api/cogs/rooms/{id}/triggers/{trigger_id}/activate` |
| Désactiver un déclencheur | `POST /api/cogs/rooms/{id}/triggers/{trigger_id}/deactivate` |
| Ouvrir l'[accusation finale](accusation-finale) | `POST /api/cogs/rooms/{id}/accusation/open` |

Le jeton se transmet soit en paramètre d'URL (`?token=…`), soit en en-tête
`X-Room-Token`.

Il peut être régénéré, mais c'est une opération à effet immédiat et sans
retour en arrière : l'ancien jeton cesse aussitôt de fonctionner, et le
logiciel de salle ne peut plus rien piloter tant que les nouvelles URLs n'y
ont pas été recollées. Une fenêtre de confirmation rappelle cette conséquence
avant d'agir.

Les **déclencheurs** sont ce qui rend l'intégration intéressante : quand la
salle signale qu'une énigme est résolue, activer le déclencheur correspondant
change ce que les personnages savent ou acceptent de dire, sans que le maître
du jeu ait à intervenir.

### Dans l'autre sens : les actions

Les déclencheurs vont de la salle vers Leticia. Les **actions** font le chemin
inverse : Leticia **appelle** le logiciel de salle quand quelque chose se
passe dans l'interrogatoire. C'est ce qui permet qu'un suspect ouvre un
cadenas, allume une lumière ou lance un son.

Cela se règle dans la même fenêtre **Réglages de la salle**, partie
**Actions (Leticia → salle)**, toujours par un administrateur. Chaque
**règle** associe un événement à une URL que le logiciel de salle sait
recevoir :

| Événement | Quand il part |
|---|---|
| Partie démarrée | Le maître du jeu (ou le logiciel de salle) lance la partie. |
| Partie arrêtée | La partie en cours s'arrête. Arrêter une salle déjà arrêtée ne prévient personne. |
| Salle réinitialisée | La salle est remise à zéro pour l'équipe suivante. |
| Personnage choisi sur la borne | Les joueurs choisissent un personnage, au toucher ou par badge. |
| Réplique du MJ | Le maître du jeu fait parler un personnage depuis la console. |
| Action d'un personnage | Un personnage vient d'accomplir une action de sa fiche (voir ci-dessous). |
| Accusation finale | Ouverture, bonne ou mauvaise accusation, fin des derniers mots du coupable (voir [Accusation finale](accusation-finale#prévenir-le-logiciel-de-salle)). |

Pour « Personnage choisi » et « Réplique du MJ », la règle peut viser **un
personnage précis** ou tous. Une règle « Action d'un personnage » vise
toujours une action précise d'un personnage.
Une salle accepte jusqu'à vingt règles, et plusieurs règles peuvent viser le
même événement (un cadenas et un son, par exemple).

Chaque règle choisit sa **méthode** :

- **GET** : un simple appel de l'URL, sans contenu. C'est ce que la plupart
  des logiciels de salle et des boîtiers de relais savent déclencher : une URL
  par action.
- **POST** : l'URL reçoit un document JSON qui décrit l'événement : `event`
  (son nom technique, par exemple `action`), `room` (numéro et nom de la
  salle), `character` (numéro et nom du personnage, pour les événements de
  personnage), `action` (identifiant et nom de l'action), `text` (la réplique,
  pour une réplique du MJ), `sent_at` (date et heure) et `test` (vrai pour un
  envoi de test). Le nom de l'événement est
  aussi dans l'en-tête `X-Leticia-Event`.

Le bouton **Tester** d'une règle envoie tout de suite un appel marqué comme
test et affiche si le logiciel de salle l'a reçu. C'est le moyen de vérifier
une URL sans lancer de partie.

#### Les actions des personnages

Une action se décrit dans la
[fiche du personnage](premiere-session#2-ajouter-des-personnages), par
exemple « Ouvrir le coffre : quand on lui parle du coffre, il ouvre le sien ».
L'URL à appeler, elle, se règle dans chaque salle : deux salles qui jouent le
même scénario peuvent piloter des cadenas différents.

Une action part dans deux cas :

- les joueurs prononcent **un de ses mots-clés** devant ce personnage, dans
  leur dernière question ;
- **une révélation** de la fiche, choisie dans l'action, vient d'être
  débloquée.

Leticia le décide avant d'interroger l'IA : le personnage reçoit pour ce tour
la consigne d'accomplir l'action et l'annonce dans sa réponse (« bon, je vous
ouvre le coffre »), puis seulement le logiciel de salle est appelé. Le cadenas
et ce que dit le personnage racontent donc la même chose. Si l'IA ne répond
pas, rien ne part.

Quelques règles à connaître :

- une action part **une seule fois par partie** : reposer la même question ne
  rouvre pas un cadenas déjà ouvert, et le personnage sait qu'il l'a déjà
  fait. La réinitialisation de la salle remet le compteur à zéro ;
- elle ne part que **pendant une partie en cours** : en répétition, salle
  arrêtée, le personnage joue la scène mais rien ne se déclenche dans la salle
  (le bouton Tester sert à cela). C'est vrai aussi pour la réplique du MJ ;
- les mots-clés réagissent à ce que dit le joueur : « vous n'avez pas de
  coffre ? » suffit à déclencher l'action, et le personnage la jouera ;
- renommer ou réordonner les actions d'une fiche ne casse pas les règles des
  salles ; retirer une action supprime aussi les règles qui l'appelaient.

:::tip
Évitez de faire boucler les deux sens : si le logiciel de salle réinitialise
Leticia, ne lui faites pas réinitialiser la salle en retour à la réception de
« Salle réinitialisée ».
:::

Les appels partent en arrière-plan, dans l'ordre des événements : un logiciel
de salle lent ou éteint ne ralentit jamais la partie. Chaque envoi, réussi ou
non, est noté dans le **Journal** (sans les paramètres de l'URL, qui portent
parfois une clé). Leticia ne suit pas les redirections et ne relit pas la
réponse du logiciel de salle, seulement son code de retour.

## Faire parler un personnage depuis la console

Dans la conversation avec un personnage, le bouton **mégaphone** bascule la
zone de saisie : votre texte n'est plus envoyé à l'IA, il est prononcé **tel
quel** par le personnage sur la borne.

Utile quand l'IA s'égare, bloque, ou quand vous voulez relancer une scène. La
réplique est enregistrée dans l'historique comme si le personnage l'avait dite,
ce qui est voulu : l'IA doit savoir ce que le joueur a réellement entendu pour
ne pas se contredire au tour suivant.

Si la salle n'est reliée à aucune borne, le son est joué sur la console
elle-même : une installation sans borne reste donc utilisable.

## Suivre l'état de la borne pendant la partie

Sur la page de la salle, sous **Partie en direct**, la console affiche la borne
choisie avec un voyant :

- **connectée** (vert) : la borne tient son canal de contrôle ouvert ;
- **ne répond plus** (rouge, partie en cours) ou **hors ligne** : la borne a
  décroché, avec l'heure à laquelle elle a été vue pour la dernière fois.

Si la borne décroche en pleine partie, une **alerte** apparaît aussitôt dans
la console, puis une seconde quand elle revient. Comptez jusqu'à une vingtaine
de secondes entre la coupure et l'alerte.

La borne signale aussi son **micro** en se connectant : si elle est ouverte en
HTTP non sécurisé, la console l'indique en orange, avant que les joueurs ne
s'en aperçoivent (voir [la section micro](#micro--le-blocage-http-et-comment-le-contourner)).

## En cas de souci

| Symptôme | Piste |
|---|---|
| La borne reste sur le code d'appairage | Elle n'a pas encore été validée dans Administration → Bornes |
| « Micro indisponible » | Contexte non sécurisé : voir [la section micro](#micro--le-blocage-http-et-comment-le-contourner) |
| La borne affiche « en attente » | Aucune partie n'est démarrée sur cette borne, ou la salle est liée à une autre |
| La console indique « ne répond plus » | Écran en veille, navigateur fermé ou réseau coupé : rechargez la page de la borne, elle se reconnecte seule |
| Rien ne se passe au clic sur un personnage | Vérifiez que la salle a bien des personnages participants dans son scénario |
