---
sidebar_position: 9
title: Mise à jour
---

# Mise à jour

Avant toute mise à jour, faites une [sauvegarde](./sauvegarde) (l'application en
crée une automatiquement, mais un filet supplémentaire ne coûte rien).

## Depuis l'application (recommandé)

Quand une nouvelle version est disponible, un **bandeau** apparaît en haut de
l'application pour les administrateurs.

- **Application Windows** : cliquez sur **Mettre à jour**. Leticia crée d'abord
  une sauvegarde, télécharge le nouvel installeur et l'exécute ; l'application se
  ferme puis redémarre. Vos données dans `%APPDATA%\Leticia` sont conservées.
- **Docker / serveur** : le bandeau propose de **télécharger** la nouvelle
  version ; appliquez alors la procédure manuelle correspondante ci-dessous.

La recherche de mise à jour interroge les *releases* GitHub environ une fois par
jour.

## Docker

```bash
docker pull ghcr.io/letic-ia/leticia:latest
docker rm -f leticia
docker run -d --name leticia -p 8000:8000 \
  -e SETTINGS_MASTER_KEY="$SETTINGS_MASTER_KEY" \
  -v leticia_data:/app/data \
  ghcr.io/letic-ia/leticia:latest
```

Le volume `leticia_data` est conservé : vos données et votre configuration
restent en place. Le schéma de base est mis à jour automatiquement au démarrage.

## Archive sans Docker

Décompressez la nouvelle archive par-dessus l'ancienne (en conservant votre base
et votre `SETTINGS_MASTER_KEY`), réinstallez les dépendances puis relancez :

```bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Windows

Téléchargez le nouvel installeur et exécutez-le : il met à jour l'application en
place. Vos données dans `%APPDATA%\Leticia` sont conservées.

:::info
Après une mise à jour, l'application affiche les nouveautés (changelog) au
premier lancement.
:::
