/* eslint-disable react/jsx-key */
import React, { Suspense } from "react";
import { DisplaySchemaContainerProps } from '../../../types'
import { CircularProgress } from "@mui/material";
import SchemaDisplay from "./SchemaDisplay";


export function DisplaySchemaContainer(props: DisplaySchemaContainerProps) { 

  //! This this possibly not working because we don't reset the number of initial nodes? Look into later
  const handleClick = () => {
    props.setData({schema:{fields: [], types: {}}, endpoint:""})
    const userInputtedEndpoint = document.getElementById('simple-search') as HTMLInputElement
    userInputtedEndpoint.value = ""
  }

  return (
    <div className="ml-4">
      <button
        className="ml-1 bg-blue-500 dark:bg-slate-500 text-white px-3 py-1 rounded-xl my-1 inline-flex dark:border dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900"
        onClick={() => {
          handleClick();
        }}
      >
        Reset
        <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
      <Suspense fallback={<CircularProgress />}>
        <ul>
          <div className="w-full h-[722px] border-2 border-blue-950 rounded-lg shadow p-2 mb-5 dark:border-white">
            <SchemaDisplay 
            setClickField={props.setClickField} 
            setQueryAsObj={props.setQueryAsObj} 
            queryAsObj={props.queryAsObj} 
            data={props.data} 
            setArgument={props.setArgument} 
            />
          </div>
        </ul>
      </Suspense>
    </div> 

  );
}