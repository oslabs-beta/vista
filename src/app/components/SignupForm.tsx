import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupForm(this: any, {action, setUsername, setPassword, setRePassword, passMatch, usernameTaken, createdUsername}: any) { //TODO: type
  const passNoMatchMsg = 'Passwords must match';
  const userTakenMsg = 'Email address is already in use, sign in or use a different one to sign up.';
  const userCreatedMsg = 'User successfully created!';
  
  return (
    <>
      <form className="space-y-6" action={action}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" required onChange={e => setUsername(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password" required onChange={e => setPassword(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="re-password" className="block text-sm font-medium leading-6 text-gray-900">Re-enter password</label>
            {!passMatch && (
              <p className="block text-sm font-medium leading-6 text-red-700">{passNoMatchMsg}</p>
            )}
          </div>
          <div className="mt-2">
            <input id="re-password" name="re-password" type="password" required onChange={e => setRePassword(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={!passMatch} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300">Sign up</button>
        </div>
      </form>
      {usernameTaken && (
        <p className="block text-sm font-medium leading-6 text-red-700 text-center">{userTakenMsg}</p>
      )}
      {createdUsername && (
        <>
          <p className="block text-sm font-medium leading-6 text-green-600 text-center">{userCreatedMsg}</p>
          <p onClick={
            //FIXME: make the callbackUrl work when we deployed, shouldn't be localhost... use dotenv maybe?
            () => signIn(undefined, {callbackUrl: 'http://localhost:3000'})
          } className="block text-sm font-medium leading-6 text-blue-600 text-center underline hover:cursor-pointer">
            Sign in here
          </p>
        </>
      )}
    </>
  )
}