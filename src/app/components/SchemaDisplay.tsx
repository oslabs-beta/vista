import React, { useCallback, useState } from "react";
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
import NoHandleNode from './NoHandleNode';
import InputNode from './InputNode';
import ObjectNode from './ObjectNode';
import 'reactflow/dist/style.css';

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
    objectNode: ObjectNode,
  };

export default function SchemaDisplay(props){
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
        // max depth level supported: 2
        }
        // case: is a queryable field --> update query generator
        else if(node.data.isObject === false || node.data.isArg === false) {
        const queryAsObjDeepCopy = JSON.parse(JSON.stringify(props.queryAsObj));
        queryAsObjDeepCopy.query[node.data.field][node.data.label] = true;
        //@ts-ignore
        props.setQueryAsObj(queryAsObjDeepCopy);
        }
    };

    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

    const schema = props.data.schema;
    if (!schema) {
        //! Add some fallback UI
        return null; // or render an error message, loading state, or fallback UI
    };

    // iterate through our type elements and set each label to the type 

    // render a node for each field in the query type
    const schemaFields = schema.fields
    let numOfNodes = 0;
    //! Type
    initialNodes.length === 2 && schemaFields.map((field: any, i: any) => {
        let newNode: Node = {
        id: field.name,
        position: { x: xIndexForFields, y: yIndexForFields }, 
        data: {
            queryField: true, 
            label: field.name,
            arguments: [...field.reqArgs],
            type: field.type 
        },
        };
        
        initialNodes.push(newNode);
        numOfNodes++;


        if (numOfNodes % 6 === 0 && numOfNodes !== 0) {
        xIndexForFields -= 300; 
        yIndexForFields = 300; 
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
        initialEdges.push(newEdgeForFields);
        const numberOfFields = schema.types[field.type].length;
        const desiredNodeHeight = (53 * numberOfFields);
        let height;
        let fieldArgLength = field.reqArgs.length;

        if(field.reqArgs.length >= 1) {
        // height = 100 + (50 * numberOfFields);
        height = 50 + (fieldArgLength * 50) + (50 * numberOfFields);
        } else if(numberOfFields < 5) {
        height = 50 + (50 * numberOfFields);
        } else if (numberOfFields >= 5 && fieldArgLength === 0) {
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
            height: height,
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
                //@ts-ignore
                argModified: props.argModified,
                field: field.name,
                argument: field.reqArgs[i],
                //@ts-ignore
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
            type: el.isObject ? 'objectNode' : 'noHandleNode',
            draggable: false,
            hidden: true,

        }
        fieldInTypeYValue += 50
        initialNodes.push(newTypeFieldNode)
      }
    });
    
    return (
      <ReactFlow
              nodes={nodes}
              edges={edges}

              //TODO: do we need these two? seem to not be breaking anything if I remove them
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}

              onNodeClick={onNodeClick}
              fitView
              
              //@ts-ignore
              nodeTypes={nodeTypes}
            >
              <Controls className="dark:bg-slate-300"/>
              <MiniMap className="dark:bg-slate-300"/>
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    )
  }