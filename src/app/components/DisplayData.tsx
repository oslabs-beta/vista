/* eslint-disable react/jsx-key */
import React, { useCallback, useMemo, useState, Suspense } from "react";
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

// import TextUpdaterNode from '@/app/components/nodes/TextUpdaterNode';

const initialNodes: Node[] = [ 
  { id: 'query', position: { x: 500, y: 0 }, data: { label: 'Root Query' } },
  // { id: 'types', position: { x: 750, y: 200 }, data: { label: 'Types'}},
  { id: 'fields', position: { x: 250, y: 200 }, data: { label: 'Fields'}},
]

let xIndexForFields = 400;
let yIndexForFields = 300;

let xIndexForTypes = 750;
let yIndexForTypes= 300;



const initialEdges: Edge[] = [
//   {
//   id: '1',
//   source: 'query', 
//   target: 'types',
//   markerEnd: { type: MarkerType.ArrowClosed },
// },
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

  const [hiddenNodes, setHiddenNodes] = useState(new Set());
  
  // const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  
  const onNodeClick = (event:any, node:Node) => {
    // if the node that was clicked is a field on Query type
    if (node.data.queryField) {
      // set id of node that should be hidden/unhidden
      const unHide = node.data.label + '-' + node.data.type;
   
      //hide/unhide node with type of the field that was clicked
      const newHiddenNodes = new Set(
        JSON.parse(
          JSON.stringify(
            Array.from(hiddenNodes)
          )
        )
      );
      hiddenNodes.has(unHide) ? newHiddenNodes.delete(unHide) : newHiddenNodes.add(unHide);
      setHiddenNodes(newHiddenNodes);
    }

    // console.log('click node', node);
    // alert(`should display node for type ${node.data.type}`)

    // send clicked node data to query generator
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

// render a node for each field in the query type
  const schemaFields = schema.fields
  let numOfNodes = 0;
  initialNodes.length === 2 && schemaFields.map((field: any, i: any) => {
    let newNode: Node = {
      id: field.name,
      position: { x: xIndexForFields, y: yIndexForFields }, 
      data: {
        queryField: true, // to read from onclick function
        label: field.name,
        arguments: [...field.reqArgs],
        type: field.type // added this in order to link with it's type and fields on click
      },
      // type: "output",
    };
    
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
    const newEdgeForFields = {
      id: `${field.name} edge`,
      source: 'fields',
      target: field.name,
      type: 'floating',
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    };

    // push the edges to the initial edges array (is it better to use a hook here?)
    initialEdges.push(newEdgeForFields);



    //render types and their fields
    const newTypeOfFieldNode: Node = {
      id: field.name + '-' + field.type,
      position: {
        x: xIndexForTypes,
        y: yIndexForTypes,
      },
      data: {
        label: field.type
      },
      style: {
        width: 200,
        height: 400,
      },
    }

    const newTypeOfFieldEdge = {
      id: field.name + 'to' + field.name + '-' + field.type,
      source: field.name,
      target: field.name + '-' + field.type,
      type: 'floating',
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    };
    // console.log('new edge:', newTypeOfFieldEdge);

    initialNodes.push(newTypeOfFieldNode);
    initialEdges.push(newTypeOfFieldEdge);

    xIndexForTypes +=215

    let fieldInTypeYValue: number = 40;
    let fieldInTypeXValue: number = 25

    for (let el of schema.types[field.type]){
      let newTypeFieldNode: Node = {
        id: el + '_field' + field.type + '_parent',
        position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
        data: { label: el },
        parentNode: field.name + '-' + field.type,
        extent: 'parent'
      }
      fieldInTypeYValue += 50
      

      initialNodes.push(newTypeFieldNode)
    }

  });

  // render types and their fields
  // xIndexForTypes = 750;
  // yIndexForTypes= 300;
  // const schemaTypes = schema.types
  // if(numOfNodes + 3 === initialNodes.length) {
  //   for (let key in schemaTypes){

  //   let newTypeNode: NodeObj = { 
  //     id: key,
  //     position: { x: xIndexForTypes, y: yIndexForTypes }, 
  //     data: { label: key, arguments: [] },
  //     style: {
  //       width: 200,
  //       height: 400 
  //     }, 
  //     // hidden: true, // hidden at first, unhidden when a field from the query type with the matching type is clicked
  //   }

    // xIndexForTypes += 215

    // let newTypeEdge: Edge = {
    //   id: `${key} edge`,
    //   source: 'types',
    //   target: key,
    //   markerEnd: {
    //     type: MarkerType.ArrowClosed
    //   }
    // };

  //   initialNodes.push(newTypeNode);
  //   // nodeState.push(newTypeNode)
  //   initialEdges.push(newTypeEdge);

    
    // let fieldInTypeYValue: number = 40;
    // let fieldInTypeXValue: number = 25

    // for (let el of schemaTypes[key]){
    //   let newTypeFieldNode: Node = {
    //     id: el + '_field' + key + '_parent',
    //     position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
    //     data: { label: el},
    //     parentNode: key,
    //     extent: 'parent'
    //   }
    //   fieldInTypeYValue += 50
      

    //   initialNodes.push(newTypeFieldNode)
    // }
    // setNodes(nodeState)
  // }}


  // fit view on load
  // const onLoad= (instance:any) => setTimeout(() => instance.fitView(), 0);
  return (
       <div className="ml-4">
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

                      // nodeTypes={nodeTypes}
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