import { getAllMedia } from '@/lib/sanity-queries'
import MediaPage from './MediaPage'

export default async function Media() {
  const mediaItems = await getAllMedia()

  return <MediaPage mediaItems={mediaItems} />
}
