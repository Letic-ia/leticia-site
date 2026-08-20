---
title: Présentation
---

# Leticia

**Leticia** est une plateforme d'interrogatoires narratifs assistés par IA, conçue
pour les expériences d'escape game. Les joueurs interrogent des personnages
incarnés par une IA, à la voix, et l'opérateur pilote la session depuis une
console web.

## Ce que fait Leticia

- **Interrogatoire vocal** : le joueur parle, l'IA transcrit (STT), répond dans le
  rôle du personnage, puis lit sa réponse à voix haute (TTS).
- **Scénarios & personnages** : chaque enquête définit ses personnages, leur
  psychologie, leurs secrets et des déclencheurs narratifs.
- **Console opérateur** : suivi en direct des sessions, déclencheurs, journal.
- **IA configurable** : OpenAI, Google Gemini, ou un **serveur local**
  (Ollama, LM Studio, vLLM…) compatible OpenAI.
- **Comptes & rôles** : un administrateur configure l'instance, des opérateurs
  animent les sessions.

## Architecture

Leticia se déploie **on-premise** (chez vous), en une seule application :

- un **backend** FastAPI (sessions, scénarios, IA, voix) ;
- un **frontend** React servi par le backend ;
- une base **SQLite** locale (aucune donnée n'quitte votre réseau, hormis les
  appels aux fournisseurs d'IA que vous choisissez).

Quatre formats de déploiement sont disponibles selon votre environnement :

| Format | Pour qui | Prérequis |
|---|---|---|
| **Docker** | Serveur Linux / NAS | Docker |
| **Installeur Windows** | Poste Windows clé en main | Aucun |
| **Installeur Linux** | Serveur Linux, sans Docker | systemd |
| **Application macOS** | Mac, barre de menus | Apple Silicon |

➡️ Pour comprendre le déroulé d'une session et le trajet d'une réplique,
voir [Fonctionnement](./fonctionnement). Pour installer, direction
l'[installation](./installation).
