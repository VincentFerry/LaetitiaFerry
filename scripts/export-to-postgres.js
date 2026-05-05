const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db')
const db = new Database(dbPath)

console.log('📦 Export des données SQLite vers SQL PostgreSQL...\n')

// Fonction pour échapper les chaînes SQL
function escapeSql(value) {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'number') return value
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  return `'${String(value).replace(/'/g, "''")}'`
}

let sql = '-- Export depuis SQLite vers PostgreSQL\n\n'

// Export des projets
const projects = db.prepare('SELECT * FROM Project').all()
if (projects.length > 0) {
  sql += '-- Projets\n'
  projects.forEach(p => {
    sql += `INSERT INTO "Project" (id, title, section, category, "videoUrl", thumbnail, year, client, description, "order", published, "createdAt", "updatedAt") VALUES (${p.id}, ${escapeSql(p.title)}, ${escapeSql(p.section)}, ${escapeSql(p.category)}, ${escapeSql(p.videoUrl)}, ${escapeSql(p.thumbnail)}, ${escapeSql(p.year)}, ${escapeSql(p.client)}, ${escapeSql(p.description)}, ${p.order}, ${p.published ? 'true' : 'false'}, ${escapeSql(p.createdAt)}, ${escapeSql(p.updatedAt)});\n`
  })
  sql += `SELECT setval('"Project_id_seq"', (SELECT MAX(id) FROM "Project"));\n\n`
  console.log(`✓ ${projects.length} projets exportés`)
}

// Export des photos
const photos = db.prepare('SELECT * FROM Photo').all()
if (photos.length > 0) {
  sql += '-- Photos\n'
  photos.forEach(p => {
    sql += `INSERT INTO "Photo" (id, filename, url, category, "order", "createdAt") VALUES (${p.id}, ${escapeSql(p.filename)}, ${escapeSql(p.url)}, ${escapeSql(p.category)}, ${p.order}, ${escapeSql(p.createdAt)});\n`
  })
  sql += `SELECT setval('"Photo_id_seq"', (SELECT MAX(id) FROM "Photo"));\n\n`
  console.log(`✓ ${photos.length} photos exportées`)
}

// Export des partenaires
const partners = db.prepare('SELECT * FROM Partner').all()
if (partners.length > 0) {
  sql += '-- Partenaires\n'
  partners.forEach(p => {
    sql += `INSERT INTO "Partner" (id, name, "logoUrl", "order", active) VALUES (${p.id}, ${escapeSql(p.name)}, ${escapeSql(p.logoUrl)}, ${p.order}, ${p.active ? 'true' : 'false'});\n`
  })
  sql += `SELECT setval('"Partner_id_seq"', (SELECT MAX(id) FROM "Partner"));\n\n`
  console.log(`✓ ${partners.length} partenaires exportés`)
}

// Export de la config du site
const siteConfig = db.prepare('SELECT * FROM SiteConfig').all()
if (siteConfig.length > 0) {
  sql += '-- Configuration du site\n'
  siteConfig.forEach(c => {
    sql += `INSERT INTO "SiteConfig" (key, value) VALUES (${escapeSql(c.key)}, ${escapeSql(c.value)});\n`
  })
  sql += '\n'
  console.log(`✓ ${siteConfig.length} configurations exportées`)
}

// Export des utilisateurs
const users = db.prepare('SELECT * FROM User').all()
if (users.length > 0) {
  sql += '-- Utilisateurs\n'
  users.forEach(u => {
    sql += `INSERT INTO "User" (id, email, "passwordHash", "createdAt", "updatedAt") VALUES (${escapeSql(u.id)}, ${escapeSql(u.email)}, ${escapeSql(u.passwordHash)}, ${escapeSql(u.createdAt)}, ${escapeSql(u.updatedAt)});\n`
  })
  sql += '\n'
  console.log(`✓ ${users.length} utilisateurs exportés`)
}

// Sauvegarder le fichier SQL
const exportPath = path.join(__dirname, 'data-export.sql')
fs.writeFileSync(exportPath, sql)

console.log(`\n✅ Données exportées vers: ${exportPath}`)
console.log('\nPour importer dans PostgreSQL:')
console.log('  psql $DATABASE_URL -f scripts/data-export.sql')

db.close()
