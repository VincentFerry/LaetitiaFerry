'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Partner {
  id: number
  name: string
  logoUrl: string
  order: number
  active: boolean
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/admin/partners')
      const data = await response.json()
      setPartners(data.partners || [])
    } catch (error) {
      console.error('Error fetching partners:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deletePartner = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return

    try {
      const response = await fetch(`/api/admin/partners/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPartners(partners.filter(p => p.id !== id))
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting partner:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const toggleActive = async (id: number, active: boolean) => {
    try {
      const response = await fetch(`/api/admin/partners/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      })

      if (response.ok) {
        setPartners(partners.map(p => 
          p.id === id ? { ...p, active: !active } : p
        ))
      }
    } catch (error) {
      console.error('Error updating partner:', error)
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-cormorant font-light mb-2">Gestion des partenaires</h1>
            <p className="text-muted text-sm">Gérer les logos partenaires</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="btn-secondary">← Retour</Link>
            <Link href="/admin/partenaires/nouveau" className="btn-primary">+ Nouveau partenaire</Link>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm label-text">Logo</th>
                <th className="text-left p-4 text-sm label-text">Nom</th>
                <th className="text-left p-4 text-sm label-text">Ordre</th>
                <th className="text-left p-4 text-sm label-text">Statut</th>
                <th className="text-right p-4 text-sm label-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted">
                    Aucun partenaire trouvé
                  </td>
                </tr>
              ) : (
                partners.map((partner) => (
                  <tr key={partner.id} className="border-b border-border hover:bg-bg/50">
                    <td className="p-4">
                      <div className="relative w-20 h-12 bg-bg rounded">
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          fill
                          className="object-contain p-2"
                          sizes="80px"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-medium">{partner.name}</td>
                    <td className="p-4 text-sm">{partner.order}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(partner.id, partner.active)}
                        className={`px-3 py-1 rounded text-xs ${
                          partner.active
                            ? 'bg-green-900/20 text-green-400'
                            : 'bg-red-900/20 text-red-400'
                        }`}
                      >
                        {partner.active ? 'Actif' : 'Inactif'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/partenaires/${partner.id}`}
                          className="px-3 py-1 bg-surface border border-border rounded text-sm hover:border-accent transition-colors"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => deletePartner(partner.id)}
                          className="px-3 py-1 bg-red-900/20 border border-red-500/50 rounded text-sm text-red-400 hover:bg-red-900/30 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
