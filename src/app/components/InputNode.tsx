import { ChangeEvent, useState } from 'react';
import { Node } from 'reactflow';

export default function InputNode(props: Node) {

  //function to handle changes in the input, should update the graphql query
  const changeArgument = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    // setArgument(e.target.value);
    props.data.argModified({
      value: e.target.value,
      field: props.data.field,
      argument: props.data.argument
    });
  }

  // console.log('queryAsObjDeepCopy from inputNode', props.data.queryAsObjDeepCopy);

  return (
    <div className="flex p-2 rounded-sm w-40 text-xs text-gray-900 text-center border border-solid border-red-500 bg-white shadow-md shadow-red-100">
      <div className="flex-none pr-1">
        {props.data.label}:
      </div>
      <div className="flex-1">
        {/* <input type="text" className='border-[1px] border-gray-900 w-[100%]' onChange={e => changeArgument(e)} /> */}
        <input
          type="text"
          className='border-[1px] border-gray-900 w-[100%] pl-1 pr-1'
          onChange = { e => props.data.setArgument({value: e.target.value, field: props.data.field, argument: props.data.argument}) }
          placeholder='required'
        />
      </div>
    </div>
  );
}