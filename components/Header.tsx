'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: t('Domů', 'Home') },
    { href: '/blog', label: 'Blog' },
    { href: '/media', label: t('Média', 'Media') },
    { href: '/balicky', label: t('Balíčky', 'Packages') },
    { href: '/o-mne', label: t('O mně', 'About') },
    { href: '/kontakt', label: t('Kontakt', 'Contact') },
  ]

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-primary">
            <Image
              src="/pavel-rakous-logotype.svg"
              alt="Pavel Rakous Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-black">Pavel</span> Rakouš
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Zavřít menu' : 'Otevřít menu'}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
