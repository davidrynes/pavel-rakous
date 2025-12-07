import { getPageBySlug } from '@/lib/sanity-queries'
import { getAuthor } from '@/lib/sanity-queries'
import AboutPage from './AboutPage'

export default async function About() {
  const [page, author] = await Promise.all([
    getPageBySlug('o-mne'),
    getAuthor(),
  ])

  return <AboutPage page={page} author={author} />
}
