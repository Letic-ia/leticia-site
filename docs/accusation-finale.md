---
title: Accusation finale et débrief
---

# Accusation finale et débrief

Une enquête se termine par une accusation. Sur la borne, les joueurs désignent
le coupable, Leticia révèle s'ils ont vu juste, puis le coupable prononce ses
**derniers mots** avec sa voix. Le maître du jeu retrouve ensuite un
**débrief** de la partie, à imprimer ou à copier.

## Régler le dénouement d'un scénario

Sur la page du scénario, section **Dénouement** (réservée aux
administrateurs) :

- **Accusation finale activée** : décochez-la pour un scénario sans
  accusation.
- **Question posée aux joueurs** : par défaut « Qui est coupable ? », dans la
  langue de la partie.
- **Suspects proposés** : par défaut tous les personnages sauf les victimes.
  Cliquez une puce pour retirer ou remettre un suspect. Le coupable, marqué
  d'une étoile, est toujours proposé.
- **Essais** : combien d'accusations les joueurs peuvent tenter. Le maximum
  est le nombre de suspects moins un : avec autant d'essais que de suspects,
  il suffirait de les accuser tous à tour de rôle.
- **Écran de fin** : ce que la borne affiche une fois tout terminé (durée,
  secrets découverts, questions posées).

Les coupables se désignent comme avant, dans la fiche du scénario. S'il y en a
plusieurs, les joueurs doivent **tous** les désigner en une seule accusation.
Un scénario sans coupable ne propose pas d'accusation.

### Les derniers mots du coupable

Après le verdict, le coupable parle une dernière fois : il avoue s'il est
démasqué, il nargue les joueurs s'il s'en sort. Trois façons de l'écrire :

| Mode | Ce que dit le coupable |
|---|---|
| **Texte fixe** | Exactement le texte que vous écrivez, un pour chaque issue. |
| **IA libre** | L'IA écrit la tirade à partir du personnage et de la partie jouée. |
| **IA guidée** | L'IA suit votre consigne (« elle avoue, froide, et justifie son geste par l'héritage volé ») et cite ce que les joueurs ont manqué. |

En IA guidée, la tirade s'appuie sur la partie réelle : une question jamais
posée, un secret jamais découvert, un complice. Elle est donc différente à
chaque groupe. La **longueur** (environ 15 secondes, 30 secondes ou une
minute) règle sa durée à voix haute.

Les boutons **Écouter : démasqué** et **Écouter : s'en sort** font un essai
avec les réglages affichés, sans les enregistrer, comme si les joueurs
n'avaient rien découvert. Si l'IA ne répond pas pendant une vraie partie, le
coupable dit une phrase de repli plutôt que de laisser l'écran vide.

Ces réglages voyagent avec le scénario quand vous
[le partagez](partager-un-scenario).

## Pendant la partie

Dans la salle, le panneau **Accusation finale** donne la réponse au maître du
jeu (la borne, elle, ne la montre jamais avant le verdict) et le nombre
d'essais.

1. **Ouvrir l'accusation** : la borne quitte les interrogatoires et affiche la
   question avec les suspects. Le bouton n'est actif que partie lancée.
2. Pendant que les joueurs hésitent, le panneau affiche en direct le suspect
   qu'ils ont touché, avant même qu'ils confirment.
3. **Revenir aux interrogatoires** : ferme l'accusation si les joueurs ne sont
   pas prêts. Les essais déjà utilisés restent comptés.

Chaque accusation apparaît dans le panneau avec son heure et son résultat. Une
mauvaise accusation qui laisse encore des essais grise le suspect innocenté
sur la borne ; la dernière déclenche le verdict.

Deux autres façons d'ouvrir l'accusation :

- **Par les joueurs** : cochez « Les joueurs peuvent l'ouvrir depuis la
  borne ». Un bouton « Nous savons qui est coupable » apparaît alors sur
  l'écran de choix du personnage.
- **Par le logiciel de salle** : quand une énigme finale est résolue, voir
  [Intégrations externes](borne-joueur#intégrations-externes).

### Sur la borne

Après la confirmation, la borne enchaîne :

1. la **révélation** : « Bravo, vous avez trouvé ! » ou « Vous vous êtes
   trompés », avec le vrai coupable ;
2. les **derniers mots**, sous-titrés et dits avec la voix du personnage ;
3. l'**écran de fin**, avec les chiffres choisis dans le scénario.

Elle reste sur cet écran jusqu'à l'arrêt ou la remise à zéro de la salle.

## Le débrief

Le lien **Voir le débrief de la partie**, dans le panneau de la salle, ouvre
une page qui raconte la partie :

- le **verdict**, l'heure, la durée et le nombre de questions ;
- un **résumé de l'enquête** rédigé par l'IA (il arrive quelques secondes
  après la fin) ;
- les **moments clés** : début, secrets obtenus, déclencheurs, actions des
  personnages, accusations ;
- le temps passé et les questions posées **par personnage** ;
- les **secrets** obtenus et manqués ;
- les derniers mots du coupable.

**Imprimer / PDF** ouvre la fenêtre d'impression du navigateur, d'où l'on peut
aussi enregistrer un PDF. **Copier le texte** met le débrief dans le
presse-papiers, prêt à coller dans un message.

Un débrief est enregistré à l'arrêt de la partie, même sans accusation, et
**conservé après la remise à zéro** : la salle garde l'historique de ses
parties précédentes, sous le lien du débrief. Seul un administrateur peut en
supprimer un.

## Prévenir le logiciel de salle

Quatre événements s'ajoutent aux [actions vers la
salle](borne-joueur#dans-lautre-sens--les-actions), pour allumer une lumière
ou lancer une musique au bon moment :

| Événement | Quand il part |
|---|---|
| Accusation ouverte | La borne affiche la question. |
| Bonne accusation | Les joueurs ont désigné le ou les coupables. |
| Mauvaise accusation | À chaque essai raté, le dernier compris. |
| Fin des derniers mots du coupable | Le coupable a fini de parler. |

En POST, le document reçu indique aussi les suspects accusés (`accused`), le
numéro de l'essai (`attempt`) et s'il s'agit du dernier (`final`).
