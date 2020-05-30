import { collection } from 'typesaurus'
import { TypeDocFunction } from './typedoc'
import { JsonBond } from './bond'

const db = {
  packages: collection<Package>('packages'),
  versions: collection<Version>('versions'),
  pages: collection<Page>('pages'),
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
  pages: PagePreview[]
}

export type PagePreview = {
  slug: string
  category: string
  title: string
  summary: string
}

export type Page = {
  package: string
  version: string
  slug: string
  category: string
  title: string
  summary: string
} & (TsDocPage | MarkdownPage)

export type TsDocPage = {
  type: 'tsdoc'
  name: string
  tsdoc: JsonBond<TypeDocFunction>
}

export type MarkdownPage = {
  type: 'markdown'
  markdown: string
}
