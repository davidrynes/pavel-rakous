import { Metadata } from 'next'
import { getAuthor } from '@/lib/sanity-queries'
import ContactPage from './ContactPage'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktujte Pavla Rakouše pro konzultaci v oblasti správy nemovitostí, SVJ a bytových družstev.',
  openGraph: {
    title: 'Kontakt | Pavel Rakouš',
    description: 'Kontaktujte Pavla Rakouše pro konzultaci v oblasti správy nemovitostí.',
  },
}

export default async function Contact() {
  const author = await getAuthor()

  return <ContactPage author={author} />
}
