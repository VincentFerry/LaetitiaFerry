'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  category: string
  videoUrl: string
  thumbnail: string | null
  year: number | null
  client: string | null
}

const categories = ['Fiction', 'Pub', 'Backstage']

export default function AssistantePage() {
  const [activeCategory, setActiveCategory] = useState('Fiction')
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/projects?section=assistante&category=${activeCategory}`)
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || [])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [activeCategory])

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre de section */}
        <h1 className="text-5xl md:text-6xl font-cormorant font-light text-center mb-12 fade-in">
          1ère Assistante Réalisatrice
        </h1>

        {/* Sous-navigation catégories */}
        <div className="flex justify-center gap-8 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`label-text text-sm transition-colors relative ${
                activeCategory === cat ? 'text-accent' : 'text-muted hover:text-text'
              }`}
            >
              {cat.toUpperCase()}
              {activeCategory === cat && (
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted">Aucun projet dans cette catégorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/assistante/${project.id}`}
                className="card group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-surface relative overflow-hidden">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted text-sm">Pas de miniature</p>
                    </div>
                  )}
                  
                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="font-cormorant text-2xl mb-1">{project.title}</h3>
                      {project.year && (
                        <p className="text-muted text-sm">{project.year}</p>
                      )}
                      {project.client && (
                        <p className="text-accent text-sm">{project.client}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
