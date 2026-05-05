# Migration vers Turso (SQLite distribué pour Vercel)

SQLite local n'est pas compatible avec les environnements serverless comme Vercel. Nous migrons vers **Turso**, une base de données SQLite distribuée compatible avec Vercel.

## Étape 1 : Créer un compte Turso

1. Installez le CLI Turso :
```bash
# Windows (PowerShell)
irm get.turso.tech/install.ps1 | iex

# macOS/Linux
curl -sSfL https://get.tur.so/install.sh | bash
```

2. Créez un compte et connectez-vous :
```bash
turso auth signup
turso auth login
```

3. Créez une base de données :
```bash
turso db create laetitia-ferry
```

4. Récupérez l'URL de connexion :
```bash
turso db show laetitia-ferry --url
```

5. Créez un token d'authentification :
```bash
turso db tokens create laetitia-ferry
```

## Étape 2 : Configurer les variables d'environnement

Créez un fichier `.env.production` :

```env
# URL Turso (commence par libsql://)
DATABASE_URL="libsql://laetitia-ferry-XXXXX.turso.io"
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."

# NextAuth
NEXTAUTH_SECRET="votre-secret-genere-avec-openssl"
NEXTAUTH_URL="https://votre-site.vercel.app"
```

## Étape 3 : Appliquer le schéma Prisma à Turso

```bash
# Générer le SQL de migration
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > migration.sql

# Appliquer à Turso
turso db shell laetitia-ferry < migration.sql
```

## Étape 4 : Exporter les données locales

```bash
npm run export:data
```

Cela créera un fichier `scripts/data-export.json` avec toutes vos données.

## Étape 5 : Importer les données vers Turso

```bash
# Définir les variables d'environnement temporairement
$env:TURSO_DATABASE_URL="libsql://laetitia-ferry-XXXXX.turso.io"
$env:TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."

# Importer les données
npm run import:turso
```

## Étape 6 : Tester localement avec Turso

```bash
# Utiliser les variables Turso
$env:DATABASE_URL="libsql://laetitia-ferry-XXXXX.turso.io"
$env:TURSO_AUTH_TOKEN="votre-token"

# Lancer le serveur
npm run dev
```

Vérifiez que tout fonctionne correctement.

## Étape 7 : Configurer Vercel

1. Allez dans votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez :
   - `DATABASE_URL` : votre URL Turso (libsql://...)
   - `TURSO_AUTH_TOKEN` : votre token Turso
   - `NEXTAUTH_SECRET` : générez avec `openssl rand -base64 32`
   - `NEXTAUTH_URL` : URL de votre site Vercel

4. Redéployez :
```bash
git push
```

## Avantages de Turso

✅ **Compatible Vercel** : Fonctionne parfaitement en serverless
✅ **SQLite** : Garde la même syntaxe et compatibilité
✅ **Distribué** : Réplication automatique dans plusieurs régions
✅ **Gratuit** : Plan gratuit généreux (500 DB, 9 GB de stockage)
✅ **Rapide** : Latence ultra-faible grâce à la réplication edge

## Développement local

Vous pouvez continuer à utiliser SQLite local en développement :

```env
# .env.local (développement)
DATABASE_URL="file:./dev.db"
```

Le code détecte automatiquement si vous utilisez Turso (URL commence par `libsql://`) ou SQLite local.

## Commandes utiles

```bash
# Voir les bases de données
turso db list

# Shell interactif
turso db shell laetitia-ferry

# Voir les statistiques
turso db inspect laetitia-ferry

# Supprimer une base
turso db destroy laetitia-ferry
```

## Dépannage

### Erreur "adapter is not assignable"
Régénérez le client Prisma :
```bash
npx prisma generate
```

### Erreur de connexion
Vérifiez que `TURSO_AUTH_TOKEN` est bien défini et valide.

### Données manquantes
Vérifiez que l'import s'est bien déroulé avec :
```bash
turso db shell laetitia-ferry "SELECT COUNT(*) FROM Project"
```
