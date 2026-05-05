const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db')
const db = new Database(dbPath)

console.log('📦 Export des données depuis SQLite...\n')

// Export des projets
const projects = db.prepare('SELECT * FROM Project').all()
console.log(`✓ ${projects.length} projets exportés`)

// Export des photos
const photos = db.prepare('SELECT * FROM Photo').all()
console.log(`✓ ${photos.length} photos exportées`)

// Export des partenaires
const partners = db.prepare('SELECT * FROM Partner').all()
console.log(`✓ ${partners.length} partenaires exportés`)

// Export de la config du site
const siteConfig = db.prepare('SELECT * FROM SiteConfig').all()
console.log(`✓ ${siteConfig.length} configurations exportées`)

// Export des utilisateurs
const users = db.prepare('SELECT * FROM User').all()
console.log(`✓ ${users.length} utilisateurs exportés`)

// Créer le fichier JSON
const exportData = {
  projects,
  photos,
  partners,
  siteConfig,
  users,
  exportDate: new Date().toISOString()
}

const exportPath = path.join(__dirname, 'data-export.json')
fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2))

console.log(`\n✅ Données exportées vers: ${exportPath}`)

db.close()
