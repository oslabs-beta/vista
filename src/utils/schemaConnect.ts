import {GraphQLClient, gql} from 'graphql-request'


// interfaces for the data
interface Schema {
    [index:string]: string[]
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
    const schemaData:Schema = {};

    // declare the query strings returns 
    const queryStringforTypes = gql`
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


    // make the introspection query 
    const types: any  = await graphQLClient.request(queryStringforTypes);
    const arrOfFields = []
    // filter the types
    // const filteredTypes = types.__schema.types.filter((element) => !typesToIgnore.includes(element.name) && element.kind === 'OBJECT');
    
    types.__schema.queryType.fields.forEach((obj) => arrOfFields.push(obj.name))

    console.log(arrOfFields)
    
    //populate the schemaData
    filteredTypes.forEach((obj) => {
        const arrayOfFields:string[] = [];

        const fieldsArrayOnQuery = obj.fields;
        fieldsArrayOnQuery.forEach((fieldObj => {
            arrayOfFields.push(fieldObj.name)
        }))
        console.log(obj.name, arrayOfFields)
        schemaData[obj.name] = arrayOfFields;
    })
   return schemaData;
}