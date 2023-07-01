import Image from 'next/image'
import React from 'react'
import Logo from '../public/logo.png'
import { BsArrowRightCircle } from 'react-icons/bs'

function InstructBox() {
  return (
    <div className="z-1 relative w-full h-64 md:h-96  overflow-hidden">
        <Image src={Logo} alt="BG" className="z-10 absolute h-96 object-contain opacity-30" />
        <div className="z-20 absolute h-full w-full flex flex-col items-center justify-center space-y-4 bg-[#153b50]/90 text-white"></div>
        <div className="z-30 px-10 py-6 h-full w-full flex flex-col items-center justify-center space-y-3 md:space-y-6 text-white">
          <h1 className="z-40 text-[1.27rem] md:text-3xl text-center font-roboto font-extrabold border-white bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 bg-clip-text text-transparent">2023 Election Instructions</h1>
          <span className="z-40 leading-6 text-lg md:text-xl text-center">Not sure what your role is in this elections. Head here to find out what to do.</span>
          <button className="px-3 md:px-6 py-3 z-40 min-w-max bg-yellow-400 text-[#153b50] flex items-center space-x-4 text-sm font-medium font-roboto">
            <span className="font-bold">GO NOW</span>
            <BsArrowRightCircle className="h-8 w-8" />
          </button>
        </div>
    </div>
  )
}

export default InstructBox