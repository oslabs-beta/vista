/* eslint-disable react/jsx-key */
import React, { useCallback, useState, Suspense, useEffect } from "react";
import { Props } from '../../../types'

import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
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

const initialNodes: Node[] = [ 
  {
    id: 'query',
    position: { x: 500, y: 0 },
    data: { label: 'Root Query' },
  },
  {
    id: 'fields',
    position: { x: 250, y: 200 },
    data: { label: 'Fields'},
  },
];

let xIndexForFields = 400;
let yIndexForFields = 300;

let xIndexForTypes = 750;
let yIndexForTypes= 300;

const initialEdges: Edge[] = [
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

// set custom node types
const nodeTypes = {
  noHandleNode: NoHandleNode,
  inputNode: InputNode,
};

export function DisplayData(props: Props) { // TODO: type

  //initialize nodes and edges
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // set warning message for vista v1.0
  const maxDepthWarning = 'Maximum depth supported by current version of vista has been reached.'

  //toggle visibility of node and edge
  const toggleNodeEdge = (nodeId: string, edgeId: string) => {
    setNodes((nds) => nds.map(hideNode(nodeId)));
    setEdges((eds) => eds.map(hideEdge(edgeId)));
  }

  // what happens whenever a node is clicked:
  const onNodeClick = (event: React.MouseEvent, node:Node) => {
    // if the node that was clicked is a field on Query type
    if (node.data.queryField) {
      // toggle visibility of it's type node and edge
      toggleNodeEdge(node.data.label + '-' + node.data.type, node.data.label + '_to_' + node.data.label + '-' + node.data.type);
      // send clicked node data to query generator
      props.setClickField(
        {
          type: node.data.field,
          field: node.data.label,
          data: node.data,
        }
      )
    }
    else if(node.data.isObject) {
      // TODO: make this non clickable and add a tootltip on hover
    }
    // case: is a queryable field --> update query generator
    else if(node.data.isObject === false || node.data.isArg === false) {
      // console.log('props.queryAsObj', props.queryAsObj);
      // console.log('node.data', node.data);
      const queryAsObjDeepCopy = JSON.parse(JSON.stringify(props.queryAsObj));
      // console.log('queryAsObjDeepCopy', queryAsObjDeepCopy);
      queryAsObjDeepCopy.query[node.data.field][node.data.label] = true;
      // console.log('queryAsObjDeepCopy with new field', queryAsObjDeepCopy);
      props.setQueryAsObj(queryAsObjDeepCopy);
    }

  };

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );

  const schema = props.data.schema;
  if (!schema) {
    return null; // or render an error message, loading state, or fallback UI
  };

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
    };
    // create a new edge to connect each type to the root query
    const newEdgeForFields = {
      id: `${field.name} edge`,
      source: 'fields',
      target: field.name,
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
      hidden: true,
    };

    const newTypeOfFieldEdge = {
      id: field.name + '_to_' + field.name + '-' + field.type,
      source: field.name,
      target: field.name + '-' + field.type,
      markerEnd: {
        type: MarkerType.ArrowClosed
      },
      hidden: true,
    };

    initialNodes.push(newTypeOfFieldNode);
    initialEdges.push(newTypeOfFieldEdge);

    xIndexForTypes += 215;

    let fieldInTypeYValue: number = 40;
    let fieldInTypeXValue: number = 25;

    //for each required argument, render the custom node with input field and a second custom node without an input field
    for (let i = 0; i < field.reqArgs.length; i++) {
      const stringForId = ['_argument_', '_field_'];
      const stringForLabel = [field.reqArgs[i] + '*', field.reqArgs[i]];
      const stringForType = ['inputNode', 'noHandleNode']; //change when j=0 for custom node with input field
      for (let j = 0; j < 2; j++) {
        let newTypeFieldNode: Node = {
          id: field.reqArgs[i] + stringForId[j] + field.name + '_parent',
          position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
          data: {
            label: stringForLabel[j],
            isArg: j === 0,
            argModified: props.argModified,
            field: field.name,
            argument: field.reqArgs[i],
            setArgument: props.setArgument,
          },
          parentNode: field.name + '-' + field.type,
          extent: 'parent',
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
      if (field.reqArgs.includes(el.name)) continue;
      // console.log(`field ${el.name}, isObject ${el.isObject}`);
      let newTypeFieldNode: Node = {
        id: el.name + '_field_' + field.name + '_parent',
        position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
        data: {
          label: el.isObject ? el.name + '...' : el.name,
          isObject: el.isObject,
          field: field.name,
        },
        parentNode: field.name + '-' + field.type,
        extent: 'parent',
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
      <button
        className="ml-1 bg-blue-500 dark:bg-slate-500 text-white px-3 py-1 rounded-xl my-1 inline-flex dark:border dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900"
        onClick={() => {
          handleClick();
        }}
      >
        Reset
        <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
      <Suspense fallback={<CircularProgress />}>
        <ul>
          <div className="w-full h-[722px] border-2 border-blue-950 rounded-lg shadow p-2 mb-5 dark:border-white">
            <ReactFlow
              nodes={nodes}
              edges={edges}

              //TODO: do we need these two? seem to not be breaking anything if I remove them
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}

              onNodeClick={onNodeClick}
              fitView

              nodeTypes={nodeTypes}
            >
              <Controls className="dark:bg-slate-300"/>
              <MiniMap className="dark:bg-slate-300"/>
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </div>
        </ul>
      </Suspense>
    </div> 

  );
}