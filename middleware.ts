import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Autoriser l'accès à la page de login sans authentification
        if (req.nextUrl.pathname === '/admin/login') {
          return true
        }
        // Pour toutes les autres pages admin, vérifier le token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
