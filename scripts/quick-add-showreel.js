const sqlite3 = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
console.log('Database path:', dbPath);

const db = sqlite3(dbPath);

const showreelUrl = 'https://www.youtube.com/watch?v=BiZtFuuTNCI&t=14s';

try {
  // Supprimer l'ancienne entrée si elle existe
  db.prepare('DELETE FROM SiteConfig WHERE key = ?').run('showreel');
  
  // Créer la nouvelle entrée
  db.prepare('INSERT INTO SiteConfig (key, value) VALUES (?, ?)').run('showreel', showreelUrl);
  
  console.log('\n✅ Showreel ajouté avec succès!');
  console.log('URL:', showreelUrl);
  
  // Vérifier que c'est bien ajouté
  const result = db.prepare('SELECT * FROM SiteConfig WHERE key = ?').get('showreel');
  console.log('\nVérification:', result);
  
} catch (error) {
  console.error('❌ Erreur:', error.message);
  process.exit(1);
} finally {
  db.close();
}
