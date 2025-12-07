import { getAuthor, getLatestBlogPosts, getAllServices, getSettings, getAllMedia } from '@/lib/sanity-queries'
import HomePage from './HomePage'

export default async function Home() {
  const [author, latestPosts, services, settings, mediaItems] = await Promise.all([
    getAuthor(),
    getLatestBlogPosts(3),
    getAllServices(),
    getSettings(),
    getAllMedia(),
  ])

  // Limit media items to 6 for carousel
  const carouselMedia = mediaItems?.slice(0, 6) || []

  return <HomePage author={author} latestPosts={latestPosts} services={services} settings={settings} mediaItems={carouselMedia} />
}
