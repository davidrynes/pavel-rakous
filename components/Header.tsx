'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="border-b border-gray-200 bg-white">
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
            Pavel Rakouš
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {t('Domů', 'Home')}
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/media"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {t('Média', 'Media')}
            </Link>
            <Link
              href="/balicky"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {t('Balíčky', 'Packages')}
            </Link>
            <Link
              href="/o-mne"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {t('O mně', 'About')}
            </Link>
            <Link
              href="/kontakt"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {t('Kontakt', 'Contact')}
            </Link>
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
