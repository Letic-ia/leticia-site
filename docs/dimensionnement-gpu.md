---
sidebar_position: 5.7
title: Dimensionner le matériel IA
---

# Dimensionner le matériel IA (cartes grand public)

Leticia elle-même est légère : l'application tourne sur CPU et ne fait que
relayer les appels vers les serveurs IA. **Le vrai travail, et donc le vrai
dimensionnement, c'est la pile IA en back** : le LLM qui incarne les
personnages, la transcription (STT) et la synthèse vocale (TTS).

Cette page synthétise les **benchmarks publics** des piles locales supportées
par Leticia (Ollama / llama.cpp, vLLM, whisper.cpp, Piper) sur des cartes
graphiques grand public, puis les traduit en nombre de salles simultanées.
Les chiffres sont des **ordres de grandeur** relevés en août 2026 (sources en
bas de page) : la vitesse varie avec les pilotes, la longueur de contexte et
la quantisation. La [méthode pour mesurer sur *votre*
configuration](#valider-sur-votre-configuration) est en fin de page.

## Ce qu'un tour de jeu consomme

Un échange vocal complet enchaîne trois appels :

| Étape | Pile locale | Matériel sollicité |
|---|---|---|
| Transcription (STT) | whisper.cpp | GPU (ou CPU pour les petits modèles) |
| Réponse du personnage (LLM) | Ollama / llama.cpp / vLLM | GPU |
| Voix du personnage (TTS) | Piper | **CPU uniquement** |

Point important : **Piper ne consomme pas de GPU**. Sur un CPU de bureau
moderne, il synthétise environ 10× plus vite que le temps réel (et tient le
temps réel sur un Raspberry Pi 5). Le GPU se partage donc entre deux charges
seulement : STT et LLM.

## LLM : tokens/seconde par carte

Vitesses de **génération** (tokens/s) avec llama.cpp, quantisation Q4, le
standard de fait pour l'usage local. Ollama utilise llama.cpp sous le capot
(comptez ~3 à 10 % de moins pour sa couche serveur).

| Carte (VRAM) | ~4B (ex. Qwen3 4B) | 7-8B | 13-14B |
|---|---|---|---|
| RTX 3060 (12 Go) | ~60-70 | ~42-45 | ~23 |
| RTX 4060 (8 Go) | ~60+ | ~50-60 | VRAM trop juste |
| RTX 4060 Ti (16 Go) | non relevé | ~45-50 | ~25-30 |
| RTX 4070 (12 Go) | non relevé | ~52 | ~30 |
| RTX 3090 (24 Go) | non relevé | ~95 | ~50 |
| RTX 4090 (24 Go) | non relevé | ~104-135 | ~60-70 |

À retenir :

- **La bande passante mémoire prime sur la puissance de calcul.** C'est le
  piège de la RTX 4060 Ti 16 Go : ses 288 Go/s la rendent plus lente qu'une
  3060 malgré sa génération plus récente et sa VRAM supérieure.
- **VRAM nécessaire (Q4)** : ~3 Go pour un 4B, ~5-6 Go pour un 7-8B,
  ~9-10 Go pour un 14B, plus le contexte. Une carte 12 Go est le point
  d'entrée confortable pour un 8B avec whisper à côté.
- Une réplique de personnage fait typiquement 40 à 80 tokens : à 40 tok/s,
  la génération complète prend 1 à 2 s, et grâce au streaming le
  personnage **commence à parler dès la première phrase**, bien avant la fin.

## STT : whisper.cpp

Les benchmarks s'expriment en **facteur temps réel** (RTF) : 8× temps réel =
une question de 8 s transcrite en ~1 s.

| Configuration | Modèle | Vitesse |
|---|---|---|
| RTX 3060 (12 Go) | large-v3 int8 (~2,5 Go VRAM) | ~8× temps réel |
| RTX 4070 | large-v3 | ~8× (whisper.cpp) / ~12× (faster-whisper) |
| CPU de bureau moderne | base / small | plusieurs × temps réel, sans GPU |

Pour des questions de joueur de 5 à 10 s, même une 3060 avec le gros modèle
large-v3 répond en ~1 s. Le modèle **small** suffit souvent pour du français
de qualité micro correcte, coûte ~4× moins de calcul et libère de la VRAM
pour le LLM. À noter : la borne rogne le silence en début/fin
d'enregistrement avant l'envoi ; le temps de calcul Whisper étant
proportionnel à la durée audio, seule la parole utile est facturée au GPU.

## Combien de salles simultanées sur une carte ?

Calcul de coin de table : un tour vocal occupe le GPU environ **2 à 3,5 s**
(~0,5-1 s de STT + 1,5-2,5 s de LLM), et une salle produit un tour toutes les
30 à 60 s. Les collisions entre salles restent donc rares jusqu'à 3-4 salles
sur une seule file ; au-delà, deux leviers :

- **`OLLAMA_NUM_PARALLEL`** (Ollama) traite plusieurs requêtes en parallèle
  au prix d'un débit unitaire réduit.
- **vLLM** (via le provider « Personnalisé ») est conçu pour la concurrence :
  son *continuous batching* agrège les requêtes simultanées. Les benchmarks
  publics mesurent ~250 tok/s agrégés sur une 3060 12 Go et ~485 tok/s sur
  du matériel plus rapide avec 10 requêtes concurrentes sur un 8B, là où
  llama.cpp garde un débit constant par requête.

Recommandations indicatives, avec un 7-8B Q4 + whisper :

| Salles simultanées | Carte minimum raisonnable |
|---|---|
| 1 à 3 | RTX 3060 12 Go (ou RTX 4060 8 Go avec whisper small) |
| 3 à 5 | RTX 4070 12 Go, ou 3060 + vLLM |
| 6 et plus, ou modèle 14B | RTX 3090 / 4090 24 Go, vLLM conseillé |

## Valider sur votre configuration

Ces chiffres servent à présélectionner le matériel, pas à remplacer la
mesure :

1. **Le harness de benchmark** du dépôt `leticia` (`benchmark/`) rejoue des
   parties complètes (STT → LLM → TTS) contre votre instance, avec plusieurs
   salles simulées en parallèle, et sort les latences p50/p95/p99 par
   segment. Étiquetez chaque run (`--label rtx3060-qwen3-4b`) pour comparer
   les configurations.
2. **L'export analytique** de l'application (Analyses → Export CSV)
   enregistre les mêmes latences par segment en conditions réelles.
3. Trois réglages de l'application pèsent directement sur la latence
   perçue : le **préchauffage à la sélection du personnage**
   (`Préchauffage IA`, à activer avec un serveur local), le **plafond
   d'historique** (moins de messages renvoyés = premier token plus rapide)
   et le **streaming** (activé par défaut : le personnage parle dès la
   première phrase).

## Sources

Benchmarks compilés en août 2026 depuis des publications indépendantes.
Ordres de grandeur, non contractuels :

- [Hardware Corner : GPU ranking for local LLMs](https://www.hardware-corner.net/gpu-ranking-local-llm/) (tok/s par carte, llama-bench, Q4)
- [LLM tokens/sec benchmarks 2026 : RTX 4090 vs 3090, 7B-70B Q4](https://mustafa.net/llm-tokens-per-second-benchmarks/)
- [Local LLM speed: RTX 3060, Qwen2 & Llama](https://singhajit.com/llm-inference-speed-comparison/)
- [RTX 4060 Ollama benchmark](https://www.databasemart.com/blog/ollama-gpu-benchmark-rtx4060)
- [faster-whisper vs whisper.cpp (2026)](https://codersera.com/blog/faster-whisper-vs-whisper-cpp-speech-to-text-2026/) et [Best GPU for Whisper : RTF](https://gigagpu.com/best-gpu-for-whisper/)
- [On-device TTS comparison 2026 (Piper)](https://picovoice.ai/blog/on-device-tts/) et [Piper sur Raspberry Pi](https://pidiylab.com/text-to-speech-raspberry-pi-piper/)
- [Ollama vs vLLM benchmark 2026 : throughput & latency](https://markaicode.com/benchmarks/ollama-vs-vllm-performance/) et [vLLM or llama.cpp (Red Hat)](https://developers.redhat.com/articles/2025/09/30/vllm-or-llamacpp-choosing-right-llm-inference-engine-your-use-case)
