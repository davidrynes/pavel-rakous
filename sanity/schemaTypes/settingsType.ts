import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Nastavení webu',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'statistics',
      title: 'Statistiky',
      type: 'object',
      fields: [
        { name: 'publications', type: 'number', title: 'Počet publikací' },
        { name: 'yearsExperience', type: 'number', title: 'Roky zkušeností' },
        { name: 'happyClients', type: 'number', title: 'Spokojení klienti' },
      ],
    }),
    defineField({
      name: 'whyWorkWithMe',
      title: 'Proč spolupracovat se mnou',
      type: 'object',
      fields: [
        {
          name: 'titleCs',
          type: 'string',
          title: 'Nadpis (Česky)',
          initialValue: 'Proč spolupracovat se mnou'
        },
        {
          name: 'titleEn',
          type: 'string',
          title: 'Nadpis (English)',
          initialValue: 'Why work with me'
        },
        {
          name: 'reasons',
          type: 'array',
          title: 'Důvody',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'titleCs', type: 'string', title: 'Titulek (Česky)' },
                { name: 'titleEn', type: 'string', title: 'Titulek (English)' },
                { name: 'descriptionCs', type: 'text', title: 'Popis (Česky)' },
                { name: 'descriptionEn', type: 'text', title: 'Popis (English)' },
                { name: 'icon', type: 'string', title: 'Ikona (emoji)' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'helpSection',
      title: 'Sekce "Chcete pomoct?"',
      type: 'object',
      fields: [
        {
          name: 'titleCs',
          type: 'string',
          title: 'Nadpis (Česky)',
          initialValue: 'Chcete pomoct?'
        },
        {
          name: 'titleEn',
          type: 'string',
          title: 'Nadpis (English)',
          initialValue: 'Need help?'
        },
        { name: 'descriptionCs', type: 'text', title: 'Popis (Česky)' },
        { name: 'descriptionEn', type: 'text', title: 'Popis (English)' },
      ],
    }),
  ],
})
