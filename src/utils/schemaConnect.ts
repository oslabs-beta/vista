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

// types to ignore
const typesToIgnore: string[] = ["Query", "String", "Boolean", "__Schema", "__Type", "__TypeKind", "__Field", "__InputValue", "__EnumValue", "__Directive", "ID", "Int", "__DirectiveLocation", "CacheControlScope", "Upload"]


export async function schemaConnect(apiEndpoint: string) {
    
    const graphQLClient = new GraphQLClient(apiEndpoint);

    // will be populated and returned to the FE
    // @ts-ignore
    const schemaData:Schema = {fields: null, types: {}};

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

        console.log(fieldsArrayFromType)

        fieldsArrayFromType.forEach((fieldObj => {
            arrayOfFields.push(fieldObj.name)
        }))
        console.log(obj.name, arrayOfFields)
        schemaData.types[obj.name] = arrayOfFields;
    })

    // make the introspection query to grab the fields we can query
    const queryFields: any  = await graphQLClient.request(queryStringForFields);
    const arrOfFieldsOfQuery = []

    // build the array of fields of the query; allow the frontend to check if arguments are required and what type each field is.
    // possible problem with the forEach method

    // queryFields.__schema.queryType.fields.forEach (async (obj) => {})
      // arrOfFieldsOfQuery.push({name: obj.name, argsRequired: false, type: obj.type.name})
    let promiseArray = [];
    const buildPromiseArray = async () => {

      queryFields.__schema.queryType.fields.forEach(async (obj) => {

        if (schemaData.types[obj.type.name]){
          let testField = schemaData.types[obj.type.name][0]
        // build the dummy query and call it
          let dummyQueryString = gql`
          {
            ${obj.name}{
              ${testField}
            }
          }`

          promiseArray.push({query: graphQLClient.request(dummyQueryString), fieldName: obj.name, type: obj.type.name})
      } 
      else {
        arrOfFieldsOfQuery.push({name: obj.name, argsRequired: false, type: obj.type.name})
      }
      
    
    })
    }
        

    buildPromiseArray();

    const resolvePromises = async (arr) => {
      for (const obj of arr){
        try {
          await obj.query
        } catch (error) {
          console.log(error.response.errors[0].message, 'inside the error')
          arrOfFieldsOfQuery.push({name: obj.fieldName, argsRequired: true, type: obj.type, errorMessage: error.response.errors[0].message})
        }
      }

      // await Promise.all(arr).then((values) => {
      //   if (values.errors){
      //     console.log('an error')
      //   } else {
      //     console.log('no error')
      //   }
      // })
    }

    const resultsOfPromise = await resolvePromises(promiseArray);
    console.log(resultsOfPromise)
    // await Promise.all(promiseArray).then((values) => {
    //   console.log(values, 'inside the promise all')
    // })

      // if (schemaData.types[obj.type.name]){
      //   let testField = schemaData.types[obj.type.name][0]
      //   console.log(obj.name, testField, 'test field')

      //   // build the dummy query and call it
      //   let dummyQueryString = gql`
      //   {
      //     ${obj.name}{
      //       ${testField}
      //     }
      //   }`

      //   // somehow utilize promises to advantage...wrap all of this in an asynch helper function promise (promiseAll?) *possibility that the helper funciton may not be necessary
      //   // possibile solutino is to create promise
      //   // iterate through the fields
      //   // push the promise to the promise array
      //   // give array to promiseAll and await the resolution before returning the schema data

      //   try {
      //     const dummyQuery = await graphQLClient.request(dummyQueryString)
      //     console.log({dummyQuery});
      //   } catch (error) {
      //     arrOfFieldsOfQuery.push({name: obj.name, argsRequired: true, type: obj.type.name})
      //     console.log(error, 'inside here')
      //   }
      // } else {
      //   arrOfFieldsOfQuery.push({name: obj.name, argsRequired: false, type: obj.type.name})
      // }

    schemaData.fields = arrOfFieldsOfQuery;
    console.log('line 118', schemaData)
   return schemaData;
}

/*

query = {
  __schema{
    queryType{
      name
      fields {
        name
        description
        type{
          name
          fields{
            name
          }
        }
      }
    }
  }
}

returns 

{
  "data": {
    "__schema": {
      "queryType": {
        "name": "Query",
        "fields": [
          {
            "name": "continent",****
            "description": null,
            "type": {
              "name": "Continent",
              "fields": [
                {
                  "name": "code",****
                  "__typename": "__Field"
                },
                {
                  "name": "countries",****
                  "__typename": "__Field"
                },
                {
                  "name": "name",****
                  "__typename": "__Field"
                }
              ],
              "__typename": "__Type"
            },
            "__typename": "__Field"
          },
          {
            "name": "continents",****
            "description": null,
            "type": {
              "name": null,
              "fields": null,
              "__typename": "__Type"
            },
            "__typename": "__Field"
          },
          {
            "name": "countries",
            "description": null,
            "type": {
              "name": null,
              "fields": null,
              "__typename": "__Type"
            },
            "__typename": "__Field"
          },
          {
            "name": "country",
            "description": null,
            "type": {
              "name": "Country",
              "fields": [
                {
                  "name": "awsRegion",
                  "__typename": "__Field"
                },
                {
                  "name": "capital",
                  "__typename": "__Field"
                },
                {
                  "name": "code",
                  "__typename": "__Field"
                },
                {
                  "name": "continent",
                  "__typename": "__Field"
                },
                {
                  "name": "currencies",
                  "__typename": "__Field"
                },
                {
                  "name": "currency",
                  "__typename": "__Field"
                },
                {
                  "name": "emoji",
                  "__typename": "__Field"
                },
                {
                  "name": "emojiU",
                  "__typename": "__Field"
                },
                {
                  "name": "languages",
                  "__typename": "__Field"
                },
                {
                  "name": "name",
                  "__typename": "__Field"
                },
                {
                  "name": "native",
                  "__typename": "__Field"
                },
                {
                  "name": "phone",
                  "__typename": "__Field"
                },
                {
                  "name": "phones",
                  "__typename": "__Field"
                },
                {
                  "name": "states",
                  "__typename": "__Field"
                },
                {
                  "name": "subdivisions",
                  "__typename": "__Field"
                }
              ],
              "__typename": "__Type"
            },
            "__typename": "__Field"
          },
          {
            "name": "language",
            "description": null,
            "type": {
              "name": "Language",
              "fields": [
                {
                  "name": "code",
                  "__typename": "__Field"
                },
                {
                  "name": "name",
                  "__typename": "__Field"
                },
                {
                  "name": "native",
                  "__typename": "__Field"
                },
                {
                  "name": "rtl",
                  "__typename": "__Field"
                }
              ],
              "__typename": "__Type"
            },
            "__typename": "__Field"
          },
          {
            "name": "languages",
            "description": null,
            "type": {
              "name": null,
              "fields": null,
              "__typename": "__Type"
            },
            "__typename": "__Field"
          }
        ],
        "__typename": "__Type"
      },
      "__typename": "__Schema"
    }
  }
}
*/