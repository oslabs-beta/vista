"use server";

import { schemaConnect } from './schemaConnect';

const getData = async (endpoint: string) => {
  const data = await schemaConnect(endpoint);
  return data;
}

export async function getSchema(data: FormData) {
  'use server'
  const endpoint = data.get('endpoint-url')?.valueOf();
  if(typeof endpoint !== 'string' || endpoint.length === 0) {
    throw new Error('Invalid endpoint');
  }
  const schema = await getData(endpoint);
  
  let err = false;
  if(Object.keys(schema).length === 0) err = true;
  
  return {schema, err};
}