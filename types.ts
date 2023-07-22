import {Dispatch, SetStateAction} from "react"

export type Props = {
    data: Data,
    setClickField: Dispatch<SetStateAction<{type: string, field: string}>>
  }

export type SchemaData = {
    fields: SchemaFields,
    types: SchemaTypes
  }


export type Data = {
    schema: {
      fields: SchemaFields,
      types: SchemaTypes
    }
    endpoint: string
  }
  
type SchemaFields = Field[]

export type Field = {
    name: string,
    argsRequired: boolean,
    type: string | null,
    errorMessage?: string
}

type SchemaTypes = {
    [index: string]: string[]
}

export type ChildToParent = (schema: Data, endpoint: string) => void

export type ChildData = { schema: {fields: never[]; types: {}; }, endpoint: string }

export type QueryGenerator = {childToParent: ChildToParent, clickField: ClickField}

export type QueryResult = {data: any, endpoint: string}

export type ClickField = {type: string, field: string}

export type TypesData = {
  __schema: {
      types: [NamesOfTypes]
  }
}

type NamesOfTypes = {
  name: string,
  kind: string,
  fields: any,
  __typename: string
}

export type BuildingTheSchemaObject = {
  query:Promise<string>,
  fieldName: string,
  type:string
  reqArgs: string[]
}

export type ArrayOfFields = FieldObject[]

export type FieldObject = {
  name: string,
  argsRequired: boolean,
  type: string,
  errorMessage?: string,
  reqArgs?: any
}

export type QueryFieldsSchema = {
  name: string, 
  type: {
    name: string, 
    __typename: string}, 
   args: {
    name:string, 
    type: {
      kind: string, 
      __typename: string
      },
      __typename:string}[],
   __typename: string
      }