'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface PhotoForm {
  filename: string
  url: string
  category: string
  order: string
}

export default function EditPhotoPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'nouvelle'
  
  const [formData, setFormData] = useState<PhotoForm>({
    filename: '',
    url: '',
    category: 'Couleur',
    order: '0'
  })
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      fetchPhoto()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const fetchPhoto = async () => {
    try {
      const response = await fetch(`/api/admin/photos/${params.id}`)
      const data = await response.json()
      
      if (data.photo) {
        setFormData({
          filename: data.photo.filename,
          url: data.photo.url,
          category: data.photo.category,
          order: data.photo.order?.toString() || '0'
        })
      }
    } catch (error) {
      console.error('Error fetching photo:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = isNew 
        ? '/api/admin/photos'
        : `/api/admin/photos/${params.id}`
      
      const method = isNew ? 'POST' : 'PATCH'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/photos')
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Error saving photo:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-cormorant font-light mb-2">
              {isNew ? 'Nouvelle photo' : 'Modifier la photo'}
            </h1>
            <p className="text-muted text-sm">
              {isNew ? 'Ajouter une nouvelle photo argentique' : 'Modifier les informations de la photo'}
            </p>
          </div>
          <Link href="/admin/photos" className="btn-secondary">
            ← Retour
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
            <div>
              <label htmlFor="filename" className="block text-sm label-text mb-2">
                Nom du fichier *
              </label>
              <input
                type="text"
                id="filename"
                name="filename"
                value={formData.filename}
                onChange={handleChange}
                required
                placeholder="portrait-couleur-1.jpg"
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm label-text mb-2">
                URL de l'image *
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
              <p className="text-xs text-muted mt-1">URL Unsplash ou chemin local (/uploads/photos/...)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                  <option value="Couleur">Couleur</option>
                  <option value="N&B">N&B</option>
                </select>
              </div>

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
              </div>
            </div>

            {formData.url && (
              <div>
                <p className="text-sm label-text mb-2">Aperçu :</p>
                <div className="relative w-full aspect-square max-w-md bg-bg border border-border rounded overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.url}
                    alt={formData.filename}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23111" width="400" height="400"/%3E%3Ctext fill="%23888" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage non disponible%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/photos" className="btn-secondary">
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
