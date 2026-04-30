import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece4]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-light mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Dashboard Administration
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Projets Réalisation</h2>
            <p className="text-[#888888] text-sm mb-4">Gérer les projets de réalisation</p>
            <a href="/admin/projets?section=realisation" className="text-[#c8a96e] hover:underline">
              Accéder →
            </a>
          </div>

          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Projets 1ère Assistante</h2>
            <p className="text-[#888888] text-sm mb-4">Gérer les projets d&apos;assistanat</p>
            <a href="/admin/projets?section=assistante" className="text-[#c8a96e] hover:underline">
              Accéder →
            </a>
          </div>

          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Photos Argentiques</h2>
            <p className="text-[#888888] text-sm mb-4">Gérer la galerie photo</p>
            <a href="/admin/photos" className="text-[#c8a96e] hover:underline">
              Accéder →
            </a>
          </div>

          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Logos Partenaires</h2>
            <p className="text-[#888888] text-sm mb-4">Gérer les logos partenaires</p>
            <a href="/admin/partenaires" className="text-[#c8a96e] hover:underline">
              Accéder →
            </a>
          </div>

          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Showreel</h2>
            <p className="text-[#888888] text-sm mb-4">Gérer la vidéo d&apos;accueil</p>
            <a href="/admin/showreel" className="text-[#c8a96e] hover:underline">
              Accéder →
            </a>
          </div>

          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">CV / À propos</h2>
            <p className="text-[#888888] text-sm mb-4">Gérer le contenu de présentation</p>
            <a href="/admin/about" className="text-[#c8a96e] hover:underline">
              Accéder →
            </a>
          </div>
        </div>

        <div className="mt-8">
          <a href="/api/auth/signout" className="text-[#888888] hover:text-[#c8a96e] transition-colors">
            Se déconnecter
          </a>
        </div>
      </div>
    </div>
  )
}
