import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import QueryGenerator from "./QueryGenerator";
import QueryContainer from "./QueryContainer";
import { GraphQLClient, gql } from "graphql-request";

export default function QueryResult({ data, endpoint }: any) {
  const [result, setResult] = useState("");
  console.log("this is data on QueryResult:", data);
  console.log("this is the endpoint on QueryResult:", endpoint);

  async function queryData() {
    const graphQLClient = new GraphQLClient(endpoint);

    // declare the query string
    const queryStringforData = gql`
      ${data}
    `;

    // make the  query
    const queryResult = await graphQLClient.request(queryStringforData);

    // document.getElementById("result").textContent = queryResult;

    console.log("GraphQL queryResult in QueryResult.tsx", queryResult);
    console.log("typeof queryResult", typeof queryResult);
    
    setResult(JSON.stringify(queryResult, null, 2));

    // return queryResult;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-4 max-w-md w-full">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-xl my-1"
          onClick={() => {
            queryData();
          }}
        >
          Make Query
        </button>
        <br />
        <textarea
          value={result}
          className="resize-none hover:resize border border-gray-300 rounded px-2 py-1 w-72 h-80 break-normal"
          readOnly
          placeholder="Result..."
        ></textarea>
      </div>
    </div>
  );
}
