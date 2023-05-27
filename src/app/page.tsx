"use client"

import { EndpointForm } from '@/app/components/EndpointForm';
import { DisplayData } from '@/app/components/DisplayData';
import { useState } from 'react';

export default function Home() { // data fetching: https://youtu.be/gSSsZReIFRk?t=293
  const [data, setData] = useState({});
  const childToParent = (childData: any) => { //TODO: type
    setData(childData);
  }
  return (
    <>
      <EndpointForm childToParent={childToParent} />
      <DisplayData data={data} />
      {/* <QueryGenerator /> */}
    </>
  )
}