'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Titre de section */}
        <h1 className="text-5xl md:text-6xl font-cormorant font-light text-center mb-8 fade-in">
          Contact
        </h1>
        <p className="text-center text-muted mb-16 fade-in" style={{ animationDelay: '100ms' }}>
          Une question ? Un projet ? N'hésitez pas à me contacter.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div className="fade-in" style={{ animationDelay: '200ms' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm label-text mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm label-text mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm label-text mb-2">
                  Société
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-border rounded focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm label-text mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-surface border border-border rounded focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-900/20 border border-green-500/50 rounded text-green-400 text-sm">
                  Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-sm">
                  Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.
                </div>
              )}
            </form>
          </div>

          {/* Informations de contact */}
          <div className="fade-in" style={{ animationDelay: '300ms' }}>
            <div className="space-y-8">
              {/* Email */}
              <div>
                <h3 className="text-sm label-text mb-2">Email</h3>
                <a
                  href="mailto:contact@laetitiaferr.com"
                  className="text-accent hover:underline"
                >
                  contact@laetitiaferr.com
                </a>
              </div>

              {/* Réseaux sociaux */}
              <div>
                <h3 className="text-sm label-text mb-4">Réseaux sociaux</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/laetitiaferr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-border rounded hover:border-accent transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  <a
                    href="https://vimeo.com/laetitiaferr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-border rounded hover:border-accent transition-colors"
                    aria-label="Vimeo"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.imdb.com/name/nm0000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-border rounded hover:border-accent transition-colors"
                    aria-label="IMDb"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.3 0H1.7C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.7 1.7h20.6c.9 0 1.7-.8 1.7-1.7V1.7c0-.9-.8-1.7-1.7-1.7zM4.2 5.5h1.9v13h-1.9v-13zm4.5 0h1.9v13H8.7v-13zm4.5 0h1.9v13h-1.9v-13zm4.5 0h1.9v13h-1.9v-13z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Disponibilité */}
              <div className="p-6 bg-surface border border-border rounded">
                <h3 className="text-sm label-text mb-2">Disponibilité</h3>
                <p className="text-muted text-sm">
                  Actuellement disponible pour de nouveaux projets. N'hésitez pas à me contacter pour discuter de vos besoins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
