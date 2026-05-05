import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: { category?: string } = {}

    if (category) {
      where.category = category
    }

    const photos = await prisma.photo.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ photos })
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json({ photos: [], error: 'Failed to fetch photos' }, { status: 500 })
  }
}
