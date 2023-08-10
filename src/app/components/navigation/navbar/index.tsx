import React from "react"
import Link from "next/link"
import LogoWhite from "../../../../../public/LogoWhite"


const Navbar = () => {
    return (
        <>
          <div className="w-full h-20 bg-secondary sticky top-0 z-10 mx-auto px-4">
            
              <div className="flex justify-between items-center h-full">
                <Link href="/">
                  <LogoWhite />
                </Link>
                <ul className="hidden md:flex gap-x-6 text-white">
                  <li>
                    <Link href="/services">
                      <p>Docs</p>
                    </Link>
                  </li>   
                  <li>
                    <Link href="/landing/#contributors">
                      <p>Contributors</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup">
                      <p>Register</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <p>Login</p>
                    </Link>
                  </li>
                </ul>
              </div>
            
          </div>
        </>
      );
    };

export default Navbar