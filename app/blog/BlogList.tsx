'use client'

import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/image'

export default function BlogList({ posts }: any) {
  const { language, t } = useLanguage()

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
        <p className="text-gray-600">
          {t(
            'Zatím nejsou žádné články. Přejděte do Sanity Studio a vytvořte první článek.',
            'No articles yet. Go to Sanity Studio and create your first article.'
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group"
          >
            <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
              {post.mainImage && (
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={urlForImage(post.mainImage).url()}
                    alt={language === 'cs' ? post.titleCs : post.titleEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <time className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString(
                      language === 'cs' ? 'cs-CZ' : 'en-US'
                    )}
                  </time>
                  {post.categories && post.categories.length > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {language === 'cs'
                          ? post.categories[0].titleCs
                          : post.categories[0].titleEn}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {language === 'cs' ? post.titleCs : post.titleEn}
                </h2>
                <p className="text-gray-600 line-clamp-3 flex-1">
                  {language === 'cs' ? post.excerptCs : post.excerptEn}
                </p>
                <div className="mt-4 text-primary group-hover:text-primary-dark font-medium">
                  {t('Číst více →', 'Read more →')}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
