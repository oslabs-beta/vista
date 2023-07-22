// "use server";

// import { GraphQLClient } from 'graphql-request' //fetch from GraphQL API: https://youtu.be/F3BWdFXEJPk
// import { getIntrospectionQuery } from 'graphql';

// const getData = async (endpoint: string) => {
//   const graphQLClient = new GraphQLClient(endpoint);
//   const data = await graphQLClient.request(getIntrospectionQuery());
//   return data;
// }

// export async function getSchema(data: FormData) { //https://youtu.be/NgayZAuTgwM?t=1224
//   'use server'
//   const endpoint = data.get('endpoint-url')?.valueOf();
//   if(typeof endpoint !== 'string' || endpoint.length === 0) {
//     throw new Error('Invalid endpoint');
//   }
//   const schema = await getData(endpoint);
//   console.log('schema: ', schema);
//   // childToParent(schema);
//   return schema;
// }

"use server";
import { GraphQLClient } from 'graphql-request' //fetch from GraphQL API: https://youtu.be/F3BWdFXEJPk
import { getIntrospectionQuery } from 'graphql';
import { parseSchemaAndFormat } from './parseSchemaAndFormat';
import { request } from "graphql-request"


export async function getSchema(data: FormData) {
  'use client'
  const endpoint = data.get('endpoint-url')?.valueOf();
  if(typeof endpoint !== 'string' || endpoint.length === 0) {
    throw new Error('Invalid endpoint');
  }

  const schema = await parseSchemaAndFormat(endpoint);
  console.log('this is the schema', JSON.stringify(schema));
  let err = false;
  if(Object.keys(schema).length === 0) err = true;
  
  return {schema, err};
}