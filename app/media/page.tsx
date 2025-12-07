import { Metadata } from 'next'
import { getAllMedia } from '@/lib/sanity-queries'
import MediaPage from './MediaPage'

export const metadata: Metadata = {
  title: 'Média',
  description: 'Mediální výstupy, rozhovory a podcasty Pavla Rakouše o správě nemovitostí a bytového fondu.',
  openGraph: {
    title: 'Média | Pavel Rakouš',
    description: 'Mediální výstupy, rozhovory a podcasty o správě nemovitostí.',
  },
}

export default async function Media() {
  const mediaItems = await getAllMedia()

  return <MediaPage mediaItems={mediaItems} />
}
