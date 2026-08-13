import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'mannjal',
  title: 'Mannjal website',
  projectId: 'su0a7ci0',
  dataset: 'production',
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2026-07-30'}),
  ],
  schema: {
    types: schemaTypes,
    templates: (previousTemplates) =>
      previousTemplates.filter((template) =>
        ['resource', 'resourceTag', 'author'].includes(template.schemaType),
      ),
  },
  document: {
    actions: (previousActions, context) =>
      ['siteSettings', 'resourcesPage'].includes(context.schemaType)
        ? previousActions.filter(
            (action) => !['duplicate', 'delete'].includes(action.action || ''),
          )
        : previousActions,
  },
})
