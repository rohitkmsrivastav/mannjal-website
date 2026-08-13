import {defineField, defineType} from 'sanity'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'For lenders', value: 'lenders'},
          {title: 'For originators', value: 'originators'},
          {title: 'Security', value: 'security'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [
    {title: 'Category and order', name: 'categoryOrder', by: [{field: 'category', direction: 'asc'}, {field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'question', subtitle: 'category'},
  },
})
