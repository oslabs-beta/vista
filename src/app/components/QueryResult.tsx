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
      <div className="mt-4 bg-white dark:bg-slate-600 rounded-lg shadow p-4 max-w-md border-dashed border-2 border-sky-500 dark:border-white mx-2">
        <button
          className="ml-1 bg-blue-500 dark:bg-slate-500 text-white px-3 py-1 rounded-xl my-1 inline-flex dark:border dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900"
          onClick={() => {
            queryData();
          }}
        >
          Run Query
          <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <br />
        <textarea
          value={result}
          className="mt-1 ml-1 resize-none hover:resize border border-gray-300 rounded px-2 py-1 w-96 h-64 break-normal dark:bg-slate-800 dark:text-white"
          readOnly
          placeholder="Result..."
        ></textarea>
      </div>
  );
}
