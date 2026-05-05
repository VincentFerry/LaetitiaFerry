'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface PartnerForm {
  name: string
  logoUrl: string
  order: string
  active: boolean
}

export default function EditPartnerPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'nouveau'
  
  const [formData, setFormData] = useState<PartnerForm>({
    name: '',
    logoUrl: '',
    order: '0',
    active: true
  })
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      fetchPartner()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const fetchPartner = async () => {
    try {
      const response = await fetch(`/api/admin/partners/${params.id}`)
      const data = await response.json()
      
      if (data.partner) {
        setFormData({
          name: data.partner.name,
          logoUrl: data.partner.logoUrl,
          order: data.partner.order?.toString() || '0',
          active: data.partner.active
        })
      }
    } catch (error) {
      console.error('Error fetching partner:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = isNew 
        ? '/api/admin/partners'
        : `/api/admin/partners/${params.id}`
      
      const method = isNew ? 'POST' : 'PATCH'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/partenaires')
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Error saving partner:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
            <h1 className="text-3xl font-cormorant font-light mb-2">
              {isNew ? 'Nouveau partenaire' : 'Modifier le partenaire'}
            </h1>
            <p className="text-muted text-sm">
              {isNew ? 'Ajouter un nouveau logo partenaire' : 'Modifier les informations du partenaire'}
            </p>
          </div>
          <Link href="/admin/partenaires" className="btn-secondary">
            ← Retour
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm label-text mb-2">
                Nom du partenaire *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Canal+"
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="logoUrl" className="block text-sm label-text mb-2">
                URL du logo *
              </label>
              <input
                type="url"
                id="logoUrl"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                required
                placeholder="https://upload.wikimedia.org/... ou /uploads/logos/..."
                className="w-full px-4 py-3 bg-bg border border-border rounded focus:outline-none focus:border-accent transition-colors"
              />
              <p className="text-xs text-muted mt-1">Format recommandé : SVG ou PNG avec fond transparent</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="order" className="block text-sm label-text mb-2">
                  Ordre d&apos;affichage
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

              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-border bg-bg checked:bg-accent"
                  />
                  <span className="text-sm">Partenaire actif</span>
                </label>
              </div>
            </div>

            {formData.logoUrl && (
              <div>
                <p className="text-sm label-text mb-2">Aperçu du logo :</p>
                <div className="relative w-full aspect-video max-w-md bg-bg border border-border rounded p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.logoUrl}
                    alt={formData.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23111" width="400" height="200"/%3E%3Ctext fill="%23888" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ELogo non disponible%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/partenaires" className="btn-secondary">
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
