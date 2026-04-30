import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const photos = await prisma.photo.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ photos })
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const photo = await prisma.photo.create({
      data: {
        filename: data.filename,
        url: data.url,
        category: data.category,
        order: data.order || 0,
      }
    })

    return NextResponse.json({ photo })
  } catch (error) {
    console.error('Error creating photo:', error)
    return NextResponse.json({ error: 'Failed to create photo' }, { status: 500 })
  }
}
