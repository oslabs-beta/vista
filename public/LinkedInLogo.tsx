"use client"

import Image from 'next/image'
import React from "react"

export default function LinkedInLogo(props: {url:string}) {
    return <Image
    src="/images/linkedInLogo.png"
    alt='LinkedIn Logo'
    width={48}
    height={48}
    className="relative"
    
    onClick={() => window.location.href=props.url}
    />
}