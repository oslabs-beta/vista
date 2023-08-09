"use client"

import React, { useEffect } from "react";
import EndpointForm from "../components/EndpointForm";
import { useSession, signIn } from "next-auth/react";


 

const Login = () => { 
  //const { data: session } = useSession();
  useEffect(() => {
    signIn();
  }, [])

    return (
        <div>
          
        </div>
    )
};

export default Login