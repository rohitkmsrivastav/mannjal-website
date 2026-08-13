import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-13'})

const topicTags = [
  ['tag-gold-loans', 'Gold Loans', 'gold-loans'],
  ['tag-lap', 'LAP', 'lap'],
  ['tag-msme', 'MSME', 'msme'],
  ['tag-affordable-housing', 'Affordable Housing', 'affordable-housing'],
  ['tag-cooperative-banks', 'Co-operative Banks', 'co-operative-banks'],
  ['tag-nbfcs', 'NBFCs', 'nbfcs'],
  ['tag-sfbs', 'SFBs', 'sfbs'],
  ['tag-cam', 'CAM', 'cam'],
  ['tag-underwriting', 'Underwriting', 'underwriting'],
  ['tag-audit-trails', 'Audit Trails', 'audit-trails'],
  ['tag-co-lending', 'Co-lending', 'co-lending'],
  ['tag-business-correspondent', 'Business Correspondent', 'business-correspondent'],
  ['tag-direct-assignment', 'Direct Assignment', 'direct-assignment'],
  ['tag-digital-lending', 'Digital Lending', 'digital-lending'],
  ['tag-microfinance', 'Microfinance', 'microfinance'],
  ['tag-working-capital', 'Working Capital', 'working-capital'],
  ['tag-lending-operations', 'Lending Operations', 'lending-operations'],
] as const

const resourceUpdates = [
  {
    id: 'resource-partnership-lending-at-scale',
    category: 'operationalInsights',
    tags: ['tag-co-lending', 'tag-lending-operations'],
  },
  {
    id: 'resource-beyond-access-next-chapter-microfinance',
    category: 'marketInsights',
    tags: ['tag-microfinance', 'tag-nbfcs'],
  },
  {
    id: 'resource-msmes-credit-cash-cycle',
    category: 'marketInsights',
    tags: ['tag-msme', 'tag-working-capital'],
  },
] as const

async function migrate() {
  let transaction = client.transaction()

  topicTags.forEach(([id, title, slug]) => {
    transaction = transaction.createOrReplace({
      _id: id,
      _type: 'resourceTag',
      title,
      slug: {_type: 'slug', current: slug},
    })
  })

  resourceUpdates.forEach(({id, category, tags}) => {
    transaction = transaction.patch(id, (patch) =>
      patch.set({
        category,
        contentType: 'article',
        tags: tags.map((tagId) => ({
          _type: 'reference',
          _key: tagId.replace(/^tag-/, ''),
          _ref: tagId,
        })),
      }),
    )
  })

  transaction = transaction.patch('resourcesPage', (patch) =>
    patch
      .set({
        eyebrow: 'Mannjal insights',
        headingLine: 'Insights',
        introduction:
          'Perspectives, developments and conversations shaping the lending ecosystem.',
        closingHeading:
          'Explore the technology and workflows that help lenders respond to changing market and operational needs.',
      })
      .unset(['headingAccent']),
  )

  await transaction.commit()
  console.log('Insights categories, topic tags and homepage positioning are ready.')
}

migrate().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
