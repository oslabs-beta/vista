'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import SignupForm from '../components/SignupForm'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [passMatch, setPassMatch] = useState(true)
  const [usernameTaken, setUsernameTaken] = useState(false)
  const [createdUsername, setCreatedUsername] = useState('')

  useEffect(() => {
    setPassMatch(password === rePassword)
  }, [password, rePassword])

  const postSignup = async () => {
    const { data } = await axios.post('/api/signup', { username, password })
    // console.log('this is data from signup/page.tsx', data)
    // console.log('username', data.username);
    // console.log('userTaken', data.userTaken);
    data.userTaken && setUsernameTaken(true)
    data.username && setCreatedUsername(data.username)
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <SignupForm
            action={postSignup}
            setUsername={setUsername}
            setPassword={setPassword}
            setRePassword={setRePassword}
            passMatch={passMatch}
            setPassMatch={setPassMatch}
            usernameTaken={usernameTaken}
            setUsernameTaken={setUsernameTaken}
            createdUsername={createdUsername}
          />
          <div className="mt-5">
            <a href="../" className="text-indigo-600">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>
                Go back
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
