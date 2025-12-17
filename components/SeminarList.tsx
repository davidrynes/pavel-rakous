import Link from 'next/link'

interface Seminar {
    _id: string
    titleCs: string
    date: string
    location: string
    price: number
    descriptionCs: string
    registrationLink?: string
}

export default function SeminarList({ seminars }: { seminars: Seminar[] }) {
    return (
        <div className="space-y-6">
            {seminars.map((seminar) => (
                <div key={seminar._id} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/50 transition-colors shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="text-sm font-semibold text-primary mb-1">
                                {new Date(seminar.date).toLocaleDateString('cs-CZ', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{seminar.titleCs}</h3>
                            <p className="text-gray-600 mb-2 text-sm">{seminar.location}</p>
                            {seminar.descriptionCs && (
                                <p className="text-gray-600 line-clamp-2 max-w-2xl">{seminar.descriptionCs}</p>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span className="text-lg font-bold text-gray-900">
                                {seminar.price ? `${seminar.price.toLocaleString('cs-CZ')} Kč` : 'Zdarma'}
                            </span>
                            {seminar.registrationLink ? (
                                <a
                                    href={seminar.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
                                >
                                    Registrovat
                                </a>
                            ) : (
                                <span className="text-sm text-gray-500 italic">Registrace není otevřena</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
