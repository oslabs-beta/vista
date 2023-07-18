import {GraphQLClient, gql} from 'graphql-request'
import { SchemaData, Field, TypesData, BuildingTheSchemaObject} from '../../types'

// types to ignore
const typesToIgnore: string[] = ["Query", "String", "Boolean", "__Schema", "__Type", "__TypeKind", "__Field", "__InputValue", "__EnumValue", "__Directive", "ID", "Int", "__DirectiveLocation", "CacheControlScope", "Upload"]

export async function schemaConnect(apiEndpoint: string) {
    
    const graphQLClient = new GraphQLClient(apiEndpoint);

    // will be populated and returned to the FE

    const schemaData:SchemaData = {fields: [], types: {}};

    // declare the query strings for the fields and the types
    const queryStringForFields = gql`
    {
        __schema{
              queryType{
              name
              fields{
                name
                type{
                  name
                }
              }
            }
          }
        }`

    const queryStringForTypes = gql`
    {
        __schema {
            types {
              name
              kind
              fields{
                name
              }
            }
          }
    }`


    
    // get the types and filter them
    const types:TypesData = await graphQLClient.request(queryStringForTypes);
    const filteredTypes = types.__schema.types.filter((element) => !typesToIgnore.includes(element.name) && element.kind === 'OBJECT');

    //populate the schemaData
    filteredTypes.forEach((obj) => {
        const arrayOfFields:string[] = [];
        const fieldsArrayFromType = obj.fields;

        fieldsArrayFromType.forEach((fieldObj: Field) => {
            arrayOfFields.push(fieldObj.name)
        })
        
        schemaData.types[obj.name] = arrayOfFields;
    })

    // make the introspection query to grab the fields we can query
    const queryFields = await graphQLClient.request(queryStringForFields);
    console.log({queryFields})
    const arrOfFieldsOfQuery: {name: string, argsRequired:boolean, type: string, errorMessage?: string}[] = []

    // declare the helper function to build the array of promises
    let promiseArray: BuildingTheSchemaObject[] = [];
    const buildPromiseArray = async () => {

      queryFields.__schema.queryType.fields.forEach(async (obj: {name: string, type: {name: string, __typename: string}, __typename: string}) => {

        console.log(obj, 'inside forEach')

        // check to see if the type is on the queryfield290
        if (schemaData.types[obj.type.name]){
          // grab a test field to make the dummy auery
          let testField = schemaData.types[obj.type.name][0]
          // build the dummy query and call it
          let dummyQueryString = gql`
          {
            ${obj.name}{
              ${testField}
            }
          }`
          // push the information to the promise array
          promiseArray.push({query: graphQLClient.request(dummyQueryString), fieldName: obj.name, type: obj.type.name} )
      } 
      // if there is no type, that means args aren't required.
      else {
        arrOfFieldsOfQuery.push({name: obj.name, argsRequired: false, type: obj.type.name})
      }
    })
    }
    buildPromiseArray();

    // helper function to resolve the promises, this allows us to check if we get an error
    const resolvePromises = async (arr:BuildingTheSchemaObject[]) => {
      for (const obj of arr){
        try {
          await obj.query
          arrOfFieldsOfQuery.push({name: obj.fieldName, argsRequired:false, type: obj.type})
        } catch (error) {
          arrOfFieldsOfQuery.push({name: obj.fieldName, argsRequired: true, type: obj.type, errorMessage: error.response.errors[0].message})
        }
      }
    }

  // await the evaluated result of the helper function
  await resolvePromises(promiseArray);

  // set the fields property on schemaData and return it
  schemaData.fields = arrOfFieldsOfQuery;
  return schemaData;
}