import Image from 'next/image'
import React from 'react'

export default function LandingPageLogo() {
  return (
    <Image
      src="/images/vistaLogo.png"
      alt="Vista Logo"
      width={800}
      height={800}
      className="relative left-50"
    />
  )
}
