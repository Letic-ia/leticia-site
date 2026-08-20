---
title: Comptes & rôles
---

# Comptes & rôles

Leticia gère des comptes locaux avec deux rôles.

## Les deux rôles

| | **Administrateur** | **Utilisateur** |
|---|---|---|
| Lancer et animer des sessions | ✅ | ✅ |
| Consulter scénarios & personnages | ✅ | ✅ |
| Créer / modifier / supprimer du contenu | ✅ | ❌ |
| Paramètres (IA, voix, providers) | ✅ | ❌ |
| Journal | ✅ | ❌ |
| Gestion des utilisateurs | ✅ | ❌ |

En clair : un **utilisateur** anime les parties (c'est le game master du jour),
un **administrateur** configure l'instance et gère le contenu.

## Créer des comptes

Dans **Administration** (visible pour les administrateurs), vous pouvez :

- créer un compte (nom d'utilisateur, mot de passe, rôle admin ou non) ;
- réinitialiser un mot de passe ;
- promouvoir / rétrograder un compte ;
- supprimer un compte.

Deux garde-fous : impossible de supprimer votre propre compte, ni de retirer le
dernier administrateur.

## Sécurité réseau

:::warning
Sur un réseau local, l'application est servie en HTTP : mots de passe et session
transitent en clair sur le réseau. C'est acceptable sur un **réseau de
confiance** (votre local d'escape game). Pour une exposition hors de ce réseau,
placez Leticia derrière un reverse-proxy HTTPS.
:::
