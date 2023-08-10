import Image from 'next/image'
import React from "react"

export default function VistaScreenShot() {
    return <Image 
    src="/images/screenshot.png"
    alt='Vista Screenshot'
    width={640}
    height={360}
    />
}