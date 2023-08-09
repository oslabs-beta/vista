import React from 'react'
import ProfileProps from '../../../types'
import LinkedInLogo from '../../../public/LinkedInLogo'
import GitHubLogo from '../../../public/GitHubLogo'
import Charlie from '../../../public/images/charlie.jpeg'

const Profile = (props:ProfileProps) => {

    return (
        <div className='border border-black grid place-items-center'>
            {props.name}
            <LinkedInLogo />
            <GitHubLogo />
        </div>
    )
}

export default Profile