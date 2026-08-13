import {defineField, defineType} from 'sanity'

export const resourceTagType = defineType({
  name: 'resourceTag',
  title: 'Topic tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Topic name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 80},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
