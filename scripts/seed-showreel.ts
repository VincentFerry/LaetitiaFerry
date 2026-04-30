import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // URL de test - Showreel cinématographique sur YouTube
  const showreelUrl = process.argv[2] || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

  const showreel = await prisma.siteConfig.upsert({
    where: { key: 'showreel_url' },
    update: { value: showreelUrl },
    create: { key: 'showreel_url', value: showreelUrl }
  })

  console.log('\n=================================')
  console.log('Showreel configuré avec succès!')
  console.log('=================================\n')
  console.log(`URL: ${showreel.value}`)
  console.log('\nVous pouvez maintenant voir le showreel sur la page d\'accueil')
  console.log('Pour changer l\'URL, relancez ce script avec une nouvelle URL:')
  console.log('npm run seed:showreel "https://www.youtube.com/watch?v=..."')
  console.log('\n=================================\n')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
