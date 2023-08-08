"use client";

import { EndpointForm } from "@/app/components/EndpointForm";
import { DisplayData } from "@/app/components/DisplayData";
import { useState, Suspense, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import QueryContainer from "./components/QueryContainer";
import { ChildData, ClickField, Data } from "../../types"
import { CircularProgress } from "@mui/material";
import SaveModal from "./components/SaveModal";
import SaveResponseModal from "./components/SaveResponseModal";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

export default function Home({ session }: any) {
  // data fetching: https://youtu.be/gSSsZReIFRk?t=293
  const [data, setData] = useState<Data>({schema:{fields: [], types: {}}, endpoint:""});
  const [clickField, setClickField] = useState<ClickField>({ type: "", field: "" });
  
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSaveResponseModalOpen, setIsSaveResponseModalOpen] = useState(false);
  const [queryAsString, setQueryAsString] = useState("query: { \n \n }");
  const [queryAsObj, setQueryAsObj] = useState({ query: {} });
  const [argument, setArgument] = useState({});
  const [saveResponseStatus, setSaveResponseStatus] = useState(false);

  const childToParent = (childData: ChildData): void => {
    setData(childData);
  };
  
  useEffect(() => {
    if (Object.keys(argument).length > 0) {
      console.log('argument changed', argument);
      console.log('query as object', queryAsObj);
      const queryAsObjDeepCopy = JSON.parse(JSON.stringify(queryAsObj));
      console.log('queryAsObjDeepCopy',queryAsObjDeepCopy);
      // console.log(queryAsObjDeepCopy.query.continent['__args']);
      // console.log(queryAsObjDeepCopy.query.continent.__args);
      queryAsObjDeepCopy.query[argument.field]["__args"][argument.argument] = argument.value;
      setQueryAsObj(queryAsObjDeepCopy);
    }
  },[argument]);

  useEffect(() => {
    setQueryAsString(jsonToGraphQLQuery(queryAsObj, { pretty: true }));
  }, [queryAsObj]);

  useEffect(() => {
    // if the clicked node should update the query generator...
    if(clickField.field.length > 0){
      console.log('clickField', clickField);
      if(clickField.field && (clickField.type || clickField.data.queryField)) {
        //if a field of the query type is clicked, should check for arguments
        if (clickField.data.queryField) {
          updateQueryAsObj("", clickField.field.toLowerCase(), clickField.data.arguments);
        }
        //if clicked node is an argument, shouldn't update query generator
        else if (!clickField.data.isArg) {
          // console.log('clicked is not an argument')
          updateQueryAsObj(clickField.field.toLowerCase(), clickField.type.toLowerCase(), []);
        }
      }
    }
  }, [clickField]);

  const updateQueryAsObj = (child: string, parent: string, args: string[]) => {
    //make a deep copy of queryAsObj
    const tempObj = JSON.parse(JSON.stringify(queryAsObj)); //FIXME: here not showing args
    console.log('tempObj1', tempObj);
    //@ts-ignore
    if (!tempObj.query[parent]) {
      tempObj.query[parent] = {};
    }
    tempObj.query[parent][child] = true;
    
    // add "__args" object if args are required
    if (args) {
      tempObj.query[parent]["__args"] = {};
      for(let arg of args) {
        tempObj.query[parent]["__args"][arg] = "";
      }
    }
    
    // console.log('tempObj2', tempObj);
      
    //update object in state
    setQueryAsObj(tempObj);
    //update string in state
    setQueryAsString(jsonToGraphQLQuery(tempObj, { pretty: true }));
  };

  return (
    <>
      <SessionProvider session={session}>
        <EndpointForm childToParent={childToParent} />
        <div className="grid grid-cols-3">
          <div className="col-span-2 dark:bg-slate-800">
            {
              data.schema.fields.length &&
              <DisplayData
                data={data}
                setClickField={setClickField}
                setData={setData}
                queryAsObj={queryAsObj}
                setQueryAsObj={setQueryAsObj}
                setArgument={setArgument}
                // argModified={argModified}
              />
            }
          </div>
          <div className="h-screen dark:bg-slate-800">
            <QueryContainer
              endpoint={data.endpoint}
              clickField={clickField}
              setIsSaveModalOpen={setIsSaveModalOpen}
              queryAsString={queryAsString}
              setQueryAsString={setQueryAsString}
              queryAsObj={queryAsObj}
              setQueryAsObj={setQueryAsObj}
            />
          </div>
        </div>
        <SaveModal isSaveModalOpen={isSaveModalOpen} setIsSaveModalOpen={setIsSaveModalOpen} setIsSaveResponseModalOpen={setIsSaveResponseModalOpen} setSaveResponseStatus={setSaveResponseStatus} query={queryAsString} endpoint={data.endpoint} />
        <SaveResponseModal isSaveResponseModalOpen={isSaveResponseModalOpen} setIsSaveResponseModalOpen={setIsSaveResponseModalOpen} saveResponseStatus={saveResponseStatus}/>
      </SessionProvider>
    </>
  );
}
