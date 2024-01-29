import { request } from 'graphql-request';
import { getIntrospectionQuery, IntrospectionQuery, IntrospectionSchema} from 'graphql';
import isEssentialTypePresent from './isEssentialTypePresent';

export default async function fetchGraphQLSchema(apiEndpoint: string) {
    try {
        console.log(`Fetching schema from: ${apiEndpoint}`);
        const data: IntrospectionQuery = await request(apiEndpoint, getIntrospectionQuery());

        if (!isEssentialTypePresent(data.__schema.types, ["Query"])) {
            throw new Error("Invalid schema format: Missing essential types");
          }

        return data.__schema
    } catch (error:any) {
        console.error("Error fetching GraphQL schema:", error);
        throw error;
    }
}

