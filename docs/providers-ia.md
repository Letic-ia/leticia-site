---
sidebar_position: 5
title: Providers & IA locale
---

# Providers & IA locale

Leticia ne fournit pas l'IA : elle s'y **connecte**. Vous choisissez qui fait
quoi (conversation, transcription, synthèse vocale, images), en cloud ou en
local.

## Providers disponibles

| Provider | Type | Clé API | Capacités |
|---|---|---|---|
| **OpenAI** | Cloud | Requise | Chat · Images · STT · TTS |
| **Google Gemini** | Cloud | Requise | Chat · Images · STT · TTS |
| **Personnalisé** | Local / auto-hébergé | Optionnelle | Chat · Images · STT · TTS |

Le provider **Personnalisé** parle le **format OpenAI**. N'importe quel serveur
exposant une API compatible OpenAI fonctionne : vous n'indiquez qu'une **URL de
base** (et une clé seulement si le serveur en exige une).

Les quatre briques (chat, transcription, voix, images) se configurent
**séparément** : rien n'oblige à tout prendre chez le même fournisseur. Un
montage courant : **LLM en local** pour la confidentialité et le coût, **voix**
chez un fournisseur cloud pour la qualité.

## Fournisseurs cloud compatibles OpenAI

En plus d'OpenAI et Gemini, Leticia intègre en presets plusieurs fournisseurs
cloud qui parlent le format OpenAI. Sélectionnez le provider, collez votre clé,
choisissez (ou saisissez) le modèle - l'URL de base est pré-remplie.

| Provider | Capacités | URL de base |
|---|---|---|
| **Anthropic (Claude)** | Chat | `https://api.anthropic.com/v1` |
| **OpenRouter** | Chat | `https://openrouter.ai/api/v1` |
| **Groq** | Chat · STT | `https://api.groq.com/openai/v1` |
| **Mistral AI** | Chat | `https://api.mistral.ai/v1` |
| **DeepSeek** | Chat | `https://api.deepseek.com/v1` |
| **xAI (Grok)** | Chat | `https://api.x.ai/v1` |
| **Together AI** | Chat | `https://api.together.xyz/v1` |
| **Perplexity** | Chat | `https://api.perplexity.ai` |
| **Fireworks AI** | Chat | `https://api.fireworks.ai/inference/v1` |
| **Cerebras** | Chat | `https://api.cerebras.ai/v1` |

:::note
Le **modèle par défaut** proposé est indicatif : les catalogues évoluent vite.
Le champ modèle est libre, saisissez l'identifiant exact publié par le
fournisseur si besoin. **OpenRouter** donne accès à des centaines de modèles via
un seul compte ; **Anthropic** passe par son endpoint compatible OpenAI.
:::

## Endpoints attendus

Un serveur local doit exposer, selon la brique, ces routes compatibles OpenAI :

| Brique | Endpoint |
|---|---|
| LLM (chat) | `POST /v1/chat/completions` |
| Transcription (STT) | `POST /v1/audio/transcriptions` |
| Synthèse vocale (TTS) | `POST /v1/audio/speech` |
| Images | `POST /v1/images/generations` |

Dans Leticia, l'**URL de base** est la partie avant `/v1` (ex. `http://localhost:11434/v1`),
et le **modèle** est le nom du modèle chargé sur le serveur.

Pour le détail exact des paquets échangés (utile pour déboguer votre propre
serveur, ou en construire un) : [Protocole IA](./protocole-ia).

## Applications pour l'IA locale

### LLM (conversation)

| Application | URL de base typique | Notes |
|---|---|---|
| **Ollama** | `http://localhost:11434/v1` | Le plus simple à installer, large catalogue |
| **LM Studio** | `http://localhost:1234/v1` | Interface graphique, serveur OpenAI intégré |
| **vLLM** | `http://localhost:8000/v1` | Haute performance, orienté serveur/GPU |
| **llama.cpp** (`llama-server`) | `http://localhost:8080/v1` | Léger, CPU ou GPU |

### Transcription (STT)

| Application | URL de base typique | Notes |
|---|---|---|
| **Speaches** (ex-faster-whisper-server) | `http://localhost:8000/v1` | Whisper compatible OpenAI, léger |
| **LocalAI** | `http://localhost:8080/v1` | Tout-en-un (voir plus bas) |
| **whisper.cpp** (serveur) | `http://localhost:8080/v1` | Très léger, CPU |

### Synthèse vocale (TTS)

| Application | URL de base typique | Notes |
|---|---|---|
| **Speaches** | `http://localhost:8000/v1` | Voix Kokoro / Piper |
| **Kokoro-FastAPI** | `http://localhost:8880/v1` | Voix Kokoro, compatible OpenAI |
| **openedai-speech** | `http://localhost:8000/v1` | Piper / XTTS, compatible OpenAI |
| **LocalAI** | `http://localhost:8080/v1` | Tout-en-un |

### Tout-en-un

Pour éviter de multiplier les serveurs :

- **LocalAI** : LLM **+** STT **+** TTS **+** images dans un seul service compatible OpenAI.
- **Speaches** : STT **+** TTS (la voix et la transcription au même endroit).

:::tip
Le STT et le TTS ayant chacun leur propre URL dans Leticia, vous pouvez aussi
mixer : par exemple **Speaches** pour la transcription et **Kokoro-FastAPI**
pour la voix, sur deux ports différents.
:::

## Brancher un serveur local

1. Lancez votre serveur (ex. `ollama serve`, ou LM Studio → *Start server*).
2. Dans **Paramètres**, choisissez le provider **Personnalisé** pour la brique
   concernée (IA, STT ou TTS).
3. Renseignez l'**URL de base** (ex. `http://localhost:11434/v1`) et le **nom
   du modèle** chargé sur le serveur.
4. Laissez la **clé API vide** si le serveur n'en demande pas.
5. Cliquez sur **Tester**.

:::note[Depuis Docker]
Si Leticia tourne en conteneur et le serveur d'IA sur la machine hôte,
remplacez `localhost` par `host.docker.internal` dans l'URL de base.
:::

## Quel choix pour la latence ?

Le ressenti de conversation dépend surtout de la vitesse du **LLM** et du
**TTS**. Un petit modèle local rapide, ou un modèle cloud léger, donne une
réponse quasi immédiate ; un gros modèle local sur CPU sera plus lent. Ajustez
aussi le nombre de tokens et la taille d'historique dans **Paramètres → IA**.

Avec **Gemini 2.5 ou 3**, vérifiez surtout que le réglage **Réflexion du modèle
(thinking)** est **désactivé** (c'est le défaut) : ces modèles raisonnent avant
de répondre et peuvent mettre plus de 20 s par réplique quand la réflexion est
active. Voir [Exploitation avancée](./exploitation-avancee#régler-la-latence).
