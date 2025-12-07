'use client'

import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/image'
import { PortableText } from '@portabletext/react'
import ContactForm from '@/components/ContactForm'
import MediaCarousel from '@/components/MediaCarousel'

export default function HomePage({ author, latestPosts, services, settings, mediaItems }: any) {
  const { language, t } = useLanguage()

  if (!author) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-center text-gray-600">
          {t(
            'Žádná data o autorovi. Přejděte do Sanity Studio a vytvořte autora.',
            'No author data. Go to Sanity Studio and create an author.'
          )}
        </p>
      </div>
    )
  }

  const bio = language === 'cs' ? author.bioCs : author.bioEn

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {author.name}
            </h1>
            <p className="text-2xl text-gray-600 mb-10">
              {t('Poradce pro správu nemovitostí', 'Real Estate Management Consultant')}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-lg font-medium"
              >
                {t('Kontaktujte mě', 'Contact me')}
              </Link>
              <Link
                href="/balicky"
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium"
              >
                {t('Moje služby', 'My services')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {author.experience && author.experience.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t('V čem vynikám', 'What I excel at')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {author.experience.map((exp: any, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  {exp.icon && (
                    <div className="text-4xl mb-4">{exp.icon}</div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {language === 'cs' ? exp.titleCs : exp.titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'cs' ? exp.descriptionCs : exp.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {latestPosts && latestPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                {t('Nejnovější články', 'Latest articles')}
              </h2>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {t('Zobrazit všechny →', 'View all →')}
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    {post.mainImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={urlForImage(post.mainImage).url()}
                          alt={language === 'cs' ? post.titleCs : post.titleEn}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <time className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString(
                          language === 'cs' ? 'cs-CZ' : 'en-US'
                        )}
                      </time>
                      <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-primary transition-colors">
                        {language === 'cs' ? post.titleCs : post.titleEn}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {language === 'cs' ? post.excerptCs : post.excerptEn}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services && services.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              {t('Moje služby pro vás', 'My Services for You')}
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {t(
                'Nabízím komplexní služby v oblasti správy nemovitostí',
                'I offer comprehensive real estate management services'
              )}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service: any) => (
                <div
                  key={service._id}
                  className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all hover:scale-105 text-center"
                >
                  {service.icon && (
                    <div className="text-5xl mb-4">{service.icon}</div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'cs' ? service.titleCs : service.titleEn}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'cs' ? service.descriptionCs : service.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Media Carousel Section */}
      <MediaCarousel mediaItems={mediaItems} />

      {/* Why Work With Me Section */}
      {settings?.whyWorkWithMe?.reasons && settings.whyWorkWithMe.reasons.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-primary-light to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {language === 'cs' ? settings.whyWorkWithMe.titleCs : settings.whyWorkWithMe.titleEn}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {settings.whyWorkWithMe.reasons.map((reason: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  {reason.icon && (
                    <div className="text-4xl mb-4">{reason.icon}</div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {language === 'cs' ? reason.titleCs : reason.titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'cs' ? reason.descriptionCs : reason.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/kontakt"
                className="inline-block px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-lg font-medium"
              >
                {t('Kontaktujte mě', 'Contact me')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {settings?.statistics && (
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {settings.statistics.publications && (
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">
                    {settings.statistics.publications}+
                  </div>
                  <p className="text-xl text-gray-300">
                    {t('Napsaných publikací', 'Published Articles')}
                  </p>
                </div>
              )}
              {settings.statistics.yearsExperience && (
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">
                    {settings.statistics.yearsExperience}+
                  </div>
                  <p className="text-xl text-gray-300">
                    {t('Let v realitním světě', 'Years in Real Estate')}
                  </p>
                </div>
              )}
              {settings.statistics.happyClients && (
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">
                    {settings.statistics.happyClients}+
                  </div>
                  <p className="text-xl text-gray-300">
                    {t('Spokojených klientů', 'Happy Clients')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Who Am I Section */}
      {author && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {author.image && (
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
                  <Image
                    src={urlForImage(author.image).url()}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {t('Kdo jsem?', 'Who am I?')}
                </h2>
                {bio && (
                  <div className="prose prose-lg text-gray-600 mb-8">
                    <PortableText value={bio} />
                  </div>
                )}
                <Link
                  href="/o-mne"
                  className="inline-block px-6 py-3 border border-primary text-primary rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  {t('Více o mně →', 'More about me →')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {settings?.helpSection && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'cs' ? settings.helpSection.titleCs : settings.helpSection.titleEn}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === 'cs' ? settings.helpSection.descriptionCs : settings.helpSection.descriptionEn}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <ContactForm />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
