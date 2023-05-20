'use client';

import Image from 'next/image';
import {GraphQLClient, gql} from 'graphql-request' //fetch from GraphQL API: https://youtu.be/F3BWdFXEJPk

export default async function Home() { // data fetching: https://youtu.be/gSSsZReIFRk?t=293

  const endpoint = 'https://rickandmortyapi.com/graphql';

  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    fragment FullType on __Type {
      kind
      name
      fields(includeDeprecated: true) {
        name
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }
    fragment InputValue on __InputValue {
      name
      type {
        ...TypeRef
      }
      defaultValue
    }
    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    query IntrospectionQuery {
      __schema {
        queryType {
          name
        }
        mutationType {
          name
        }
        types {
          ...FullType
        }
        directives {
          name
          locations
          args {
            ...InputValue
          }
        }
      }
    }
  `

  const data = await graphQLClient.request(query);

  console.log('hello');
  console.log('data: ', data); //why does it show twice in the console?
  return (
    "hello"
  )
}
