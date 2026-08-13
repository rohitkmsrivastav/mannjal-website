import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'legalEntityName', title: 'Legal entity name', type: 'string'}),
    defineField({name: 'cin', title: 'CIN', type: 'string'}),
    defineField({name: 'registeredOffice', title: 'Registered office', type: 'string'}),
    defineField({name: 'grievanceOfficer', title: 'Grievance officer', type: 'string'}),
    defineField({
      name: 'grievanceEmail',
      title: 'Grievance email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({name: 'complianceNote', title: 'Compliance note', type: 'text', rows: 5}),
    defineField({name: 'copyrightYear', title: 'Copyright year', type: 'string'}),
  ],
})
