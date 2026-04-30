# Guide d'installation - Portfolio Laetitia Ferry

## Étape 1 : Installation des dépendances

```bash
npm install
```

## Étape 2 : Configuration de l'environnement

Le fichier `.env` a déjà été créé avec les valeurs par défaut. Vous pouvez le modifier si nécessaire.

Variables importantes :
- `DATABASE_URL` : Chemin vers la base de données SQLite (par défaut : `file:./dev.db`)
- `NEXTAUTH_SECRET` : Secret pour NextAuth (à changer en production)
- `NEXTAUTH_URL` : URL de l'application (par défaut : `http://localhost:3000`)

## Étape 3 : Initialisation de la base de données

La base de données a déjà été créée et migrée. Les tables suivantes sont disponibles :
- `Project` : Projets vidéo
- `Photo` : Photos argentiques
- `Partner` : Logos partenaires
- `SiteConfig` : Configuration du site
- `User` : Utilisateurs admin

## Étape 4 : Création de l'utilisateur admin

### Option 1 : Via Prisma Studio (Recommandé)

```bash
npm run db:studio
```

Cela ouvrira une interface graphique dans votre navigateur. Ensuite :

1. Cliquez sur le modèle `User`
2. Cliquez sur "Add record"
3. Remplissez les champs :
   - `email` : `admin@laetitiaferr.com`
   - `passwordHash` : Utilisez le hash suivant pour le mot de passe `admin123` :
     ```
     $2a$10$YourHashHere
     ```

### Option 2 : Générer un hash de mot de passe

Vous pouvez générer un hash bcrypt pour votre mot de passe avec Node.js :

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('votre-mot-de-passe', 10).then(console.log)"
```

Copiez le hash généré et utilisez-le dans Prisma Studio.

## Étape 5 : Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## Accès à l'administration

URL : [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Identifiants :
- Email : `admin@laetitiaferr.com`
- Mot de passe : celui que vous avez défini lors de la création de l'utilisateur

## Commandes utiles

- `npm run dev` : Lancer le serveur de développement
- `npm run build` : Construire l'application pour la production
- `npm run start` : Lancer l'application en production
- `npm run db:studio` : Ouvrir Prisma Studio
- `npm run db:migrate` : Créer/appliquer les migrations
- `npm run db:generate` : Générer le client Prisma

## Prochaines étapes

L'étape 1 du développement est terminée :
- ✅ Next.js 14 initialisé avec TypeScript et Tailwind CSS
- ✅ Prisma configuré avec SQLite
- ✅ NextAuth.js configuré
- ✅ Schéma de base de données créé et migré
- ✅ Fichier .env.example généré

Vous pouvez maintenant passer à l'étape 2 du plan de développement.
