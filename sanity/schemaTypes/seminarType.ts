import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const seminarType = defineType({
    name: 'seminar',
    title: 'Seminář',
    type: 'document',
    icon: CalendarIcon,
    fields: [
        defineField({
            name: 'titleCs',
            title: 'Název (CZ)',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'titleEn',
            title: 'Název (EN)',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'titleCs',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Datum a čas',
            type: 'datetime',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Místo konání',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Cena (Kč)',
            type: 'number',
        }),
        defineField({
            name: 'descriptionCs',
            title: 'Popis (CZ)',
            type: 'text',
        }),
        defineField({
            name: 'descriptionEn',
            title: 'Popis (EN)',
            type: 'text',
        }),
        defineField({
            name: 'registrationLink',
            title: 'Odkaz na registraci',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            title: 'titleCs',
            date: 'date',
        },
        prepare({ title, date }) {
            return {
                title,
                subtitle: date ? new Date(date).toLocaleDateString('cs-CZ') : 'Datum neurčeno',
            }
        },
    },
})
