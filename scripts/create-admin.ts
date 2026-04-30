import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@laetitiaferr.com'
  const password = process.argv[2] || 'admin123'

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    console.log(`User with email ${email} already exists`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash
    }
  })

  console.log(`Admin user created successfully!`)
  console.log(`Email: ${user.email}`)
  console.log(`Password: ${password}`)
  console.log(`\nYou can now login at /admin/login`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
