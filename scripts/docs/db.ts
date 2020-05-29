import { collection } from 'typesaurus'
import { FunctionTsDoc } from './types'

const db = {
  packages: collection<Package>('packages'),
  versions: collection<Version>('versions'),
  docs: collection<Doc>('docs'),
}
export default db

export type Package = {
  name: string
  versions: VersionPreview[]
}

export type VersionPreview = {
  version: string
  preRelease: boolean
}

export type Version = {
  package: string
  version: string
  preRelease: boolean
  docs: DocPreview[]
}

export type DocPreview = {
  slug: string
  category: string
  title: string
  summary: string
}

export type Doc = {
  package: string
  version: string
  slug: string
  category: string
  title: string
  summary: string
} & (TsDoc | MarkdownDoc)

export type TsDoc = {
  name: string
  tsdoc: string // TODO: Use bonded JSON of FunctionTsDoc
}

export type MarkdownDoc = {
  markdown: string
}
