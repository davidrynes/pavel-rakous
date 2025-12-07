'use client'

import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/image'
import { useRef, useState, useEffect } from 'react'

// Helper funkce pro získání YouTube video ID
function getYouTubeVideoId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)
    return match ? match[1] : null
}

interface MediaCarouselProps {
    mediaItems: any[]
}

export default function MediaCarousel({ mediaItems }: MediaCarouselProps) {
    const { language, t } = useLanguage()
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        checkScroll()
        const scrollEl = scrollRef.current
        if (scrollEl) {
            scrollEl.addEventListener('scroll', checkScroll)
            window.addEventListener('resize', checkScroll)
            return () => {
                scrollEl.removeEventListener('scroll', checkScroll)
                window.removeEventListener('resize', checkScroll)
            }
        }
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 340 // card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    if (!mediaItems || mediaItems.length === 0) {
        return null
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {t('Média a vystoupení', 'Media & Appearances')}
                        </h2>
                        <p className="text-gray-600">
                            {t('Podcasty, rozhovory a mediální výstupy', 'Podcasts, interviews and media appearances')}
                        </p>
                    </div>
                    <Link
                        href="/media"
                        className="hidden md:inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-medium"
                    >
                        {t('Zobrazit vše', 'View all')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="relative">
                    {/* Left Arrow */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label={t('Předchozí', 'Previous')}
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Right Arrow */}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label={t('Další', 'Next')}
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Carousel Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {mediaItems.map((item: any) => {
                            const title = language === 'cs' ? item.titleCs : item.titleEn
                            const description = language === 'cs' ? item.descriptionCs : item.descriptionEn
                            const youtubeId = item.videoUrl ? getYouTubeVideoId(item.videoUrl) : null

                            // Link to internal detail page if slug exists, otherwise fallback to media page
                            const mediaUrl = item.slug?.current
                                ? `/media/${item.slug.current}`
                                : '/media'

                            return (
                                <Link
                                    key={item._id}
                                    href={mediaUrl}
                                    className="flex-shrink-0 w-80 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    {/* Thumbnail / Video Preview */}
                                    <div className="relative h-44 bg-gray-100">
                                        {item.type === 'video' && youtubeId ? (
                                            <Image
                                                src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                                                alt={title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : item.thumbnailImage ? (
                                            <Image
                                                src={urlForImage(item.thumbnailImage).url()}
                                                alt={title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-5xl">
                                                    {item.type === 'video' ? '🎥' : item.type === 'podcast' ? '🎙️' : '📰'}
                                                </span>
                                            </div>
                                        )}

                                        {/* Play overlay for videos */}
                                        {item.type === 'video' && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}

                                        {/* Type Badge */}
                                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-medium rounded-full">
                                            {item.type === 'video' && 'Video'}
                                            {item.type === 'podcast' && 'Podcast'}
                                            {item.type === 'article' && t('Článek', 'Article')}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <time className="text-xs text-gray-500">
                                            {new Date(item.publishedAt).toLocaleDateString(
                                                language === 'cs' ? 'cs-CZ' : 'en-US'
                                            )}
                                        </time>
                                        <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {title}
                                        </h3>
                                        {description && (
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile "View all" link */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/media"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        {t('Zobrazit všechna média', 'View all media')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}
