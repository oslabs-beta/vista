"use client";

import { EndpointForm } from "@/app/components/EndpointForm";
import { DisplayData } from "@/app/components/DisplayData";
import { useState, Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import QueryContainer from "./components/QueryContainer";
import { ChildData, ClickField, Data } from "../../types"
import { CircularProgress } from "@mui/material";
import SaveModal from "./components/SaveModal";

export default function Home({ session }: any) {
  // data fetching: https://youtu.be/gSSsZReIFRk?t=293
  const [data, setData] = useState<Data>({schema:{fields: [], types: {}}, endpoint:""});
  const [clickField, setClickField] = useState<ClickField>({ type: "", field: "" });
  
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSaveResponseModalOpen, setIsSaveResponseModalOpen] = useState(false);
  const [queryAsString, setQueryAsString] = useState("query: { \n \n }");
  const [saveResponseMessage, setSaveResponseMessage] = useState();

  const childToParent = (childData: ChildData): void => {
    setData(childData);
  };
  // const childToParent = (childData) => { //TODO: type
  //   console.log({childData})
  //   setData(childData);
  // };
  // sessionprovider component allows the wrapped component to use the useSession hook: https://next-auth.js.org/getting-started/client
  return (
    <>
      <SessionProvider session={session}>
        <EndpointForm childToParent={childToParent} />
        <div className="grid grid-cols-3">
          <div className="col-span-2 dark:bg-slate-800">
            {data.schema.fields.length && <DisplayData data={data} setClickField={setClickField} />}
          </div>
          <div className="h-screen dark:bg-slate-800">
            <QueryContainer endpoint={data.endpoint} clickField={clickField} setIsSaveModalOpen={setIsSaveModalOpen} queryAsString={queryAsString} setQueryAsString={setQueryAsString} />
          </div>
        </div>
        <SaveModal isSaveModalOpen={isSaveModalOpen} setIsSaveModalOpen={setIsSaveModalOpen} setIsSaveResponseModalOpen={setIsSaveResponseModalOpen} saveResponseMessage={saveResponseMessage} setSaveResponseMessage={setSaveResponseMessage} query={queryAsString} endpoint={data.endpoint} />
      </SessionProvider>
    </>
  );
}
