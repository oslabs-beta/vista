/* eslint-disable react/jsx-key */
import React from "react";
import QueryCard from "./QueryCard";

export function DisplayData(props: any) {
  console.log('data from DisplayData comp', props.data.schema);
  const schema = props.data.schema;
  if (!schema) {
    return null; // or render an error message, loading state, or fallback UI
  }
  
  const logType = (type: string) => {
    console.log('this is the type', type);
  };

  return (
    <>
      <div className="m-4 p-4 border-2 border-red-600">
        <div>
          {Object.keys(schema).map((type) => {
            logType(type);
            return (
              <div key={type}>
                {/* We can make this something different than an h3 if we want */}
                <h3>{type}:</h3>
                <ul>
                  {schema[type].map((field: any, index: any) => (
                    <div key={index}>
                      <QueryCard type={field} />
                    </div>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// export function DisplayData(props: any) { //TODO: type
//   console.log('data from DisplayData comp', props.data.schema);
//   const schema = props.data.schema
//   if (!schema) {
//     return null; // or render an error message, loading state, or fallback UI
//   }

//   const logType = (type: any): void  => {
//     console.log('this is the type', type);
//   };

//   return (
//     <>
//       <div className="m-4 p-4 border-2 border-red-600">
//     <div>
//       {Object.keys(schema).map((type) => (
//         <div key={type}>
//           {/* We can make this something different then an h3 if we want */}
//           <h3>{type}:</h3>
//             <ul>
//               {schema[type].map((type: any, index: any) => (
//                 <div key={index}>
//                   <QueryCard
//                   type={type}
//                   />
//                 </div>
//             ))}
//           </ul>
//         </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
