/* eslint-disable react/jsx-key */
import React, { useCallback, useState, useEffect, useMemo } from "react";
import TextUpdaterNode from "./viewMoreNode";

import ReactFlow, { 
  Handle,
  Position,
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, // similar to useState in React
  useEdgesState, 
  addEdge,
  BackgroundVariant,
  applyNodeChanges,
  MarkerType,
  ConnectionMode
} from 'reactflow';

import 'reactflow/dist/style.css';
import { type } from "os";
import { data } from "autoprefixer";

type NodeObj = {
  id: string, 
  position: PositionObj,
  textUpdater?: any,
  data: LabelObj,
  style?: StyleObj,
  parentNode?: string, 
  extent?: string,
  type?: any,
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
  height: number,
}




const initialNodes: any[] = [ // TODO: type
  { id: 'query', position: { x: 500, y: 0 }, data: { label: 'Root Query' } },
  { id: 'types', position: { x: 750, y: 200 }, data: { label: 'Types'}},
  { id: 'fields', position: { x: 250, y: 200 }, data: { label: 'Fields'}},
  //{ id: 'hello world', type: 'textUpdater', position: { x: 250, y: 200 }, data: { value: 123 } },

]


let xIndexForFields = 400;
let yIndexForFields = 300;

let xIndexForTypes = 750;
let yIndexForTypes= 300;



const initialEdges: any[] = [
  {
  source: 'query', 
  target: 'types',
  type: 'floating',
  markerEnd: { type: MarkerType.ArrowClosed },
},
  {
  source: 'query', 
  target: 'fields',
  type: 'floating',
  markerEnd: { type: MarkerType.ArrowClosed },
}
]; // TODO: type
//console.log('this is our nodes', initialNodes)


export function DisplayData(props: any) { // TODO: type
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  // {props.data.err && alert('Please enter a valid endpoint')}
  // {!props.data.schema && "No data, please enter an endpoint above."}
  // {props.data.schema && Object.keys(props.data.schema).map((key, index) => {
  // return (

const handleBtnClick = useCallback((key: any) =>  {
  console.log("button was clicked");
}, [])
 


  //matt note's
  //look into using useState. Down fall, we don't have the html element in our return 

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  
  const onNodeClick = (event: any, node: any) => {
    //console.log('click node', node);
      
    props.setClickField({type: node.parentNode, field: node.data.label})
  }

  const onNodesChange = useCallback(
    (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]
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
  let counter = 0;
  let numOfNodes = 0;
  initialNodes.length === 3 && schemaFields.map((field: any, i: any) => {
    let newNode: NodeObj = { 
      id: field.name,
      position: { x: xIndexForFields, y: yIndexForFields }, 
      data: { label: field.name },
      type: "output", 
    
    };
      // push them to the initial nodes array (is it better to use a hook)
      initialNodes.push(newNode);
      // nodeState.push(newNode);
      numOfNodes++;

    // set the x and y positions:
    if (numOfNodes % 6 === 0 && numOfNodes !== 0) {
      counter ++;
      xIndexForFields -= 300; // Decrement x value for a new column
      yIndexForFields = 300; // Reset y value for a new column
    } else {
      yIndexForFields += 50; // Increment y value for the next row in the same column
    }
    // create a new edge to connect each type to the root query
    const newEdgeForFields = { source: 'fields', target: field.name, type: 'floating', markerEnd: { type: MarkerType.ArrowClosed }};

    // push the edges to the initial edges array (is it better to use a hook here?)
    initialEdges.push(newEdgeForFields);
  });

  const schemaTypes = schema.types




  if(numOfNodes + 3 === initialNodes.length) {



    //console.log('this is represents each node', schemaTypes)

    for (let key in schemaTypes){
      const newTypeNode = {
        id: key,
        type: 'textUpdater',
        position: { x: xIndexForTypes, y: yIndexForTypes }, 
        data: { 
          label: key,
          type: "textUpdater",
        },
        style: {
          width: 200,
          height: 400,
        }
      };
  
      setNodes([...nodes, newTypeNode])
      //console.log('click btn')
      //setNodes()
      
    // let newTypeNode: NodeObj = { 
    //   id: key,
    //   position: { x: xIndexForTypes, y: yIndexForTypes }, 
    //   data:  { label: key},
    //   style: {
    //     width: 200,
    //     height: 400,
    //   },
    //   // render: <TextUpdaterNode onClick={handleBtnClick} data={undefined} isConnectable={false} />,
    //   //render: <button onClick={handleBtnClick}>View More!</button>
    // }

    xIndexForTypes += 215
    let newTypeEdge = {source: 'types', target: key, type: 'floating',markerEnd: { type: MarkerType.ArrowClosed }};


    initialNodes.push(newTypeNode);

    //initialNodes.push(newTypeNode);
    // nodeState.push(newTypeNode)
    initialEdges.push(newTypeEdge);

    let fieldInTypeYValue: number = 40;
    let fieldInTypeXValue: number = 25
    

    const fields = schemaTypes[key].slice(0, 5);
  
    //changing the array to only contain the first 5 elements
    //let fields = schemaTypes[key].slice(0, 5);
    for (let field of fields){
      console.log('representing each schema --> ', schemaTypes[key])
      //creates the individual node obj
        let newTypeFieldNode: NodeObj = {
        id: field + '_field' + key + '_parent',
        //textUpdater: TextUpdaterNode,
        position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
        //type: "textUpdater",
        data: { 
          label: field,
        },
        parentNode: key,
        extent: 'parent'
          }
          //pushing our newNode into our intialNodes array
          initialNodes.push(newTypeFieldNode);
          fieldInTypeYValue += 50;
    }
  
   
    //grabs the remaining fields
    console.log('represents the remaining fields --->', schemaTypes[key].slice(5, Infinity));
    //populate the remaining fields

    //function to grab the remaining fields
  const viewMore = (key: any) => {
  let remainingFields = schemaTypes[key].slice(5);
  for(let extraField of remainingFields) {
    let additionalFieldNode: NodeObj = {
      id: extraField + '_field' + key + '_parent',
      position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
      data: { label: extraField},
      parentNode: key,
      extent: 'parent'
        }
        initialNodes.push(additionalFieldNode)
        fieldInTypeYValue += 50;
  }
  
  
}



      //check if schemaTypes.length is <= 5
      //if so push the field into our initialNodes array
      //KEEP THIS CODE
      // if(schemaTypes[key].length <= 5) {
      //   let newTypeFieldNode: NodeObj = {
      //     id: el + '_field' + key + '_parent',
      //     position: {x: fieldInTypeXValue, y: fieldInTypeYValue},
      //     data: { label: el},
      //     parentNode: key,
      //     extent: 'parent'
      //   }
      //   initialNodes.push(newTypeFieldNode)
      //   fieldInTypeYValue += 50
      //} 

     //   initialNodes.push(newTypeFieldNode)
      //fieldInTypeYValue += 50
      
      //initialNodes.push(newTypeFieldNode)
      // nodeState.push(newTypeNode)
      //console.log(initialNodes)
    //}
    // setNodes(nodeState)
  }}

  // fit view on load
  // const onLoad= (instance:any) => setTimeout(() => instance.fitView(), 0);


  return (
    <>
        <div className="ml-4">
        
              {/* <div key={index}>
                <h3>{type}:</h3> */}

                <ul>
                  <div className="flow-container">
                    <div className="w-full h-[722px] border-2 border-blue-950 rounded-lg shadow p-2 mb-5 dark:border-white">
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      //onConnect={onConnect}
                      nodeTypes={nodeTypes}
                      onNodeClick={onNodeClick}
                      fitView
                    >
                      <Controls className="dark:bg-slate-300"/>
                      <MiniMap className="dark:bg-slate-300"/>
                      {/* removed the TS error here that was caused by the variant */}
                      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                      
                    </ReactFlow>
                    
                  </div>
                
                  </div>
                </ul>
              </div>
      {/* </></div> */}
    </>
  );
}