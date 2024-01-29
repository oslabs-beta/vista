import React from 'react';
import Link from 'next/link'

const Features = () => {
    return (
        <div className='bg-primary'>

        <div className='pl-5 flex align-center'>
        <div className='grid grid-cols-1 content-center'>
            <h1 className='pt-5 mx-5 text-6xl text-white text-center w-full'>What is Vista?</h1>
            <p className='mt-5 px-[400px] text-white text-center w-full'>Vista is a visual tool that allows you to view the results of querying a GraphQL API which renders on the screen as a graph. By visualizing the graph, you are able to see the structure of your schemas, similar to the documentation explorer in GraphiQL, but in a much more dynamic, descriptive, and interactive way.</p>
        </div>
        </div>

        <div className='m-10 grid grid-cols-3 gap-4 justify-center'>
            <div className='bg-background flex justify-center items-center text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-5 -mr-4 feather feather-eye">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <div className='p-8'>
                    <strong className='text-lg'>Visible Schema: </strong>Render a visual of your schema to comprehend the schema structure.
                </div>
            </div>
            <div className='bg-background flex justify-center items-center text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-5 -mr-4 feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
                <div className='p-8'>
                    <strong className='text-lg'>Interactive Nodes: </strong>Build Queries to access the data you need with just a point and click!
                </div>
            </div>
            <div className='bg-background flex justify-center items-center text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="ml-5 -mr-4 feather feather-check"><polyline points="20 6 9 17 4 12"></polyline>
            </svg>
                <div className='p-8'>
                    <strong className='text-lg'>Query Testing: </strong>Test your query to see if the data returned by the server fits your needs.</div>
                </div>
            </div>
            
            
            
        <div className='flex flex-row justify-center gap-4 py-8'>
            <Link href='https://vistavisualizer.medium.com/vista-the-remedy-to-your-graphql-schema-woes-6a99e16e1fbf'>
                <button className='ml-1 bg-secondary text-white px-3 py-1 rounded-xl inline-flex hover:border-2 border-black'>Learn More</button>
            </Link>

            <Link href='http://github.com/oslabs-beta/vista'>
                <button className='ml-1 bg-secondary text-white px-3 py-1 rounded-xl inline-flex hover:border-2 border-black'>Github</button>
            </Link>
        </div>
        </div>
    );
}

export default Features;
