import { Node } from 'reactflow';

export default function InputNode(props: Node) {
  return (
    <div className="flex p-2 rounded-sm w-40 text-xs text-gray-900 text-center border border-solid border-red-500 bg-white shadow-md shadow-red-100">
      <div className="flex-none pr-1">
        {props.data.label}:
      </div>
      <div className="flex-1">
        <input type="text" className='border-[1px] border-gray-900 w-[100%]' />
      </div>
    </div>
  );
}