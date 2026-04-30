const sqlite3 = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'dev.db');
console.log('Database path:', dbPath);

const db = sqlite3(dbPath);

const projects = [
  // Réalisation - Fiction
  {
    title: 'Le Dernier Été',
    section: 'realisation',
    category: 'Fiction',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: null,
    year: 2023,
    client: 'Production XYZ',
    description: 'Un court-métrage sur la fin de l\'adolescence.',
    order: 1,
    published: 1
  },
  {
    title: 'Nuit Blanche',
    section: 'realisation',
    category: 'Fiction',
    videoUrl: 'https://vimeo.com/123456789',
    thumbnail: null,
    year: 2022,
    client: 'Les Films du Nord',
    description: 'Une histoire de rencontre nocturne.',
    order: 2,
    published: 1
  },
  // Réalisation - Pub
  {
    title: 'Campagne Parfum Luxe',
    section: 'realisation',
    category: 'Pub',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: null,
    year: 2024,
    client: 'Maison de Parfum',
    description: 'Spot publicitaire pour un parfum haut de gamme.',
    order: 3,
    published: 1
  },
  // Assistante - Fiction
  {
    title: 'Les Ombres du Passé',
    section: 'assistante',
    category: 'Fiction',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: null,
    year: 2023,
    client: 'Réalisateur: Jean Dupont',
    description: 'Long-métrage dramatique.',
    order: 1,
    published: 1
  },
  {
    title: 'Sous le Ciel de Paris',
    section: 'assistante',
    category: 'Fiction',
    videoUrl: 'https://vimeo.com/123456789',
    thumbnail: null,
    year: 2022,
    client: 'Réalisateur: Marie Martin',
    description: 'Comédie romantique tournée à Paris.',
    order: 2,
    published: 1
  },
  // Assistante - Pub
  {
    title: 'Spot Automobile',
    section: 'assistante',
    category: 'Pub',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: null,
    year: 2024,
    client: 'Agence Publicis',
    description: 'Publicité pour une marque automobile premium.',
    order: 3,
    published: 1
  }
];

try {
  console.log('\n🎬 Ajout des projets de test...\n');

  const insert = db.prepare(`
    INSERT INTO Project (title, section, category, videoUrl, thumbnail, year, client, description, "order", published, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);

  let count = 0;
  for (const project of projects) {
    insert.run(
      project.title,
      project.section,
      project.category,
      project.videoUrl,
      project.thumbnail,
      project.year,
      project.client,
      project.description,
      project.order,
      project.published
    );
    console.log(`✅ ${project.title} (${project.section} - ${project.category})`);
    count++;
  }

  console.log(`\n✅ ${count} projets ajoutés avec succès!\n`);

  // Vérification
  const total = db.prepare('SELECT COUNT(*) as count FROM Project').get();
  console.log(`Total de projets dans la base: ${total.count}\n`);

} catch (error) {
  console.error('❌ Erreur:', error.message);
  process.exit(1);
} finally {
  db.close();
}
