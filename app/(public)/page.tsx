'use client'

import { useEffect, useState } from 'react'
import HeroVideo from '@/components/video/HeroVideo'

export default function HomePage() {
  const [showreelUrl, setShowreelUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/showreel')
      .then(res => res.json())
      .then(data => {
        setShowreelUrl(data.url)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Showreel */}
      <section className="relative h-screen flex items-center justify-center bg-bg">
        {/* Vidéo showreel en background */}
        {showreelUrl && !isLoading ? (
          <HeroVideo url={showreelUrl} />
        ) : (
          <div className="absolute inset-0 bg-surface flex items-center justify-center">
            {isLoading ? (
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted label-text text-sm">Chargement...</p>
              </div>
            ) : (
              <p className="text-muted label-text text-sm">Aucun showreel configuré</p>
            )}
          </div>
        )}

        {/* Contenu superposé */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-cormorant font-light text-text mb-4 fade-in">
            LAETITIA FERRY
          </h1>
          <p className="text-xl md:text-2xl text-muted label-text slide-up">
            Réalisatrice / 1ère Assistante Réalisatrice
          </p>
        </div>

        {/* Flèche scroll */}
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-accent animate-bounce"
          aria-label="Défiler vers le bas"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>

      {/* Section Projets récents */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-cormorant font-light text-center mb-4">
            Projets récents
          </h2>
          <p className="text-center text-muted mb-12">
            Découvrez mes dernières réalisations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card group cursor-pointer">
                <div className="aspect-video bg-surface relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted text-sm">Projet {i}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-cormorant text-xl mb-1">Titre du projet</h3>
                  <p className="text-muted text-sm">Fiction • 2024</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/realisation" className="btn-primary inline-block">
              Voir tous les projets
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
