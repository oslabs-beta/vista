import Image from 'next/image'
import React from "react"

export default function GitHubLogo() {
    return <Image 
    src="/images/vistaLogo.png"
    alt='Vista Logo'
    width={150}
    height={150}
    className="relative"
    />
}