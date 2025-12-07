import { getAuthor } from '@/lib/sanity-queries'
import ContactPage from './ContactPage'

export default async function Contact() {
  const author = await getAuthor()

  return <ContactPage author={author} />
}
