'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Credit {
  year: string
  title: string
  role: string
}

export default function AdminAboutPage() {
  const [formData, setFormData] = useState({
    bio: '',
    portraitUrl: '',
    cvUrl: '',
    credits: [] as Credit[]
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      const response = await fetch('/api/about')
      const data = await response.json()
      setFormData({
        bio: data.bio || '',
        portraitUrl: data.portraitUrl || '',
        cvUrl: data.cvUrl || '',
        credits: data.credits || []
      })
    } catch (error) {
      console.error('Error fetching about:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Contenu mis à jour avec succès !' })
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' })
      }
    } catch (error) {
      console.error('Error updating about:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' })
    } finally {
      setIsSaving(false)
    }
  }

  const addCredit = () => {
    setFormData(prev => ({
      ...prev,
      credits: [...prev.credits, { year: '', title: '', role: '' }]
    }))
  }

  const removeCredit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      credits: prev.credits.filter((_, i) => i !== index)
    }))
  }

  const updateCredit = (index: number, field: keyof Credit, value: string) => {
    setFormData(prev => ({
      ...prev,
      credits: prev.credits.map((credit, i) => 
        i === index ? { ...credit, [field]: value } : credit
      )
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-cormorant font-light mb-2">Gestion &quot;Qui suis-je&quot;</h1>
            <p className="text-muted text-sm">Modifier le contenu de la page À propos</p>
          </div>
          <Link href="/admin" className="btn-secondary">
            ← Retour
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm label-text mb-2">
                Biographie *
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                required
                rows={8}
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Votre présentation..."
              />
            </div>

            {/* Portrait URL */}
            <div>
              <label htmlFor="portraitUrl" className="block text-sm label-text mb-2">
                URL de la photo portrait
              </label>
              <input
                type="url"
                id="portraitUrl"
                value={formData.portraitUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, portraitUrl: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* CV URL */}
            <div>
              <label htmlFor="cvUrl" className="block text-sm label-text mb-2">
                URL du CV (PDF)
              </label>
              <input
                type="url"
                id="cvUrl"
                value={formData.cvUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, cvUrl: e.target.value }))}
                placeholder="https://... ou /uploads/cv.pdf"
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Crédits */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-cormorant">Crédits notables</h3>
              <button
                type="button"
                onClick={addCredit}
                className="px-3 py-1 bg-accent text-bg rounded text-sm hover:bg-accent/80 transition-colors"
              >
                + Ajouter un crédit
              </button>
            </div>

            <div className="space-y-4">
              {formData.credits.map((credit, index) => (
                <div key={index} className="bg-bg border border-border rounded p-4">
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <input
                      type="text"
                      value={credit.year}
                      onChange={(e) => updateCredit(index, 'year', e.target.value)}
                      placeholder="Année"
                      className="px-3 py-2 bg-surface border border-border rounded focus:outline-none focus:border-accent text-sm"
                    />
                    <input
                      type="text"
                      value={credit.title}
                      onChange={(e) => updateCredit(index, 'title', e.target.value)}
                      placeholder="Titre du projet"
                      className="col-span-2 px-3 py-2 bg-surface border border-border rounded focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={credit.role}
                      onChange={(e) => updateCredit(index, 'role', e.target.value)}
                      placeholder="Rôle"
                      className="flex-1 px-3 py-2 bg-surface border border-border rounded focus:outline-none focus:border-accent text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeCredit(index)}
                      className="px-3 py-2 bg-red-900/20 border border-red-500/50 rounded text-sm text-red-400 hover:bg-red-900/30"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}

              {formData.credits.length === 0 && (
                <p className="text-center text-muted py-4">Aucun crédit ajouté</p>
              )}
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded border ${
              message.type === 'success' 
                ? 'bg-green-900/20 border-green-500/50 text-green-400'
                : 'bg-red-900/20 border-red-500/50 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Link href="/admin" className="btn-secondary">
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
