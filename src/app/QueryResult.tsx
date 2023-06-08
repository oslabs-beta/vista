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
    <>
      <button
        className="text-right bg-blue-500 hover:bg-blue-600 text-white font-bold"
        onClick={() => {
          queryData();
        }}
      >
        Make Query
      </button>
      <textarea
        value={result}
        className="border border-gray-300 rounded px-2 py-1 w-full h-40 break-normal"
        readOnly
      ></textarea>
    </>
  );
}
