import { create } from 'zustand';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType
    } from 'reactflow';


type RFState = {
    nodes: Node[];
    edges: Edge[];
    addNodes: (newNodes: Node[]) => void;
    addEdges: (newEdge: Edge) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    xIndexForTypes: number;
    yIndexForTypes: number;
    xIndexForFields: number;
    yIndexForFields: number;
    updateXIndexForTypes: (num: number) => void;
    updateYIndexForTypes: (num: number) => void;
    updateXIndexForFields: (num: number) => void;
    updateYIndexForFields: (num: number) => void;
    
    };

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

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  addNodes: (newNodes) => {
    console.log(newNodes)
    set({
      nodes: [...get().nodes, ...newNodes]
    })
    console.log(get().nodes)
  },
  addEdges: (newEdge) => {
    set((state) => ({
      edges: [...state.edges, newEdge]
    }))
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  xIndexForFields: 400,
  yIndexForFields: 300,
  xIndexForTypes: 400,
  yIndexForTypes: 300,
  updateXIndexForFields: (num) => set((state) => ({xIndexForFields: state.xIndexForFields + num})),
  updateYIndexForFields: (num) => set((state) => ({yIndexForFields: state.yIndexForFields + num})),
  updateXIndexForTypes: (num) => set((state) => ({xIndexForTypes: state.xIndexForTypes + num})),
  updateYIndexForTypes: (num) => set((state) => ({yIndexForTypes: state.yIndexForTypes + num})),
  resetYIndexForFields: () => set((state) => ({yIndexForFields: 300}))
}));

export default useStore;
