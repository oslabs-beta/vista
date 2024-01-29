import { GraphQLClient, gql, request } from 'graphql-request'
import { expect, jest, test } from '@jest/globals'
import { fetchGraphQLSchema } from '../src/utils/requestWrapper'
import { parseSchemaAndFormat } from '../src/utils/parseSchemaAndFormat'

jest.mock('../src/utils/requestWrapper', () => ({
  fetchGraphQLSchema: jest.fn((apiEndpoint) => {
    if (apiEndpoint === 'http://invalid-graphql-schema.com') {
      return Promise.reject(
        new Error('Invalid schema format: Missing introspection data'),
      )
    }
    return Promise.resolve({
      __schema: {
        types: [
          {
            kind: 'OBJECT',
            name: 'Query',
            fields: [
              {
                name: 'simpleQueryTest',
                type: {
                  kind: 'SCALAR',
                  name: 'String',
                },
                args: [],
              },
            ],
          },
          {
            kind: 'SCALAR',
            name: 'String',
            fields: null,
          },
        ],
      },
    })
  }),
}))

describe('parseSchemaAndFormat function', () => {
  it('should correctly parse a valid simple schema', async () => {
    const expectedSimpleSchemaData = {
      fields: [
        {
          name: 'simpleQueryTest',
          argsRequired: false,
          type: 'String',
          reqArgs: [],
        },
      ],
      types: {
        Query: [
          {
            name: 'simpleQueryTest',
            isObject: false,
          },
        ],
      },
    }

    const result = await parseSchemaAndFormat('http://mock-api.com/graphql')
    expect(result).toEqual(expectedSimpleSchemaData)
  })

  it('should correctly parse a valid complex GraphQL schema', async () => {
    jest.mocked(fetchGraphQLSchema).mockResolvedValueOnce({
      __schema: {
        types: [
          {
            kind: 'OBJECT',
            name: 'Query',
            fields: [
              {
                name: 'complexQuery1',
                type: {
                  kind: 'OBJECT',
                  name: 'ComplexType1',
                },
                args: [
                  {
                    name: 'arg1',
                    type: {
                      kind: 'SCALAR',
                      name: 'String',
                    },
                  },
                  {
                    name: 'arg2',
                    type: {
                      kind: 'SCALAR',
                      name: 'Int',
                    },
                  },
                ],
              },
              {
                name: 'complexQuery2',
                type: {
                  kind: 'OBJECT',
                  name: 'ComplexType2',
                },
                args: [],
              },
            ],
          },
          {
            kind: 'OBJECT',
            name: 'ComplexType1',
            fields: [
              {
                name: 'nestedField1',
                type: {
                  kind: 'OBJECT',
                  name: 'NestedType1',
                },
                args: [],
              },
              {
                name: 'nestedField2',
                type: {
                  kind: 'SCALAR',
                  name: 'Boolean',
                },
                args: [],
              },
            ],
          },
          {
            kind: 'OBJECT',
            name: 'ComplexType2',
            fields: [
              {
                name: 'nestedField3',
                type: {
                  kind: 'OBJECT',
                  name: 'NestedType2',
                },
                args: [],
              },
              {
                name: 'nestedField4',
                type: {
                  kind: 'SCALAR',
                  name: 'Float',
                },
                args: [],
              },
            ],
          },
        ],
      },
    })

    const expectedComplexSchemaData = {
      fields: [
        {
          name: 'complexQuery1',
          argsRequired: false,
          type: 'ComplexType1',
          reqArgs: [],
        },
        {
          name: 'complexQuery2',
          argsRequired: false,
          type: 'ComplexType2',
          reqArgs: [],
        },
      ],
      types: {
        ComplexType1: [
          {
            name: 'nestedField1',
            isObject: false,
          },
          {
            name: 'nestedField2',
            isObject: false,
          },
        ],
        ComplexType2: [
          {
            name: 'nestedField3',
            isObject: false,
          },
          {
            name: 'nestedField4',
            isObject: false,
          },
        ],
        Query: [
          {
            name: 'complexQuery1',
            isObject: false,
          },
          {
            name: 'complexQuery2',
            isObject: false,
          },
        ],
      },
    }

    const result = await parseSchemaAndFormat('http://mock-api.com/graphql')
    expect(result).toEqual(expectedComplexSchemaData)
  })

  it('should handle invalid schema format', async () => {
    jest.mocked(fetchGraphQLSchema).mockResolvedValueOnce({
      __schema: {
        types: [
          {
            kind: 'OBJECT',
            name: 'InvalidType',
            fields: null,
          },
        ],
      },
    })

    await expect(
      parseSchemaAndFormat('http://invalid-graphql-schema.com'),
    ).rejects.toThrow(
      'Failed to fetch schema: Invalid schema format: Missing essential types',
    )
  })

  it('fetchGraphQLSchema mock for invalid schema', async () => {
    await expect(
      fetchGraphQLSchema('http://invalid-graphql-schema.com'),
    ).rejects.toThrow('Invalid schema format: Missing introspection data')
  })

  it('should handle errors appropriately', async () => {
    jest
      .mocked(fetchGraphQLSchema)
      .mockRejectedValue(new Error('Failed to fetch schema'))

    await expect(
      parseSchemaAndFormat('http://error-graphql-schema.com'),
    ).rejects.toThrow('Failed to fetch schema')
  })
})
