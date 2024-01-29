'use client'

import React, { useEffect } from 'react'
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react'

// const Login = () => {
//   const { data: session } = useSession();

//   return (
//     <SessionProvider>
//       <nav className="ml-auto flex gap-2">
//         {session?.user ? (
//           <>
//             <p className="text-sky-600">{session.user.name}</p>
//             <button className="text-red-500" onClick={() => signOut()}>
//               Sign Out
//             </button>
//           </>
//         ) : (
//           <button className="text-green-600" onClick={() => signIn()}>
//             Sign In
//           </button>
//         )}
//       </nav>
//     </SessionProvider>
//   );
// };

// export default Login;

const Login = () => {
  // const { data: session } = useSession();
  useEffect(() => {
    signIn()
  }, [])

  return <div></div>
}

export default Login
