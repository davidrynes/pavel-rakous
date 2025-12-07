import { getAllBlogPosts } from '@/lib/sanity-queries'
import BlogList from './BlogList'

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return <BlogList posts={posts} />
}
