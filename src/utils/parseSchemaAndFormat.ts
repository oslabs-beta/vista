import { SchemaData, ArrayOfFields, FieldObject} from "../../types";
import fetchGraphQLSchema from './requestWrapper';

export async function parseSchemaAndFormat(apiEndpoint: string) {

  const schemaData: SchemaData = { fields: [], types: {} };

  try {
    const introspectionQueryData = await fetchGraphQLSchema(apiEndpoint);
    
    if (!introspectionQueryData || !introspectionQueryData.types) {
      throw new Error("Invalid schema format: Missing introspection data");
    }
    
    const arrayOfFieldObjects: ArrayOfFields = [];
    const fieldsFromIntrospectionQuery = introspectionQueryData.types;

    //* Can this be refactored using filter/map 
    // parse the fields of the schema from the introspection query
    for (const obj of fieldsFromIntrospectionQuery) {
      if (obj.name.toLowerCase() === "query") {
        const fieldsOfTheQuery = obj.fields;

        for (const field of fieldsOfTheQuery) {
          const fieldObjectTemplate: FieldObject = {
            name: "",
            argsRequired: false,
            type: "",
            reqArgs: [],
          };

          fieldObjectTemplate.name = field.name;
          fieldObjectTemplate.type = field.type.name;

          // accounting for type modifiers such as Lists and Non-Null types by traversing the type object until name is not null
          let currentOfType = field.type;
          while (!fieldObjectTemplate.type) {
            fieldObjectTemplate.type = currentOfType.ofType.name;
            currentOfType = currentOfType.ofType;
          }

          if (field.args) {
            for (const arg of field.args) {
              if (arg.type.kind === "NON_NULL") {
                fieldObjectTemplate.argsRequired = true;
                fieldObjectTemplate.reqArgs.push(arg.name);
              }
            }
          }
          arrayOfFieldObjects.push(fieldObjectTemplate);
        }
        break;
      }
    }
    schemaData.fields = arrayOfFieldObjects;

    // parse the types on the schema from the introspection query

    // const test = fieldsFromIntrospectionQuery.filter((obj) => {
    //   obj.kind.toLowerCase() === "object" && 
    //   obj.name.toLowerCase() !== "query" && 
    //   !type.name.includes("__")
    // }).map((type) => {
    //   console.log(type)
    //   const fieldsOfTheType = [];
    //   if (type && type.fields) {
    //     for (const field of type.fields) {
    //       let name = field.name;

    //       // check if the field is of kind object meaning it adds a new level of nesting we currently don't support
    //       let kindOfTypeOfField = field.type.kind;
    //       let ofType = field.type.ofType;
    //       let isObject = false;
    //       while (ofType) {
    //         kindOfTypeOfField = ofType.kind;
    //         ofType = ofType.ofType;
    //         if (kindOfTypeOfField === "OBJECT") {
    //           isObject = true;
    //           break;
    //         }
    //       }
    //       fieldsOfTheType.push({
    //         name,
    //         isObject,
    //       });
    //     }
    //   }

    //   schemaData.types[type.name] = fieldsOfTheType;
    //   console.log(schemaData.types, 'line 95')
    // })


    for (const type of fieldsFromIntrospectionQuery) {
      if (
        type.kind.toLowerCase() === "object" &&
        type.name.toLowerCase() !== "query" &&
        !type.name.includes("__")
      ) {
        const fieldsOfTheType = [];
        if (type && type.fields) {
          for (const field of type.fields) {
            let name = field.name;

            // check if the field is of kind object meaning it adds a new level of nesting we currently don't support
            let kindOfTypeOfField = field.type.kind;
            let ofType = field.type.ofType;
            let isObject = false;
            while (ofType) {
              kindOfTypeOfField = ofType.kind;
              ofType = ofType.ofType;
              if (kindOfTypeOfField === "OBJECT") {
                isObject = true;
                break;
              }
            }
            fieldsOfTheType.push({
              name,
              isObject,
            });
          }
        }

        schemaData.types[type.name] = fieldsOfTheType;
      }
    }

    return schemaData;
  } catch (error: any) {
    console.error("Error in parseSchemaAndFormat: ", error);
    throw new Error("Failed to fetch schema: " + error.message);
  }
}
