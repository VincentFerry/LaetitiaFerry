'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface AboutContent {
  bio: string
  cvUrl: string | null
  portraitUrl: string | null
  credits: Array<{
    year: string
    title: string
    role: string
  }>
}

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => {
        setContent(data)
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
      <div className="max-w-6xl mx-auto">
        {/* Titre de section */}
        <h1 className="text-5xl md:text-6xl font-cormorant font-light text-center mb-16 fade-in">
          Qui suis-je
        </h1>

        {/* Section Présentation */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Photo portrait */}
          {content?.portraitUrl && (
            <div className="relative aspect-[3/4] bg-surface overflow-hidden fade-in">
              <Image
                src={content.portraitUrl}
                alt="Laetitia Ferry"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Texte de présentation */}
          <div className="flex flex-col justify-center fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-cormorant font-light mb-6">
              Réalisatrice / 1ère Assistante Réalisatrice
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted leading-relaxed whitespace-pre-line">
                {content?.bio || 'Passionnée par le cinéma depuis toujours, je mets mon expérience au service de projets ambitieux et créatifs.'}
              </p>
            </div>

            {/* Bouton téléchargement CV */}
            {content?.cvUrl && (
              <div className="mt-8">
                <a
                  href={content.cvUrl}
                  download
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Télécharger mon CV
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Section Crédits */}
        {content?.credits && content.credits.length > 0 && (
          <div className="fade-in" style={{ animationDelay: '400ms' }}>
            <h2 className="text-3xl font-cormorant font-light mb-12 text-center">
              Crédits notables
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {content.credits.map((credit, index) => (
                <div
                  key={index}
                  className="border-l-2 border-accent pl-6 py-2 fade-in"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="flex items-baseline gap-4 mb-1">
                    <span className="text-accent font-mono text-sm">{credit.year}</span>
                    <h3 className="font-cormorant text-xl">{credit.title}</h3>
                  </div>
                  <p className="text-muted text-sm">{credit.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-20 fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-muted mb-6">Envie de collaborer ?</p>
          <Link href="/contact" className="btn-primary">
            Me contacter
          </Link>
        </div>
      </div>
    </div>
  )
}
