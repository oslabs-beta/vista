import React from 'react'
import {ProfileProps} from '../../../types'
import LinkedInLogo from '../../../public/LinkedInLogo'
import Image from 'next/image'
import GitHubLogo from '../../../public/GitHubLogo'

const Profile = (props:ProfileProps) => {

    return (
        <div className='mt-5 grid place-items-center'>
            <Image
            src={props.picture}
            width={256}
            height={256}
            alt={props.name}
            />
            <p className='text-xl font-medium '>{props.name}</p>
            <span className='my-3 grid grid-cols-2 gap-2'>
                    <span className='hover:cursor-pointer'><LinkedInLogo url={props.linkedIn} /></span>
                    <span className='hover:cursor-pointer'><GitHubLogo url={props.gitHub}/></span>
            </span>
            
        </div>
    )
}

export default Profile