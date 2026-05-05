# Migration vers PostgreSQL (Neon via Vercel)

SQLite local n'est pas compatible avec les environnements serverless comme Vercel. Nous migrons vers **PostgreSQL** via **Neon**, la solution recommandée par Vercel.

## Étape 1 : Créer une base de données PostgreSQL sur Vercel

1. Allez sur votre projet Vercel : https://vercel.com/dashboard
2. Cliquez sur votre projet `laetitia-ferry`
3. Allez dans l'onglet **Storage**
4. Cliquez sur **Create Database**
5. Sélectionnez **Postgres** (powered by Neon)
6. Choisissez un nom : `laetitia-ferry-db`
7. Sélectionnez la région la plus proche (ex: Frankfurt)
8. Cliquez sur **Create**

Vercel va automatiquement :
- Créer la base de données Neon
- Configurer les variables d'environnement (`DATABASE_URL`, `POSTGRES_*`)
- Les rendre disponibles dans tous vos environnements (Production, Preview, Development)

## Étape 2 : Appliquer le schéma Prisma

Une fois la base créée, vous devez appliquer le schéma :

### Option A : Via Vercel CLI (recommandé)

```bash
# Installer Vercel CLI si pas déjà fait
npm i -g vercel

# Se connecter
vercel login

# Lier votre projet
vercel link

# Récupérer les variables d'environnement
vercel env pull .env.production

# Appliquer les migrations
npx prisma migrate deploy
```

### Option B : Manuellement

1. Récupérez la `DATABASE_URL` depuis Vercel :
   - Settings → Environment Variables → `DATABASE_URL`
   - Copiez la valeur

2. Créez un fichier `.env.production` :
```env
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require"
```

3. Générez et appliquez les migrations :
```bash
# Créer la migration initiale
npx prisma migrate dev --name init

# Ou appliquer directement le schéma
npx prisma db push
```

## Étape 3 : Exporter les données SQLite

```bash
npm run export:postgres
```

Cela créera un fichier `scripts/data-export.sql` avec toutes vos données au format PostgreSQL.

## Étape 4 : Importer les données dans PostgreSQL

### Via psql (si installé)

```bash
# Windows (avec PostgreSQL installé)
psql "$DATABASE_URL" -f scripts/data-export.sql

# Ou directement
$env:DATABASE_URL="postgresql://..."
psql $env:DATABASE_URL -f scripts/data-export.sql
```

### Via Neon Console (interface web)

1. Allez sur https://console.neon.tech
2. Sélectionnez votre base de données
3. Allez dans **SQL Editor**
4. Copiez-collez le contenu de `scripts/data-export.sql`
5. Exécutez

### Via Prisma Studio

```bash
# Ouvrir Prisma Studio avec la DB de production
npx prisma studio
```

Puis créez manuellement les entrées importantes (utilisateur admin, etc.)

## Étape 5 : Configurer NextAuth

Ajoutez la variable `NEXTAUTH_SECRET` dans Vercel :

```bash
# Générer un secret
openssl rand -base64 32

# Ou sur Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Dans Vercel → Settings → Environment Variables :
- `NEXTAUTH_SECRET` : votre secret généré
- `NEXTAUTH_URL` : `https://votre-site.vercel.app`

## Étape 6 : Déployer

```bash
git add .
git commit -m "Migrate to PostgreSQL"
git push
```

Vercel va automatiquement redéployer avec PostgreSQL !

## Développement local avec PostgreSQL

Pour développer localement avec la même base PostgreSQL :

```bash
# Récupérer les variables d'environnement
vercel env pull .env.local

# Lancer le serveur
npm run dev
```

Ou créez un `.env.local` avec une base PostgreSQL locale :

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/laetitia_ferry"
NEXTAUTH_SECRET="votre-secret-local"
NEXTAUTH_URL="http://localhost:3000"
```

## Commandes utiles

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# Créer une nouvelle migration
npx prisma migrate dev --name nom_migration

# Pousser le schéma sans migration
npx prisma db push

# Ouvrir Prisma Studio
npx prisma studio

# Réinitialiser la base (ATTENTION: supprime toutes les données)
npx prisma migrate reset
```

## Avantages de PostgreSQL (Neon)

✅ **Intégration Vercel native** : Configuration automatique
✅ **Serverless** : Fonctionne parfaitement sur Vercel
✅ **Performant** : Meilleur que SQLite pour les apps en production
✅ **Gratuit** : Plan gratuit généreux (0.5 GB de stockage, 100h de compute)
✅ **Branching** : Créez des branches de base de données pour les previews
✅ **Backups automatiques** : Sauvegardes quotidiennes

## Différences SQLite → PostgreSQL

### Types de données
- SQLite `INTEGER` → PostgreSQL `INT` ✅ (compatible)
- SQLite `TEXT` → PostgreSQL `TEXT` ✅ (compatible)
- SQLite `BOOLEAN` → PostgreSQL `BOOLEAN` ✅ (compatible)

### Identifiants
- PostgreSQL utilise des séquences pour `autoincrement()`
- Les noms de colonnes avec majuscules doivent être entre guillemets : `"createdAt"`

### Syntaxe
- SQLite : `datetime('now')` → PostgreSQL : `NOW()`
- SQLite : `||` (concat) → PostgreSQL : `||` ✅ (compatible)

## Dépannage

### Erreur "relation does not exist"
La table n'existe pas. Appliquez les migrations :
```bash
npx prisma migrate deploy
```

### Erreur de connexion SSL
Ajoutez `?sslmode=require` à la fin de votre `DATABASE_URL`

### Erreur "prepared statement already exists"
Redémarrez votre serveur de développement

### Données manquantes
Vérifiez que l'import SQL s'est bien déroulé dans Neon Console → SQL Editor
