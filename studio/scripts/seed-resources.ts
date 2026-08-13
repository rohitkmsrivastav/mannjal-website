import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'

const client = getCliClient({apiVersion: '2026-07-30'})

let keyIndex = 0
const nextKey = (prefix: string) => `${prefix}-${String(++keyIndex).padStart(3, '0')}`
const block = (text: string, style = 'normal') => ({
  _type: 'block',
  _key: nextKey('block'),
  style,
  markDefs: [],
  children: [
    {
      _type: 'span',
      _key: nextKey('span'),
      text,
      marks: [],
    },
  ],
})

const body = [
  block("A small-business loan can begin with a field officer, move through an originator's operations team, reach a lender's credit desk and come back with a query. The borrower experiences one application. Inside the partnership, several teams may be working with different formats, checks and definitions of what should happen next."),
  block('Underwriting may be part of the delay, but a case can also slow because the process around it has not been designed as a whole: a document is missing, a field means something different in two systems, or a query sits in an inbox while the person who can answer it waits for context. By the time the case reaches the next desk, its history has been scattered across a spreadsheet, an email chain and a messaging thread.'),
  block('That is the central operating problem in partnership lending: the institutions may agree on the program, but the case still has to travel between them. It needs one visible path, clear ownership at every hand-off and a record that stays intact as responsibility moves.'),
  block('Different structures, one operating challenge', 'h2'),
  block("The Business Correspondent model extended a bank's reach through local institutions and customer-facing teams. It helped bring formal financial services closer to people and businesses that a branch-led model could not easily serve."),
  block('Co-lending addresses a related question from a different angle. A bank can contribute balance-sheet capacity and a lower cost of funds. An NBFC or other originator can contribute customer understanding, distribution and field reach. The two institutions can bring those strengths into the same lending journey.'),
  block('The structures are different, but they share an operating challenge. The institution closest to the customer may not be the institution making the credit decision. Information, responsibility and evidence have to move between them without losing their meaning, and that work begins after the agreement is signed.'),
  block('Where a case loses momentum', 'h2'),
  block('At the level of senior management, a partnership can look complete once the commercial terms are agreed, responsibilities are documented and the program is approved. Its operational reality appears when the case moves.'),
  block("An originator may submit an application with a clear understanding of the customer's business and repayment pattern. The lender may need additional fields, documents or checks before it can apply its policy, sending the request back through the originator and field team to the customer. The response then returns to the lender, sometimes in a format that still needs interpretation."),
  block('Each step makes sense on its own, yet the hand-offs create friction. Problems accumulate when a complete submission is undefined, query ownership is unclear or a change is recorded without its reason: the lender receives rework, the case waits and the next person sees a status without the context behind it.'),
  block('At low volumes, experienced people compensate by remembering lender requirements, keeping private trackers and knowing whom to call when a case stalls. A program can appear healthy while relying on a small number of people to hold its logic in their heads.'),
  block('As the program grows, the spare attention that was hiding the design problem disappears. An originator managing several lenders has to maintain different formats, policy requirements and reporting routines. A lender adding partners has to oversee more variations in how cases arrive and more places where information can be lost. The cost shows up in rework, slower turnaround, idle capacity and a customer who has no clear explanation for the delay.'),
  {
    _type: 'callout',
    _key: nextKey('callout'),
    heading: 'The operating test',
    text: 'A case should carry its current status, next action, evidence and context so that progress does not depend on a separate request for an update.',
  },
  block('What a scalable partnership needs', 'h2'),
  block('A scalable partnership begins with a shared case journey. Partners need to agree on the stages, required inputs, decision points and ownership, then make those choices visible to the teams who use them. A case should carry its current status and next action so that progress does not depend on a separate request for an update.'),
  block('Information quality is part of that journey. When fields, documents and checks are defined before a case reaches the lender, the submission is easier to review and the reasons for a query are easier to state. The lender can apply its own policy and make its own credit decision with a complete record of what it received and what was checked.'),
  block('That only works if the case history remains intact. A hand-off carries responsibility, evidence and context. Recording that history gives the next team something to work with and gives managers a way to see patterns across cases. Repeated queries, ageing stages and recurring exceptions become signals about the program, rather than isolated incidents that have to be explained from memory.'),
  block('The boundaries between the partners must remain clear. The originator owns its customer relationship and the quality of what it brings into the process. The lender owns its policy, risk assessment and credit decision. The operating layer connects those responsibilities and makes performance visible without taking the decision away from the institution that is meant to make it.'),
  block('The measure of partnership is what happens next', 'h2'),
  block('Partnership lending is often described in terms of complementary capabilities. The more practical test is what those capabilities produce together.'),
  block('The borrower should experience a lending journey that keeps its momentum. The originator should be able to manage more than one lender without recreating the process each time, while the lender receives the information, evidence and ownership needed for a sound decision.'),
  block('Mannjal gives originators and lenders a configured workflow that carries each case through intake and checks, preserves queries and approvals, and produces reconciliation and reporting from the same record. The originator keeps its customer relationship. The lender keeps its credit policy and decision. Both partners get a shared process and a reliable record of what is happening to each case.'),
  block('The commercial agreement defines what the partners intend to do. The operating design determines whether they can do it repeatedly, with control, as the program grows.'),
]

async function seed() {
  const coverPath = resolve(
    process.cwd(),
    '../assets/article-partnership-lending-at-scale-hero.png',
  )
  const coverAsset = await client.assets.upload('image', createReadStream(coverPath), {
    filename: 'partnership-lending-at-scale.png',
    title: 'Partnership Lending at Scale',
  })

  const transaction = client.transaction()

  const tags = [
    ['tag-co-lending', 'Co-lending', 'co-lending'],
    ['tag-lending-operations', 'Lending Operations', 'lending-operations'],
  ]

  for (const [id, title, slug] of tags) {
    transaction.createOrReplace({
      _id: id,
      _type: 'resourceTag',
      title,
      slug: {_type: 'slug', current: slug},
    })
  }

  transaction.createOrReplace({
    _id: 'author-mannjal',
    _type: 'author',
    name: 'Mannjal',
    role: 'Partnership lending infrastructure',
    bio: 'Perspectives from the Mannjal team on the operating systems behind partnership lending.',
  })

  transaction.createOrReplace({
    _id: 'resource-partnership-lending-at-scale',
    _type: 'resource',
    title: 'Partnership Lending at Scale: Designing the System Between Lenders',
    slug: {_type: 'slug', current: 'partnership-lending-at-scale'},
    contentType: 'article',
    category: 'operationalInsights',
    excerpt:
      'A partnership can combine local knowledge with institutional capital. The outcome depends on whether every case has one visible path through the organisations involved.',
    coverImage: {
      _type: 'image',
      asset: {_type: 'reference', _ref: coverAsset._id},
      alt: 'Partnership Lending at Scale, illustrated as one connected workflow between documents, a lender, an originator, queries and checks.',
    },
    body,
    author: {_type: 'reference', _ref: 'author-mannjal'},
    tags: [
      {_type: 'reference', _key: 'co-lending', _ref: 'tag-co-lending'},
      {_type: 'reference', _key: 'lending-operations', _ref: 'tag-lending-operations'},
    ],
    publishedAt: '2026-07-30T00:00:00.000Z',
    readingTime: 6,
    legacyPath: 'partnership-lending-at-scale.html',
    seoTitle: 'Partnership Lending at Scale: Designing the System Between Lenders',
    seoDescription:
      'How lenders and originators can design one visible, controlled case journey for partnership lending at scale.',
  })

  transaction.createOrReplace({
    _id: 'resourcesPage',
    _type: 'resourcesPage',
    eyebrow: 'Mannjal insights',
    headingLine: 'Insights',
    introduction:
      'Perspectives, developments and conversations shaping the lending ecosystem.',
    featuredResource: {
      _type: 'reference',
      _ref: 'resource-partnership-lending-at-scale',
    },
    closingHeading:
      'Explore the technology and workflows that help lenders respond to changing market and operational needs.',
  })

  await transaction.commit()
  console.log('Insights homepage, topic tags, author, and first article are ready.')
}

seed().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
