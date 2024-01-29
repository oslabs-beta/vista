import { SchemaData, ArrayOfFields, FieldObject } from '../../../types'
import fetchGraphQLSchema from './requestWrapper'
import getErrorMessage from './getErrorMessage'

export async function parseSchemaAndFormat(apiEndpoint: string) {
  const schemaData: SchemaData = { fields: [], types: {} }
  const introspectionQueryData = await fetchGraphQLSchema(apiEndpoint)
  let fieldsFromIntrospectionQuery

  if (!introspectionQueryData || !introspectionQueryData.types)
    throw new Error('Invalid schema format: Missing introspection data')

  try {
    const arrayOfFieldObjects: ArrayOfFields = []
    fieldsFromIntrospectionQuery = introspectionQueryData.types

    // parse the fields of the schema from the introspection
    for (const obj of fieldsFromIntrospectionQuery) {
      if (obj.name.toLowerCase() === 'query' && obj.kind === 'OBJECT') {
        const fieldsOfTheQuery = obj.fields

        for (const field of fieldsOfTheQuery) {
          const fieldObjectTemplate: FieldObject = {
            name: '',
            argsRequired: false,
            type: '',
            reqArgs: [],
          }

          // accounting for type modifiers such as Lists and Non-Null types by traversing the type object until name is not null
          let currentOfType = field.type
          fieldObjectTemplate.name = field.name

          while (currentOfType) {
            if (currentOfType.kind === 'OBJECT') {
              fieldObjectTemplate.type = currentOfType.name
              break
            } else if (
              currentOfType.kind === 'LIST' ||
              currentOfType.kind === 'NON_NULL'
            ) {
              currentOfType = currentOfType.ofType as any
            } else {
              break
            }
          }

          if (field.args) {
            for (const arg of field.args) {
              if (arg.type.kind === 'NON_NULL') {
                fieldObjectTemplate.argsRequired = true
                fieldObjectTemplate.reqArgs.push(arg.name)
              }
            }
          }
          arrayOfFieldObjects.push(fieldObjectTemplate)
        }
        break
      }
    }
    schemaData.fields = arrayOfFieldObjects
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(
      `Unable to retrieve fields from Introspection Query:${errorMessage}`,
    )
  }

  try {
    for (const type of fieldsFromIntrospectionQuery) {
      if (
        type.kind === 'OBJECT' &&
        type.name.toLowerCase() !== 'query' &&
        !type.name.includes('__')
      ) {
        const fieldsOfTheType = []
        if (type && type.fields) {
          for (const field of type.fields) {
            const { name } = field

            // check if the field is of kind object meaning it adds a new level of nesting we currently don't support
            let isObject = false
            let ofType = field.type as any // Use 'as any' for flexibility

            while (ofType && ofType.kind !== 'OBJECT') {
              if (ofType.kind === 'LIST' || ofType.kind === 'NON_NULL') {
                ofType = ofType.ofType
              } else {
                break
              }
            }

            if (ofType && ofType.kind === 'OBJECT') {
              isObject = true
            }

            fieldsOfTheType.push({
              name,
              isObject,
            })
          }
        }

        schemaData.types[type.name] = fieldsOfTheType
      }
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(
      `Unable to retrieve fields from Introspection Query:${errorMessage}`,
    )
  }

  return schemaData
}
