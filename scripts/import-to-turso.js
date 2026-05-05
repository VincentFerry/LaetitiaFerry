const { createClient } = require('@libsql/client')
const fs = require('fs')
const path = require('path')

async function importData() {
  // Vérifier les variables d'environnement
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN

  if (!tursoUrl || !tursoToken) {
    console.error('❌ Variables d\'environnement manquantes:')
    console.error('   TURSO_DATABASE_URL et TURSO_AUTH_TOKEN doivent être définies')
    process.exit(1)
  }

  console.log('🚀 Connexion à Turso...\n')

  const client = createClient({
    url: tursoUrl,
    authToken: tursoToken,
  })

  // Lire le fichier d'export
  const exportPath = path.join(__dirname, 'data-export.json')
  if (!fs.existsSync(exportPath)) {
    console.error('❌ Fichier data-export.json introuvable')
    console.error('   Exécutez d\'abord: npm run export:data')
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(exportPath, 'utf8'))
  console.log(`📦 Import des données (exportées le ${new Date(data.exportDate).toLocaleString()})\n`)

  try {
    // Import des projets
    for (const project of data.projects) {
      await client.execute({
        sql: `INSERT INTO Project (id, title, section, category, videoUrl, thumbnail, year, client, description, "order", published, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          project.id,
          project.title,
          project.section,
          project.category,
          project.videoUrl,
          project.thumbnail,
          project.year,
          project.client,
          project.description,
          project.order,
          project.published ? 1 : 0,
          project.createdAt,
          project.updatedAt
        ]
      })
    }
    console.log(`✓ ${data.projects.length} projets importés`)

    // Import des photos
    for (const photo of data.photos) {
      await client.execute({
        sql: `INSERT INTO Photo (id, filename, url, category, "order", createdAt)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [photo.id, photo.filename, photo.url, photo.category, photo.order, photo.createdAt]
      })
    }
    console.log(`✓ ${data.photos.length} photos importées`)

    // Import des partenaires
    for (const partner of data.partners) {
      await client.execute({
        sql: `INSERT INTO Partner (id, name, logoUrl, "order", active)
              VALUES (?, ?, ?, ?, ?)`,
        args: [partner.id, partner.name, partner.logoUrl, partner.order, partner.active ? 1 : 0]
      })
    }
    console.log(`✓ ${data.partners.length} partenaires importés`)

    // Import de la config du site
    for (const config of data.siteConfig) {
      await client.execute({
        sql: `INSERT INTO SiteConfig (key, value) VALUES (?, ?)`,
        args: [config.key, config.value]
      })
    }
    console.log(`✓ ${data.siteConfig.length} configurations importées`)

    // Import des utilisateurs
    for (const user of data.users) {
      await client.execute({
        sql: `INSERT INTO User (id, email, passwordHash, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?)`,
        args: [user.id, user.email, user.passwordHash, user.createdAt, user.updatedAt]
      })
    }
    console.log(`✓ ${data.users.length} utilisateurs importés`)

    console.log('\n✅ Import terminé avec succès!')
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'import:', error.message)
    process.exit(1)
  }
}

importData()
