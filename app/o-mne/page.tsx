import { Metadata } from 'next'
import { getPageBySlug, getAuthor } from '@/lib/sanity-queries'
import AboutPage from './AboutPage'

export const metadata: Metadata = {
  title: 'O mně',
  description: 'Pavel Rakouš - odborník na správu nemovitostí s více než 25 lety zkušeností. Poradce pro SVJ, bytová družstva a realitní kanceláře.',
  openGraph: {
    title: 'O mně | Pavel Rakouš',
    description: 'Pavel Rakouš - odborník na správu nemovitostí s více než 25 lety zkušeností.',
  },
}

export default async function About() {
  const [page, author] = await Promise.all([
    getPageBySlug('o-mne'),
    getAuthor(),
  ])

  return <AboutPage page={page} author={author} />
}
