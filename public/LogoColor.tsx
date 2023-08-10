import Image from 'next/image'
import React from "react"

export default function LogoColor() {
    return <Image 
    src="/images/vistaLogoColor.png"
    alt='Vista Logo Color'
    width={600}
    height={400}
    className="relative"
    />
}