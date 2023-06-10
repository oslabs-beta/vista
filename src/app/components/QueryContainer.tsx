"use client";

import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import QueryGenerator from "./QueryGenerator";
import QueryResult from "./QueryResult";

export default function QueryContainer({ endpoint, clickField }: any) { // TODO: type
  const [data, setData] = useState("");
  const childToParent = (childData: any) => {
    setData(childData);
  };
  return (
    <>
      <QueryGenerator childToParent={childToParent} clickField={clickField}/>
      <br />
      <QueryResult data={data} endpoint={endpoint} />
    </>
  );
}
