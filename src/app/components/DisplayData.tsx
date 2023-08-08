/* eslint-disable react/jsx-key */
import React, { useCallback, useMemo, useState, Suspense, useEffect } from "react";
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
import NoHandleNode from './NoHandleNode';
import InputNode from './InputNode';

import { data } from "autoprefixer";

const initialNodes: Node[] = [ 
  {
    id: 'query',
    position: { x: 500, y: 0 },
    data: { label: 'Root Query' },
    // zIndex: 100
  },
  // { id: 'types', position: { x: 750, y: 200 }, data: { label: 'Types'}},
  {
    id: 'fields',
    position: { x: 250, y: 200 },
    data: { label: 'Fields'},
    // zIndex: 99
  },
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

//toggle display onclick of fields of query type
const hideNode = (toggled: string) => (node: Node) => {
  if(toggled === node.id || toggled === node.parentNode) {
    node.hidden = !node.hidden;
  }
  return node;
}
const hideEdge = (toggled: string) => (edge: Edge) => {
  if(toggled === edge.id) {
    edge.hidden = !edge.hidden;
  }
  return edge;
}



export function DisplayData(props: Props) { // TODO: type
  // {props.data.err && alert('Please enter a valid endpoint')}
  // {!props.data.schema && "No data, please enter an endpoint above."}
  // {props.data.schema && Object.keys(props.data.schema).map((key, index) => {
  // return (

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // const [unhiddenNodes, setUnHiddenNodes] = useState( new Set());

  // useEffect(() => {
  //   setNodes((nds) => nds.map(hide(unhiddenNodes)))
  // }, [unhiddenNodes])
  
  // const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
  const nodeTypes = useMemo(() => (
    {
      noHandleNode: NoHandleNode,
      inputNode: InputNode,
    }
  ), []);
  
  const maxDepthWarning = 'Maximum depth supported by current version of vista has been reached.'

  const onNodeClick = (event:any, node:Node) => {
    // if the node that was clicked is a field on Query type
    if (node.data.queryField) {
      // set id of node that should be hidden/unhidden
      const nodeToToggle = node.data.label + '-' + node.data.type;
      const edgeToToggle = node.data.label + '_to_' + node.data.label + '-' + node.data.type;

      // toggle visibility of node
      setNodes((nds) => nds.map(hideNode(nodeToToggle)));
      setEdges((eds) => eds.map(hideEdge(edgeToToggle)));
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
      // zIndex: 98,
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
      // type: 'floating',
      markerEnd: {
        type: MarkerType.ArrowClosed
      }
    };

    // push the edges to the initial edges array (is it better to use a hook here?)
    initialEdges.push(newEdgeForFields);

    const numberOfFields = schema.types[field.type].length;

    const desiredNodeHeight = (53 * numberOfFields);

    let height;

    if(field.reqArgs.length >= 1) {
      height = 100 + (50 * numberOfFields);
    } else if(numberOfFields < 5) {
      height = 50 + (50 * numberOfFields);
    } else if (numberOfFields >= 5) {
      height = desiredNodeHeight;
    }

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
        // height: field.reqArgs.length >= 1 ? 100 + (50 * numberOfFields) : desiredNodeHeight,
        height: height,
      },
      hidden: true,
      // zIndex: 96,
    }

    const newTypeOfFieldEdge = {
      id: field.name + '_to_' + field.name + '-' + field.type,
      source: field.name,
      target: field.name + '-' + field.type,
      // type: 'floating',
      markerEnd: {
        type: MarkerType.ArrowClosed
      },
      hidden: true,
    };
    // console.log('new edge:', newTypeOfFieldEdge);

    initialNodes.push(newTypeOfFieldNode);
    initialEdges.push(newTypeOfFieldEdge);

    xIndexForTypes +=215

    let fieldInTypeYValue: number = 40;
    let fieldInTypeXValue: number = 25

    //for each required argument, render the custom node with input field and a second custom node without an input field
    for (let i = 0; i < field.reqArgs.length; i++) {
      const stringForId = ['_argument_', '_field_'];
      const stringForLabel = [field.reqArgs[i] + '*', field.reqArgs[i]];
      const stringForType = ['inputNode', 'noHandleNode']; //change when j=0 for custom node with input field
      for (let j = 0; j < 2; j++) {
        let newTypeFieldNode: Node = {
          id: field.reqArgs[i] + stringForId[j] + field.name + '_parent',
          position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
          data: { label: stringForLabel[j] },
          parentNode: field.name + '-' + field.type,
          extent: 'parent',
          // zIndex: 97,
          type: stringForType[j],
          draggable: false,
          hidden: true,
        }
        fieldInTypeYValue += 50
        initialNodes.push(newTypeFieldNode)
      }
    }

    //render the remaining fields of the type that are not arguments
    for (let el of schema.types[field.type]){
      // console.log('el', el);
      if (field.reqArgs.includes(el.name)) continue;
      console.log(`field ${el.name}, isObject ${el.isObject}`);
      let newTypeFieldNode: Node = {
        id: el.name + '_field_' + field.name + '_parent',
        position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
        data: { label: el.isObject ? el.name + '...' : el.name, isObject: el.isObject},
        parentNode: field.name + '-' + field.type,
        extent: 'parent',
        // zIndex: 97,
        type: 'noHandleNode',
        draggable: false,
        hidden: true,
      }
      fieldInTypeYValue += 50
      

      initialNodes.push(newTypeFieldNode)
    }

  });

  const handleClick = () => {
    props.setData({schema:{fields: [], types: {}}, endpoint:""})
    const userInputtedEndpoint = document.getElementById('simple-search') as HTMLInputElement
    userInputtedEndpoint.value = ""
  }

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
                     <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
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

                      nodeTypes={nodeTypes}
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