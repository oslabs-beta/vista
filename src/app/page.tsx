"use client"

import { EndpointForm } from '@/app/components/EndpointForm';
import { DisplayData } from '@/app/components/DisplayData';
import { useState } from 'react';
import { SessionProvider } from "next-auth/react"
import { Session } from 'inspector';

export default function Home({session}) { // data fetching: https://youtu.be/gSSsZReIFRk?t=293
  const [data, setData] = useState({});
  const childToParent = (childData: any) => { //TODO: type
    setData(childData);
  }
  return (
    <>
      <SessionProvider session={session}>
        <EndpointForm childToParent={childToParent} />
        <DisplayData data={data} />
      </SessionProvider>
      {/* <QueryGenerator /> */}
    </>
  )
}