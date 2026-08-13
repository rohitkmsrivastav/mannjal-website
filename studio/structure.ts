import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Mannjal Insights')
    .items([
      S.listItem()
        .title('Insights homepage')
        .id('resourcesPage')
        .child(
          S.document()
            .schemaType('resourcesPage')
            .documentId('resourcesPage')
            .title('Insights homepage'),
        ),
      S.divider(),
      S.documentTypeListItem('resource').title('Articles & updates'),
      S.listItem()
        .title('Topic tags')
        .schemaType('resourceTag')
        .child(
          S.documentTypeList('resourceTag')
            .title('Topic tags')
            .filter('_type == "resourceTag" && !(_id in $legacyIds)')
            .params({
              legacyIds: [
                'tag-industry-news',
                'tag-point-of-view',
                'tag-thought-leadership',
                'tag-case-studies',
              ],
            }),
        ),
      S.documentTypeListItem('author').title('Authors'),
    ])
