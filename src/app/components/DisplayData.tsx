/* eslint-disable react/jsx-key */
import React, { useCallback, useState } from "react";

import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, // similar to useState in React
  useEdgesState, 
  addEdge,
  BackgroundVariant,
  applyNodeChanges,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { type } from "os";

type NodeObj = {
  id: string, 
  position: PositionObj,
  data: LabelObj,
  style?: StyleObj,
  parentNode?: string, 
  extent?: string,
  type?: string
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
  { id: 'query', position: { x: 500, y: 0 }, data: { label: 'Root Query' } },
  { id: 'types', position: { x: 750, y: 200 }, data: { label: 'Types'}},
  { id: 'fields', position: { x: 250, y: 200 }, data: { label: 'Fields'}},
]

let xIndexForFields = 250;
let yIndexForFields = 300;

let xIndexForTypes = 750;
let yIndexForTypes= 300;

const initialEdges: any[] = [
  {source: 'query', target: 'types'},
  {source: 'query', target: 'fields'}
]; // TODO: type
console.log('this is our nodes', initialNodes)

export function DisplayData(props: any) { // TODO: type
  // {props.data.err && alert('Please enter a valid endpoint')}
  //         {!props.data.schema && "No data, please enter an endpoint above."}
  //         {props.data.schema && Object.keys(props.data.schema).map((key, index) => {
  //           return (

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onNodeClick = (event: any, node: any) => {
    console.log('click node', node);
      
    props.setClickField({type: node.parentNode, field: node.data.label})
  }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]
  )
  
  //background variant
  const [ variant, setVariant ] = useState('dots');

 
  const schema = props.data.schema;
  if (!schema) {
    return null; // or render an error message, loading state, or fallback UI
  }

// iterate through our type elements and set each label to the type

  const schemaFields = schema.fields
  // let nodeState = [...initialNodes];
  let numOfNodes = 0;
  initialNodes.length === 3 && schemaFields.map((fieldName, i) => {
    let newNode: NodeObj = { 
      id: fieldName,
      position: { x: xIndexForFields, y: yIndexForFields }, 
      data: { label: fieldName }, 
    };
    // push them to the initial nodes array (is it better to use a hook)
    initialNodes.push(newNode);
    // nodeState.push(newNode);


    // increase the x and y positions
    xIndexForFields += 50

    // create a new edge to connect each type to the root query
    const newEdgeForFields = { source: 'fields', target: fieldName};

    // push the edges to the initial edges array (is it better to use a hook here?)
    initialEdges.push(newEdgeForFields);
    // // iterate through the type's field array\
    // for (let i = 0; i < arrayOfFields.length; i++){
    //   // xindex += 5;
    //   // yindex += 5;
      
    //   newNode = {
    //     id: i.toString() + indexOfType + 'c',
    //     data: {label: arrayOfFields[i] },
    //     position: { x:xindex, y:yindex },
    //     // position: { x:xindex, y:yindex },
    //     style: {width: 50, height: 50},
    //     parentNode: typeName,
    //     extent: 'parent'
    //   }
    //   console.log('this is new node', newNode)
    //   initialNodes.push(newNode)
    numOfNodes++;
  })

  const schemaTypes = schema.types
  if(numOfNodes + 3 === initialNodes.length) {
    for (let key in schemaTypes){

    let newTypeNode: NodeObj = { 
      id: key,
      position: { x: xIndexForTypes, y: yIndexForTypes }, 
      data: { label: key },
      style: {
        width: 200,
        height: 400
      } 
    }

    xIndexForTypes += 50
    let newTypeEdge = {source: 'types', target: key};

    initialNodes.push(newTypeNode);
    // nodeState.push(newTypeNode)
    initialEdges.push(newTypeEdge);

    for (let el of schemaTypes[key]){
      console.log(el)
      let newTypeFieldNode: NodeObj = {
        id: el + '_field' + key + '_parent',
        position: {x: 0, y: 0},
        data: { label: el},
        parentNode: key,
        extent: 'parent'
      }

      initialNodes.push(newTypeFieldNode)
      // nodeState.push(newTypeNode)
      console.log(initialNodes)
    }
    // setNodes(nodeState)
  }}

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