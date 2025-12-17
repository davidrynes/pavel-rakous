'use client'

import { urlForImage } from '@/sanity/image'
import Image from 'next/image'

interface TestimonialProps {
    testimonial: {
        _id: string
        name: string
        role?: string
        quoteCs: string
        image?: any
    }
}

export default function TestimonialCard({ testimonial }: TestimonialProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex-grow">
                <svg className="w-8 h-8 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
                </svg>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.quoteCs}"</p>
            </div>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                {testimonial.image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                            src={urlForImage(testimonial.image).url()}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                        {testimonial.name[0]}
                    </div>
                )}
                <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    {testimonial.role && <p className="text-sm text-gray-500">{testimonial.role}</p>}
                </div>
            </div>
        </div>
    )
}
