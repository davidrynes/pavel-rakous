'use client'

import { useLanguage } from '@/lib/language-context'
import ContactForm from './ContactForm'
import Link from 'next/link'

interface FooterProps {
  author?: any
}

export default function Footer({ author }: FooterProps) {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Contact Section in Footer */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('Kontaktujte mě', 'Contact me')}
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                {t(
                  'Pokud řešíte otázky spojené s realitním trhem, legislativou, fungováním SVJ nebo přípravou projektů, rád vám pomohu najít jasné a praktické řešení. Dlouhodobě se věnuji bytové politice, realitnímu zprostředkování a správě majetku — a své zkušenosti nabízím klientům, kteří potřebují jistotu, orientaci a odborný pohled. Napište mi, s čím si lámete hlavu. Společně projdeme váš problém a navrhneme postup, který dává smysl.',
                  'Have questions or want a free consultation? I\'m happy to help.'
                )}
              </p>

              {author && (
                <div className="space-y-6">
                  {author.email && (
                    <div className="flex items-start gap-4 group">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1 font-medium">Email</p>
                        <a
                          href={`mailto:${author.email}`}
                          className="text-white hover:text-primary transition-colors text-lg break-all"
                        >
                          {author.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {author.phone && (
                    <div className="flex items-start gap-4 group">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-1 font-medium">
                          {t('Telefon', 'Phone')}
                        </p>
                        <a
                          href={`tel:${author.phone}`}
                          className="text-white hover:text-primary transition-colors text-lg"
                        >
                          {author.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <ContactForm compact />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm flex flex-col md:flex-row items-center gap-2">
            <span>
              &copy; {new Date().getFullYear()} Pavel Rakouš.{' '}
              {t('Všechna práva vyhrazena.', 'All rights reserved.')}
            </span>
            <span className="hidden md:inline">•</span>
            <span>
              {t('Vytvořil', 'Created by')}{' '}
              <a
                href="https://www.deer.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors font-medium"
              >
                deer.digital
              </a>
            </span>
          </div>

          <nav className="flex gap-6">
            <Link
              href="/o-mne"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t('O mně', 'About')}
            </Link>
            <Link
              href="/blog"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Blog
            </Link>
            <Link
              href="/media"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t('Média', 'Media')}
            </Link>
            <Link
              href="/balicky"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t('Balíčky', 'Packages')}
            </Link>
            <Link
              href="/kontakt"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {t('Kontakt', 'Contact')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
