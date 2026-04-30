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

    const projectId = parseInt(params.id)
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
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

    const projectId = parseInt(params.id)
    const rawData = await request.json()

    // Préparer les données avec les bons types
    const data: any = {
      title: rawData.title,
      section: rawData.section,
      category: rawData.category,
      videoUrl: rawData.videoUrl,
      thumbnail: rawData.thumbnail || null,
      year: rawData.year ? parseInt(rawData.year) : null,
      client: rawData.client || null,
      description: rawData.description || null,
      order: rawData.order ? parseInt(rawData.order) : 0,
      published: rawData.published === true || rawData.published === 'true',
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data
    })

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
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

    const projectId = parseInt(params.id)

    await prisma.project.delete({
      where: { id: projectId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
