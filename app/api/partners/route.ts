import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: {
        active: true
      },
      orderBy: [
        { order: 'asc' }
      ]
    })

    return NextResponse.json({ partners })
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ partners: [], error: 'Failed to fetch partners' }, { status: 500 })
  }
}
