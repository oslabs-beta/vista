import React from 'react'
import QueryCard from './QueryCard';

const FieldsBtn = (props: any) => {

//props.type or props.data based off the QueryCard props we are passing down
console.log('FieldsBtn props:', props.result);
console.log('FieldsBtn type name:', props.result.name);
return (
  <>
    {console.log('this is the data that should render in the button', props.result.name)}
    {/* <button>{props.type.__schema.types.name}</button> */}
    <button>{props.result}</button>
  </>
)

}

export default FieldsBtn;

