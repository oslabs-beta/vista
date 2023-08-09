import React from "react"
import Link from "next/link"
import Logo from "../../../../../public/Logo"


const Navbar = () => {
    return (
        <>
          <div className="w-full h-20 bg-secondary sticky top-0 z-10">
           
              <div className="container mx-auto  px-4 h-full">
              <div className="flex justify-between items-center h-full">
                <Link href="/">
                  <Logo />
                </Link>
                <ul className="hidden md:flex gap-x-6 text-white">
                <li>
                    <Link href="/signup">
                      <p>Create Account</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services">
                      <p>About</p>
                    </Link>
                  </li>   
                  <li>
                    <Link href="/about">
                      <p>Contributors</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <p>Sign in</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      );
    };

export default Navbar


{/* <div className="w-full h-20 bg-secondary sticky top-0 z-10">
  <div className="container mx-auto px-4 h-full">
    <div className="flex justify-between items-center h-full">
      <Link href="/" className="ml-[-20px]"> 
        <Logo />
      </Link>
      <ul className="hidden md:flex gap-x-6 text-white justify-end"> 
       <li>
                    <Link href="/signup">
                      <p>Create Account</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services">
                      <p>About</p>
                    </Link>
                  </li>   
                  <li>
                    <Link href="/about">
                      <p>Contributors</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <p>Sign in</p>
                    </Link>
                  </li>
      </ul>
    </div>
  </div>
</div> */}