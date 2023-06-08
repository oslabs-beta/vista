/* eslint-disable react/jsx-key */
import React, { useCallback, useState } from "react";
import QueryCard from "./QueryCard";

import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, // similar to useState in React
  useEdgesState, 
  addEdge,
  BackgroundVariant,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { type } from "os";

type NodeObj = {
  id: string, 
  position: PositionObj,
  data: LabelObj,
  style: StyleObj,
  parentNode?: string, 
  extent?: string
}

type PositionObj = {
  x: number, 
  y: number
}

type LabelObj = {
  label: string
}

type StyleObj = {
  width: number,
  height: number
}


const initialNodes: any[] = [ // TODO: type
  { id: 'x', position: { x: 500, y: 0 }, data: { label: 'Root Query' } }
]

let xindex = 0;
let yindex = 0;

const initialEdges: any[] = []; // TODO: type
console.log('this is our nodes', initialNodes)

const onNodeClick = (event: any, node: any) => console.log('click node', node);


export function DisplayData(props: any) { // TODO: type

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  //background variant
  const [ variant, setVariant ] = useState('dots');

  //console.log('data from DisplayData comp', props.data.schema);
  const schema = props.data.schema;
  if (!schema) {
    return null; // or render an error message, loading state, or fallback UI
  }
  
  // const logType = (type: string) => {
  //   console.log('this is the type', type);
  // };
  console.log('this is our schema', schema)


// iterate through our type elements and set each label to the type
  Object.keys(schema).map((typeName, i) => {
    const arrayOfFields = schema[typeName];
    const indexOfType = i.toString();
    let newNode: NodeObj = { 
      id: typeName, 
      // id: i.toString(), 
      position: { x: xindex, y: yindex }, 
      data: { label: typeName }, 

      style: {
        width: 170,
        height: 200,
      },
    };
    // push them to the initial nodes array (is it better to use a hook)
    initialNodes.push(newNode);

    // increase the x and y positions
    xindex += 10;
    yindex += 10;

    // create a new edge to connect each type to the root query
    const newEdge = { source: 'x', target: i.toString()};

    // push the edges to the initial edges array (is it better to use a hook here?)
    initialEdges.push(newEdge);
    // iterate through the type's field array\
    for (let i = 0; i < arrayOfFields.length; i++){
      // xindex += 5;
      // yindex += 5;
      
      newNode = {
        id: i.toString() + indexOfType + 'c',
        data: {label: arrayOfFields[i] },
        position: { x:xindex, y:yindex },
        // position: { x:xindex, y:yindex },
        style: {width: 50, height: 50},
        parentNode: typeName,
        extent: 'parent'
      }
      console.log('this is new node', newNode)
      initialNodes.push(newNode)
    }
    // create a new node, making sure to set an option that points to a parent node, no need to set a type
    // push to the nodes array 
  })

  return (
    <>
        <div>
              {/* <div key={index}>
                <h3>{type}:</h3> */}

                <ul>
                  {/* {schema[type].map((field: any, index: any) => ( */}
                    <div style={{ width: '100vw', height: '100vh' }}>
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      //onConnect={onConnect}
                      //
                      onNodeClick={onNodeClick}
                    >
                      <Controls />
                      <MiniMap />
                      {/* removed the TS error here that was caused by the variant */}
                      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                    </ReactFlow>
                  </div>
                    
                    {/* // <div key={index}>
                    //   <QueryCard type={field} />
                    // </div> */}
                  {/* ))} */}
                </ul>
              </div>
      {/* </></div> */}
    </>
  );
}




/*  return (
  <ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  fitView
  style={rfStyle}
  attributionPosition="top-right"
>
  <Background />
</ReactFlow>
);
*/