import { DocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Stránka',
  type: 'document',
  icon: DocumentIcon,
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
      name: 'contentCs',
      title: 'Obsah (Česky)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativní text',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'contentEn',
      title: 'Obsah (English)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativní text',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitleCs', type: 'string', title: 'Meta Titulek (Česky)' },
        { name: 'metaTitleEn', type: 'string', title: 'Meta Titulek (English)' },
        { name: 'metaDescriptionCs', type: 'text', title: 'Meta Popis (Česky)' },
        { name: 'metaDescriptionEn', type: 'text', title: 'Meta Popis (English)' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'titleCs',
      slug: 'slug.current',
    },
    prepare(selection) {
      const { title, slug } = selection
      return {
        title,
        subtitle: slug,
      }
    },
  },
})
