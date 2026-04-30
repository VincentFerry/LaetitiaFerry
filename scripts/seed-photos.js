const sqlite3 = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'dev.db');
console.log('Database path:', dbPath);

const db = sqlite3(dbPath);

// URLs d'images de placeholder (Unsplash)
const photos = [
  // Photos Couleur
  {
    filename: 'portrait-couleur-1.jpg',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop',
    category: 'Couleur',
    order: 1
  },
  {
    filename: 'paysage-couleur-1.jpg',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
    category: 'Couleur',
    order: 2
  },
  {
    filename: 'urbain-couleur-1.jpg',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop',
    category: 'Couleur',
    order: 3
  },
  {
    filename: 'nature-couleur-1.jpg',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop',
    category: 'Couleur',
    order: 4
  },
  {
    filename: 'portrait-couleur-2.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
    category: 'Couleur',
    order: 5
  },
  {
    filename: 'architecture-couleur-1.jpg',
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=800&fit=crop',
    category: 'Couleur',
    order: 6
  },
  
  // Photos N&B
  {
    filename: 'portrait-nb-1.jpg',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop&sat=-100',
    category: 'N&B',
    order: 1
  },
  {
    filename: 'urbain-nb-1.jpg',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=800&fit=crop&sat=-100',
    category: 'N&B',
    order: 2
  },
  {
    filename: 'architecture-nb-1.jpg',
    url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=800&fit=crop&sat=-100',
    category: 'N&B',
    order: 3
  },
  {
    filename: 'portrait-nb-2.jpg',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&sat=-100',
    category: 'N&B',
    order: 4
  },
  {
    filename: 'nature-nb-1.jpg',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&sat=-100',
    category: 'N&B',
    order: 5
  },
  {
    filename: 'urbain-nb-2.jpg',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=800&fit=crop&sat=-100',
    category: 'N&B',
    order: 6
  }
];

try {
  console.log('\n📸 Ajout des photos de test...\n');

  const insert = db.prepare(`
    INSERT INTO Photo (filename, url, category, "order", createdAt)
    VALUES (?, ?, ?, ?, datetime('now'))
  `);

  let count = 0;
  for (const photo of photos) {
    insert.run(
      photo.filename,
      photo.url,
      photo.category,
      photo.order
    );
    console.log(`✅ ${photo.filename} (${photo.category})`);
    count++;
  }

  console.log(`\n✅ ${count} photos ajoutées avec succès!\n`);

  // Vérification
  const total = db.prepare('SELECT COUNT(*) as count FROM Photo').get();
  console.log(`Total de photos dans la base: ${total.count}\n`);

} catch (error) {
  console.error('❌ Erreur:', error.message);
  process.exit(1);
} finally {
  db.close();
}
