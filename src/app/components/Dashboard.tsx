import { DisplayData } from "./DisplayData";
import { QueryContainer } from "./QueryContainer";

export function Dashboard(props: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DisplayData data={props.data} />
      <QueryContainer />
    </div>
  )
}