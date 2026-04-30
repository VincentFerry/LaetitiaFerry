'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminShowreelPage() {
  const [showreelUrl, setShowreelUrl] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchShowreel()
  }, [])

  const fetchShowreel = async () => {
    try {
      const response = await fetch('/api/showreel')
      const data = await response.json()
      const url = data.url || ''
      setShowreelUrl(url)
      setCurrentUrl(url)
    } catch (error) {
      console.error('Error fetching showreel:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/showreel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: showreelUrl })
      })

      if (response.ok) {
        setCurrentUrl(showreelUrl)
        setMessage({ type: 'success', text: 'Showreel mis à jour avec succès !' })
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' })
      }
    } catch (error) {
      console.error('Error updating showreel:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour' })
    } finally {
      setIsSaving(false)
    }
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
            <h1 className="text-3xl font-cormorant font-light mb-2">Gestion du Showreel</h1>
            <p className="text-muted text-sm">Modifier la vidéo showreel de la page d'accueil</p>
          </div>
          <Link href="/admin" className="btn-secondary">
            ← Retour
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
            <div>
              <label htmlFor="showreelUrl" className="block text-sm label-text mb-2">
                URL de la vidéo showreel (YouTube ou Vimeo) *
              </label>
              <input
                type="url"
                id="showreelUrl"
                value={showreelUrl}
                onChange={(e) => setShowreelUrl(e.target.value)}
                required
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
              <p className="text-xs text-muted mt-2">
                Formats acceptés : YouTube (youtube.com/watch?v=...) ou Vimeo (vimeo.com/...)
              </p>
            </div>

            {currentUrl && (
              <div>
                <p className="text-sm label-text mb-2">Aperçu actuel :</p>
                <div className="bg-bg border border-border rounded p-3">
                  <p className="text-sm text-muted break-all">{currentUrl}</p>
                </div>
              </div>
            )}
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
              disabled={isSaving || showreelUrl === currentUrl}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-surface border border-border rounded-lg">
          <h3 className="text-sm label-text mb-2">💡 Astuce</h3>
          <p className="text-sm text-muted">
            Pour voir les modifications, visitez la page d'accueil : 
            <a href="/" target="_blank" className="text-accent hover:underline ml-1">
              http://localhost:3000
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
