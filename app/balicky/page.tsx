import { getAllPackages } from '@/lib/sanity-queries'
import PackagesPage from './PackagesPage'

export default async function Packages() {
  const packages = await getAllPackages()

  return <PackagesPage packages={packages} />
}
