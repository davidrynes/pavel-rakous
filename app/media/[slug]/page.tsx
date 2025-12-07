import { getMediaBySlug, getAllMedia } from '@/lib/sanity-queries'
import MediaDetail from './MediaDetail'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const mediaItems = await getAllMedia()
    return mediaItems
        .filter((item: any) => item.slug?.current)
        .map((item: any) => ({
            slug: item.slug.current,
        }))
}

export default async function MediaDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const media = await getMediaBySlug(slug)

    if (!media) {
        notFound()
    }

    return <MediaDetail media={media} />
}
