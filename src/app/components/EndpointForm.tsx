import { getSchema } from "@/utils/getSchema";
import { sign } from "crypto";
import { useSession, signIn, signOut } from "next-auth/react";

export function EndpointForm({ childToParent }: any) {
  //TODO: type
  const handleSubmit = async (data: FormData) => {
    const schema = await getSchema(data);
    const schemaAndEndpoint = { ...schema, endpoint: "" };
    const endpoint = data.get("endpoint-url")?.valueOf();
    if (typeof endpoint === "string") {
      schemaAndEndpoint.endpoint = endpoint!;
    }
    childToParent(schemaAndEndpoint);
  };
  const { data: session, status } = useSession();

  function checkIfLoggedIn() {
    return status === "authenticated" ? (
      <div className="p-5 flex items-center space-x-1 dark:bg-slate-800 dark:text-white">
        <h1 className="mr-1">Welcome {session.user!.email}</h1>{" "}
        {/* <button onClick={() => signOut()} >Sign Out</button> */}
      </div>
    ) : (
      <div>
        <h1 className="p-5 mr-1 dark:bg-slate-800 dark:text-white">Authentication not found</h1>{" "}
      </div>
    );
  }
  return (
    <>
      <form action={handleSubmit} className="m-0 p-6 flex items-center dark:bg-slate-800">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            name="endpoint-url"
            id="simple-search"
            className="bg-gray-50 dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter GraphQL API endpoint..."
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-1 mr-1 text-sm font-medium text-white bg-blue-700 dark:bg-slate-500 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-slate-500 dark:hover:bg-slate-300 dark:hover:text-slate-900"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        <div className="flex items-center space-x-1">
    {/* Sign In button */}
    <button onClick={() => signIn()} className=" w-32 bg-blue-500 text-white px-3 py-2 rounded-lg">
      Sign In
    </button>
    {/* Sign Out button */}
    <button onClick={() => signOut()} className=" w-32 bg-red-500 text-white px-3 py-2 rounded-lg">
      Sign Out
    </button>
    </div>

      </form>

      {checkIfLoggedIn()}
    </>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { EndpointForm };

//import { getSchema } from '@/app/utils/getSchema';
// import { useSession, signIn, signOut} from 'next-auth/react'

// export function EndpointForm({childToParent}: any) { //TODO: type
//   const handleSubmit = async (data: FormData) => {
//     childToParent(await getSchema(data));
