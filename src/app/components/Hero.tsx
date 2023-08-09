import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='border border-black w-full bg-white py-24'>
          <div className='max-w-[1488px] m-auto grid grid-cols-2'>
              <div className='border border-black grid place-items-center'>
                  <h1 className='md:text-8xl text-12xl text-primary font-semibold mb-0'>Vista</h1>
                  <p className='text-lg text-warning font-semibold mt-0'>A GraphQL Visualizer</p>
                  <Link href='/'>
                      <button className='ml-1 bg-secondary text-white px-3 py-1 rounded-xl my-1 inline-flex hover:bg-green-100'>
                          Get Started
                      </button>
                  </Link>
              </div>

              <img src={'https://via.placeholder.com/640x360'} alt='Placeholder' />
          </div>
    </div>
  );
}

export default Hero;
