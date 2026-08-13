import {defineArrayMember, defineField, defineType} from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Insight',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'Search & sharing'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'publishing',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Format',
      type: 'string',
      group: 'publishing',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Case study', value: 'caseStudy'},
          {title: 'Event or company update', value: 'update'},
        ],
        layout: 'radio',
      },
      initialValue: 'article',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Primary category',
      description: 'Controls the main filter used on the Insights page.',
      type: 'string',
      group: 'publishing',
      options: {
        list: [
          {title: 'Regulatory', value: 'regulatory'},
          {title: 'Market Insights', value: 'marketInsights'},
          {title: 'Operational Insights', value: 'operationalInsights'},
          {title: 'Events & Updates', value: 'eventsUpdates'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      description: 'Used on the Insights homepage and below the article title.',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']}),
                  }),
                  defineField({name: 'blank', title: 'Open in a new tab', type: 'boolean'}),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          name: 'articleImage',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'caption', title: 'Caption', type: 'string'}),
          ],
        }),
        defineArrayMember({
          name: 'callout',
          title: 'Callout',
          type: 'object',
          fields: [
            defineField({name: 'heading', title: 'Heading', type: 'string'}),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'heading', subtitle: 'text'},
            prepare: ({title, subtitle}) => ({title: title || 'Callout', subtitle}),
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'publishing',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Topic tags',
      description: 'Add specific subjects such as MSME, CAM, Underwriting, Co-lending or Gold Loans. These are ready for more granular filtering later.',
      type: 'array',
      group: 'publishing',
      of: [defineArrayMember({type: 'reference', to: [{type: 'resourceTag'}]})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication date',
      type: 'datetime',
      group: 'publishing',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time (minutes)',
      type: 'number',
      group: 'publishing',
      validation: (rule) => rule.required().integer().min(1).max(60),
    }),
    defineField({
      name: 'legacyPath',
      title: 'Custom page path',
      description: 'Optional. Use an existing HTML page path, for example partnership-lending-at-scale.html.',
      type: 'string',
      group: 'publishing',
      validation: (rule) =>
        rule.custom((value) =>
          !value || /^[a-z0-9][a-z0-9-]*\.html$/.test(value)
            ? true
            : 'Use a filename such as partnership-lending-at-scale.html',
        ),
    }),
    defineField({name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo', validation: (rule) => rule.max(65)}),
    defineField({name: 'seoDescription', title: 'SEO description', type: 'text', rows: 3, group: 'seo', validation: (rule) => rule.max(170)}),
  ],
  orderings: [
    {title: 'Newest first', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'publishedAt',
      media: 'coverImage',
    },
    prepare: ({title, category, date, media}) => ({
      title,
      subtitle: `${
        {
          regulatory: 'Regulatory',
          marketInsights: 'Market Insights',
          operationalInsights: 'Operational Insights',
          eventsUpdates: 'Events & Updates',
        }[category as string] || 'Uncategorised'
      }${date ? ` · ${new Date(date).toLocaleDateString('en-IN')}` : ''}`,
      media,
    }),
  },
})
