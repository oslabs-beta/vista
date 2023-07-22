"use client";

import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import QueryGenerator from "./QueryGenerator";
import QueryResult from "./QueryResult";
import { ClickField } from "../../../types"

export default function QueryContainer({ endpoint, clickField }: {endpoint: string, clickField: ClickField}) {

  const [data, setData] = useState("");
  const childToParent = (childData: string) => {
    setData(childData);
  };
  return (
    //matt added mt-10 for the margin top to help with the query container from signing in vs signing out
    <div className="ml-6 dark:bg-slate-800 mt-10">
      <QueryGenerator childToParent={childToParent} clickField={clickField}/>
      <QueryResult data={data} endpoint={endpoint} />
    </div>
  );
}
