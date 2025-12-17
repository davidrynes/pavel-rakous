import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
    name: 'testimonial',
    title: 'Reference',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Jméno',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Funkce / Společnost',
            type: 'string',
        }),
        defineField({
            name: 'quoteCs',
            title: 'Citace (CZ)',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'quoteEn',
            title: 'Citace (EN)',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Fotografie',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'order',
            title: 'Pořadí',
            type: 'number',
            initialValue: 0,
        }),
    ],
})
