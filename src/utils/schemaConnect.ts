import {GraphQLClient, gql} from 'graphql-request'


// interfaces for the data
interface Schema {
    fields: any
    types: any
}

interface TypesData{
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

const typesToIgnore: string[] = ["Query", "String", "Boolean", "__Schema", "__Type", "__TypeKind", "__Field", "__InputValue", "__EnumValue", "__Directive", "ID", "Int", "__DirectiveLocation", "CacheControlScope", "Upload"]

export async function schemaConnect(apiEndpoint: string) {
    
    const graphQLClient = new GraphQLClient(apiEndpoint);

    // will be populated and returned to the FE
    // @ts-ignore
    const schemaData:Schema = {fields: null, types: {}};

    // declare the query strings returns 
    const queryStringForFields = gql`
    {
        __schema{
              queryType{
              name
              fields{
                name
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
    // make the introspection query to grab the fields we can query
    const queryFields: any  = await graphQLClient.request(queryStringForFields);
    const arrOfFieldsOfQuery = []


    
    queryFields.__schema.queryType.fields.forEach((obj) => arrOfFieldsOfQuery.push(obj.name))

    schemaData.fields = arrOfFieldsOfQuery;
    // filter the types

    const types:TypesData = await graphQLClient.request(queryStringForTypes);
    const filteredTypes = types.__schema.types.filter((element) => !typesToIgnore.includes(element.name) && element.kind === 'OBJECT');
    //populate the schemaData
    filteredTypes.forEach((obj) => {
        const arrayOfFields:string[] = [];

        const fieldsArrayFromType = obj.fields;

        fieldsArrayFromType.forEach((fieldObj => {
            arrayOfFields.push(fieldObj.name)
        }))
        console.log(obj.name, arrayOfFields)
        schemaData.types[obj.name] = arrayOfFields;
    })
    console.log(schemaData)
   return schemaData;
}