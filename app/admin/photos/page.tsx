'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Photo {
  id: number
  filename: string
  url: string
  category: string
  order: number
}

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'Couleur' | 'N&B'>('all')

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/admin/photos')
      const data = await response.json()
      setPhotos(data.photos || [])
    } catch (error) {
      console.error('Error fetching photos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deletePhoto = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) return

    try {
      const response = await fetch(`/api/admin/photos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPhotos(photos.filter(p => p.id !== id))
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting photo:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(p => p.category === filter)

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-cormorant font-light mb-2">Gestion des photos</h1>
            <p className="text-muted text-sm">Gérer les photos argentiques</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="btn-secondary">← Retour</Link>
            <Link href="/admin/photos/nouvelle" className="btn-primary">+ Nouvelle photo</Link>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'all' ? 'bg-accent text-bg' : 'bg-surface text-muted hover:text-text'
            }`}
          >
            Toutes ({photos.length})
          </button>
          <button
            onClick={() => setFilter('Couleur')}
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'Couleur' ? 'bg-accent text-bg' : 'bg-surface text-muted hover:text-text'
            }`}
          >
            Couleur ({photos.filter(p => p.category === 'Couleur').length})
          </button>
          <button
            onClick={() => setFilter('N&B')}
            className={`px-4 py-2 rounded transition-colors ${
              filter === 'N&B' ? 'bg-accent text-bg' : 'bg-surface text-muted hover:text-text'
            }`}
          >
            N&B ({photos.filter(p => p.category === 'N&B').length})
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square bg-surface border border-border rounded overflow-hidden">
              <Image
                src={photo.url}
                alt={photo.filename}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <p className="text-xs text-center truncate w-full">{photo.filename}</p>
                <p className="text-xs text-muted">{photo.category}</p>
                <div className="flex gap-2 mt-2">
                  <Link
                    href={`/admin/photos/${photo.id}`}
                    className="px-2 py-1 bg-surface rounded text-xs hover:bg-accent hover:text-bg transition-colors"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="px-2 py-1 bg-red-900/50 rounded text-xs hover:bg-red-900 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 text-muted">
            Aucune photo trouvée
          </div>
        )}
      </div>
    </div>
  )
}
