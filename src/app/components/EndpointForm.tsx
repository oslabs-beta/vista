import { getSchema } from "@/utils/getSchema";
import { sign } from "crypto";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";


import { useRouter } from "next/navigation";

export function EndpointForm({ childToParent }: any) {
  console.log({childToParent})
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const { data: instance } = useSession();
  const image: any = instance?.user?.image;

  useEffect(() => {
    console.log('this is the instance, aka session object ---->', instance)
 
    setIsLoggedIn(!!instance);
  }, [instance])
  //TODO: type
  const onSignIn = () => {
    signIn();
    }

const onSignOut = () => {
  signOut();
  setIsLoggedIn(false);
  
}


  const router = useRouter();

  const toggleTheme = () => {
    // query for HTML element
    const htmlElement = document.querySelector('html'); // TODO: type

    // update class on HTML element
    if(htmlElement?.classList.contains('dark')) {
      htmlElement?.classList.remove('dark');
    } else {
      htmlElement?.classList.add('dark');
    }
  };

  const handleSubmit = async (data: FormData) => {
    const schema = await getSchema(data);
    const schemaAndEndpoint = { ...schema, endpoint: "" };
    const endpoint = data.get("endpoint-url")?.valueOf();
    if (typeof endpoint === "string") {
      schemaAndEndpoint.endpoint = endpoint!;
    }
    console.log("schema endpoint:", schemaAndEndpoint);
    childToParent(schemaAndEndpoint);
  };
  const { data: session, status } = useSession();

  function checkIfLoggedIn() {
    return status === "authenticated";
  }

  // function checkIfLoggedIn() {
  //   return status === "authenticated" ? (
  //     <div className="p-5 flex items-center space-x-1 dark:bg-slate-800 dark:text-white">
  //       {/* <h1 className="mr-1">Welcome {session.user!.email}</h1>{" "} */}
  //       {/* <button onClick={() => signOut()} >Sign Out</button> */}
  //     </div>
  //   ) : (
  //     <div>
  //     </div>
  //   );
  // }
  return (
    <>
      {/* <form action={handleSubmit} className="pt-5 pr-4 pl-4 flex items-center dark:bg-slate-800"> */}
      <form data-testid="endpoint-form" action={handleSubmit} className="pt-5 pr-4 pl-4 flex items-center dark:bg-slate-800">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-white"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:bg-slate-500 dark:focus:border-blue-500"
            placeholder="Enter GraphQL API endpoint..."
            required
          />
        </div>
        {/* Search Button */}
        <button
          type="submit"
          className="p-2.5 ml-1 mr-1 text-sm font-medium text-white bg-blue-700 dark:bg-slate-500 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-slate-500 dark:border-white dark:hover:bg-slate-300 dark:hover:text-slate-900"
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
        {/* User Account Dropdown */}
        <div className="flex items-center space-x-1.5">
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              {/* Account Button */} 
              {/* <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 border border-blue-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-gray-200 dark:bg-slate-500 dark:border-white dark:hover:bg-slate-300'></Menu.Button>      */}
              <Menu.Button data-testid="account-button" className='inline-flex w-full justify-center gap-x-1.5 border border-blue-500 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-gray-200 dark:bg-slate-500 dark:border-white dark:hover:bg-slate-300'>
              {isLoggedIn ? (
                    <img src={image} alt="" className="inline-flex w-full justify-center gap-x-1.5 border-blue-500 rounded-sm w-6 h-6"
                    />
                  ) : (
                    <svg
                  className="w-6 h-6 flex items-center text-blue-500 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
                  ></path>          
                </svg>
                  )}
                {/* <svg
                  className="w-6 h-6 flex items-center text-blue-500 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
                  ></path>          
                </svg> */}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              {/* //mt-2 */}
             <Menu.Items className="absolute right-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                  {!isLoggedIn && (
                    <Menu.Item>
                      <button type='submit' onClick={() => router.push('/signup')} className="inline-flex r-2 w-56 hover:bg-slate-300"> {/* TODO: look into this error */}
                        Sign Up
                      </button>
                    </Menu.Item>
                  )}
                <Menu.Item>
                  {isLoggedIn ? (
                    <button data-testid="sign-out-button" onClick={onSignOut} className="inline-flex w-56 hover:bg-slate-300">
                      Sign Out
                    </button>
                  ) : (
                    <button data-testid="sign-in-button" onClick={onSignIn} className="inline-flex w-56 hover:bg-slate-300">
                      Sign In
                    </button>
                  )}
                </Menu.Item>
                  <Menu.Item>
                    <button onClick={toggleTheme} className="inline-flex w-56 hover:bg-slate-300">
                      Toggle Theme
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* Account Button */}    
          {/* <button className='px-2 py-2 m-1 rounded-lg border dark:border-white dark:hover:border-sky-500 dark:bg-slate-500 dark:text-white dark:hover:bg-slate-300 dark:hover:text-slate-900'>
            <svg
                  className="w-6 h-6 flex items-center"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
                  ></path>          
            </svg>
          </button> */}

          {/* Sign In Button */}
          {/* <button onClick={() => signIn()} className=" w-32 bg-blue-500 text-white px-3 py-2 rounded-lg">
            Sign In
          </button> */}

          {/* Sign Out button
          <button onClick={() => signOut()} className=" w-32 bg-red-500 text-white px-3 py-2 rounded-lg">
            Sign Out
          </button> */}
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