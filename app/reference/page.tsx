import { Metadata } from 'next'
import { getAllTestimonials } from '@/lib/sanity-queries'
import TestimonialCard from '@/components/TestimonialCard'

export const revalidate = 60

export const metadata: Metadata = {
    title: 'Reference',
    description: 'Co o spolupráci se mnou říkají klienti a partneři.',
    openGraph: {
        title: 'Reference | Pavel Rakouš',
        description: 'Co o spolupráci se mnou říkají klienti a partneři.',
    },
}

export default async function ReferencePage() {
    const testimonials = await getAllTestimonials()

    return (
        <main className="min-h-screen bg-gray-50 py-12 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Reference</h1>
                    <p className="text-xl text-gray-600">
                        Vážím si důvěry svých klientů. Přečtěte si, jak hodnotí naši spolupráci.
                    </p>
                </div>

                {testimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial: any) => (
                            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Zatím zde nejsou žádné reference.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
