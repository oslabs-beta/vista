import {Dispatch, SetStateAction} from "react"

export interface SchemaDisplayProps {
  data: Data,
  setClickField: Dispatch<SetStateAction<{type: string, field: string, data: Data}>>,
  queryAsObj: object,
  setQueryAsObj: Dispatch<SetStateAction<object>>,
  setArgument: Dispatch<SetStateAction<any>>
}

export interface DisplaySchemaContainerProps extends SchemaDisplayProps {
    setData: Dispatch<SetStateAction<Data>>,
  }

export type SchemaData = {
    fields: SchemaFields,
    types: SchemaTypes,
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
    [index: string]: SchemaTypesField[],
}

type SchemaTypesField = {
  isObject: boolean,
  name: string,
}

export type ChildToParent = (query: string) => void

export type ChildData = { schema: {fields: Field[]; types: {}; }, endpoint: string }

export type QueryContainerProps = {
  endpoint: string,
  clickField: ClickField,
  setIsSaveModalOpen: (status: boolean) => void,
  queryAsString: string,
  setQueryAsString: (query: string) => void,
};

export type QueryGenerator = {
    childToParent: ChildToParent, 
    clickField: ClickField,
    queryAsString: string,
    setQueryAsString: (query: string) => void,
    setIsSaveModalOpen: (status: boolean) => void,
  }

export type QueryResult = {data: any, endpoint: string}

export type ClickField = {
  type: string,
  field: string,
  data: {
    isArg?: boolean,
    arguments: string[],
    label: string,
    queryField: boolean,
    type: string,
  }
}

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

export type SaveModalProps = {
  query: string,
  endpoint: string,
  isSaveModalOpen: boolean,
  setIsSaveModalOpen: (status: boolean) => void,
  setIsSaveResponseModalOpen: (status: boolean) => void,
  setSaveResponseStatus: (status: boolean) => void,
};

export type SaveResponseModalProps = {
  isSaveResponseModalOpen: boolean,
  setIsSaveResponseModalOpen: (status: boolean) => void,
  saveResponseStatus: boolean,
};

export type ProfileProps = {
  name: string,
  picture: string,
  linkedIn: string,
  gitHub: string
}

export type BaseDialogProps = {
  openCurrentModal: boolean | undefined
  closeCurrentModalSetter: Dispatch<SetStateAction<boolean>>
  openNextModalSetter?: Dispatch<SetStateAction<boolean>>
  getSchema? : boolean
  childToParent?: (childData:ChildData) => void
  title: string
  description: string
}

