import React, { useState, useEffect, useLayoutEffect } from "react";
import "tailwindcss/tailwind.css";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

export default function QueryGenerator({ childToParent, clickField }: any ) {
  const [result, setResult] = useState("");
  const [schemaVal, setSchemaVal] = useState("");
  const [queryAsObj, setQueryAsObj] = useState({ query: {} });
  const [queryAsString, setQueryAsString] = useState("query: { \n \n }");
  
  const updateQueryAsObj = (fieldName: string, typeName: string) => {
    //make a deep copy of queryAsObj
    const tempObj = JSON.parse(JSON.stringify(queryAsObj));
    //@ts-ignore
    if (!tempObj.query[typeName]) {
      tempObj.query[typeName] = {};
    }
    tempObj.query[typeName][fieldName] = true;
    //update object in state
    setQueryAsObj(tempObj);
    //update string in state
    setQueryAsString(jsonToGraphQLQuery(tempObj, { pretty: true }));
    
  };
  // console.log("CHILD TO PARENT", childToParent);
  useEffect(() => {
    childToParent(queryAsString);
    console.log("useEffect ran");
    
  });

  // useEffect(() => {
  useEffect(() => {
    if(clickField.field && clickField.type) updateQueryAsObj(clickField.field.toLowerCase(), clickField.type.toLowerCase())
  }, [clickField])

  console.log("this is query as a string:", queryAsString);
  console.log("this is query as a object:", queryAsObj);

  //   const queryObject = {
  //     query: {
  //         Posts: {
  //             id: true,
  //             title: true,
  //             post_date: true
  //         }
  //     }
  // };
  // console.log('THIS IS THE JSON TO GRAPHQLQUERY', jsonToGraphQLQuery(queryAsObj, { pretty: true }))

  // this function will be the onClick for each button, it should check if the type of the field that was clicked is already on queryStructure, if so, it will add a new element to the array value of the corresponding type, if not, it will add the type as a property with a value of an array with only the clicked field as an element. after that, it will call stringifyQuery and re-render the value of the textarea.


  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-4 max-w-md w-full">
        <form>
          <label className="block mb-2 text-black">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
              onClick={(e) => {
                e.preventDefault();
                const buttonName =
                  (e.target as HTMLButtonElement).textContent || "";
                updateQueryAsObj(buttonName, "continents");
                console.log(
                  "queryAsString just after updateQueryAsObj:",
                  queryAsString
                );
              }}
            >
              name
            </button>
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
              onClick={(e) => {
                e.preventDefault();
                const buttonName =
                  (e.target as HTMLButtonElement).textContent || "";
                updateQueryAsObj(buttonName, "continents");
              }}
            >
              code
            </button>
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
              onClick={(e) => {
                e.preventDefault();
                const buttonName =
                  (e.target as HTMLButtonElement).textContent || "";
                updateQueryAsObj(buttonName, "countries");
              }}
            >
              name
            </button>
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
              onClick={(e) => {
                e.preventDefault();
                const buttonName =
                  (e.target as HTMLButtonElement).textContent || "";
                updateQueryAsObj(buttonName, "countries");
              }}
            >
              code
            </button>
            <br />
            <textarea
              value={queryAsString}
              className="border border-gray-300 rounded px-2 py-1 w-full h-40 break-normal"
              readOnly
            />
          </label>
          <div>
            <button
              className="text-right bg-blue-500 hover:bg-blue-600 text-white font-bold"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(queryAsString);
              }}
            >
              Copy Query
            </button>
          </div>
          <p className="text-black">Result: {result}</p>
        </form>
      </div>
    </div>
  );
}
