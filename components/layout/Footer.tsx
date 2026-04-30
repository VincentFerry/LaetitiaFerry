'use client'

import Link from 'next/link'

const socialLinks = [
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'Vimeo', href: '#', icon: 'vimeo' },
  { name: 'IMDb', href: '#', icon: 'imdb' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Nom et copyright */}
          <div>
            <h3 className="text-2xl font-cormorant font-light mb-4">LAETITIA FERRY</h3>
            <p className="text-muted text-sm">
              Réalisatrice / 1ère Assistante Réalisatrice
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="label-text text-xs mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/qui-suis-je" className="text-muted hover:text-accent transition-colors text-sm">
                  Qui suis-je
                </Link>
              </li>
              <li>
                <Link href="/realisation" className="text-muted hover:text-accent transition-colors text-sm">
                  Réalisation
                </Link>
              </li>
              <li>
                <Link href="/assistante" className="text-muted hover:text-accent transition-colors text-sm">
                  1ère Assistante Réalisatrice
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted hover:text-accent transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="label-text text-xs mb-4">Suivez-moi</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors"
                  aria-label={social.name}
                >
                  {social.icon === 'instagram' && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                  {social.icon === 'vimeo' && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                    </svg>
                  )}
                  {social.icon === 'imdb' && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.3 0H1.7C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.7 1.7h20.6c.9 0 1.7-.8 1.7-1.7V1.7c0-.9-.8-1.7-1.7-1.7zM4.2 6.1h1.5v11.8H4.2V6.1zm7.1 0h1.9l1.1 8.4 1.1-8.4H17v11.8h-1.5v-9.3l-1.3 9.3h-1.3l-1.3-9.3v9.3H10V6.1zm-4.5 0h2.3c1.5 0 2.3.8 2.3 2.3v7.2c0 1.5-.8 2.3-2.3 2.3H6.8V6.1zm1.5 1.5v8.8h.8c.5 0 .8-.3.8-.8V8.4c0-.5-.3-.8-.8-.8h-.8zm11.5-1.5h1.5v11.8h-1.5V6.1z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm">
            © {currentYear} Laetitia Ferry. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/mentions-legales" className="text-muted hover:text-accent transition-colors text-sm">
              Mentions légales
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-muted hover:text-accent transition-colors text-sm flex items-center"
            >
              Retour en haut
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
