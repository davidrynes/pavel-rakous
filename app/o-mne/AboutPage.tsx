'use client'

import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'
import { urlForImage } from '@/sanity/image'
import { PortableText } from '@portabletext/react'

export default function AboutPage({ page, author }: any) {
  const { language, t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
        {t('O mně', 'About me')}
      </h1>

      {author && (
        <div className="mb-16">
          {author.image && (
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src={urlForImage(author.image).url()}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {author.name}
          </h2>

          {author.bioCs && author.bioEn && (
            <div className="prose prose-lg max-w-none mb-8">
              <PortableText
                value={language === 'cs' ? author.bioCs : author.bioEn}
              />
            </div>
          )}

          {author.experience && author.experience.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('Zkušenosti a odbornost', 'Experience and expertise')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {author.experience.map((exp: any, index: number) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-50 rounded-xl"
                  >
                    {exp.icon && (
                      <div className="text-3xl mb-3">{exp.icon}</div>
                    )}
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {language === 'cs' ? exp.titleCs : exp.titleEn}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'cs' ? exp.descriptionCs : exp.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(author.email || author.phone) && (
            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('Kontaktní informace', 'Contact information')}
              </h3>
              <div className="space-y-2">
                {author.email && (
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span>{' '}
                    <a
                      href={`mailto:${author.email}`}
                      className="text-primary hover:underline"
                    >
                      {author.email}
                    </a>
                  </p>
                )}
                {author.phone && (
                  <p className="text-gray-700">
                    <span className="font-medium">
                      {t('Telefon', 'Phone')}:
                    </span>{' '}
                    <a
                      href={`tel:${author.phone}`}
                      className="text-primary hover:underline"
                    >
                      {author.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {page && page.contentCs && page.contentEn && (
        <div className="prose prose-lg max-w-none">
          <PortableText
            value={language === 'cs' ? page.contentCs : page.contentEn}
          />
        </div>
      )}
    </div>
  )
}
