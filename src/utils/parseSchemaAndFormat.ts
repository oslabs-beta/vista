import {GraphQLClient, gql, request} from 'graphql-request'
import { getIntrospectionQuery } from 'graphql';
import { SchemaData, Field, TypesData, BuildingTheSchemaObject, ArrayOfFields, QueryFieldsSchema, FieldObject } from '../../types'

// types to ignore
const typesToIgnore: string[] = ["Query", "String", "Boolean", "__Schema", "__Type", "__TypeKind", "__Field", "__InputValue", "__EnumValue", "__Directive", "ID", "Int", "__DirectiveLocation", "CacheControlScope", "Upload"]

export async function parseSchemaAndFormat(apiEndpoint: string) {
    
    const graphQLClient = new GraphQLClient(apiEndpoint);

    // will be populated and returned to the FE

    const schemaData:SchemaData = {fields: [], types: {}};

    const introspectionQueryData:any = await request (apiEndpoint, getIntrospectionQuery());

    const arrayOfFieldObjects:ArrayOfFields = [];

    const fieldsFromIntrospectionQuery = introspectionQueryData.__schema.types;


    // parse the fields of the schema from the introspection query
    for (const obj of fieldsFromIntrospectionQuery){
      if (obj.name.toLowerCase() === 'query'){
        const fieldsOfTheQuery = obj.fields;

        for (const field of fieldsOfTheQuery){
          const fieldObjectTemplate:FieldObject = {name: '', argsRequired: false, type: '', reqArgs:[]};

          fieldObjectTemplate.name = field.name;
          fieldObjectTemplate.type = field.type.name;

          if (field.args){
            for (const arg of field.args){
              if(arg.type.kind === "NON_NULL"){
                fieldObjectTemplate.argsRequired = true;
                fieldObjectTemplate.reqArgs.push(arg.name);
              }
            }
          }
          arrayOfFieldObjects.push(fieldObjectTemplate)
        }
      }
    }
    
    schemaData.fields = arrayOfFieldObjects;

    // parse the types on the schema from the introspection query

    for (const type of fieldsFromIntrospectionQuery){
      if (type.kind.toLowerCase() === 'object' && type.name.toLowerCase !== 'query' && !type.name.includes('__')){
        const fieldsOfTheType = [];

        for (const field of type.fields){
          fieldsOfTheType.push(field.name)
        }

        schemaData.types[type.name] = fieldsOfTheType;
      }
    }

  return schemaData;
}