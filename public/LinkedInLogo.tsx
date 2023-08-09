import Image from 'next/image'
import React from "react"

export default function LinkedInLogo() {
    return <Image 
    src="/images/linkedInLogo.png"
    alt='LinkedIn Logo'
    width={24}
    height={24}
    className="relative"
    />
}