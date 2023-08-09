import React from 'react';

const Features = () => {
    return (
        <>
        <div>
            <h1 className='px-5 text-4xl'>What is Vista?</h1>
            <ul>
                <li className='px-8 text-lg'>A visual tool that allows you to see a graph of a GraphQL schema.</li>
                <li className='px-9 text-lg'></li>
                <li className='px-10 text-lg'>Point 3</li>
            </ul>
        </div>
        <div className='border border-black grid grid-cols-3 justify-center items-center text-center'>
            <div className='border border-black flex justify-center items-center text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="border border-black feather feather-eye">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            </div>
            <div className='border border-black flex justify-center items-center text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="border border-black feather feather-eye">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            </div>
            <div className='border border-black flex justify-center items-center text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="border border-black feather feather-eye">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            </div>
            <div>description1</div>
            <div>description2</div>
            <div>description3</div>
        </div>
        </>
    );
}

export default Features;
