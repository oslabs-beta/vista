import React from 'react'

const FieldsBtn = (props: any) => {
  console.log('this is from FieldsBtn', props.data['__schema'].types)
  const typeArray = props.data['__schema'].types;

  typeArray.forEach((type: object) => {
    console.log('this is each type', type)
  })
return (
  <div>
    <button>Hello world</button>
  </div>
)

  //add some logic to iterate through our data.
  //Lets figure out what the data is and how to access it.
  
}

export default FieldsBtn;
