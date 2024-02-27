import Image from 'next/image'
import React from 'react'

export default function LogoWhite() {
  return (
    <Image
      src="/images/vistaLogoWhite.png"
      alt="Vista Logo White"
      width={150}
      height={150}
      className="relative"
    />
  )
}
