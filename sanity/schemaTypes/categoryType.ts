import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Kategorie',
  type: 'document',
  icon: TagIcon,
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
      type: 'text',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Popis (English)',
      type: 'text',
    }),
  ],
})
