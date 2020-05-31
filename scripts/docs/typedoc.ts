export type TypeDocLibrary = {
  id: number
  name: string
  kind: number
  flags: TypeDocLibraryFlags
  originalName: string
  children: TypeDocFunction[]
  groups: TypeDocGroup[]
}

export type TypeDocLibraryFlags = {}

export type TypeDocGroup = {
  title: string
  kind: number
  children: number[]
  categories: TypeDocCategory[]
}

export type TypeDocCategory = {
  title: string
  children: number[]
}

export type TypeDocFunction = {
  id: number
  name: string
  kind: number
  kindString: string
  flags: TypeDocFunctionFlags
  signatures: TypeDocSignature[]
  sources: TypeDocSource[]
  comment?: { tags: TypeDocTag[] }
}

export type TypeDocBaseFlags = {
  isExported: boolean
}

export type TypeDocFunctionFlags = TypeDocBaseFlags & {
  isPublic?: boolean
}

export type TypeDocTag = {
  tag: string
  text: string
}

export type TypeDocSource = {
  fileName: string
  line: number
  character: number
}

export type TypeDocComment = {
  shortText?: string
  returns?: string
  tags?: TypeDocTag[]
}

export type TypeDocReflection = {
  id: number
  name: string
  kind: number
  kindString: string
}

export type TypeDocTypeParameter = TypeDocReflection & {
  flags: TypeDocBaseFlags
  type?: TypeDocType
}

export type TypeDocArgumentParameter = TypeDocReflection & {
  flags: TypeDocArgumentParameterFlags
  type: TypeDocType
  comment?: { text: string }
  defaultValue?: string
}

export type TypeDocArgumentParameterFlags = TypeDocBaseFlags & {
  isRest?: boolean
}

export type TypeDocSignature = TypeDocReflection & {
  flags: TypeDocFunctionFlags
  comment?: TypeDocComment
  typeParameter?: TypeDocTypeParameter[]
  parameters: TypeDocArgumentParameter[]
  type: TypeDocType
}

export type TypeDocDeclaration = TypeDocReflection & {
  signatures?: TypeDocSignature[]
  sources: TypeDocSource[]
  flags: TypeDocBaseFlags
}

export type TypeDocType = {
  type: string
  name?: string
  types?: TypeDocType[]
  constraint?: TypeDocType
  typeArguments?: TypeDocType[]
  elementType?: TypeDocType
  extendsType?: TypeDocType
  target?: TypeDocType
  declaration?: TypeDocDeclaration
  operator?: string
  indexType?: TypeDocType
  objectType?: TypeDocType
  value?: string
  elements?: TypeDocType[]
} & (
  | {
      checkType?: undefined
      trueType?: undefined
      falseType?: undefined
    }
  | {
      checkType: TypeDocType
      trueType: TypeDocType
      falseType: TypeDocType
    }
)
