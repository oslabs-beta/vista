import { QueryGenerator } from "./QueryGenerator";
import { QueryOutput } from "./QueryOutput";

export function QueryContainer() {
  return (
    <div>
      <QueryGenerator />
      <QueryOutput />
    </div>
  )
}