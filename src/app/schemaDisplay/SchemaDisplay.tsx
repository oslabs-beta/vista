import React, { useCallback, useState } from "react";
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  Node,
  Edge,
  BackgroundVariant,
  MarkerType,
  useNodesState,
  useEdgesState
} from 'reactflow';
import NoHandleNode from '../customNodes/NoHandleNode';
import InputNode from '../customNodes/InputNode';
import ObjectNode from '../customNodes/ObjectNode';
import createNewNodesAndEdges from "@/app/schemaDisplay/createNewNodesAndEdges";
import { SchemaDisplayProps } from "../../../types";
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

export default function SchemaDisplay(props: SchemaDisplayProps){
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const schema = props.data.schema;
    let newNodesAndEdges;
    if (!schema) {
        return null;
    };

    // toggle visibility of node and edge
    const toggleNodeEdge = (nodeId: string, edgeId: string) => {
        setNodes((nds) => nds.map(hideNode(nodeId)));
        setEdges((eds) => eds.map(hideEdge(edgeId)));
    }

    // what happens whenever a node is clicked:
    const onNodeClick = (event: React.MouseEvent, node:Node) => {
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
        console.log('hello')
        }
        // case: is a queryable field --> update query generator
        else if(node.data.isObject === false || node.data.isArg === false) {
        const queryAsObjDeepCopy = JSON.parse(JSON.stringify(props.queryAsObj));
        queryAsObjDeepCopy.query[node.data.field][node.data.label] = true;
        
        props.setQueryAsObj(queryAsObjDeepCopy);
        }
    };

    if (nodes.length === 2){
      newNodesAndEdges = createNewNodesAndEdges(schema, props.setArgument)
      setNodes([...nodes, ...newNodesAndEdges.newNodes])
      setEdges([...edges, ...newNodesAndEdges.newEdges])
    }
    
    return (
      <ReactFlow
              nodes={nodes}
              edges={edges}
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