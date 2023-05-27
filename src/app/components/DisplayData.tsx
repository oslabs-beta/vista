export function DisplayData(props: any) { //TODO: type
  // console.log('data:', props.data);
  return (
    <>
      <div className="m-4 p-4 border-2 border-red-600">
        {props.data['__schema'] && props.data['__schema'].types.map((type: any, i: number) => { //TODO: type
          return <li key={i}>{type.name}</li>
        })}
      </div>
    </>
  )
}