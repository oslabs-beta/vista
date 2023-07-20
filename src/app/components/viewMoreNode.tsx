import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

import { DisplayData } from './DisplayData';

interface TextUpdaterNodeProps {
  id: any,
  data: any; // Replace 'any' with the correct type for 'data'
  isConnectable: boolean;
  //onClick: () => void;
}

const handleStyle: React.CSSProperties = { width: 10 };

// style: {
//   width: 200,
//   height: 400,
// }

const handleClick = () => {
  console.log('button was clicked!');
};

function TextUpdaterNode({data, isConnectable }: TextUpdaterNodeProps) {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);
  
  return (
    //bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:bg-slate-500 dark:focus:border-blue-500
    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:bg-slate-500 dark:focus:border-blue-500 w-[200px] h-[400px]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div id="a">
        <h1 className='text-center pr-9'>{data.label}</h1>
      </div>
      {/* //ml-1 text-blue-500 dark:text-white px-3 py-1 rounded-xl my-1 border border-blue-500 hover:bg-blue-500 hover:text-white hover:transition-all mx-1 inline-flex dark:bg-slate-500 dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900 */}
      <button type="button" className="absolute text-center pr-5 bottom-2 py-3 px-6 text-blue-500 dark:text-white rounded-xl my-1 border border-blue-500 hover:bg-blue-500 hover:text-white hover:transition-all mx-1 inline-flex dark:bg-slate-500 dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900" onClick={handleClick}> {/* Use the provided onClick prop */}
          View More
        </button>
    </div>
  );
}



export default TextUpdaterNode;