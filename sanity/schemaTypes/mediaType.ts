import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const mediaType = defineType({
  name: 'media',
  title: 'Média',
  type: 'document',
  icon: PlayIcon,
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
      title: 'URL slug',
      type: 'slug',
      options: {
        source: 'titleCs',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Typ média',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Externí článek', value: 'article' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionCs',
      title: 'Popis (Česky)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Popis (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Náhledový obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternativní text',
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL videa (YouTube/Vimeo)',
      type: 'url',
      description: 'Zadejte odkaz na YouTube nebo Vimeo video',
      hidden: ({ document }) => document?.type !== 'video',
    }),
    defineField({
      name: 'podcastUrl',
      title: 'URL podcastu',
      type: 'url',
      description: 'Odkaz na podcast (Spotify, Apple Podcasts, atd.)',
      hidden: ({ document }) => document?.type !== 'podcast',
    }),
    defineField({
      name: 'podcastEmbed',
      title: 'Embed kód podcastu',
      type: 'text',
      description: 'HTML embed kód z platformy podcastu',
      rows: 4,
      hidden: ({ document }) => document?.type !== 'podcast',
    }),
    defineField({
      name: 'articleUrl',
      title: 'URL článku',
      type: 'url',
      description: 'Odkaz na externí článek',
      hidden: ({ document }) => document?.type !== 'article',
    }),
    defineField({
      name: 'publisher',
      title: 'Vydavatel',
      type: 'string',
      description: 'Název média/webu, kde byl článek publikován',
      hidden: ({ document }) => document?.type !== 'article',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum publikace',
      type: 'date',
      validation: (rule) => rule.required(),
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
      type: 'type',
      media: 'thumbnailImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, type, publishedAt } = selection
      const typeLabels: Record<string, string> = {
        video: 'Video',
        podcast: 'Podcast',
        article: 'Článek',
      }
      return {
        ...selection,
        title,
        subtitle: `${typeLabels[type] || type} • ${publishedAt ? new Date(publishedAt).toLocaleDateString('cs-CZ') : 'Bez data'}`,
      }
    },
  },
})
