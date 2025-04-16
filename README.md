# Share Mobile

Bienvenue sur le projet **Share Mobile**, une application mobile développée avec React Native. Cette application est la version mobile de notre site web Symfony, permettant le partage de fichiers entre utilisateurs.

## Auteurs

- **Lucas MONIEZ**

## Description

Le projet Share Mobile a été réalisé dans le cadre de l'épreuve E5 SLAM du BTS SIO. Il permet aux utilisateurs de partager des fichiers et de les gérer de manière sécurisée et organisée, tout en offrant une expérience mobile fluide.

### Fonctionnalités principales

- **Partage de fichiers** : Les utilisateurs peuvent télécharger et partager des fichiers.
- **Gestion des utilisateurs** : Inscription, connexion, et gestion des profils.
- **Organisation des fichiers** : Classement des fichiers par catégories et suivi des téléchargements.
- **Synchronisation avec le site Symfony** : Les données sont partagées entre l'application mobile et le site web.

## Technologies utilisées

- **React Native** : Framework pour le développement mobile multiplateforme.
- **Expo** : Outils et services pour simplifier le développement React Native.
- **Symfony** : Backend du site web avec lequel l'application est synchronisée.
- **MySQL** : Base de données pour stocker les informations des utilisateurs et des fichiers.
- **GitHub** : Collaboration et gestion du code source.
- **Figma** : Conception des interfaces utilisateur.

## Installation

Voici les étapes pour installer et utiliser ce projet :
1. Clonez ce dépôt ou téléchargez les fichiers.  
2. Installez les dépendances avec `npm install`.  
3. Configurez les paramètres de connexion à l'API Symfony dans le fichier `.env`.  
4. Lancez l'application avec `npx expo start`.  
5. Scannez le QR code avec l'application Expo Go ou utilisez un émulateur Android/iOS.

## Structure des fichiers

- `app/` : Contient les écrans et la navigation de l'application.
  - `(tabs)/` : Pages principales accessibles via la navigation par onglets.
    - `index.tsx` : Page d'accueil.
    - `explore.tsx` : Page d'exploration.
  - `auth/` : Pages liées à l'authentification.
    - `login.tsx` : Page de connexion.
    - `register.tsx` : Page d'inscription.
  - `+not-found.tsx` : Page affichée pour les routes non trouvées.
- `components/` : Composants réutilisables pour l'interface utilisateur.
- `hooks/` : Hooks personnalisés pour la gestion des thèmes et autres fonctionnalités.
- `constants/` : Fichiers de configuration et constantes globales.
- `assets/` : Images, polices et autres ressources statiques.
- `scripts/` : Scripts utilitaires pour la gestion du projet.

## Ressources et documentation

- **Documentation React Native** : [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- **Documentation Expo** : [https://docs.expo.dev/](https://docs.expo.dev/)
- **Documentation Symfony** : [https://symfony.com/doc/current/](https://symfony.com/doc/current/)
