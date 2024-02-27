import { Node } from 'reactflow'

export default function NoHandleNode(props: Node) {
  return (
    <div className="p-2 rounded-sm w-40 text-xs text-gray-900 text-center border border-solid border-gray-900 bg-white">
      {props.data.label}
    </div>
  )
}
