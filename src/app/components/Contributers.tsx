import React from 'react'
import Profile from './Profile'

const Contributers = () => {
    return (
        <div className='mx-5 border border-black flex justify-evenly'>
            <Profile name='Charlie Charboneau' picture='/images/charlie.jpg'/>
            <Profile name='Lucas Contreras' picture=''/>
            <Profile name='Semantic Search'picture=''/>
            <Profile name='Nestor Cayanan' picture=''/>
            <Profile name='Stephanie Serrano' picture=''/>
        </div>
    )
}

export default Contributers 