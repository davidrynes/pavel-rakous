import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Služba',
  type: 'document',
  icon: CogIcon,
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
      name: 'descriptionCs',
      title: 'Popis (Česky)',
      type: 'text',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Popis (English)',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Ikona (emoji)',
      type: 'string',
      description: 'Např. 🏠, 📊, 💰, ⚖️',
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
      icon: 'icon',
    },
    prepare(selection) {
      const { title, icon } = selection
      return {
        title,
        subtitle: icon,
      }
    },
  },
})
