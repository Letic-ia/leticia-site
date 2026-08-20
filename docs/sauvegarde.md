---
title: Sauvegarde & restauration
---

# Sauvegarde & restauration

Toutes vos données (scénarios, personnages, sessions, réglages) tiennent dans une
seule base SQLite. Leticia gère des **sauvegardes** de cette base et permet aussi
de l'exporter/réimporter comme un fichier.

## Sauvegardes automatiques et manuelles

Dans **Paramètres → Données → Sauvegardes** :

- **Automatique** : une sauvegarde est créée **chaque jour**, en tâche de fond.
  Le nombre de sauvegardes automatiques conservées est réglable (les plus
  anciennes sont supprimées au-delà). Les sauvegardes **manuelles** ne sont,
  elles, jamais supprimées automatiquement.
- **Manuelle** : le bouton **Créer une sauvegarde** en fait une immédiatement.
- Pour chaque sauvegarde de la liste : **Restaurer**, **Télécharger** ou
  **Supprimer**.

Une sauvegarde est également créée **automatiquement avant chaque mise à jour**
de l'application (voir [Mise à jour](./mise-a-jour)), comme filet de sécurité.

:::warning
**Restaurer** remplace toutes les données actuelles par le contenu de la
sauvegarde choisie.
:::

Sur l'application **Windows**, les sauvegardes sont stockées dans
`%APPDATA%\Leticia\backups`, à côté de la base : elles sont donc conservées lors
d'une mise à jour de l'application.

## Exporter

Dans **Paramètres → Données → Exporter une base**, téléchargez un fichier de
sauvegarde. Par défaut il est **chiffré** avec votre `SETTINGS_MASTER_KEY`.

Vous pouvez aussi protéger l'export par un **mot de passe** dédié (champ prévu),
utile pour transférer la sauvegarde en dehors de la machine.

## Restaurer

Dans **Paramètres → Données → Importer une base**, sélectionnez un fichier de
sauvegarde. S'il est protégé par mot de passe, renseignez-le.

:::warning
L'import **remplace** la base courante. Exportez d'abord l'état actuel si vous
avez un doute.
:::

## Bon réflexe

Planifiez un export régulier (avant chaque mise à jour, et périodiquement).
Conservez la `SETTINGS_MASTER_KEY` **à part** : sans elle, une sauvegarde
chiffrée par la clé maître ne peut plus être déchiffrée.
