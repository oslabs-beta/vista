'use client'

import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'
import QueryGenerator from './QueryGenerator'
import QueryResult from './QueryResult'
import { QueryContainerProps } from '../../../types'

export default function QueryContainer(
  QueryContainerProps: QueryContainerProps,
) {
  const {
    endpoint,
    clickField,
    setIsSaveModalOpen,
    queryAsString,
    setQueryAsString,
    // @ts-ignore
    queryAsObj,
    // @ts-ignore
    setQueryAsObj,
  } = QueryContainerProps

  const [data, setData] = useState('')
  const childToParent = (childData: string) => {
    setData(childData)
  }
  return (
    // matt added mt-10 for the margin top to help with the query container from signing in vs signing out
    <div className="ml-6 dark:bg-slate-800 mt-10">
      <QueryGenerator
        childToParent={childToParent}
        clickField={clickField}
        queryAsString={queryAsString}
        setQueryAsString={setQueryAsString}
        setIsSaveModalOpen={setIsSaveModalOpen}
        // @ts-ignore
        queryAsObj={queryAsObj}
        setQueryAsObj={setQueryAsObj}
      />
      <QueryResult data={data} endpoint={endpoint} />
    </div>
  )
}
