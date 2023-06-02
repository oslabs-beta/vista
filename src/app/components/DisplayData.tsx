import React from "react";
import QueryCard from "./QueryCard";



export function DisplayData(props: any) { //TODO: type
  //console.log('data from DisplayData comp', props.data.__schema);
  return (
    <>
      <div className="m-4 p-4 border-2 border-red-600">
        {props.data['__schema'] && props.data['__schema'].types.map((type: any, i: number) => {
          return (
              <div key={i}>
              <QueryCard
                type={props.data.__schema.types[i]}

              />
            </div>    
        );
        })}
      </div>
    </>
  )
}

// type={props.data.__schema.types[i]}
//type={props.data.__schema}