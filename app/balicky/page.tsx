import { Metadata } from 'next'
import { getAllPackages } from '@/lib/sanity-queries'
import PackagesPage from './PackagesPage'

export const metadata: Metadata = {
  title: 'Balíčky služeb',
  description: 'Nabídka poradenských balíčků pro správu nemovitostí, SVJ a bytová družstva. Vyberte si řešení na míru.',
  openGraph: {
    title: 'Balíčky služeb | Pavel Rakouš',
    description: 'Nabídka poradenských balíčků pro správu nemovitostí, SVJ a bytová družstva.',
  },
}

export default async function Packages() {
  const packages = await getAllPackages()

  return <PackagesPage packages={packages} />
}
