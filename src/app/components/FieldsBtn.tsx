import React from 'react'
import QueryCard from './QueryCard';

const FieldsBtn = (props: any) => {

//props.type or props.data based off the QueryCard props we are passing down
//console.log('FieldsBtn props:', props.result);
return (
  <>
    {/* {console.log('this is the data that should render in the button', props.result)} */}
    <button>{props.result}</button>
  </>
)

}

export default FieldsBtn;

