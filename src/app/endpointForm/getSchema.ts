"use client"
import { parseSchemaAndFormat } from './parseSchemaAndFormat';

export async function getSchema(data: FormData) {
  const endpoint = data.get('endpoint-url')?.valueOf();

  if(typeof endpoint !== 'string' || endpoint.length === 0) {
    throw new Error('Invalid endpoint');
  }

  const schema = await parseSchemaAndFormat(endpoint);
  let err = false;
  
  if (schema.fields.length === 0 || Object.keys(schema.types).length === 0) {
    err = true;
  }
  return {schema, err};
}