import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')
    const category = searchParams.get('category')

    const where: any = {
      published: true
    }

    if (section) {
      where.section = section
    }

    if (category) {
      where.category = category
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ projects: [], error: 'Failed to fetch projects' }, { status: 500 })
  }
}
