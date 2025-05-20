import Image from 'next/image'
import React from 'react'

const ContainerLogo = () => {
  return (
    <div className='mt-2 py-2'>
      <div
        data-slot="sidebar-content"
        data-sidebar="content"
        className="group-data-[collapsible=icon]:hidden">
        <Image
          alt='logo cyber yokai'
          width={85}
          height={32}
          unoptimized
          src='/assets/images/logo.webp'
        />
      </div>
      <div
        data-slot="sidebar-content"
        data-sidebar="content"
        className="bg-container-logo size-8 hidden group-data-[collapsible=icon]:block rounded-md">
        <Image
          alt='logo cyber yokai'
          width={85}
          height={32}
          unoptimized
          src='/assets/images/logo-login.webp'
        />
      </div>
    </div>
  )
}

export default ContainerLogo