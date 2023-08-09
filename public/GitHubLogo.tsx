import Image from 'next/image'
import React from "react"

export default function Logo() {
    return <Image 
    src="/images/gitHubLogo.png"
    alt='GitHub Logo'
    width={24}
    height={24}
    className="relative"
    />
}