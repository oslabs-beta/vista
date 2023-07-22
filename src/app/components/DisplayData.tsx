/* eslint-disable react/jsx-key */
import React, { useCallback, useState, Suspense } from "react";
import { Props } from '../../../types'

import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState,
  useEdgesState, 
  Node,
  Edge,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  NodeChange,
  EdgeChange
} from 'reactflow';

import 'reactflow/dist/style.css';
import { CircularProgress } from "@mui/material";
import { data } from "autoprefixer";

const initialNodes: Node[] = [ 
  { id: 'query', position: { x: 500, y: 0 }, data: { label: 'Root Query' } },
  { id: 'types', position: { x: 750, y: 200 }, data: { label: 'Types'}},
  { id: 'fields', position: { x: 250, y: 200 }, data: { label: 'Fields'}},
]

let xIndexForFields = 400;
let yIndexForFields = 300;

let xIndexForTypes = 750;
let yIndexForTypes= 300;



const initialEdges: Edge[] = [
  {
  id: '1',
  source: 'query', 
  target: 'types',
  markerEnd: { type: MarkerType.ArrowClosed },
},
  {
  id: '2',
  source: 'query', 
  target: 'fields',
  markerEnd: { type: MarkerType.ArrowClosed },
}
];



export function DisplayData(props: Props) { // TODO: type
  // {props.data.err && alert('Please enter a valid endpoint')}
  // {!props.data.schema && "No data, please enter an endpoint above."}
  // {props.data.schema && Object.keys(props.data.schema).map((key, index) => {
  // return (
  
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  
  const onNodeClick = (event:any, node:Node) => {
    props.setClickField({type: node.parentNode || "", field: node.data.label})
  }

  // const onNodesChange = useCallback(
  //   (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]
  // )

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );

  const schema = props.data.schema;
  if (!schema) {
    return null; // or render an error message, loading state, or fallback UI
  }

// iterate through our type elements and set each label to the type

  const schemaFields = schema.fields
  let numOfNodes = 0;

  schemaFields.map((field: any, i: any) => {
    let newNode: Node = { 
      id: field.name,
      position: { x: xIndexForFields, y: yIndexForFields }, 
      data: { label: field.name },
      type: "output",
    };
    // // Generate a unique ID for the data-test attribute
    // const dataTestId = uuid();
    // // Add a data-test attribute to the node
    // newNode.data["data-testid"] = dataTestId;
    // console.log('THIS IS THE DATA TEST ID:', dataTestId)
    


      // push them to the initial nodes array (is it better to use a hook)
      initialNodes.push(newNode);
      // nodeState.push(newNode);
      numOfNodes++;

    // set the x and y positions:
    if (numOfNodes % 6 === 0 && numOfNodes !== 0) {
      xIndexForFields -= 300; // Decrement x value for a new column
      yIndexForFields = 300; // Reset y value for a new column
    } else {
      yIndexForFields += 50; // Increment y value for the next row in the same column
    }
    // create a new edge to connect each type to the root query
    const newEdgeForFields = { id: `${field.name} edge`, source: 'fields', target: field.name, markerEnd: { type: MarkerType.ArrowClosed }};

    // push the edges to the initial edges array (is it better to use a hook here?)
    initialEdges.push(newEdgeForFields);
  });

  const schemaTypes = schema.types
  if(numOfNodes + 3 === initialNodes.length) {
    for (let key in schemaTypes){

    let newTypeNode: Node = { 
      id: key,
      position: { x: xIndexForTypes, y: yIndexForTypes }, 
      data: { label: key },
      style: {
        width: 200,
        height: 400 
      } ,
    }
    console.log('HELLOHELLOHELLO', newTypeNode)
    
    

    xIndexForTypes += 215

    let newTypeEdge: Edge = {id: `${key} edge`, source: 'types', target: key, markerEnd: { type: MarkerType.ArrowClosed }};

    initialNodes.push(newTypeNode);
    initialEdges.push(newTypeEdge);

    
    let fieldInTypeYValue: number = 40;
    let fieldInTypeXValue: number = 25

    for (let el of schemaTypes[key]){
      let newTypeFieldNode: Node = {
        id: el + '_field' + key + '_parent',
        position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
        data: { label: el },
        parentNode: key,
        extent: 'parent',
      }
      // // Generate a unique ID for the data-test attribute
      // const dataTestId = uuid();
      // // Add a data-test attribute to the node
      
      fieldInTypeYValue += 50
      

      initialNodes.push(newTypeFieldNode)
    }
    // setNodes(nodeState)
  }}

  const handleClick = () => {
    props.setData({schema:{fields: [], types: {}}, endpoint:""})
    const userInputtedEndpoint = document.getElementById('simple-search') as HTMLInputElement
    userInputtedEndpoint.value = ""
  }


  // fit view on load
  // const onLoad= (instance:any) => setTimeout(() => instance.fitView(), 0);

  return (
    
       <div className="ml-4">
                {/* Reset Button */}
                <button
                     className="ml-1 bg-blue-500 dark:bg-slate-500 text-white px-3 py-1 rounded-xl my-1 inline-flex dark:border dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900"
                     onClick={() => {
                       handleClick();
                     }}
                   >
                     Reset
                     <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                   </button>
              {/* <div key={index}>
                <h3>{type}:</h3> */}
              <Suspense fallback={<CircularProgress />}>
                <ul>

                  <div className="w-full h-[722px] border-2 border-blue-950 rounded-lg shadow p-2 mb-5 dark:border-white">
                   <ReactFlow
                      // onLoad={onLoad}
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      //onConnect={onConnect}
                      //
                      onNodeClick={onNodeClick}
                      fitView
                    >
                      <Controls className="dark:bg-slate-300"/>
                      <MiniMap className="dark:bg-slate-300"/>
                      {/* removed the TS error here that was caused by the variant */}
                      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                    </ReactFlow>
                  </div>
                </ul>
              </Suspense>
              </div> 

  );
              }