import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // Récupérer le contenu de la page "À propos"
    const bioConfig = await prisma.siteConfig.findUnique({
      where: { key: 'about_bio' }
    })

    const cvUrlConfig = await prisma.siteConfig.findUnique({
      where: { key: 'about_cv_url' }
    })

    const portraitUrlConfig = await prisma.siteConfig.findUnique({
      where: { key: 'about_portrait_url' }
    })

    const creditsConfig = await prisma.siteConfig.findUnique({
      where: { key: 'about_credits' }
    })

    // Parser les crédits (stockés en JSON)
    let credits = []
    if (creditsConfig?.value) {
      try {
        credits = JSON.parse(creditsConfig.value)
      } catch (e) {
        console.error('Error parsing credits:', e)
      }
    }

    return NextResponse.json({
      bio: bioConfig?.value || 'Passionnée par le cinéma depuis toujours, je mets mon expérience au service de projets ambitieux et créatifs.',
      cvUrl: cvUrlConfig?.value || null,
      portraitUrl: portraitUrlConfig?.value || null,
      credits
    })
  } catch (error) {
    console.error('Error fetching about content:', error)
    return NextResponse.json({
      bio: 'Passionnée par le cinéma depuis toujours, je mets mon expérience au service de projets ambitieux et créatifs.',
      cvUrl: null,
      portraitUrl: null,
      credits: []
    }, { status: 500 })
  }
}
