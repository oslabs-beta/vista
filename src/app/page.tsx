"use client";

import { EndpointForm } from "@/app/components/EndpointForm";
import { DisplayData } from "@/app/components/DisplayData";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import QueryContainer from "./components/QueryContainer";

export default function Home({ session }: any) {
  // data fetching: https://youtu.be/gSSsZReIFRk?t=293
  const [data, setData] = useState({endpoint:""});
  const [clickField, setClickField] = useState({});
  const childToParent = (childData: any) => { //TODO: type
    setData(childData);
  };
  // sessionprovider component allows the wrapped component to use the useSession hook: https://next-auth.js.org/getting-started/client
  return (
    <>
      <SessionProvider session={session}>
        <EndpointForm childToParent={childToParent} />
        <div className="grid grid-cols-3">
          <div className="col-span-2 dark:bg-slate-800">
            <DisplayData data={data} setClickField={setClickField} />
          </div>
          <div className="h-screen dark:bg-slate-800">
            <QueryContainer endpoint={data.endpoint} clickField={clickField} />
          </div>
        </div>
      </SessionProvider>
    </>
  );
}
