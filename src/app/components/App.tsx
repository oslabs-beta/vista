"use client";

import { EndpointForm } from "@/app/components/EndpointForm";
import { DisplaySchemaContainer } from "@/app/components/DisplaySchemaContainer";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import QueryContainer from "./QueryContainer";
import { ChildData, ClickField, Data } from "../../../types";
import SaveModal from "./SaveModal";
import SaveResponseModal from "./SaveResponseModal";
import { jsonToGraphQLQuery } from "json-to-graphql-query";
import WelcomeDialog from "./tutorialModals/WelcomeDialog";
import BaseDialog from "./tutorialModals/BaseDialog"

export default function App({ session, cookie }: any) {
  // data fetching: https://youtu.be/gSSsZReIFRk?t=293
  const [data, setData] = useState<Data>({schema:{fields: [], types: {}}, endpoint:""});
  //@ts-ignore
  const [clickField, setClickField] = useState<ClickField>({ type: "", field: "" });
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSaveResponseModalOpen, setIsSaveResponseModalOpen] = useState(false);
  const [queryAsString, setQueryAsString] = useState("query: { \n \n }");
  const [queryAsObj, setQueryAsObj] = useState({ query: {} });
  const [argument, setArgument] = useState({});
  const [saveResponseStatus, setSaveResponseStatus] = useState(false);
  const [welcomeDialog, setWelcomeDialog] = useState(cookie);
  const [apiEndpointDialog, setApiEndpointDialog] = useState(false);
  const [reactFlowDialog, setReactFlowDialog] = useState(false)
  const [submit, setSubmit] = useState(false)

  const childToParent = (childData: ChildData): void => {
    console.log('inside childToParent', childData)
    setData(childData);
  };
  
  useEffect(() => {
    if (Object.keys(argument).length > 0) {
      console.log('argument changed', argument);
      console.log('query as object', queryAsObj);
      const queryAsObjDeepCopy = JSON.parse(JSON.stringify(queryAsObj));
      console.log('queryAsObjDeepCopy',queryAsObjDeepCopy);
      //@ts-ignore
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
    const tempObj = JSON.parse(JSON.stringify(queryAsObj));
    console.log('tempObj1', tempObj);
    //@ts-ignore
    if (!tempObj.query[parent]) {
      tempObj.query[parent] = {};
    }
    if(child !== ""){
      tempObj.query[parent][child] = true;
    }
    
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

        {!welcomeDialog && <WelcomeDialog 
        welcomeDialog = {welcomeDialog}
        setWelcomeDialog = {setWelcomeDialog}
        setApiEndpointDialog = {setApiEndpointDialog}
        />}

        <EndpointForm apiEndpointDialog={apiEndpointDialog} childToParent={childToParent} setSubmit={setSubmit}/>
        {apiEndpointDialog && <BaseDialog
        openCurrentModal = {apiEndpointDialog} 
        closeCurrentModalSetter = {setApiEndpointDialog}
        openNextModalSetter = {setReactFlowDialog}
        getSchema = {true}
        childToParent = {childToParent}
        title = {'Enter your GraphQL API'}
        description = {'Vista allows you to visualize a GraphQL schema. We will use the Rick & Morty API as an example.'}
        />}
        
        {reactFlowDialog && <BaseDialog
        openCurrentModal = {reactFlowDialog}
        closeCurrentModalSetter = {setReactFlowDialog}
        title = {'Here is your schema!'}
        description = {'These are the fields that you can query on your schema. Clicking on a node will show you what fields you can query for.'}
        />}
        
        
        <div className="grid grid-cols-3">
          <div className="col-span-2 dark:bg-slate-800">
            {
              data.endpoint &&
              <DisplaySchemaContainer
                data={data}
                //@ts-ignore
                setClickField={setClickField}
                setData={setData}
                queryAsObj={queryAsObj}
                //@ts-ignore
                setQueryAsObj={setQueryAsObj}
                setArgument={setArgument}
                setSubmit={setSubmit}
                submit={submit}
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
              //@ts-ignore
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
