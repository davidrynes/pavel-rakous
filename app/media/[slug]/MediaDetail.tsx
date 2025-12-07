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

export default function MediaDetail({ media }: { media: any }) {
    const { language, t } = useLanguage()

    const title = language === 'cs' ? media.titleCs : media.titleEn
    const description = language === 'cs' ? media.descriptionCs : media.descriptionEn

    const youtubeId = media.videoUrl ? getYouTubeVideoId(media.videoUrl) : null
    const vimeoId = media.videoUrl ? getVimeoVideoId(media.videoUrl) : null

    // Get platform link and label based on type
    const getPlatformInfo = () => {
        if (media.type === 'video' && media.videoUrl) {
            if (youtubeId) return { url: media.videoUrl, label: t('Sledovat na YouTube', 'Watch on YouTube'), icon: '▶️' }
            if (vimeoId) return { url: media.videoUrl, label: t('Sledovat na Vimeo', 'Watch on Vimeo'), icon: '▶️' }
        }
        if (media.type === 'podcast' && media.podcastUrl) {
            return { url: media.podcastUrl, label: t('Poslechnout podcast', 'Listen to podcast'), icon: '🎧' }
        }
        if (media.type === 'article' && media.articleUrl) {
            return { url: media.articleUrl, label: t('Číst článek', 'Read article'), icon: '📖' }
        }
        return null
    }

    const platformInfo = getPlatformInfo()

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Back navigation */}
            <Link
                href="/media"
                className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors"
            >
                ← {t('Zpět na média', 'Back to media')}
            </Link>

            {/* Header */}
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {media.type === 'video' && 'Video'}
                        {media.type === 'podcast' && 'Podcast'}
                        {media.type === 'article' && t('Článek', 'Article')}
                    </span>
                    <time className="text-sm text-gray-500">
                        {new Date(media.publishedAt).toLocaleDateString(
                            language === 'cs' ? 'cs-CZ' : 'en-US',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }
                        )}
                    </time>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {title}
                </h1>

                {media.publisher && (
                    <p className="text-gray-500">
                        {t('Publikováno na', 'Published on')}: <span className="font-medium">{media.publisher}</span>
                    </p>
                )}
            </header>

            {/* Media Embed */}
            <div className="mb-10">
                {/* Video Embed */}
                {media.type === 'video' && (youtubeId || vimeoId) && (
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                        {youtubeId ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : vimeoId ? (
                            <iframe
                                src={`https://player.vimeo.com/video/${vimeoId}`}
                                className="w-full h-full"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        ) : null}
                    </div>
                )}

                {/* Podcast Embed */}
                {media.type === 'podcast' && media.podcastEmbed && (
                    <div
                        className="rounded-2xl overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: media.podcastEmbed }}
                    />
                )}

                {/* Thumbnail for articles or podcasts without embed */}
                {((media.type === 'article') || (media.type === 'podcast' && !media.podcastEmbed)) && media.thumbnailImage && (
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={urlForImage(media.thumbnailImage).url()}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </div>

            {/* Description */}
            {description && (
                <div className="prose prose-lg max-w-none mb-10">
                    <p className="text-gray-700 leading-relaxed text-lg">
                        {description}
                    </p>
                </div>
            )}

            {/* Platform Link */}
            {platformInfo && (
                <div className="flex justify-center">
                    <a
                        href={platformInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
                    >
                        <span className="text-xl">{platformInfo.icon}</span>
                        {platformInfo.label}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            )}
        </article>
    )
}
