---
title: Premiers pas & configuration
---

# Premiers pas & configuration

## 1. Créer le compte administrateur

Au tout premier accès, Leticia affiche un écran de **configuration initiale**.
Renseignez un nom d'utilisateur et un mot de passe : ce compte est
l'**administrateur** de l'instance. Il a tous les droits (configuration, gestion
des utilisateurs, contenu).

Tant que ce compte n'existe pas, l'application reste verrouillée.

## 2. Configurer l'IA

Rendez-vous dans **Paramètres → IA**. Leticia sait parler à trois types de
fournisseurs :

| Provider | Usage |
|---|---|
| **OpenAI** | Cloud, clé API requise |
| **Google Gemini** | Cloud, clé API requise |
| **Personnalisé** | Serveur **local** compatible OpenAI (Ollama, LM Studio, vLLM…) |

Pour un provider cloud, sélectionnez-le, collez votre **clé API**, choisissez le
modèle. Pour un serveur local, choisissez **Personnalisé** et indiquez son
**URL de base** (ex. `http://localhost:11434/v1`).

Le bouton **Tester** vérifie la connexion.

### Fiabilité en session

L'onglet **IA** regroupe, sous la **connexion principale** :

- un **provider de secours** (optionnel) : si le principal ralentit trop ou
  tombe, Leticia bascule automatiquement dessus, pour qu'une session ne reste
  jamais bloquée. Activez-le en un clic ; sa configuration (provider, clé,
  modèle) est identique à la principale ;
- des réglages de **résilience** : délai avant bascule, nombre de tentatives,
  **message d'attente** (« le suspect réfléchit… ») et **réplique de repli**
  jouée en personnage si l'IA reste injoignable, chacun avec sa version
  anglaise pour les salles jouées en anglais (voir
  [Langue de la partie](./borne-joueur#langue-de-la-partie)).

Les réglages fins de génération (tokens, historique, streaming…) sont rangés
sous **Options avancées**.

### Plafonds de consommation

Avec un fournisseur cloud, chaque question est facturée. Deux plafonds, comptés
**par salle**, évitent une facture surprise :

- **Questions par minute et par salle** (20 par défaut) : coupe une boucle,
  par exemple un bouton de borne resté enfoncé ou un script qui s'emballe ;
- **Tokens par heure et par salle** (désactivé par défaut) : plafonne la
  consommation sur l'heure glissante, question et réponse comprises.

Au-delà d'un plafond, l'IA n'est pas appelée : le personnage répond par la
**réplique de repli**, la question du joueur reste dans le transcript, et un
avertissement apparaît dans le **Journal** (et en notification dans la
console). La valeur `0` désactive un plafond.

Ces plafonds portent sur le LLM seulement : la transcription et la synthèse
vocale ne sont pas plafonnées.

:::info[Providers & IA locale]
La liste complète des providers et des applications d'IA locale (LLM, STT, TTS,
images) avec leurs URL de base est détaillée sur la page
[Providers & IA locale](./providers-ia).
:::

:::tip[Latence]
Un modèle local rapide (ou un petit modèle cloud) améliore nettement le ressenti
de conversation. Les réglages de génération (nombre de tokens, historique) sont
ajustables dans le même onglet.
:::

## 3. Configurer la voix (STT / TTS)

Dans **Paramètres → Speech**, la transcription (**STT**) et la synthèse
vocale (**TTS**) se configurent **indépendamment** : chacune a son provider, sa
clé et son URL. Vous pouvez par exemple utiliser un **Whisper local** pour la
transcription et un fournisseur cloud pour la voix.

Pour du **100 % local**, pointez STT et TTS sur un serveur vocal compatible
OpenAI (par ex. Speaches ou LocalAI) exposant `/audio/transcriptions` et
`/audio/speech`. Voir les applications recommandées sur la page
[Providers & IA locale](./providers-ia).

## 4. C'est prêt

Les clés API sont **chiffrées** en base. Vous pouvez maintenant créer des
comptes opérateurs ([Comptes & rôles](./comptes)) et lancer une
[première session](./premiere-session).
