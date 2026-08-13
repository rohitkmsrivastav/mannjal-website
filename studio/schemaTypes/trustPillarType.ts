import {defineArrayMember, defineField, defineType} from 'sanity'

export const trustPillarType = defineType({
  name: 'trustPillar',
  title: 'Trust pillar',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Branch', value: 'branch'},
          {title: 'Chart', value: 'chart'},
          {title: 'Shield', value: 'shield'},
        ],
      },
    }),
    defineField({
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'heading', subtitle: 'icon'},
  },
})
