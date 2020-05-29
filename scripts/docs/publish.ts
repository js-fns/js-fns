import docs from '../../docs/docs.json'
import db from './db'
import admin from 'firebase-admin'
import { add, update, value, batch, id } from 'typesaurus'
import { FunctionTsDoc } from './types'
import { pick } from '../../src'

admin.initializeApp()

const packageName = 'js-fns'
const version = process.env.VERSION

const versionRegExp = /^v\d+\.\d+\.\d+(-(alpha|beta|rc)(\.\d+)?)?$/
const preReleaseRegExp = /(-(alpha|beta|rc)(\.\d+)?)?$/

if (!version || !versionRegExp.test(version)) {
  console.error(`(•̀o•́)ง VERSION is invalid "${version}"`)
  process.exit(1)
}

const preRelease = preReleaseRegExp.test(version)

const fnDocs = docs.children.map((tsdoc) => {
  const { name } = tsdoc
  const category = findCategory(tsdoc) || 'Common'
  const summary = findSummary(tsdoc) || ''
  return {
    package: packageName,
    version,
    slug: name,
    category,
    title: name,
    summary,
    name,
    tsdoc: JSON.stringify(tsdoc),
  }
})

const docsBatch = batch()

Promise.all([
  update(db.packages, packageName, {
    versions: value('arrayUnion', [{ version, preRelease }]),
  }),

  add(db.versions, {
    package: packageName,
    version,
    preRelease,
    docs: fnDocs.map((doc) =>
      pick(doc, ['slug', 'category', 'title', 'summary'])
    ),
  }),

  Promise.all(
    fnDocs.map((doc) =>
      id().then((docId) => docsBatch.set(db.docs, docId, doc))
    )
  ).then(() => docsBatch.commit()),
]).then(() => {
  console.log('Done!')
  process.exit(0)
})

function findCategory(tsdoc: FunctionTsDoc) {
  const category = docs.groups[0].categories.find((category) =>
    category.children.includes(tsdoc.id)
  )
  return category?.title
}

function findSummary(tsdoc: FunctionTsDoc) {
  for (const signature of tsdoc.signatures) {
    const summary = signature.comment.shortText
    if (summary) return summary
  }
}
