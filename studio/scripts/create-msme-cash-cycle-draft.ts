import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-30'})

let keyIndex = 0
const nextKey = (prefix: string) => `${prefix}-${String(++keyIndex).padStart(3, '0')}`
const block = (text: string, style = 'normal') => ({
  _type: 'block',
  _key: nextKey('block'),
  style,
  markDefs: [],
  children: [{_type: 'span', _key: nextKey('span'), text, marks: []}],
})

const content = [
  [
    'An MSME loan is often described as growth capital. For the business receiving it, the immediate question is usually simpler: can I buy what I need, deliver what I promised and keep the business moving until the next payment arrives?',
  ],
  [
    'A small retailer may have sales in a notebook, stock that needs replacing and a supplier invoice due before some customers settle their monthly accounts. A tailor may receive a large order before having the cash to buy fabric. A repair shop may have work waiting while a machine sits idle. A local manufacturer may have an order in hand but need to pay for raw material before the buyer pays for the finished goods.',
  ],
  [
    'These businesses are familiar because they are part of daily life. We know the shopkeeper, the tailor, the salon owner, the chemist and the small manufacturer as people before we think of them as enterprises. Their businesses may be modest in size, but the decisions inside them are constant and consequential. A missed purchase can mean a missed sale. A delayed payment can affect wages, rent or the next order.',
  ],
  [
    'That is why the conversation about MSME finance needs to include continuity. Credit can help a business expand, but it also helps the business remain open, productive and dependable through the ordinary unevenness of trade.',
  ],
  ['A familiar form of enterprise', 'h2'],
  [
    "The Ministry of MSME's RAMP programme describes the sector as contributing 29% of India's GDP in 2021-22, 36% of manufacturing output in 2021-22 and 44% of exports in 2022-23. It also describes MSMEs as a major source of employment across manufacturing, trade and services. Ministry of MSME, RAMP programme: https://ramp.msme.gov.in/ramp/about-us/about-ramp.",
  ],
  [
    'Those numbers matter, but they can make the sector sound more uniform than it is. MSME is a classification, not a single business model. It includes a local trader with two employees, a service enterprise with recurring contracts, a workshop making components for a larger manufacturer and a small exporter managing orders across borders.',
  ],
  [
    'What these businesses share is a close relationship between cash and activity. Money comes in when a customer pays, an order is delivered or inventory turns. Money goes out earlier for stock, wages, rent, transport, utilities, repairs and suppliers. A business can be profitable over a year and still face a difficult week because cash is tied up in the cycle.',
  ],
  [
    'The owner lives inside that cycle. They decide which supplier to pay first, whether to accept a larger order, how much stock to carry and whether a delayed receivable can be managed without borrowing. These are financing decisions, even when no one uses that language.',
  ],
  ['Continuity is part of growth', 'h2'],
  [
    'The distinction between working capital and growth capital can be useful for a lender, but a business experiences them as connected needs.',
  ],
  [
    'A retailer that borrows to hold more fast-moving stock may serve more customers. A manufacturer that borrows to buy material for a confirmed order may increase revenue. A service business that uses credit to pay a technician or replace equipment may protect the contracts that allow it to grow.',
  ],
  [
    'The business does not always grow in a straight line. Demand may rise before cash arrives. A festival may create a short peak. A large customer may pay on a longer cycle than a local one. A machine may need repair at the worst possible time. Credit that arrives too late can miss the opportunity; credit with the wrong repayment pattern can make the opportunity harder to manage.',
  ],
  [
    "This is why a timely facility can matter even when it does not fund a new branch, a larger premises or a major purchase. It protects the operating cycle that makes those decisions possible later. Continuity gives the business room to make a sensible growth decision instead of forcing the owner to choose between fulfilling today's order and meeting today's obligation.",
  ],
  ['Why the right credit is difficult to design', 'h2'],
  [
    "Small businesses rarely present a lender with a perfectly organised financial story. Records may be spread across bank statements, invoices, notebooks, digital payments and supplier relationships. Income may vary by season. The owner may combine household and business cash because both depend on the same enterprise.",
  ],
  [
    'These characteristics can make underwriting harder, but they do not necessarily indicate a weak business. They indicate a business whose evidence sits in several places and whose cash flow needs to be understood in context.',
  ],
  [
    'The amount of credit is only one part of the fit. Timing matters. So do tenure, repayment frequency, collateral requirements and the way the lender treats an uneven month. A facility that is technically available but arrives after the supplier deadline has limited use. A loan whose instalments ignore the business cycle can turn working capital into another source of pressure.',
  ],
  [
    'Appropriate MSME finance therefore asks practical questions. What is the money for? When will it be used? When will the cash come back? Which part of the business generates the repayment? What happens if the customer pays late or the season is weaker than expected?',
  ],
  [
    'Those questions are useful because they connect the loan to the enterprise rather than treating the enterprise as a score or a document set. They also help the lender distinguish a temporary timing need from a business that is borrowing repeatedly to cover a structural shortfall.',
  ],
  ['The value of local understanding', 'h2'],
  [
    'An originator or local lender often sees details that a distant credit process cannot easily capture. It may know whether a shop has regular footfall, whether a manufacturer has repeat orders, whether the owner has managed difficult seasons before or whether a sudden change is part of a wider local pattern.',
  ],
  [
    'That knowledge should improve the quality of the credit decision. It should not replace discipline. A lender still needs reliable information, consistent checks and a clear view of existing obligations. Local familiarity becomes valuable when it is recorded and connected to the decision, rather than left as an informal impression that disappears at the next hand-off.',
  ],
  [
    'The same principle applies to lenders working through partnerships. The institution closest to the business may know the customer best, while another lender provides capital or a different form of risk capacity. The borrower should not have to repeat the entire story each time the case moves between them.',
  ],
  [
    'The process needs to preserve the business context alongside the formal documents. A query should identify what is missing and why it matters. A response should remain attached to the case. The lender should be able to see the information that supports the decision, while the originator should be able to see what happens next.',
  ],
  ['What continuity-focused finance looks like in practice', 'h2'],
  [
    'Good MSME finance is specific without becoming inflexible. It uses the lender\'s policy, but leaves enough room to understand how a business actually earns and repays.',
  ],
  [
    'That may mean a working-capital facility tied to a stock cycle, a term loan for equipment, an individual business loan for a borrower who has outgrown a group product or a secured facility for a more established enterprise. The product matters, but so do the checks around it and the way the case is managed after approval.',
  ],
  [
    'For the business owner, the experience should be straightforward. The lender asks for information that has a purpose, gives a clear answer and sets a repayment schedule the business can plan around. For the operations team, the process should make it possible to see which cases are waiting, what is holding them up and whether the same query is appearing repeatedly.',
  ],
  [
    'This is where partnership-lending infrastructure can support MSME finance. Mannjal gives originators and lenders a configured workflow for intake, document checks, queries, approvals, reconciliation and reporting. The originator keeps the customer relationship and local context. The lender keeps its policy and credit decision. The case carries its evidence and next action as it moves between them.',
  ],
  ['The business behind the category', 'h2'],
  [
    'Calling a business an MSME helps a lender classify it. It does not explain how that business survives a slow week, manages a supplier or decides whether to accept its next order.',
  ],
  [
    'Finance that reflects those realities does more than make capital available. It helps the owner keep promises to customers, employees and suppliers. It gives the business time to turn activity into cash, and cash into the next decision.',
  ],
  [
    "India's small businesses are familiar because they are woven into everyday life. Their scale may be small, but the work of keeping them moving is not. The right credit recognises that continuity is part of growth.",
  ],
] as const

const body = content.map(([text, style]) => block(text, style || 'normal'))

async function createDraft() {
  await client.createOrReplace({
    _id: 'drafts.resource-msmes-credit-cash-cycle',
    _type: 'resource',
    title: "India's MSMEs Need Credit That Fits the Cash Cycle",
    slug: {_type: 'slug', current: 'msmes-credit-that-fits-the-cash-cycle'},
    contentType: 'article',
    category: 'marketInsights',
    excerpt:
      "For India's familiar businesses, finance often begins with continuity: buying inventory, fulfilling an order, paying people and getting through a slow month.",
    body,
    author: {_type: 'reference', _ref: 'author-mannjal'},
    tags: [
      {_type: 'reference', _key: 'msme', _ref: 'tag-msme'},
      {_type: 'reference', _key: 'working-capital', _ref: 'tag-working-capital'},
    ],
    publishedAt: '2026-07-30T00:00:00.000Z',
    readingTime: 8,
    seoTitle: "India's MSMEs Need Credit That Fits the Cash Cycle",
    seoDescription:
      'Why MSME finance should follow the cash cycle, local context and operating realities of the businesses it serves.',
  })

  console.log('Created draft: India\'s MSMEs Need Credit That Fits the Cash Cycle')
}

createDraft().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
