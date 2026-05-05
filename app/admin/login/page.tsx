'use client'

import { signIn } from 'next-auth/react'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Email ou mot de passe incorrect')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-4xl font-light text-[#f0ece4] text-center mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            LAETITIA FERRY
          </h1>
          <p className="text-[#888888] text-center text-sm uppercase tracking-wider" style={{ fontFamily: 'Space Mono, monospace' }}>
            Administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-[#f0ece4] mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] text-[#f0ece4] rounded focus:outline-none focus:border-[#c8a96e] transition-colors"
                placeholder="admin@laetitiaferr.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-[#f0ece4] mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#111111] border border-[#2a2a2a] text-[#f0ece4] rounded focus:outline-none focus:border-[#c8a96e] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-900/50 rounded px-4 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#c8a96e] text-[#080808] font-medium rounded hover:bg-[#d4b57e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
