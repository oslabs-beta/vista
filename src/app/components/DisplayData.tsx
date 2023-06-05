/* eslint-disable react/jsx-key */
import React from "react";
import QueryCard from "./QueryCard";

import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, // similar to useState in React
  useEdgesState, 
  addEdge
} from 'reactflow';

import 'reactflow/dist/style.css';

//iterate through our type elements and grab the `label` for each tyep
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Root Query' } },
]

let xindex = 0;
let yindex = 0;

export function DisplayData(props: any) {
  console.log('data from DisplayData comp', props.data.schema);
  const schema = props.data.schema;
  if (!schema) {
    return null; // or render an error message, loading state, or fallback UI
  }
  
  const logType = (type: string) => {
    console.log('this is the type', type);
  };

  return (
    <>
      <div className="m-4 p-4 border-2 border-red-600">
        <div>
          {Object.keys(schema).map((type, index) => {
            const newNode: any = { id: index, position: { x: xindex, y: yindex }, data: { label: type } }; // TODO: type
            initialNodes.push(newNode);
            xindex += 10;
            yindex += 10;
            logType(type);
            return (
              <div key={type}>
                {/* We can make this something different than an h3 if we want */}
                <h3>{type}:</h3>
                <ul>
                  {schema[type].map((field: any, index: any) => (
                    <div key={index}>
                      <QueryCard type={field} />
                    </div>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

