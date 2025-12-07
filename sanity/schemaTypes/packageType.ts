import { PackageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const packageType = defineType({
  name: 'package',
  title: 'Balíček',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'titleCs',
      title: 'Název (Česky)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Název (English)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titleCs',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionCs',
      title: 'Popis (Česky)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Popis (English)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Cena',
      type: 'number',
    }),
    defineField({
      name: 'currency',
      title: 'Měna',
      type: 'string',
      options: {
        list: [
          { title: 'CZK', value: 'CZK' },
          { title: 'EUR', value: 'EUR' },
          { title: 'USD', value: 'USD' },
        ],
      },
      initialValue: 'CZK',
    }),
    defineField({
      name: 'featuresCs',
      title: 'Vlastnosti (Česky)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featuresEn',
      title: 'Vlastnosti (English)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Zvýrazněný balíček',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'titleCs',
      price: 'price',
      currency: 'currency',
    },
    prepare(selection) {
      const { title, price, currency } = selection
      return {
        title,
        subtitle: price ? `${price} ${currency}` : 'Cena neuvedena',
      }
    },
  },
})
