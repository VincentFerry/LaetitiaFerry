'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Partner {
  id: number
  name: string
  logoUrl: string
  order: number
  active: boolean
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/partners')
      .then(res => res.json())
      .then(data => {
        setPartners(data.partners || [])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre de section */}
        <h1 className="text-5xl md:text-6xl font-cormorant font-light text-center mb-8 fade-in">
          Ils m'ont fait confiance
        </h1>
        <p className="text-center text-muted mb-16 fade-in" style={{ animationDelay: '100ms' }}>
          Maisons de production, chaînes et clients avec qui j'ai eu le plaisir de collaborer
        </p>

        {/* Grille de logos */}
        {partners.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted">Aucun partenaire pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="aspect-video bg-surface border border-border rounded-lg p-6 flex items-center justify-center group hover:border-accent transition-colors fade-in"
                style={{ animationDelay: `${200 + index * 50}ms` }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-20 fade-in" style={{ animationDelay: '400ms' }}>
          <p className="text-muted mb-6">Vous souhaitez collaborer avec moi ?</p>
          <a href="/contact" className="btn-primary">
            Me contacter
          </a>
        </div>
      </div>
    </div>
  )
}
