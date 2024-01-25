import { GraphQLClient, gql, request } from "graphql-request";
import { getIntrospectionQuery } from "graphql";
import {
  SchemaData,
  Field,
  TypesData,
  BuildingTheSchemaObject,
  ArrayOfFields,
  QueryFieldsSchema,
  FieldObject,
} from "../../types";
import { fetchGraphQLSchema } from "./requestWrapper";

// types to ignore
const typesToIgnore: string[] = [
  "Query",
  "String",
  "Boolean",
  "__Schema",
  "__Type",
  "__TypeKind",
  "__Field",
  "__InputValue",
  "__EnumValue",
  "__Directive",
  "ID",
  "Int",
  "__DirectiveLocation",
  "CacheControlScope",
  "Upload",
];

// helper function to determine essential types
function isEssentialTypePresent(types: any, essentialTypes: any) {
  return essentialTypes.every((essentialType: any) =>
    types.some((type: { name: any }) => type.name === essentialType)
  );
}

export async function parseSchemaAndFormat(apiEndpoint: string) {
  const graphQLClient = new GraphQLClient(apiEndpoint);

  // will be populated and returned to the FE

  const schemaData: SchemaData = { fields: [], types: {} };

  try {
    const introspectionQueryData: any = await fetchGraphQLSchema(apiEndpoint);

    if (
      !introspectionQueryData ||
      !introspectionQueryData.__schema ||
      !introspectionQueryData.__schema.types
    ) {
      console.error("Invalid schema format: Missing introspection data");
      throw new Error("Invalid schema format: Missing introspection data");
    }

    if (
      !isEssentialTypePresent(introspectionQueryData.__schema.types, ["Query"])
    ) {
      console.error("Invalid schema format: Missing essential types");
      throw new Error("Invalid schema format: Missing essential types");
    }

    const arrayOfFieldObjects: ArrayOfFields = [];

    // @ts-ignore
    const fieldsFromIntrospectionQuery = introspectionQueryData.__schema.types;

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
      }
    }

    schemaData.fields = arrayOfFieldObjects;

    // parse the types on the schema from the introspection query

    for (const type of fieldsFromIntrospectionQuery) {
      if (
        type.kind.toLowerCase() === "object" &&
        type.name.toLowerCase !== "query" &&
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
