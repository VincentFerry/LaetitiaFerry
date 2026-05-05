import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Mettre à jour la bio
    await prisma.siteConfig.upsert({
      where: { key: 'about_bio' },
      update: { value: data.bio },
      create: { key: 'about_bio', value: data.bio }
    })

    // Mettre à jour l'URL du portrait
    if (data.portraitUrl) {
      await prisma.siteConfig.upsert({
        where: { key: 'about_portrait_url' },
        update: { value: data.portraitUrl },
        create: { key: 'about_portrait_url', value: data.portraitUrl }
      })
    }

    // Mettre à jour l'URL du CV
    if (data.cvUrl) {
      await prisma.siteConfig.upsert({
        where: { key: 'about_cv_url' },
        update: { value: data.cvUrl },
        create: { key: 'about_cv_url', value: data.cvUrl }
      })
    }

    // Mettre à jour les crédits (en JSON)
    await prisma.siteConfig.upsert({
      where: { key: 'about_credits' },
      update: { value: JSON.stringify(data.credits) },
      create: { key: 'about_credits', value: JSON.stringify(data.credits) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating about:', error)
    return NextResponse.json({ error: 'Failed to update about' }, { status: 500 })
  }
}
