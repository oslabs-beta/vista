import QueryCard from "./QueryCard";

export function DisplayData(props: any) { //TODO: type
  console.log('data from DisplayData comp', props.data);
  return (
    <>
      <div className="m-4 p-4 border-2 border-red-600">
        {props.data['__schema'] && props.data['__schema'].types.map((type: any, i: number) => {
          //TODO: type
          return (
            <div key={i}>
              <QueryCard
                fields={props.fields}
                type={type}
                data={props.data}
              />
            </div>
          );
        })}
      </div>
    </>
  )
}