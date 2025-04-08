```markdown
# 🏋️‍♀️ Fitness Goal Tracker 🥗

Bienvenue dans **Fitness Goal Tracker**, une application web intuitive qui vous aide à **définir**, **suivre** et **atteindre** vos objectifs de fitness, que ce soit   marcher 🥾, s'entraîner 💪 ou boire de l'eau 💧. Parfaitement adaptée aux débutants en React, cette app met en pratique les bases des frameworks frontend modernes avec un stockage **100% local**.

Ce projet est une application web développée avec [**Next.js**](https://nextjs.org), initialisée via [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Il vous aide à suivre vos objectifs de fitness 🏃, enregistrer vos progrès quotidiens 📊 et rester motivé(e) jour après jour !

## ⚙️ Lancer le Projet en Local

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ensuite, ouvrez votre navigateur à l’adresse 👉 [http://localhost:3000](http://localhost:3000)

## 🧩 Fonctionnalités

| Fonctionnalité 📌                     | Description 📋                                                                 |
|--------------------------------------|--------------------------------------------------------------------------------|
| ✅ **Gestion des Objectifs**         | Créer, Lire, Mettre à jour et Supprimer vos objectifs de fitness              |
| 📅 **Saisie des Progrès Quotidiens** | Un formulaire simple pour enregistrer votre progression chaque jour           |
| 📋 **Liste des Objectifs**           | Une vue claire de tous vos objectifs avec indicateur visuel de progression    |
| 📊 **Résumé des Performances**       | Statistiques hebdomadaires et moyennes de progression                         |
| 💾 **Stockage Local**                | Toutes les données sont sauvegardées dans le navigateur, même après fermeture |

## ✍️ Structure du Projet

- `app/page.js` – Page d’accueil de votre application.
- `components/` – Vos composants React réutilisables.
- `styles/` – Fichiers CSS ou modules CSS.
- `utils/` – Fonctions utilitaires (ex: LocalStorage).

L'application utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour charger [**Geist**](https://vercel.com/font), une police moderne conçue par Vercel.

## 🛠️ Technologies Utilisées

| Outil / Librairie | Rôle                               |
|-------------------|------------------------------------|
| React             | Framework principal de l’application |
| JavaScript (ES6+) | Logique & Interactivité             |
| HTML / CSS        | Structure & Design                  |
| LocalStorage      | Persistance des données             |

---

## 🧠 Pour les Étudiants

Ce projet a été conçu comme un **exercice pratique** pour :
- Apprendre les bases de React (useState, useEffect, composants)
- Comprendre la gestion de données sans backend
- Créer une expérience utilisateur fluide et minimaliste

## 🚀 Déploiement avec Vercel

Déployez facilement sur [**Vercel**](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) :

| Plateforme 🌐    | Statut ✅         |
|------------------|------------------|
| Vercel           | ✔️ Recommandée   |
| Netlify          | ✔️ Compatible    |
| GitHub Pages     | ⚠️ Non recommandé pour Next.js (préférez un framework statique) |

📄 Docs déploiement : [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

## 📚 Ressources Next.js

- [Documentation Next.js](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [GitHub Next.js](https://github.com/vercel/next.js)

## 📦 À Venir (Idées d'Améliorations)

- 🔔 Notifications pour objectifs non remplis
- 📱 Version mobile optimisée
- 📈 Graphiques de progression hebdomadaire (Chart.js / Recharts)
- ☁️ Intégration Firebase pour sauvegarde cloud

```
