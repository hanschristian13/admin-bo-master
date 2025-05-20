import React from 'react'
import Image from 'next/image'
import FormLogin from '@/components/form/login'
import { getWebRole } from '../action/libs'
import BadgeStatus from '@/components/badge-status'

const PageLogin = async () => {
  const webRole = await getWebRole()
  return (
    <div className="p-6 max-h-screen min-h-screen flex justify-center items-center">
      <div className="relative p-6 w-full h-[calc(100vh-48px)] flex justify-center items-center rounded-[48px] overflow-hidden">
        <div
          className="absolute z-0 h-[50%] w-full top-0 left-0 right-0"
          style={{
            background:
              'linear-gradient(180deg, #FFFFEA 0%, rgba(255, 227, 173, 0.8) 15.89%, #FFE7C8 62.5%, rgb(255 246 245 / 0%) 100%), radial-gradient(50% 74.51% at 50% 100%, rgba(255, 255, 255, 0.5) 24.09%, rgba(255, 255, 255, 0.16) 100%)'
          }}></div>
        <div
          className="relative px-6 pb-6 pt-14 bg-white rounded-2xl"
          style={{
            boxShadow:
              'rgba(255, 255, 255, 0.3) 0px 0px 0px 10px, rgba(0, 0, 0, 0.3) 0px 4px 8px -4px',
            border: '1px solid',
            borderImageSource: 'linear-gradient(180deg, rgba(235, 235, 235, 0) 0%, #EBEBEB 100%)'
          }}>
          <div className="bg-container-logo absolute -top-8 left-0 right-0 mx-auto size-16 rounded-xl">
            <Image
              alt="logo cyber yokai"
              width={64}
              height={64}
              quality={100}
              src="/assets/images/logo-login.webp"
              unoptimized
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-y-5 w-full">
              <div className="flex flex-col gap-y-3 text-center">
                {/* <div
                  className='flex gap-x-2  items-center px-2 py-1 rounded-md w-fit mx-auto text-[13px] font-medium capitalize'
                  style={{
                    boxShadow: '0px 0px 0px 1px rgba(18, 55, 105, 0.08), 0px 1px 2px 0px rgba(164, 172, 185, 0.4)'
                  }}>
                    <Image
                      alt=''
                      width={16}
                      height={16}
                      src='/assets/icon/master.svg'
                    />
                    master</div> */}
                <div>
                  <div className="text-lg font-semibold capitalize">welcome back</div>
                  <div className="text-[13px]">Enter your username and password to log in</div>
                  {webRole && <BadgeStatus title={webRole!} styleDotStatus="green" />}
                </div>
              </div>
              <FormLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLogin
