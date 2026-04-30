# Cahier des charges — Site portfolio Laetitia Ferry
**Réalisatrice / 1ère Assistante Réalisatrice**
Version 1.0 — Pour Claude Code Sonnet 4.5

---

## 1. Contexte & objectif

Laetitia Ferry est réalisatrice et première assistante réalisatrice. Son site portfolio doit servir de vitrine professionnelle à destination des producteurs, maisons de production et annonceurs. Il doit refléter un univers cinématographique fort, être visuellement impressionnant, et permettre à la cliente de gérer son contenu de manière autonome via une interface d'administration.

**Références analysées :**
- `tommyboulet.com` — Showreel plein écran, grille de projets cinématographique, menu minimaliste
- `sarahjacquier.com` — Navigation par catégories, vignettes animées GIF en hover, hiérarchie claire
- `charliemoreno.fr` — Structure simple, sobriété, typographie marquée
- `benoitdelhomme.com` — Approche très épurée, mise en avant de l'image

**Ligne directrice design :** Esthétique cinéma noir/sombre, typographie éditoriale, animations fluides mais sobres, mise en avant maximale des vidéos.

---

## 2. Stack technique recommandée

| Composant | Choix recommandé | Justification |
|-----------|-----------------|---------------|
| Framework | **Next.js 14** (App Router) | SSR/SSG, performance, SEO, facilité de déploiement |
| Langage | TypeScript | Maintenabilité |
| Styling | Tailwind CSS + CSS Modules pour animations custom | Rapidité + contrôle fin |
| Base de données | **SQLite via Prisma** (ou Postgres si hébergement cloud) | Simple à déployer, suffisant pour ce volume |
| Auth admin | **NextAuth.js** (credentials provider) | Léger, intégré Next.js |
| Hébergement vidéo | YouTube + Vimeo (embed oEmbed) | Requis par la cliente |
| Animations | Framer Motion | Animations React de qualité cinéma |
| Déploiement | Vercel (ou VPS avec PM2) | Simple, preview automatique |

---

## 3. Structure des pages (front public)

### 3.1 Page d'accueil — Showreel

- **Hero plein écran** : lecteur vidéo Vimeo/YouTube en autoplay muté, cover du viewport 100vh
- Nom "LAETITIA FERRY" en typographie large, centré ou bas-gauche, style cinématographique
- Sous-titre animé : "Réalisatrice / 1ère Assistante Réalisatrice"
- Flèche scroll animée vers le bas
- Transition smooth vers la section projets
- Background : noir ou très sombre (#0a0a0a)

### 3.2 Navigation principale (sticky, transparente → opaque au scroll)

Onglets conformes à la structure reçue :
```
QUI SUIS-JE | RÉALISATION | 1ÈRE ASSISTANTE REAL | PHOTOS ARGENTIQUES | ILS M'ONT FAIT CONFIANCE
```
- Menu hamburger sur mobile
- Transition d'entrée : fade + slide depuis le haut
- Indicateur de page active (underline animé)

### 3.3 Section RÉALISATION

Sous-navigation interne :
```
Fiction | Pub | Backstage
```
- Grille de projets en **masonry** ou grille régulière 2-3 colonnes
- Chaque carte projet : thumbnail cliquable, titre en overlay au hover (fade-in)
- Au clic → page détail projet (voir 3.6)
- Animation d'entrée : stagger des cartes à l'apparition (Framer Motion)

### 3.4 Section 1ÈRE ASSISTANTE RÉALISATRICE

Structure identique à RÉALISATION :
Sous-navigation : `Fiction | Pub | Backstage`
- Même système de grille et de cartes

### 3.5 Section QUI SUIS-JE

- **Mot sur moi** : texte de présentation + photo portrait, layout 50/50 ou pleine largeur avec texte superposé
- **CV** : bouton téléchargement PDF + liste des crédits notable (timeline verticale ou liste sobre)
- Animation : fade-in au scroll

### 3.6 Page détail projet

- **Lecteur vidéo** plein largeur (embed Vimeo/YouTube responsive), autoplay possible
- Informations : titre, catégorie, année, rôle, client/réalisateur
- Description courte
- Bouton retour catégorie
- Navigation projet précédent / suivant (flèches latérales)

### 3.7 Section PHOTOS ARGENTIQUES

- Sous-navigation : `Couleur | N&B`
- Galerie lightbox : grille de photos, clic → lightbox avec navigation clavier et swipe mobile
- Lazy loading des images

### 3.8 Section ILS M'ONT FAIT CONFIANCE

- Bandeau ou grille de logos partenaires (clients, maisons de production, chaînes)
- Fond légèrement différent pour contraste
- Animation : carousel ou apparition en stagger
- En admin : upload de logos (SVG ou PNG avec fond transparent)

### 3.9 Page Contact

- Formulaire : Nom, Email, Société, Message
- Envoi via **Nodemailer** ou **Resend** (API email)
- Liens réseaux sociaux : Instagram, Vimeo, IMDb
- Coordonnées

### 3.10 Footer

- Nom, mention légale, copyright
- Liens réseaux sociaux
- Retour haut de page

---

## 4. Interface d'administration

### 4.1 Authentification

- URL : `/admin/login`
- Login/mot de passe unique (pas d'inscription publique)
- Session sécurisée via NextAuth.js
- Redirection automatique si non authentifié

### 4.2 Dashboard admin

URL : `/admin`

Menu latéral avec :
- Projets Réalisation
- Projets 1ère Assistante
- Photos Argentiques
- Logos partenaires
- Showreel
- CV / À propos
- Paramètres

### 4.3 Gestion des projets vidéo (Réalisation & 1ère Assistante)

Formulaire de création/édition d'un projet :

```
- Titre *
- Catégorie * (Fiction / Pub / Backstage)
- Section * (Réalisation / 1ère Assistante)
- URL vidéo * (YouTube ou Vimeo — auto-détection du provider)
- Thumbnail (upload image OU généré automatiquement via oEmbed)
- Année
- Client / Producteur
- Description courte
- Ordre d'affichage (drag & drop ou champ numérique)
- Publié / Brouillon (toggle)
```

**Lecteur vidéo** : détection automatique du provider (youtube.com / youtu.be → YouTube embed ; vimeo.com → Vimeo embed). Affichage du player en preview dans le formulaire avant sauvegarde.

### 4.4 Gestion des photos argentiques

- Upload multiple d'images (JPEG/PNG/WebP, max 10 Mo par fichier)
- Assignation catégorie : Couleur / N&B
- Tri par drag & drop
- Suppression avec confirmation

### 4.5 Gestion des logos partenaires

- Upload logo (SVG ou PNG transparent recommandé)
- Nom du partenaire
- Ordre d'affichage
- Activation/désactivation

### 4.6 Gestion du showreel

- Champ URL vidéo principale (homepage hero)
- Thumbnail / poster de fallback

### 4.7 Gestion CV & présentation

- Éditeur de texte rich (TipTap ou textarea Markdown) pour "Mot sur moi"
- Upload/remplacement du fichier CV (PDF)
- Upload photo portrait

### 4.8 Paramètres

- Changement mot de passe admin
- Email de réception du formulaire de contact
- Titre SEO / description meta du site

---

## 5. Modèle de données (Prisma / SQLite)

```prisma
model Project {
  id          Int      @id @default(autoincrement())
  title       String
  section     String   // "realisation" | "assistante"
  category    String   // "fiction" | "pub" | "backstage"
  videoUrl    String
  thumbnail   String?
  year        Int?
  client      String?
  description String?
  order       Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Photo {
  id        Int      @id @default(autoincrement())
  filename  String
  url       String
  category  String   // "couleur" | "nb"
  order     Int      @default(0)
  createdAt DateTime @default(now())
}

model Partner {
  id       Int     @id @default(autoincrement())
  name     String
  logoUrl  String
  order    Int     @default(0)
  active   Boolean @default(true)
}

model SiteConfig {
  key   String @id
  value String
}
```

---

## 6. Spécifications design

### 6.1 Palette de couleurs

```css
--color-bg:        #080808;   /* Noir profond */
--color-surface:   #111111;   /* Surface cartes */
--color-border:    #2a2a2a;   /* Bordures subtiles */
--color-text:      #f0ece4;   /* Blanc cassé chaud */
--color-muted:     #888888;   /* Texte secondaire */
--color-accent:    #c8a96e;   /* Or cinéma */
--color-hover:     #1a1a1a;   /* Hover états */
```

### 6.2 Typographie

```css
/* Display / Titres grands */
font-family: 'Cormorant Garamond', serif;  /* Élégance, cinéma classique */
font-weight: 300 ou 600;

/* Corps / Navigation */
font-family: 'DM Sans', sans-serif;  /* Moderne, lisible */
font-weight: 300, 400;

/* Accents / labels */
font-family: 'Space Mono', monospace;  /* Technique, années 70 cinéma */
letter-spacing: 0.15em;
text-transform: uppercase;
```

Charger via Google Fonts.

### 6.3 Animations clés

- **Entrée page** : fade-in global 400ms ease-out
- **Cartes projets** : stagger 60ms par carte, translateY(20px) → 0 + opacity 0 → 1
- **Hover carte** : overlay noir 60% opacity + titre slide-up, transform scale(1.02)
- **Navigation** : underline slide-in à l'activation
- **Lightbox photos** : zoom-in 300ms + backdrop blur
- **Loader initial** : barre de progression style cinéma (grain de pellicule optionnel)
- **Transition entre sections** : scroll smooth, pas de transitions de page brutales

### 6.4 Responsive

- Mobile first
- Breakpoints : 640px (sm), 1024px (lg), 1440px (xl)
- Navigation : hamburger menu sous 1024px
- Grille projets : 1 col mobile, 2 col tablette, 3 col desktop
- Vidéo hero : ratio 16:9 maintenu sur tous formats

---

## 7. SEO & performances

- Balises `<title>` et `<meta description>` dynamiques par page
- `og:image` générée depuis thumbnail projet
- Sitemap XML automatique (`next-sitemap`)
- Images optimisées via `next/image` (WebP, lazy loading, blur placeholder)
- Score Lighthouse cible : > 85 performance, > 90 SEO
- Pas de CLS sur le hero vidéo (réserver l'espace avant chargement)

---

## 8. Sécurité

- Variables d'environnement pour les secrets (`.env.local`)
- Routes `/admin/*` protégées par middleware NextAuth
- Upload fichiers : vérification type MIME côté serveur, limite de taille
- CSRF protection intégrée NextAuth
- Pas d'exposition de l'API admin en production sans authentification

---

## 9. Structure de fichiers recommandée

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Showreel homepage
│   │   ├── realisation/
│   │   │   ├── page.tsx          # Liste projets réalisation
│   │   │   └── [slug]/page.tsx   # Détail projet
│   │   ├── assistante/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── qui-suis-je/page.tsx
│   │   ├── photos/page.tsx
│   │   ├── partenaires/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── page.tsx              # Dashboard
│   │   ├── projets/
│   │   │   ├── page.tsx          # Liste
│   │   │   ├── nouveau/page.tsx
│   │   │   └── [id]/page.tsx     # Édition
│   │   ├── photos/page.tsx
│   │   ├── partenaires/page.tsx
│   │   └── parametres/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── projects/route.ts
│       ├── photos/route.ts
│       ├── partners/route.ts
│       └── upload/route.ts
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── video/          # VideoPlayer, VideoCard, VideoEmbed
│   ├── gallery/        # PhotoGrid, Lightbox
│   ├── admin/          # Forms, FileUpload, DragSort
│   └── ui/             # Button, Modal, Loader
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── video-utils.ts  # Détection YouTube/Vimeo, oEmbed
│   └── upload.ts
├── prisma/
│   └── schema.prisma
└── public/
    └── uploads/        # Fichiers uploadés localement
```

---

## 10. Fonctionnalité vidéo — Détail technique

### Détection automatique YouTube / Vimeo

```typescript
// lib/video-utils.ts
export function getVideoEmbed(url: string): { provider: 'youtube' | 'vimeo', embedUrl: string, thumbnailUrl: string } {
  // YouTube : youtube.com/watch?v=ID ou youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return {
      provider: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`
    };
  }
  // Vimeo : vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      provider: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0`,
      thumbnailUrl: '' // À récupérer via oEmbed API Vimeo
    };
  }
  throw new Error('URL vidéo non reconnue');
}
```

### Lecteur vidéo (composant)

- Ratio 16:9 imposé, responsive
- Iframe avec `allowFullscreen`
- Poster image (thumbnail) affiché avant lecture
- Pas d'autoplay sur les pages projet (uniquement sur le hero homepage)

---

## 11. Points d'attention pour Claude Code

1. **Commencer par le schéma Prisma** et les migrations avant toute chose
2. **Implémenter l'auth admin** avant les routes protégées
3. Le **lecteur vidéo homepage** (hero) doit être en autoplay, muted, loop, plein écran — tester le comportement sur iOS (restrictions autoplay)
4. Les **uploads de fichiers** : utiliser le dossier `/public/uploads/` en développement ; prévoir une variable d'env `UPLOAD_DIR` pour la prod
5. Pour les **logos partenaires** : fond transparent nécessaire → accepter SVG et PNG uniquement
6. **Ne pas utiliser** de bibliothèque de player vidéo tierce (React Player, etc.) — l'embed natif YouTube/Vimeo est suffisant et plus léger
7. Le **tri drag & drop** des projets en admin peut utiliser `@dnd-kit/core` (léger, accessible)
8. Prévoir un **mode aperçu** dans l'admin (ouvrir la page publique dans un nouvel onglet)
9. **Internationalisation** : le site est en français, pas besoin d'i18n pour l'instant
10. **Variables d'environnement requises** :
    ```
    DATABASE_URL=
    NEXTAUTH_SECRET=
    NEXTAUTH_URL=
    ADMIN_EMAIL=
    ADMIN_PASSWORD_HASH=
    SMTP_HOST=
    SMTP_PORT=
    SMTP_USER=
    SMTP_PASS=
    CONTACT_EMAIL=
    ```

---

## 12. Ordre de développement suggéré

1. Setup Next.js + Prisma + NextAuth
2. Schéma BDD + seed de données de test
3. Layout public (Navbar + Footer) + design system (couleurs, typo, composants de base)
4. Page homepage (hero showreel)
5. Sections Réalisation + Assistante (liste + détail projet)
6. Section Photos Argentiques (galerie + lightbox)
7. Section Qui suis-je + Contact
8. Section Ils m'ont fait confiance
9. Interface admin complète (CRUD projets, photos, partenaires)
10. Optimisations SEO + performances
11. Tests responsive + corrections
12. Documentation déploiement

---

*Cahier des charges rédigé pour transmission directe à Claude Code Sonnet 4.5*
*Toutes les décisions techniques peuvent être ajustées selon les préférences du développeur*