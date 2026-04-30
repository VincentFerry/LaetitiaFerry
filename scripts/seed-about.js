const sqlite3 = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'dev.db');
console.log('Database path:', dbPath);

const db = sqlite3(dbPath);

// Contenu de la page "À propos"
const aboutContent = {
  bio: `Passionnée par le cinéma depuis mon plus jeune âge, j'ai fait de ma passion mon métier. Diplômée de la Fémis, j'ai travaillé sur de nombreux projets en tant que réalisatrice et première assistante réalisatrice.

Mon approche du cinéma est guidée par une recherche constante de l'authenticité et de l'émotion. Que ce soit en fiction, en publicité ou en documentaire, je m'attache à créer des images fortes qui racontent des histoires humaines.

Aujourd'hui, je continue d'explorer de nouveaux territoires créatifs, toujours avec la même exigence et la même passion qui m'animent depuis mes débuts.`,
  
  portraitUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop',
  
  cvUrl: null, // À remplir avec l'URL du CV PDF
  
  credits: [
    {
      year: '2024',
      title: 'Le Dernier Été',
      role: 'Réalisatrice - Court-métrage'
    },
    {
      year: '2023',
      title: 'Les Ombres du Passé',
      role: '1ère Assistante Réalisatrice - Long-métrage'
    },
    {
      year: '2023',
      title: 'Campagne Parfum Luxe',
      role: 'Réalisatrice - Publicité'
    },
    {
      year: '2022',
      title: 'Sous le Ciel de Paris',
      role: '1ère Assistante Réalisatrice - Long-métrage'
    },
    {
      year: '2022',
      title: 'Nuit Blanche',
      role: 'Réalisatrice - Court-métrage'
    },
    {
      year: '2021',
      title: 'Série "Les Chemins de Traverse"',
      role: '1ère Assistante Réalisatrice - Série TV'
    }
  ]
};

try {
  console.log('\n📝 Ajout du contenu "À propos"...\n');

  const upsert = db.prepare(`
    INSERT INTO SiteConfig (key, value)
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);

  // Ajouter la bio
  upsert.run('about_bio', aboutContent.bio);
  console.log('✅ Bio ajoutée');

  // Ajouter l'URL du portrait
  if (aboutContent.portraitUrl) {
    upsert.run('about_portrait_url', aboutContent.portraitUrl);
    console.log('✅ Photo portrait ajoutée');
  }

  // Ajouter l'URL du CV (si disponible)
  if (aboutContent.cvUrl) {
    upsert.run('about_cv_url', aboutContent.cvUrl);
    console.log('✅ URL du CV ajoutée');
  }

  // Ajouter les crédits (en JSON)
  upsert.run('about_credits', JSON.stringify(aboutContent.credits));
  console.log('✅ Crédits ajoutés');

  console.log('\n✅ Contenu "À propos" ajouté avec succès!\n');

} catch (error) {
  console.error('❌ Erreur:', error.message);
  process.exit(1);
} finally {
  db.close();
}
