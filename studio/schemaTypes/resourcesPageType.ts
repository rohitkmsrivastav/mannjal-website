import {defineField, defineType} from 'sanity'

export const resourcesPageType = defineType({
  name: 'resourcesPage',
  title: 'Insights homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Mannjal insights',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headingLine',
      title: 'Heading',
      type: 'string',
      initialValue: 'Insights',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredResource',
      title: 'Featured resource',
      type: 'reference',
      to: [{type: 'resource'}],
    }),
    defineField({
      name: 'closingHeading',
      title: 'Closing heading',
      type: 'string',
      initialValue: 'Explore the technology and workflows that help lenders respond to changing market and operational needs.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Insights homepage'}),
  },
})
