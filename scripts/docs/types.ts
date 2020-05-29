import docs from '../../docs/docs.json'

export type FunctionTsDoc = typeof docs.children extends Array<infer Item>
  ? Item
  : never
