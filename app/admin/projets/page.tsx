'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  section: string
  category: string
  videoUrl: string
  year: number | null
  client: string | null
  published: boolean
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'realisation' | 'assistante'>('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProject = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id))
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const togglePublished = async (id: number, published: boolean) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published }),
      })

      if (response.ok) {
        setProjects(projects.map(p => 
          p.id === id ? { ...p, published: !published } : p
        ))
      }
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.section === filter)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-cormorant font-light mb-2">Gestion des projets</h1>
            <p className="text-muted text-sm">Gérer les projets Réalisation et Assistante</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="btn-secondary">
              ← Retour
            </Link>
            <Link href="/admin/projets/nouveau" className="btn-primary">
              + Nouveau projet
            </Link>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'all' ? 'bg-accent text-bg' : 'bg-surface text-muted hover:text-text'
            }`}
          >
            Tous ({projects.length})
          </button>
          <button
            onClick={() => setFilter('realisation')}
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'realisation' ? 'bg-accent text-bg' : 'bg-surface text-muted hover:text-text'
            }`}
          >
            Réalisation ({projects.filter(p => p.section === 'realisation').length})
          </button>
          <button
            onClick={() => setFilter('assistante')}
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'assistante' ? 'bg-accent text-bg' : 'bg-surface text-muted hover:text-text'
            }`}
          >
            Assistante ({projects.filter(p => p.section === 'assistante').length})
          </button>
        </div>

        {/* Liste des projets */}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm label-text">Titre</th>
                <th className="text-left p-4 text-sm label-text">Section</th>
                <th className="text-left p-4 text-sm label-text">Catégorie</th>
                <th className="text-left p-4 text-sm label-text">Année</th>
                <th className="text-left p-4 text-sm label-text">Statut</th>
                <th className="text-right p-4 text-sm label-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted">
                    Aucun projet trouvé
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-border hover:bg-bg/50">
                    <td className="p-4">
                      <div className="font-medium">{project.title}</div>
                      {project.client && (
                        <div className="text-sm text-muted">{project.client}</div>
                      )}
                    </td>
                    <td className="p-4 text-sm capitalize">{project.section}</td>
                    <td className="p-4 text-sm">{project.category}</td>
                    <td className="p-4 text-sm">{project.year || '-'}</td>
                    <td className="p-4">
                      <button
                        onClick={() => togglePublished(project.id, project.published)}
                        className={`px-3 py-1 rounded text-xs ${
                          project.published
                            ? 'bg-green-900/20 text-green-400'
                            : 'bg-red-900/20 text-red-400'
                        }`}
                      >
                        {project.published ? 'Publié' : 'Brouillon'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/projets/${project.id}`}
                          className="px-3 py-1 bg-surface border border-border rounded text-sm hover:border-accent transition-colors"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="px-3 py-1 bg-red-900/20 border border-red-500/50 rounded text-sm text-red-400 hover:bg-red-900/30 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
