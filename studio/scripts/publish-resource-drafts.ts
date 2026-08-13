import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-30'})
const draftIds = [
  'drafts.resource-beyond-access-next-chapter-microfinance',
  'drafts.resource-msmes-credit-cash-cycle',
]

async function publishDrafts() {
  const drafts = await client.getDocuments(draftIds)
  const transaction = client.transaction()
  let published = 0

  drafts.forEach((draft) => {
    if (!draft) return
    const {_id, _rev, _createdAt, _updatedAt, ...content} = draft
    const publishedId = _id.replace(/^drafts\./, '')
    transaction.createOrReplace({_id: publishedId, ...content})
    transaction.delete(_id)
    published += 1
  })

  if (published) await transaction.commit()
  console.log(`Published ${published} resource draft${published === 1 ? '' : 's'}.`)
}

publishDrafts().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
