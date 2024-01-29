import React from 'react'
import Link from 'next/link'
import VistaScreenShot from '../../../public/VistaScreenShot'

const Hero = () => (
  <div className="w-full h-full bg-background py-24">
    <div className="max-w-[1488px] m-auto grid grid-cols-2">
      <div className="grid grid-cols-1 space-between-2 justify-items-center items-center gap-0 ">
        <h1 className="w-min relative md:text-8xl text-12xl text-primary font-semibold">
          Vista{' '}
        </h1>
        <p className="italic text-2xl text-warning font-semibold">
          Put it all to view
        </p>
        <Link href="/">
          <button className="ml-1 bg-secondary text-white text-l font-semibold py-3 px-5 -mt-40 rounded-xl inline-flex hover:border-2 border-black shadow-md">
            Get Started
          </button>
        </Link>
      </div>

      <VistaScreenShot />
    </div>
  </div>
)

export default Hero
