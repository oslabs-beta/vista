import {Dispatch, SetStateAction} from "react"

export type Props = {
    data: Data,
    setClickField: Dispatch<SetStateAction<{type: string | undefined, field: string}>>
  }


export type Data = {
    schema: {
      fields: SchemaFields,
      types: SchemaTypes
    }
  }
  
type SchemaFields = Field[]

type Field = {
    name: string,
    argsRequired: boolean,
    type: string | null,
    errorMessage?: string
}

type SchemaTypes = {
    [index: string]: string[]
}

export type ChildToParent = (schema: Data, endpoint: string) => void

export type ChildData = {schema: Data, endpoint: string}

export type ClickField = {type: string, field: string}

export type QueryGenerator = {childToParent: ChildToParent, clickField: ClickField}

export type QueryResult = {data: any, endpoint: string}