import React, { useState, useEffect, useLayoutEffect } from "react";
import "tailwindcss/tailwind.css";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

export default function QueryGenerator({ childToParent, clickField }: any ) {
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
  });

  // useEffect(() => {
  useEffect(() => {
    if(clickField.field && clickField.type) updateQueryAsObj(clickField.field.toLowerCase(), clickField.type.toLowerCase())
  }, [clickField])

  // types and fields for hard coded buttons for demo
  const hardCodedValues = {
    continents : ['name', 'code'],
    countries : ['name', 'capital'],
  }

  const demoButtons = document.querySelector("div.hidden");

  return (
      <div className="bg-white dark:bg-slate-600 rounded-lg shadow p-4 max-w-md border-dashed border-2 border-sky-500 dark:border-white mx-2">
        <form>
          <button
            className="dark:bg-slate-500 text-blue-500 dark:text-white px-3 py-1 rounded-xl my-1 border border-blue-500 dark:border-white hover:bg-blue-500 hover:text-white dark:hover:bg-slate-300 dark:hover:text-slate-900 hover:transition-all mx-1 inline-flex"
            onClick={(e) => {
              e.preventDefault();
              demoButtons.classList.toggle("hidden")
            }}
          >
            Click for demo
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5 ml-2 -mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
            </svg>
          </button>
          {/* iterate object hardCodedValues */}
          <div className="hidden border border-dashed border-red-500 dark:border-white mb-5 dark:text-white">
            { Object.keys(hardCodedValues).map((type, index) => {
                return (
                  <div key={index}>
                    <p>
                      {type}:
                      {hardCodedValues[type].map((value:string, indexValue:number) => {
                        return (
                          <button
                            key={indexValue}
                            className="dark:bg-slate-500 text-blue-500 dark:text-white px-3 py-1 rounded-xl my-1 border border-blue-500 dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900 hover:bg-blue-500 hover:text-white hover:transition-all mx-1"
                            onClick={(e) => {
                              e.preventDefault();
                              updateQueryAsObj(value, type);
                            }}
                          >
                            {value}
                          </button>
                        )
                      })}
                    </p>
                  </div>
                )
              })
            }
          </div>
          <textarea
            value={queryAsString}
            className="dark:bg-slate-800 dark:text-white resize-none hover:resize border border-gray-300 rounded px-2 py-1 w-96 h-60 break-normal"
            // className="resize-none hover:resize border border-gray-300 rounded px-2 py-1 w-96 h-60 break-normal bg-[url('https://graphql.org/img/logo-gray.svg')] bg-no-repeat bg-opacity-0"
            readOnly
          />
          <div>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded-xl dark:bg-slate-500 dark:hover:bg-slate-300 dark:hover:text-slate-900"
              onClick={async (e) => {
                e.preventDefault();
                await navigator.clipboard.writeText(queryAsString);
                alert('Query copied to clipboard!')
              }}
            >
              {/* Copy Query button: copies the query from the textarea to the clipboard*/}
              <svg className="w-6 h-6 dark:text-white dark:hover:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"></path>
              </svg>
            </button>
          </div>
          {/* <p className="text-black">Result: {result}</p> */}
        </form>
      </div>
  );
}
