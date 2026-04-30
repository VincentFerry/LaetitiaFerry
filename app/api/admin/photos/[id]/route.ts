import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const photoId = parseInt(params.id)
    const photo = await prisma.photo.findUnique({
      where: { id: photoId }
    })

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
    }

    return NextResponse.json({ photo })
  } catch (error) {
    console.error('Error fetching photo:', error)
    return NextResponse.json({ error: 'Failed to fetch photo' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const photoId = parseInt(params.id)
    const rawData = await request.json()

    const photo = await prisma.photo.update({
      where: { id: photoId },
      data: {
        filename: rawData.filename,
        url: rawData.url,
        category: rawData.category,
        order: rawData.order ? parseInt(rawData.order) : 0,
      }
    })

    return NextResponse.json({ photo })
  } catch (error) {
    console.error('Error updating photo:', error)
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const photoId = parseInt(params.id)

    await prisma.photo.delete({
      where: { id: photoId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
  }
}
