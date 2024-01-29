import { expect, jest, test } from '@jest/globals'
import { getSchema } from '../src/utils/getSchema'
import * as schemaUtils from '../src/utils/parseSchemaAndFormat'

interface SchemaData {
  fields: {
    name: string
    argsRequired: boolean
    type: string
    reqArgs: string[]
  }[]
  types: {
    [typeName: string]: {
      name: string
      isObject: boolean
    }[]
  }
}

jest.mock('../src/utils/parseSchemaAndFormat')

const validSchema: SchemaData = {
  fields: [
    {
      name: 'MockField1',
      argsRequired: false,
      type: 'String',
      reqArgs: [],
    },
    {
      name: 'MockField2',
      argsRequired: true,
      type: 'Int',
      reqArgs: ['arg1'],
    },
    {
      name: 'MockField3',
      argsRequired: true,
      type: 'ID',
      reqArgs: ['arg1'],
    },
  ],
  types: {
    SampleType1: [
      {
        name: 'Field1',
        isObject: false,
      },
      {
        name: 'Field2',
        isObject: true,
      },
      {
        name: 'Field3',
        isObject: true,
      },
    ],
  },
}

describe('getSchema function', () => {
  it('should retrieve a valid GraphQL schema', async () => {
    ;(
      schemaUtils.parseSchemaAndFormat as jest.MockedFunction<
        typeof schemaUtils.parseSchemaAndFormat
      >
    ).mockResolvedValue(validSchema)

    const formData = new FormData()
    formData.append('endpoint-url', 'https://countries.trevorblades.com/')

    const result = await getSchema(formData)

    expect(schemaUtils.parseSchemaAndFormat).toHaveBeenCalledWith(
      'https://countries.trevorblades.com/',
    )
    expect(result.schema).toEqual(validSchema)
    expect(result.err).toBe(false)
  })

  it('should throw an error for invalid endpoint', async () => {
    const formData = new FormData()
    formData.append('endpoint-url', '')

    await expect(getSchema(formData)).rejects.toThrow('Invalid endpoint')
  })

  it('should propagate an error when parseSchemaAndFormat fails', async () => {
    const mockError = new Error('Failed to fetch schema')
    ;(
      schemaUtils.parseSchemaAndFormat as jest.MockedFunction<
        typeof schemaUtils.parseSchemaAndFormat
      >
    ).mockRejectedValue(mockError)

    const formData = new FormData()
    formData.append('endpoint-url', 'https://countries.trevorblades.com/')

    await expect(getSchema(formData)).rejects.toThrow(mockError)
  })

  it('should return err=true for empty schema', async () => {
    ;(
      schemaUtils.parseSchemaAndFormat as jest.MockedFunction<
        typeof schemaUtils.parseSchemaAndFormat
      >
    ).mockResolvedValue({ fields: [], types: {} })

    const formData = new FormData()
    formData.append('endpoint-url', 'https://countries.trevorblades.com/')

    const result = await getSchema(formData)

    expect(result.err).toBe(true)
    expect(result.schema).toEqual({ fields: [], types: {} })
  })
})
