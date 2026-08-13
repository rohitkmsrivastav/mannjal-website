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
    'Consider a borrower who began with a small group loan to buy stock for a provisions shop. The purpose was practical: fill the shelves, keep the shop open through a slow month and repay on time. Over several cycles, the shop builds regular customers, stock moves faster and the borrower starts buying in larger quantities.',
  ],
  [
    'The next loan may still arrive in the same form. The borrower may accept it because the relationship is familiar and the process is known, even as the need has moved on. The business now needs working capital that matches its inventory cycle, a larger facility for a new supplier or a different repayment structure during seasonal demand.',
  ],
  [
    'That gap between the borrower a lender first met and the borrower standing in front of it today is the question microfinance now has to confront.',
  ],
  ['What the first loan made possible', 'h2'],
  [
    'The group lending model is sometimes discussed only through its product structure. For a borrower, its significance is practical. It creates a first transaction with a formal lender, makes repayment visible and gives the borrower a history that can matter the next time money is needed.',
  ],
  [
    'That history is built through ordinary economic activity. A shopkeeper manages inventory, a tailor buys fabric before an order is paid for, and a small trader carries stock through a festival season. The loan is part of a working livelihood, and repayment depends on how that livelihood behaves.',
  ],
  [
    'That relationship is an asset. An MFI has seen how a borrower handles money over time and may understand the local market, the seasonality of income and the difference between a temporary setback and a change in the business. It also has field staff and a route to the customer that a distant lender may find difficult to create.',
  ],
  [
    "Progression begins when the lender recognises that the current product no longer describes the customer's need and assesses the next step with the same care that made the first relationship work. Some borrowers will be ready for more credit; others will need time or a different form of support.",
  ],
  ['A repayment record needs context', 'h2'],
  [
    'Repeated repayment tells a lender something important, but it does not tell the whole story. A borrower can repay reliably and still have a business with thin margins, uneven cash flow or several obligations across the household. Another borrower may have grown a stable enterprise that is ready for a different type of credit.',
  ],
  [
    'The distinction matters because the same loan, repeated indefinitely, can become a poor fit. It may be too small to fund the next opportunity, too short for the business cycle or structured around a group when the borrower now needs an individual facility. The borrower may be progressing while the product remains fixed.',
  ],
  [
    'This is where assessment has to become more than a review of past repayment. The lender needs to understand household income, existing obligations, business cash flow and the purpose of the next loan, distinguish growth capital from debt that simply fills a recurring shortfall, and test whether the next product is affordable under the borrower\'s actual conditions.',
  ],
  [
    "The Reserve Bank of India's current microfinance directions require regulated entities to assess household income and limit monthly repayment obligations to 50% of monthly household income, subject to the directions and applicable policies. The cap is a guardrail. It cannot decide what a borrower needs; it reinforces the need to understand the household before extending more credit. RBI Regulatory Framework for Microfinance Loans Directions, 2022, updated October 10, 2024: https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D12256%282%29.html.",
  ],
  [
    'Responsible progression begins with that discipline. A borrower earns the opportunity to be assessed for the next stage; a repayment history should not become an automatic approval for it.',
  ],
  ['Diversification should follow the borrower', 'h2'],
  [
    'For MFIs, product diversification can sound like a strategic decision made in a boardroom. For a borrower, it is more useful when it follows a change in the livelihood or enterprise.',
  ],
  [
    'An individual business loan may suit a borrower whose activity and cash flows are now distinct from the group. An unsecured enterprise facility may help manage stock or fulfil an order. A micro-LAP or another secured product may fit a more established enterprise with an asset and a larger, longer-term need.',
  ],
  [
    'These products carry different obligations, documentation and risks. The lender needs a pathway that explains what evidence supports a transition, what affordability checks apply and what happens when the borrower is not ready. The aim is to keep the credit relationship aligned with the work that generates repayment.',
  ],
  [
    'That alignment also protects the MFI. A portfolio concentrated in one product can become vulnerable when the same customer segment faces the same shock, or when growth depends on lending more to borrowers whose needs have already changed. A measured product pathway gives the institution more ways to serve a customer and more information with which to manage risk.',
  ],
  [
    'Product expansion still requires underwriting capability, data quality, collections practice and staff training. Without them, a new product can confuse field teams and borrowers while leaving the organisation no better at making sound decisions.',
  ],
  ['The advantage MFIs already have', 'h2'],
  [
    'Many lenders spend years trying to build what MFIs already possess: trust in a local market, a repayment history, regular field contact and an understanding of how small businesses operate when income is not received in a neat monthly salary.',
  ],
  [
    'That advantage is easy to lose if the relationship becomes only a channel for another loan cycle. A borrower who has repaid successfully should not have to start from zero when the need changes. The MFI\'s knowledge should inform the next assessment, which must still protect the borrower and the institution.',
  ],
  [
    "This changes the field conversation. Alongside repayment, staff need to understand the borrower's current plan: whether the business is buying more inventory, whether household income has changed, whether the next loan funds productive activity or an existing obligation, and what repayment would look like in a difficult month.",
  ],
  [
    'Those questions do not turn a field relationship into a spreadsheet. They make the information from the relationship useful to a responsible credit process.',
  ],
  ['Progression has to work operationally', 'h2'],
  [
    'The customer journey may look simple in principle: begin with a group loan, build a record and move to a product that fits the next stage. In practice, it can involve new policies, new documents, a different underwriting process and, in some cases, another lending partner.',
  ],
  [
    'The MFI needs to know which borrowers are eligible to be considered, what information must be collected, who makes the decision and how the reason for the decision is recorded. The transition should feel like a continuation of the relationship, connected to what came before.',
  ],
  [
    'For an MFI managing more than one product or lender, the work also has to remain visible to the teams running it. A case should carry its history, affordability assessment, documents and next action. Field staff should know what the particular product requires, while credit teams can see the context without relying on a private conversation or a paper file.',
  ],
  [
    'The same discipline applies when the answer is no. A borrower who is not ready for a larger facility still deserves a clear explanation and a path to remain in the relationship. Responsible progression includes knowing when to wait.',
  ],
  ['The next chapter is a better question', 'h2'],
  [
    'Microfinance can retain its original purpose while serving the changing needs of its customers. That purpose gives it the right foundation for the next stage: a relationship built through trust, repayment and proximity.',
  ],
  [
    "The institution's task is to turn that foundation into a thoughtful product pathway: recognising a borrower's progress without treating it as permission to over-borrow, offering a product that fits the enterprise, and carrying the customer history forward as products, policies and partners change.",
  ],
  [
    'MFIs are well placed to ask these questions because they already know that credit is connected to a livelihood. The next phase is to make the institution\'s products and processes reflect that knowledge.',
  ],
  [
    'Mannjal supports this kind of partnership-lending infrastructure. As lenders and originators build more deliberate pathways across products, each case needs configured checks, ownership, documents and reporting. The originating institution keeps the customer relationship, the lender keeps its credit policy and decision, and the operating layer keeps the relationship visible as the borrower moves forward.',
  ],
  [
    "The sector's next chapter should carry that original access forward by staying relevant to customers as their work, household and credit needs change.",
  ],
] as const

const body = content.map(([text, style]) => block(text, style || 'normal'))

async function createDraft() {
  await client.createOrReplace({
  _id: 'drafts.resource-beyond-access-next-chapter-microfinance',
  _type: 'resource',
  title: 'Beyond Access: The Next Chapter of Microfinance',
  slug: {_type: 'slug', current: 'beyond-access-next-chapter-microfinance'},
  contentType: 'article',
  category: 'marketInsights',
  excerpt:
    'Microfinance opened the door to formal credit for millions of households. The next challenge is serving borrowers whose needs have changed, with products and decisions that change with them.',
  body,
  author: {_type: 'reference', _ref: 'author-mannjal'},
  tags: [
    {_type: 'reference', _key: 'microfinance', _ref: 'tag-microfinance'},
    {_type: 'reference', _key: 'nbfcs', _ref: 'tag-nbfcs'},
  ],
  publishedAt: '2026-07-30T00:00:00.000Z',
  readingTime: 8,
  seoTitle: 'Beyond Access: The Next Chapter of Microfinance',
  seoDescription:
    'Why microfinance progression needs products, affordability checks and operating pathways that change with the borrower.',
  })

  console.log('Created draft: Beyond Access: The Next Chapter of Microfinance')
}

createDraft().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
