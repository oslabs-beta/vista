export function DisplayData(props: any) { //TODO: type
  // console.log('data on DisplayData:', props.data);
  // console.log('is props.data true:', props.data ? true : false);
  // console.log('keys of data on DisplayData:', Object.keys(props.data));
  return (
    <>
      <div className="m-4 p-4 border-2 border-red-600">
        {Object.keys(props.data).map((key, index) => {
          return (
            <ul className="list-disc list-inside" key={index}>
              {key}
              {props.data[key].map((keyKey: any, indexKey: any) => { //TODO: type
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