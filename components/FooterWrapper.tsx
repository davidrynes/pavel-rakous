import { getAuthor } from '@/lib/sanity-queries'
import Footer from './Footer'

export default async function FooterWrapper() {
  const author = await getAuthor()

  return <Footer author={author} />
}
