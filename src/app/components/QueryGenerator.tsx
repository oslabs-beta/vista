import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import { QueryGenerator } from "../../../types"

export default function QueryGenerator(QueryGeneratorProps: QueryGenerator) {

  const {
    childToParent,
    queryAsString,
    setIsSaveModalOpen,
  } = QueryGeneratorProps;

  
  useEffect(() => {
    childToParent(queryAsString);   
  });

  
  
  return (
      <div className="bg-white rounded-lg shadow p-4 max-w-md border-dashed border-2 border-sky-500 dark:bg-slate-600 dark:border-white mx-2">
        <form>
          <textarea
            data-testid="query-generator"
            value={queryAsString}
            className="mt-1 ml-1 mb-1 resize-none hover:resize border border-gray-300 rounded px-2 py-1 w-96 h-60 break-normal dark:bg-slate-800 dark:text-white"
            // className="resize-none hover:resize border border-gray-300 rounded px-2 py-1 w-96 h-60 break-normal bg-[url('https://graphql.org/img/logo-gray.svg')] bg-no-repeat bg-opacity-0"
            readOnly
          />
          <div>
            <button
              className="ml-1 bg-white text-white px-3 py-1 rounded-xl border border-blue-400 dark:bg-slate-500 dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900"
              onClick={async (e) => {
                e.preventDefault();
                await navigator.clipboard.writeText(queryAsString);
                alert('Query copied to clipboard!')
              }}
            >
              {/* Copy Query button: copies the query from the textarea to the clipboard*/}
              <svg className="w-6 h-6 bg-white text-blue-400 dark:bg-slate-500 dark:text-white dark:hover:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"></path>
              </svg>
            </button>
            <button
              data-testid="queryGenerator_saveQuery"
              type="button"
              onClick={() => {setIsSaveModalOpen(true)}}
              className="ml-1 bg-white text-white px-3 py-1 rounded-xl border border-blue-400 dark:bg-slate-500 dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900"
              >
              {/* save query button */}
              <svg className="w-6 h-6 bg-white text-blue-400 dark:bg-slate-500 dark:text-white dark:hover:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
              </svg>
            </button>
          </div>
          {/* <p className="text-black">Result: {result}</p> */}
        </form>
      </div>
  );
}
