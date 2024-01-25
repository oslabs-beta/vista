import { request } from 'graphql-request';
import { getIntrospectionQuery } from 'graphql';

export default async function fetchGraphQLSchema(apiEndpoint: string) {
    try {
        console.log(`Fetching schema from: ${apiEndpoint}`);
        return await request(apiEndpoint, getIntrospectionQuery());
    } catch (error:any) {
        console.error("Error fetching GraphQL schema:", error);
        throw error;
    }
}

