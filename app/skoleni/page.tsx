import { Metadata } from 'next'
import { getAllSeminars } from '@/lib/sanity-queries'
import SeminarCalendar from '@/components/SeminarCalendar'
import SeminarList from '@/components/SeminarList'

export const revalidate = 60

export const metadata: Metadata = {
    title: 'Školení a semináře',
    description: 'Nadcházející školení a odborné semináře Pavla Rakouše.',
    openGraph: {
        title: 'Školení a semináře | Pavel Rakouš',
        description: 'Nadcházející školení a odborné semináře.',
    },
}

export default async function TrainingPage() {
    const seminars = await getAllSeminars()

    return (
        <main className="min-h-screen bg-gray-50 py-12 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Školení a semináře</h1>
                    <p className="text-xl text-gray-600">
                        Sdílím své zkušenosti na seminářích po celé republice. Přijďte si poslechnout aktuální témata z oblasti SVJ a realit.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar Section - Takes up 1 column on large screens */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kalendář akcí</h2>
                        <SeminarCalendar seminars={seminars} />
                    </div>

                    {/* List Section - Takes up 2 columns on large screens */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nadcházející akce</h2>
                        {seminars.length > 0 ? (
                            <SeminarList seminars={seminars} />
                        ) : (
                            <div className="bg-white p-8 rounded-xl text-center border border-gray-200">
                                <p className="text-gray-500">Momentálně nejsou vypsány žádné semináře.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
