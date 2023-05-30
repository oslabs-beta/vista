export function DisplayData(props: any) { //TODO: type
  return (
    <>
      <div className="m-4 p-4 border-2 border-red-600">
        {props.data.err && alert('Please enter a valid endpoint')}
        {props.data.schema && Object.keys(props.data.schema).map((key, index) => {
          return (
            <ul className="list-disc list-inside" key={index}>
              {key}
              {props.data.schema[key].map((keyKey: any, indexKey: any) => { //TODO: type
                return (
                  <li className="pl-5" key={indexKey}>
                    {keyKey}
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>
    </>
  )
}