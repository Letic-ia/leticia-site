---
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

## Modèles proposés (presets)

Pour chaque provider, le champ **Modèle** est un menu déroulant pré-rempli
avec plusieurs modèles courants, plus une entrée **Autre** qui fait apparaître
un champ libre pour saisir n'importe quel identifiant. Voici les presets
actuellement proposés par brique :

<details>
<summary><strong>OpenAI</strong></summary>

| Brique | Modèles proposés |
|---|---|
| Chat | `gpt-4o-mini` · `gpt-5.5` · `gpt-5` · `gpt-5-mini` · `gpt-5-nano` · `o4-mini` (raisonnement) · `gpt-5-codex` |
| Images | `gpt-image-1` · `gpt-image-1-mini` |
| Transcription (STT) | `gpt-4o-mini-transcribe` · `gpt-4o-transcribe` · `whisper-1` (héritage) |
| Synthèse (TTS) | `gpt-4o-mini-tts` · `tts-1` (faible latence) |

</details>

<details>
<summary><strong>Google Gemini</strong></summary>

| Brique | Modèles proposés |
|---|---|
| Chat | `gemini-3-flash-preview` · `gemini-3-pro-preview` · `gemini-2.5-pro` · `gemini-2.5-flash` |
| Images | `gemini-2.0-flash-preview-image-generation` · `gemini-2.5-flash-image` (Nano Banana) |
| Transcription (STT) | `gemini-3-flash-preview` |
| Synthèse (TTS) | `gemini-3.1-flash-tts-preview` |

</details>

<details>
<summary><strong>Anthropic (Claude)</strong></summary>

Chat : `claude-sonnet-5` · `claude-opus-5` · `claude-haiku-4-5` · `claude-sonnet-4-6` · `claude-opus-4-8`

</details>

<details>
<summary><strong>Groq</strong></summary>

| Brique | Modèles proposés |
|---|---|
| Chat | `openai/gpt-oss-120b` · `openai/gpt-oss-20b` · `moonshotai/kimi-k2-instruct` |
| Transcription (STT) | `whisper-large-v3-turbo` · `whisper-large-v3` |

</details>

<details>
<summary><strong>Mistral AI</strong></summary>

Chat : `mistral-large-latest` · `mistral-medium-latest` · `mistral-small-latest` · `codestral-latest`

</details>

<details>
<summary><strong>DeepSeek</strong></summary>

Chat : `deepseek-v4-flash` · `deepseek-v4-pro` (raisonnement)

</details>

<details>
<summary><strong>xAI (Grok)</strong></summary>

Chat : `grok-2-latest` · `grok-4.3`

</details>

<details>
<summary><strong>Together AI</strong></summary>

Chat : `meta-llama/Llama-3.3-70B-Instruct-Turbo` · `Qwen/Qwen2.5-72B-Instruct-Turbo` · `deepseek-ai/DeepSeek-V3`

</details>

<details>
<summary><strong>Perplexity</strong></summary>

Chat : `sonar` · `sonar-pro` · `sonar-reasoning-pro` · `sonar-deep-research`

</details>

<details>
<summary><strong>Fireworks AI</strong></summary>

Chat : `accounts/fireworks/models/llama-v3p3-70b-instruct` · `accounts/fireworks/models/qwen2p5-72b-instruct` · `accounts/fireworks/models/deepseek-v3`

</details>

<details>
<summary><strong>Cerebras</strong></summary>

Chat : `llama3.1-8b` · `qwen-3-235b-a22b-instruct-2507` · `gpt-oss-120b`

</details>

## Voix (TTS)

Comme pour le modèle, **OpenAI** et **Google Gemini** proposent chacun un menu
déroulant de voix nommées pour la synthèse vocale, avec la même entrée
**Autre** pour saisir un nom de voix personnalisé. Les autres providers TTS
(**Piper local**, **Personnalisé**) n'ont pas de catalogue fixe : le champ
**Voix** est alors directement un champ libre.

<details>
<summary><strong>OpenAI</strong> - 13 voix</summary>

`alloy` · `ash` · `ballad` · `coral` · `echo` · `fable` · `onyx` · `nova` ·
`sage` · `shimmer` · `verse` · `marin` · `cedar`

</details>

<details>
<summary><strong>Google Gemini</strong> - 29 voix</summary>

`Zephyr` · `Puck` · `Charon` · `Kore` · `Fenrir` · `Leda` · `Orus` · `Aoede` ·
`Callirrhoe` · `Autonoe` · `Enceladus` · `Iapetus` · `Umbriel` · `Algieba` ·
`Despina` · `Erinome` · `Algenib` · `Rasalgethi` · `Laomedeia` · `Achernar` ·
`Alnilam` · `Schedar` · `Gacrux` · `Pulcherrima` · `Achird` · `Zubenelgenubi` ·
`Vindemiatrix` · `Sadachbia` · `Sadaltager` · `Sulafat`

Ces voix sont des presets de timbre/rythme, pas des voix par langue : la
langue parlée suit le texte envoyé au modèle.

</details>

Le catalogue complet (modèles et voix, par provider) est aussi disponible en
JSON via `GET /api/settings/providers` - utile pour scripter une vérification
ou construire votre propre outillage autour de Leticia.

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
