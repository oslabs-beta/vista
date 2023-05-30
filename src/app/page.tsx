"use client"

import { EndpointForm } from '@/app/components/EndpointForm';
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';

export default function Home() { // data fetching: https://youtu.be/gSSsZReIFRk?t=293
  const [data, setData] = useState({});
  const childToParent = (childData: any) => { //TODO: type
    setData(childData);
  }
  return (
    <>
      <EndpointForm childToParent={childToParent} />
      <Dashboard data={data} />
    </>
  )
}