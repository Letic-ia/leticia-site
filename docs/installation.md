---
sidebar_position: 3
title: Installation
---

import LatestVersionBadge from '@site/src/components/LatestVersionBadge';

# Installation

<LatestVersionBadge />

Cinq formats sont disponibles selon votre environnement. Dans tous les cas,
l'application écoute par défaut sur le **port 80** (aucun port dans l'URL) ;
quand ce n'est pas possible sans privilèges (voir chaque option ci-dessous),
elle bascule automatiquement sur le port 8000 plutôt que de ne pas démarrer.

:::info[Clé de chiffrement]
`SETTINGS_MASTER_KEY` chiffre vos clés API stockées en base. Générez-en une
solide et **conservez-la** : sans elle, une sauvegarde restaurée ne peut plus
déchiffrer les secrets. Générer une valeur : `openssl rand -hex 32`.
:::

## Option A - Docker (recommandé sur serveur)

Prérequis : Docker.

```bash
export SETTINGS_MASTER_KEY="$(openssl rand -hex 32)"
docker run -d --name leticia -p 80:80 \
  -e SETTINGS_MASTER_KEY="$SETTINGS_MASTER_KEY" \
  -v leticia_data:/app/data \
  ghcr.io/letic-ia/leticia:latest
```

Le volume `leticia_data` conserve la base SQLite entre les redémarrages. Le
port est configurable avec `-e PORT=...` si 80 est déjà pris sur l'hôte.

Avec **Docker Compose** :

```yaml
services:
  leticia:
    image: ghcr.io/letic-ia/leticia:latest
    ports:
      - "80:80"
    environment:
      SETTINGS_MASTER_KEY: "remplacez-par-une-valeur-générée"
    volumes:
      - leticia_data:/app/data
    restart: unless-stopped
volumes:
  leticia_data:
```

```bash
docker compose up -d
```

## Option B - Archive sans Docker

Prérequis : Python 3.11+.

1. Téléchargez `leticia-<version>-no-docker.tar.gz` depuis la page des
   [releases GitHub](https://github.com/Letic-ia/leticia/releases) et
   décompressez-la.
2. Installez les dépendances et lancez :

```bash
pip install -r requirements.txt
export SETTINGS_MASTER_KEY="$(openssl rand -hex 32)"
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Ce chemin manuel n'a pas la bascule automatique des installeurs : lancé sans
`sudo`, le port 80 refusera de se lier (port privilégié sur Linux), d'où le
port 8000 par défaut ci-dessus. Pour utiliser 80 directement, lancez en root
ou accordez la capacité une fois : `sudo setcap 'cap_net_bind_service=+ep'
"$(readlink -f "$(command -v python3)")"`.

## Option C - Installeur Windows

Pour un poste Windows sans Python ni Docker.

1. Téléchargez l'installeur `.exe` depuis les
   [releases GitHub](https://github.com/Letic-ia/leticia-release/releases).
2. Lancez-le : l'application s'installe et démarre, avec une icône dans la barre
   système pour l'ouvrir ou la quitter.
3. Au premier lancement, la `SETTINGS_MASTER_KEY` est générée automatiquement et
   les données sont stockées dans `%APPDATA%\Leticia`.

Windows n'imposant pas de restriction sur le port 80 pour une application
ordinaire, l'accès se fait sur **`http://leticia.local`** depuis les autres
appareils du réseau (bascule sur `http://leticia.local:8000` si un autre
logiciel occupe déjà le port 80).

## Option D - Installeur Linux

Pour un serveur Linux (systemd) sans Python ni Docker : binaire + service
systemd, démarré au boot.

Prérequis : systemd.

1. Téléchargez `leticia-<version>-linux-x86_64.tar.gz` depuis les
   [releases GitHub](https://github.com/Letic-ia/leticia-release/releases) et
   décompressez-la.
2. Installez :

```bash
sudo ./install.sh
```

Le service `leticia` démarre et s'active au boot (`systemctl status leticia`).
Accès sur **`http://<ip-du-serveur>`** (port 80 par défaut, accordé au service
sans root via une capacité systemd dédiée ; modifiable dans
`/etc/leticia/leticia.env`).

Relancer `sudo ./install.sh` met à jour le binaire en place : les données
(`/var/lib/leticia`) et la configuration sont conservées, et un backend IA déjà
installé n'est pas retéléchargé. Désinstallation : `sudo ./uninstall.sh`
(données conservées).

## Option E - Application macOS

Pour un Mac, en barre de menus (pas d'icône dans le Dock).

Prérequis : Apple Silicon (M1 ou plus récent).

1. Téléchargez `leticia-<version>-macos-arm64.dmg` depuis les
   [releases GitHub](https://github.com/Letic-ia/leticia-release/releases), ouvrez-le
   et glissez Leticia dans Applications.
2. Premier lancement : clic droit (ou Ctrl+clic) sur Leticia.app puis "Ouvrir",
   et confirmez - l'application n'est pas signée par un certificat Apple, cette
   confirmation n'est nécessaire qu'une fois.

macOS ne permettant pas à une application ordinaire de se lier au port 80,
Leticia bascule automatiquement sur `http://localhost:8000`
(`http://leticia.local:8000` ou l'IP du Mac pour les autres appareils du
réseau).

Cet installeur ne propose pas l'IA locale hors-ligne (voir ci-dessous) :
configurez un fournisseur cloud, ou un serveur compatible OpenAI (Ollama, LM
Studio...) lancé séparément, depuis **Réglages**.

## IA locale hors-ligne (optionnelle - Windows et Linux)

Les installeurs Windows et Linux proposent, en option, une **pile IA locale**
sans Docker : dialogue (Ollama), reconnaissance vocale (Whisper) et synthèse
vocale (Piper). L'installeur télécharge les outils, puis un **unique modèle
recommandé** (`qwen3:4b`, qui tourne sur CPU) est téléchargé au premier lancement
derrière un écran d'attente. Aucun accès cloud ni clé API n'est alors nécessaire.
Une réinstallation (mise à jour) ne re-télécharge pas un backend déjà présent.

Vous gardez la main sur ces services :

- **Arrêter / redémarrer** chaque backend depuis l'icône de la barre système
  (Windows) ou `systemctl` (Linux), ou depuis **Réglages → Diagnostics →
  Services IA locaux** dans l'application.
- **Tester** chaque IA (dialogue, images, transcription, synthèse) avec la
  configuration enregistrée depuis ce même onglet Diagnostics.

À la **désinstallation** (Windows), une option propose de retirer aussi l'IA
locale (Ollama et les modèles téléchargés, plusieurs Go). Vos parties,
personnages et réglages sont conservés dans tous les cas.

## Et ensuite ?

Au premier accès, l'application vous demande de créer le **compte
administrateur** : voir [Premiers pas & configuration](./configuration).
