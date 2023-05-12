import Image from 'next/image'
import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import Logo from '../public/logo.png'

function IntroVideoBox() {
  return (
    <div className="z-1 relative w-full h-64 md:h-96 overflow-hidden">
        <Image src={Logo} alt="BG" className="z-10 absolute h-72 md:h-96 object-contain opacity-30" />
        <div className="z-20 absolute h-full w-full flex flex-col items-center justify-center space-y-4 bg-[#153b50]/90 text-white"></div>
        <div className="z-30 absolute left-[50%] -translate-x-[50%] translate-y-[50%] bottom-[50%] w-full h-full flex flex-col space-y-3 items-center justify-center">
          <FaPlayCircle className="z-40 h-14 w-14 md:h-20 md:w-20 text-white cursor-pointer"/>
          <span className="z-40 w-5/6 text-center text-md md:text-xl text-white font-semibold">HOW TO VOTE IN ELECTIONS USING THE <br/><span className="text-2xl md:text-3xl font-extrabold border-white bg-gradient-to-r from-white via-green-50 to-white bg-clip-text text-transparent">ELECTA VOTING SYSTEM</span></span>
        </div>
    </div>
  )
}

export default IntroVideoBox