'use client'

import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { useState } from 'react'

export default function PackagesPage({ packages }: any) {
  const { language, t } = useLanguage()
  const [activePackageId, setActivePackageId] = useState<string | null>(
    packages?.find((pkg: any) => pkg.featured)?._id || packages?.[0]?._id || null
  )

  if (!packages || packages.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('Balíčky služeb', 'Service Packages')}
        </h1>
        <p className="text-gray-600">
          {t(
            'Zatím nejsou žádné balíčky. Přejděte do Sanity Studio a vytvořte balíčky.',
            'No packages yet. Go to Sanity Studio and create packages.'
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('Balíčky služeb', 'Service Packages')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t(
            'Vyberte si balíček, který nejlépe vyhovuje vašim potřebám',
            'Choose the package that best fits your needs'
          )}
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {packages.map((pkg: any) => {
          const isActive = activePackageId === pkg._id
          return (
            <div
              key={pkg._id}
              onClick={() => setActivePackageId(pkg._id)}
              className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out p-8 flex flex-col cursor-pointer ${
                pkg.featured ? 'ring-2 ring-primary relative' : ''
              } ${
                isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-75 hover:opacity-90'
              }`}
            >
            {pkg.featured && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                {t('Doporučeno', 'Recommended')}
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'cs' ? pkg.titleCs : pkg.titleEn}
              </h3>
              <div className="text-gray-600 leading-relaxed prose prose-lg max-w-none">
                <PortableText
                  value={language === 'cs' ? pkg.descriptionCs : pkg.descriptionEn}
                />
              </div>
            </div>

            {pkg.price && (
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {pkg.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600">{pkg.currency}</span>
                </div>
              </div>
            )}

            {((language === 'cs' && pkg.featuresCs) ||
              (language === 'en' && pkg.featuresEn)) && (
                <ul className="space-y-4 mb-8 flex-1">
                  {(language === 'cs' ? pkg.featuresCs : pkg.featuresEn).map(
                    (feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              )}

            <Link
              href="/kontakt"
              className={`w-full py-3 px-6 rounded-lg text-center font-medium transition-colors ${pkg.featured
                  ? 'bg-primary text-white hover:bg-primary-dark'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
            >
              {t('Kontaktovat', 'Contact')}
            </Link>
          </div>
          )
        })}
      </div>
    </div>
  )
}
