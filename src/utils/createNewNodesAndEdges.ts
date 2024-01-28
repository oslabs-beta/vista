import { Node, Edge, MarkerType } from 'reactflow'
import { SchemaData } from '../../types'
import {Dispatch, SetStateAction} from "react"

export default function createNewNodesAndEdges(schema: SchemaData, setArgumentFunc: Dispatch<SetStateAction<number | string>>){
    const newDataForFlow: {newNodes: Node[], newEdges: Edge[]} = {newNodes: [], newEdges: []}
    let xIndexForFields = 400;
    let yIndexForFields = 300;
    let xIndexForTypes = 750;
    let yIndexForTypes= 300;
    let numOfNodes = 0;

    schema.fields.map((field: any) => {
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
        newDataForFlow.newNodes.push(newNode)
        numOfNodes++;


        if (numOfNodes % 6 === 0 && numOfNodes !== 0) {
        xIndexForFields -= 300; 
        yIndexForFields = 300; 
        } else {
        yIndexForFields += 50;
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
        newDataForFlow.newEdges.push(newEdgeForFields)
        const numberOfFields = schema.types[field.type].length;
        const desiredNodeHeight = (53 * numberOfFields);
        let height;
        let fieldArgLength = field.reqArgs.length;

        if(field.reqArgs.length >= 1) {
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

        newDataForFlow.newEdges.push(newTypeOfFieldEdge);
        newDataForFlow.newNodes.push(newTypeOfFieldNode);

        xIndexForTypes += 215;

        let fieldInTypeYValue = 40;
        let fieldInTypeXValue = 25;

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
                // argModified: argModifiedFunc,
                field: field.name,
                argument: field.reqArgs[i],
                setArgument: setArgumentFunc
            },
            parentNode: field.name + '-' + field.type,
            extent: 'parent',
            type: stringForType[j],
            draggable: false,
            hidden: true,
            }
            fieldInTypeYValue += 50
            newDataForFlow.newNodes.push(newTypeFieldNode)
        }
        }

        //render the remaining fields of the type that are not arguments
        for (let el of schema.types[field.type]){
        if (field.reqArgs.includes(el.name)) continue;
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
        newDataForFlow.newNodes.push(newTypeFieldNode)
      }
    })
    return newDataForFlow
}