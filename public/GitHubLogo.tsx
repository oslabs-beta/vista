'use client'

import Image from 'next/image'
import React from 'react'

export default function GitHubLogo(props: { url: string }) {
  return (
    <Image
      src="/images/gitHubLogo.png"
      alt="GitHub Logo"
      width={48}
      height={48}
      className="relative"
      onClick={() => (window.location.href = props.url)}
    />
  )
}
