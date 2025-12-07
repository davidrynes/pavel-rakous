import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/sanity-queries'
import BlogPost from './BlogPost'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <BlogPost post={post} />
}
