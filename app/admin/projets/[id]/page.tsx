'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface ProjectForm {
  title: string
  section: string
  category: string
  videoUrl: string
  thumbnail: string
  year: string
  client: string
  description: string
  order: string
  published: boolean
}

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'nouveau'
  
  const [formData, setFormData] = useState<ProjectForm>({
    title: '',
    section: 'realisation',
    category: 'Fiction',
    videoUrl: '',
    thumbnail: '',
    year: '',
    client: '',
    description: '',
    order: '0',
    published: false
  })
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      fetchProject()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${params.id}`)
      const data = await response.json()
      
      if (data.project) {
        setFormData({
          title: data.project.title,
          section: data.project.section,
          category: data.project.category,
          videoUrl: data.project.videoUrl,
          thumbnail: data.project.thumbnail || '',
          year: data.project.year?.toString() || '',
          client: data.project.client || '',
          description: data.project.description || '',
          order: data.project.order?.toString() || '0',
          published: data.project.published
        })
      }
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = isNew 
        ? '/api/admin/projects'
        : `/api/admin/projects/${params.id}`
      
      const method = isNew ? 'POST' : 'PATCH'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/projets')
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-cormorant font-light mb-2">
              {isNew ? 'Nouveau projet' : 'Modifier le projet'}
            </h1>
            <p className="text-muted text-sm">
              {isNew ? 'Créer un nouveau projet vidéo' : 'Modifier les informations du projet'}
            </p>
          </div>
          <Link href="/admin/projets" className="btn-secondary">
            ← Retour
          </Link>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
            {/* Titre */}
            <div>
              <label htmlFor="title" className="block text-sm label-text mb-2">
                Titre *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Section et Catégorie */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="section" className="block text-sm label-text mb-2">
                  Section *
                </label>
                <select
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="realisation">Réalisation</option>
                  <option value="assistante">1ère Assistante</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm label-text mb-2">
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Pub">Pub</option>
                  <option value="Backstage">Backstage</option>
                </select>
              </div>
            </div>

            {/* URL vidéo */}
            <div>
              <label htmlFor="videoUrl" className="block text-sm label-text mb-2">
                URL vidéo (YouTube ou Vimeo) *
              </label>
              <input
                type="url"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                required
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm label-text mb-2">
                URL de la miniature (optionnel)
              </label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
              <p className="text-xs text-muted mt-1">URL YouTube (youtube.com/watch?v=...) ou Vimeo (vimeo.com/...)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="year" className="block text-sm label-text mb-2">
                  Année
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1900"
                  max="2100"
                  className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="client" className="block text-sm label-text mb-2">
                  Client / Producteur
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm label-text mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {/* Ordre et Publié */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="order" className="block text-sm label-text mb-2">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
                />
                <p className="text-xs text-muted mt-1">Plus le nombre est petit, plus le projet apparaît en premier</p>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-border bg-bg checked:bg-accent"
                  />
                  <span className="text-sm">Publier ce projet</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href="/admin/projets" className="btn-secondary">
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
