'use client'

import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/image'

// Helper funkce pro získání YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)
  return match ? match[1] : null
}

// Helper funkce pro získání Vimeo video ID
function getVimeoVideoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i)
  return match ? match[1] : null
}

export default function MediaPage({ mediaItems }: any) {
  const { language, t } = useLanguage()

  if (!mediaItems || mediaItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('Média', 'Media')}
        </h1>
        <p className="text-gray-600">
          {t(
            'Zatím nejsou žádné mediální výstupy. Přejděte do Sanity Studio a přidejte první položku.',
            'No media items yet. Go to Sanity Studio and add your first item.'
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('Média', 'Media')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t(
            'Moje mediální výstupy, rozhovory a publikace',
            'My media appearances, interviews and publications'
          )}
        </p>
      </header>

      <div className="space-y-12">
        {mediaItems.map((item: any) => {
          const title = language === 'cs' ? item.titleCs : item.titleEn
          const description = language === 'cs' ? item.descriptionCs : item.descriptionEn

          return (
            <article
              key={item._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Levá strana - náhled/embed */}
                <div className="relative flex items-center pl-6">
                  {item.type === 'video' && item.videoUrl && (
                    <div className="aspect-video w-full">
                      {(() => {
                        const youtubeId = getYouTubeVideoId(item.videoUrl)
                        const vimeoId = getVimeoVideoId(item.videoUrl)

                        if (youtubeId) {
                          return (
                            <iframe
                              src={`https://www.youtube.com/embed/${youtubeId}`}
                              className="w-full h-full rounded-lg"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          )
                        } else if (vimeoId) {
                          return (
                            <iframe
                              src={`https://player.vimeo.com/video/${vimeoId}`}
                              className="w-full h-full rounded-lg"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                            />
                          )
                        }
                        return null
                      })()}
                    </div>
                  )}

                  {item.type === 'podcast' && item.podcastEmbed && (
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: item.podcastEmbed }}
                    />
                  )}

                  {((item.type === 'podcast' && !item.podcastEmbed) || item.type === 'article') && item.thumbnailImage && (
                    <div className="relative h-80 rounded-lg overflow-hidden">
                      <Image
                        src={urlForImage(item.thumbnailImage).url()}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {!item.thumbnailImage && !item.videoUrl && !item.podcastEmbed && (
                    <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-6xl">
                        {item.type === 'video' ? '🎥' : item.type === 'podcast' ? '🎙️' : '📰'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Pravá strana - informace */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {item.type === 'video' && t('Video', 'Video')}
                      {item.type === 'podcast' && t('Podcast', 'Podcast')}
                      {item.type === 'article' && t('Článek', 'Article')}
                    </span>
                    <time className="text-sm text-gray-500">
                      {new Date(item.publishedAt).toLocaleDateString(
                        language === 'cs' ? 'cs-CZ' : 'en-US'
                      )}
                    </time>
                  </div>

                  <Link
                    href={item.slug?.current ? `/media/${item.slug.current}` : '#'}
                    className="text-2xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors block"
                  >
                    {title}
                  </Link>

                  {description && (
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {description}
                    </p>
                  )}

                  {item.publisher && (
                    <p className="text-sm text-gray-500 mb-6">
                      {t('Vydavatel', 'Publisher')}: <span className="font-medium">{item.publisher}</span>
                    </p>
                  )}

                  {((item.type === 'podcast' && item.podcastUrl) || (item.type === 'article' && item.articleUrl)) && (
                    <a
                      href={item.type === 'podcast' ? item.podcastUrl : item.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      {item.type === 'podcast' && t('Poslechnout podcast', 'Listen to podcast')}
                      {item.type === 'article' && t('Přečíst článek', 'Read article')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
