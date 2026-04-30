'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import VideoPlayer from '@/components/video/VideoPlayer'

interface Project {
  id: number
  title: string
  section: string
  category: string
  videoUrl: string
  thumbnail: string | null
  year: number | null
  client: string | null
  description: string | null
}

interface NavigationProject {
  id: number
  title: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [prevProject, setPrevProject] = useState<NavigationProject | null>(null)
  const [nextProject, setNextProject] = useState<NavigationProject | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/projects/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setProject(data.project)
          setPrevProject(data.prevProject)
          setNextProject(data.nextProject)
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
          router.push('/assistante')
        })
    }
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Bouton retour */}
        <Link
          href="/assistante"
          className="inline-flex items-center text-muted hover:text-accent transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à 1ère Assistante
        </Link>

        {/* Titre et infos */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-cormorant font-light mb-4 fade-in">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-muted">
            {project.category && (
              <span className="label-text text-xs">{project.category}</span>
            )}
            {project.year && (
              <span className="label-text text-xs">{project.year}</span>
            )}
            {project.client && (
              <span className="text-accent">{project.client}</span>
            )}
          </div>
        </div>

        {/* Lecteur vidéo */}
        <div className="mb-8">
          <VideoPlayer
            url={project.videoUrl}
            autoplay={false}
            controls={true}
            poster={project.thumbnail || undefined}
          />
        </div>

        {/* Description */}
        {project.description && (
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-muted">{project.description}</p>
          </div>
        )}

        {/* Navigation projet précédent/suivant */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          {prevProject ? (
            <Link
              href={`/assistante/${prevProject.id}`}
              className="flex items-center text-muted hover:text-accent transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <p className="text-xs label-text mb-1">Précédent</p>
                <p className="font-cormorant">{prevProject.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/assistante/${nextProject.id}`}
              className="flex items-center text-muted hover:text-accent transition-colors text-right"
            >
              <div>
                <p className="text-xs label-text mb-1">Suivant</p>
                <p className="font-cormorant">{nextProject.title}</p>
              </div>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
