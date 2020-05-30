import docs from '../../docs/docs.json'
import db, { Page } from './db'
import admin from 'firebase-admin'
import { add, update, value, batch, id, get } from 'typesaurus'
import { TypeDocFunction } from './typedoc'
import { pick } from '../../src'
import { stringify } from './bond'

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

const fnPages: Page[] = docs.children.map((tsdoc: TypeDocFunction) => {
  const { name } = tsdoc
  const category = findCategory(tsdoc) || 'Common'
  const summary = findSummary(tsdoc) || ''
  return {
    type: 'tsdoc',
    package: packageName,
    version,
    slug: name,
    category,
    title: name,
    summary,
    name,
    tsdoc: stringify(tsdoc),
  }
})

const pagesBatch = batch()

Promise.all([
  update(db.packages, packageName, {
    versions: value('arrayUnion', [{ version, preRelease }]),
  }),

  add(db.versions, {
    package: packageName,
    version,
    preRelease,
    pages: fnPages.map((page) =>
      pick(page, ['slug', 'category', 'title', 'summary'])
    ),
  }),

  Promise.all(
    fnPages.map((page) =>
      id().then((pageId) => pagesBatch.set(db.pages, pageId, page))
    )
  ).then(() => pagesBatch.commit()),
]).then(() => {
  console.log('Done!')
  process.exit(0)
})

function findCategory(tsdoc: TypeDocFunction) {
  const category = docs.groups[0].categories.find((category) =>
    category.children.includes(tsdoc.id)
  )
  return category?.title
}

function findSummary(tsdoc: TypeDocFunction) {
  for (const signature of tsdoc.signatures) {
    const summary = signature.comment.shortText
    if (summary) return summary
  }
}
