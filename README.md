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
3. Créez un fichier `.env` à la racine du projet et configurez les paramètres de connexion à l'API Symfony :
   ```
   API_BASE_URL=https://votre-api-symfony.com/api
   ```
4. Lancez l'application avec `npx expo start`.  
5. Scannez le QR code avec l'application Expo Go ou utilisez un émulateur Android/iOS.

## Structure des fichiers

- `app/` : Contient les écrans et la navigation de l'application.
  - `(tabs)/` : Pages principales accessibles via la navigation par onglets.
    - `index.tsx` : Page d'accueil affichant les options principales.
    - `explore.tsx` : Page d'exploration avec des exemples de fonctionnalités.
  - `auth/` : Pages liées à l'authentification.
    - `login.tsx` : Page de connexion des utilisateurs.
    - `register.tsx` : Page d'inscription des nouveaux utilisateurs.
  - `files/` : Pages pour la gestion des fichiers.
    - `share.tsx` : Page pour partager un fichier.
    - `view.tsx` : Page pour afficher les fichiers partagés.
  - `+not-found.tsx` : Page affichée pour les routes non trouvées.
- `components/` : Composants réutilisables pour l'interface utilisateur.
  - `ThemedText.tsx` : Composant pour afficher du texte avec des thèmes clairs et sombres.
  - `ThemedView.tsx` : Composant pour les conteneurs avec des thèmes.
  - `Collapsible.tsx` : Composant pour afficher du contenu repliable.
  - `ParallaxScrollView.tsx` : Composant pour un effet de défilement parallaxe.
- `hooks/` : Hooks personnalisés pour la gestion des thèmes et autres fonctionnalités.
  - `useThemeColor.ts` : Hook pour récupérer les couleurs en fonction du thème.
  - `useColorScheme.ts` : Hook pour détecter le thème clair ou sombre.
- `constants/` : Fichiers de configuration et constantes globales.
  - `api.ts` : Contient l'URL de base de l'API et une fonction utilitaire pour les appels API.
  - `Colors.ts` : Définit les couleurs utilisées dans l'application.
- `assets/` : Images, polices et autres ressources statiques.
- `scripts/` : Scripts utilitaires pour la gestion du projet.
  - `reset-project.js` : Script pour réinitialiser le projet à un état vierge.

## Ressources et documentation

- **Documentation React Native** : [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- **Documentation Expo** : [https://docs.expo.dev/](https://docs.expo.dev/)
- **Documentation Symfony** : [https://symfony.com/doc/current/](https://symfony.com/doc/current/)
