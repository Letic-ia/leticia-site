---
title: Les chiffres de vos salles
---

# Les chiffres de vos salles

La page **Analytiques** (réservée aux administrateurs) a deux onglets :

- **Parties** : les chiffres de jeu, pour le gérant ;
- **Technique** : les mesures de l'IA et de la voix, pour régler les
  performances (voir [exploitation avancée](exploitation-avancee#régler-la-latence)).

La période se choisit en haut de la page : 7, 30 ou 90 jours.

## Ce qui compte comme une partie

Une partie compte quand elle est **arrêtée**, ou quand la salle est **remise à
zéro**. Les chiffres viennent du débrief de chaque partie, qui est conservé
après la remise à zéro : rien n'est perdu quand la salle est préparée pour le
groupe suivant.

La **durée** d'une partie va du départ à l'arrêt. Une salle remise à zéro
longtemps après le départ du groupe ne gonfle donc pas la durée.

## L'onglet Parties

Quatre chiffres en tête de page :

| Chiffre | Ce qu'il dit |
|---|---|
| **Parties jouées** | Le nombre de groupes sur la période, et combien ont fini par une accusation. |
| **Taux de réussite** | La part des groupes qui ont démasqué le coupable, parmi ceux qui ont fait l'[accusation finale](accusation-finale). |
| **Durée moyenne** | Le temps moyen d'une partie, avec le nombre moyen de questions posées. |
| **Tokens par partie** | Ce qu'une partie consomme en moyenne auprès de l'IA, utile pour estimer son coût. |

En dessous :

- **Par scénario** : les mêmes chiffres pour chaque scénario joué. Un clic sur
  un scénario filtre toute la page sur lui (le filtre **Scénario** en haut
  fait de même).
- **Suspects les plus interrogés** : combien de questions chaque personnage a
  reçues, et dans combien de parties.
- **Où les groupes bloquent** : les révélations les moins obtenues d'abord,
  avec le temps moyen pour les obtenir. Une révélation rarement obtenue est une
  question que les groupes ne pensent pas à poser : c'est là qu'un indice ou
  un [déclencheur](premiere-session#3-déclencheurs-optionnel) peut aider.

:::info[Tokens des parties anciennes]
Le débrief garde les tokens de la partie depuis la version qui a introduit cet
onglet. Les parties plus anciennes sont comptées partout, sauf dans les
tokens : la tuile le signale (« 3 parties plus anciennes ne sont pas
comptées »).
:::
