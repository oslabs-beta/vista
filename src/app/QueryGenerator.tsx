import React, { useState } from "react";
import "tailwindcss/tailwind.css";

export default function QueryGenerator() {
  const [result, setResult] = useState("");
  const [schemaVal, setSchemaVal] = useState("");
  const [queryStructure, setQueryStructure] = useState({});

  // Event handler for running the query
  const handleRunQuery = (buttonName: string) => {
    try {
      // Execute the code input by the user
      const schemaResult = eval(buttonName);

      // Set the result to the schema result
      setResult(schemaResult.toString());
    } catch (error: any) {
      // Handle any errors that occur during code execution
      setResult(`Error: ${error.message}`);
    }

    // Set the schema value to the button name
    setSchemaVal(schemaVal + buttonName);
  };

  // this function will be the onClick for each button, it should check if the type of the field that was clicked is already on queryStructure, if so, it will add a new element to the array value of the corresponding type, if not, it will add the type as a property with a value of an array with only the clicked field as an element. after that, it will call stringifyQuery and re-render the value of the textarea.
  const updateQueryStructure = (fieldName: string, typeName: string) => {
    
    // {
    //   character: ["age"]
    // }
  }

  // we are assuming we don't need to handle clicks to the type names, the user would only be able to click on it's fields
  const stringifyQuery = (query: object) => {
    const generatedFieldName =
      typeName + " " + "{" + "\n" + "  " + fieldName + "\n" + "}" + "\n";
    setSchemaVal(schemaVal + generatedFieldName);
  };

  /*
    character{
      name
    }
  */

  /*
  {
    character :["name", "age", "height"],
    episode: ["name", "length", "characters"]
  }
  */
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-4 max-w-md w-full">
        <form>
          <label className="block mb-2 text-black">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
              onClick={(e) => {
                e.preventDefault();
                const buttonName =
                  (e.target as HTMLButtonElement).textContent || "";
                  stringifyQuery(buttonName, "hello");
              }}
            >
              Schema 1
            </button>
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
              onClick={(e) => {
                e.preventDefault();
                const buttonName =
                  (e.target as HTMLButtonElement).textContent || "";
                  stringifyQuery(buttonName, "sup");
              }}
            >
              Schema 2
            </button>
            <br />
            <textarea
              value={schemaVal}
              className="border border-gray-300 rounded px-2 py-1 w-full h-40 break-normal"
              readOnly
            />
          </label>

          <p className="text-black">Result: {result}</p>
        </form>
      </div>
    </div>
  );
}
