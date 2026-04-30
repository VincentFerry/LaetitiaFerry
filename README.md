# Portfolio Laetitia Ferry

Site portfolio pour Laetitia Ferry - Réalisatrice / 1ère Assistante Réalisatrice

## Stack Technique

- **Framework**: Next.js 14 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: SQLite via Prisma
- **Authentification**: NextAuth.js
- **Hébergement vidéo**: YouTube + Vimeo (embed)

## Installation

### 1. Cloner le projet et installer les dépendances

```bash
npm install
```

### 2. Configuration de l'environnement

Copier le fichier `.env.example` vers `.env` et configurer les variables :

```bash
cp .env.example .env
```

Variables importantes à configurer :
- `NEXTAUTH_SECRET` : Générer avec `openssl rand -base64 32`
- `ADMIN_EMAIL` : Email de l'administrateur
- Configuration SMTP pour le formulaire de contact

### 3. Initialiser la base de données

```bash
# Générer le client Prisma
npm run db:generate

# Créer la base de données et appliquer les migrations
npm run db:migrate

# Créer un utilisateur admin (mot de passe par défaut: admin123)
npm run db:seed
# Ou avec un mot de passe personnalisé:
npm run db:seed mon-mot-de-passe
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Construire l'application pour la production
- `npm run start` - Lancer l'application en production
- `npm run lint` - Linter le code
- `npm run db:generate` - Générer le client Prisma
- `npm run db:migrate` - Créer/appliquer les migrations
- `npm run db:studio` - Ouvrir Prisma Studio (interface graphique BDD)
- `npm run db:seed` - Créer un utilisateur admin

## Structure du projet

```
/
├── app/                    # Routes Next.js (App Router)
│   ├── (public)/          # Pages publiques
│   ├── admin/             # Interface d'administration
│   └── api/               # Routes API
├── components/            # Composants React réutilisables
├── lib/                   # Utilitaires et configurations
│   ├── prisma.ts         # Client Prisma
│   └── auth.ts           # Configuration NextAuth
├── prisma/               # Schéma et migrations Prisma
├── public/               # Fichiers statiques
│   └── uploads/          # Fichiers uploadés
├── scripts/              # Scripts utilitaires
└── types/                # Définitions TypeScript
```

## Accès à l'administration

URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Identifiants par défaut :
- Email: `admin@laetitiaferr.com`
- Mot de passe: `admin123` (à changer après la première connexion)

## Modèles de données

- **Project** : Projets vidéo (Réalisation / 1ère Assistante)
- **Photo** : Photos argentiques (Couleur / N&B)
- **Partner** : Logos partenaires
- **SiteConfig** : Configuration du site (showreel, textes, etc.)
- **User** : Utilisateurs admin

## Déploiement

Le projet peut être déployé sur Vercel ou tout autre hébergeur compatible Next.js.

Pour la production :
1. Configurer les variables d'environnement sur la plateforme
2. Utiliser PostgreSQL au lieu de SQLite (recommandé)
3. Configurer un service de stockage pour les uploads (S3, Cloudinary, etc.)

## Documentation

Voir le fichier `Claude.md` pour le cahier des charges complet du projet.
