import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/sanity-queries'
import BlogList from './BlogList'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Odborné články o správě nemovitostí, SVJ, bytových družstvech a realitním trhu od Pavla Rakouše.',
  openGraph: {
    title: 'Blog | Pavel Rakouš',
    description: 'Odborné články o správě nemovitostí, SVJ, bytových družstvech a realitním trhu.',
  },
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return <BlogList posts={posts} />
}
