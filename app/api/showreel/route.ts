import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('=== DEBUG SHOWREEL API ===')
    console.log('DATABASE_URL:', process.env.DATABASE_URL)
    console.log('Current directory:', process.cwd())
    
    // Tester la connexion
    const allConfigs = await prisma.siteConfig.findMany()
    console.log('All SiteConfig entries:', allConfigs)
    
    const showreelConfig = await prisma.siteConfig.findUnique({
      where: { key: 'showreel' }
    })
    
    console.log('Showreel config found:', showreelConfig)
    console.log('=== END DEBUG ===')

    if (!showreelConfig) {
      return NextResponse.json({ url: null, debug: { allConfigs } })
    }

    return NextResponse.json({ url: showreelConfig.value })
  } catch (error) {
    console.error('Error fetching showreel:', error)
    return NextResponse.json({ 
      url: null, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    const showreelConfig = await prisma.siteConfig.upsert({
      where: { key: 'showreel' },
      update: { value: url },
      create: { key: 'showreel', value: url }
    })

    return NextResponse.json(showreelConfig)
  } catch (error) {
    console.error('Error updating showreel:', error)
    return NextResponse.json({ error: 'Failed to update showreel' }, { status: 500 })
  }
}
