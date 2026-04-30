'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/gallery/Lightbox'

interface Photo {
  id: number
  filename: string
  url: string
  category: string
  order: number
}

const categories = ['Couleur', 'N&B']

export default function PhotosPage() {
  const [activeCategory, setActiveCategory] = useState('Couleur')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    fetch(`/api/photos?category=${activeCategory}`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data.photos || [])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [activeCategory])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre de section */}
        <h1 className="text-5xl md:text-6xl font-cormorant font-light text-center mb-12 fade-in">
          Photos Argentiques
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

        {/* Galerie de photos */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted">Aucune photo dans cette catégorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="aspect-square bg-surface relative overflow-hidden group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Image
                  src={photo.url}
                  alt={photo.filename}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && photos.length > 0 && (
        <Lightbox
          images={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
