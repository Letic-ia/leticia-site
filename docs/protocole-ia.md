---
sidebar_position: 5.5
title: Protocole IA (référence technique)
---

# Protocole IA (référence technique)

Cette page documente **exactement** ce que Leticia envoie à un provider IA (LLM,
transcription, synthèse vocale) et ce qu'elle attend en retour. Elle s'adresse
à qui veut brancher son propre serveur compatible OpenAI, déboguer une
intégration, ou simplement comprendre le protocole en détail - c'est une
référence, pas un guide de configuration (voir [Providers & IA
locale](./providers-ia) pour ça).

Chaque brique se règle sur un **style d'API** : `openai` (OpenAI et tout
serveur compatible - Ollama, LM Studio, vLLM, llama.cpp, Speaches...),
`gemini` (Google Gemini), et deux styles propres au STT/TTS local
(`whispercpp`, `piper`). C'est ce style, pas le nom du provider, qui décide de
la forme exacte du paquet.

## LLM (dialogue)

### Construction du message

Rien n'est envoyé brut : un **prompt système** est généré à partir de la
fiche du personnage et du scénario (nom, rôle, description, personnalité,
relations, contexte du scénario, culpabilité/statut de victime, résumé de
l'interrogatoire en cours), puis un tableau `messages` est assemblé avec
l'historique de la conversation.

Pour que les réponses restent rapides sur un modèle local, l'historique n'est
**pas** une simple fenêtre glissante : au-delà du nombre de messages configuré,
il est coupé par blocs de moitié-budget (pas message par message), pour que le
préfixe du prompt reste identique d'un tour à l'autre - un serveur avec cache
de contexte (KV-cache) réutilise alors ce qu'il a déjà calculé au lieu de tout
refaire.

Forme finale envoyée au provider :

```json
[
  {"role": "system", "content": "<prompt système généré>"},
  {"role": "user", "content": "Question précédente..."},
  {"role": "assistant", "content": "Réponse précédente..."},
  {"role": "user", "content": "Dernière question"}
]
```

### Style OpenAI (OpenAI, Ollama, LM Studio, vLLM, llama.cpp, Speaches...)

**Requête** - `POST {url de base}/chat/completions` :

```json
{
  "model": "gpt-4o-mini",
  "messages": [ /* voir ci-dessus */ ],
  "max_tokens": 256
}
```

En-têtes : `Content-Type: application/json`, et `Authorization: Bearer <clé>`
seulement si une clé est configurée (un serveur local n'en a généralement pas
besoin).

**Réponse attendue :**

```json
{
  "choices": [{"message": {"content": "..."}}],
  "usage": {"prompt_tokens": 412, "completion_tokens": 38}
}
```

**En streaming** (utilisé pendant une session réelle), le payload ajoute
`"stream": true` et `"stream_options": {"include_usage": true}` ; la réponse
arrive en *Server-Sent Events*, une ligne `data: {...}` par fragment :

```
data: {"choices":[{"delta":{"content":"Bon"}}]}
data: {"choices":[{"delta":{"content":"jour"}}]}
data: {"choices":[],"usage":{"prompt_tokens":412,"completion_tokens":38}}
data: [DONE]
```

:::note
Si votre serveur refuse `stream_options` (certains backends locaux répondent
`400`), Leticia retente automatiquement sans ce champ - vous perdez juste le
comptage de tokens sur cette réponse.
:::

### Style Gemini

Les messages sont convertis : le rôle `system` devient un
`systemInstruction` séparé, `assistant` devient `"model"`, `user` reste
`"user"`.

**Requête** - `POST {url de base}/models/{modèle}:generateContent` :

```json
{
  "contents": [
    {"role": "user", "parts": [{"text": "Question précédente..."}]},
    {"role": "model", "parts": [{"text": "Réponse précédente..."}]},
    {"role": "user", "parts": [{"text": "Dernière question"}]}
  ],
  "systemInstruction": {"parts": [{"text": "<prompt système>"}]},
  "generationConfig": {
    "maxOutputTokens": 4352,
    "thinkingConfig": {"thinkingBudget": 0}
  }
}
```

En-tête d'authentification : `x-goog-api-key: <clé>` (pas de `Bearer`).

**Réponse :**

```json
{
  "candidates": [{
    "content": {"parts": [{"text": "..."}]},
    "finishReason": "STOP"
  }],
  "usageMetadata": {"promptTokenCount": 412, "candidatesTokenCount": 38}
}
```

En streaming, même payload sur l'endpoint `:streamGenerateContent`, réponse en
SSE avec des fragments `candidates[0].content.parts[].text` progressifs.

:::tip[Réflexion (thinking)]
Gemini 2.5 et 3 "réfléchissent" par défaut avant de répondre, ce qui ajoute des
dizaines de secondes de latence. Leticia désactive (ou réduit au minimum
documenté) cette réflexion selon le modèle quand le réglage **Réflexion du
modèle** est désactivé dans les Paramètres, et augmente `maxOutputTokens`
d'une marge pour que les tokens de réflexion ne tronquent pas la réponse
visible. Voir [Exploitation avancée](./exploitation-avancee#régler-la-latence).
:::

## STT (reconnaissance vocale)

### Style OpenAI

**Requête** - `POST {url de base}/audio/transcriptions`, en
`multipart/form-data` :

```
file: <octets audio>
model: whisper-1
language: fr          (optionnel)
```

**Réponse :** `{"text": "Bonjour, je m'appelle..."}`

### Style whisper.cpp (serveur local)

**Requête** - `POST {url de base}/inference`, multipart :

```
file: <octets audio>
response_format: json
temperature: 0.0
```

Ni le modèle ni la langue ne sont envoyés : whisper.cpp les fixe au démarrage
du serveur (options de lancement), pas par requête.

**Réponse :** `{"text": "..."}`

### Style Gemini

Pas d'endpoint de transcription dédié : c'est un appel `generateContent`
classique avec l'audio en pièce jointe encodée en base64.

```json
{
  "contents": [{
    "role": "user",
    "parts": [
      {"text": "Transcribe this audio exactly in language 'fr'. Return only the transcript text."},
      {"inlineData": {"mimeType": "audio/webm", "data": "<audio en base64>"}}
    ]
  }]
}
```

## TTS (synthèse vocale)

### Style OpenAI

**Requête** - `POST {url de base}/audio/speech` :

```json
{
  "model": "tts-1",
  "input": "Bonjour, je réfléchis...",
  "voice": "alloy",
  "response_format": "mp3"
}
```

**Réponse :** le corps est directement les octets audio (pas de JSON), le
type MIME se déduit du `response_format` demandé.

### Piper (processus local, pas de serveur HTTP)

Piper n'expose aucune API HTTP : Leticia pilote un processus persistant en
lui envoyant une ligne JSON sur son entrée standard :

```json
{"text": "Bonjour, je réfléchis...", "output_file": "/chemin/vers/sortie.wav", "speaker": "..."}
```

(`speaker` omis pour la voix par défaut). Piper écrit le wav sur disque puis
imprime son chemin sur sa sortie standard ; Leticia lit ce fichier et renvoie
ses octets. Le processus reste chargé entre deux phrases (le modèle de voix
n'est chargé qu'une fois).

### Style Gemini

```json
{
  "contents": [{"role": "user", "parts": [{"text": "Say the following text aloud:\nBonjour..."}]}],
  "generationConfig": {
    "responseModalities": ["AUDIO"],
    "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": "Kore"}}}
  }
}
```

**Réponse :** audio encodé en base64 dans
`candidates[0].content.parts[].inlineData.data` (souvent du PCM brut, que
Leticia réencapsule en WAV avant de le transmettre au navigateur).

## Résilience

Que ce soit pour le LLM, le STT ou le TTS, une brique **secours** peut être
configurée séparément de la principale. Une erreur transitoire (délai dépassé,
`429`, `5xx`) est retentée quelques fois sur la même cible avant de basculer
sur le secours ; une erreur définitive (clé invalide, modèle inconnu) bascule
immédiatement. En streaming côté LLM, une fois qu'un premier fragment de
réponse est parti vers le joueur, plus aucun basculement n'a lieu : l'échec
devient définitif et le texte déjà reçu est conservé.
