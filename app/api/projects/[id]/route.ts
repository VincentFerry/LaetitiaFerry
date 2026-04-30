import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id)

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Récupérer le projet précédent et suivant dans la même section/catégorie
    const prevProject = await prisma.project.findFirst({
      where: {
        section: project.section,
        category: project.category,
        published: true,
        id: { lt: projectId }
      },
      orderBy: { id: 'desc' }
    })

    const nextProject = await prisma.project.findFirst({
      where: {
        section: project.section,
        category: project.category,
        published: true,
        id: { gt: projectId }
      },
      orderBy: { id: 'asc' }
    })

    return NextResponse.json({
      project,
      prevProject: prevProject ? { id: prevProject.id, title: prevProject.title } : null,
      nextProject: nextProject ? { id: nextProject.id, title: nextProject.title } : null
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}
