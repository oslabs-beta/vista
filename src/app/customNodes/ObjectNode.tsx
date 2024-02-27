import { useState } from 'react'
import { Node, NodeToolbar } from 'reactflow'

export default function ObjectNode(props: Node) {
  const [isVisible, setVisible] = useState(false)
  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <NodeToolbar
        isVisible={isVisible}
        offset={-10}
        style={{
          backgroundColor: 'lightyellow',
          borderColor: 'black',
          borderWidth: 1,
          fontSize: '14px',
          maxWidth: '200px',
          textAlign: 'center',
        }}
      >
        <p className="italic">
          Queries with a depth level greater than 2 are currently not supported.
        </p>
      </NodeToolbar>
      <div className="p-2 rounded-sm w-40 text-xs text-gray-500 text-center border border-solid border-gray-900 bg-white">
        {props.data.label}
      </div>
    </div>
  )
}
