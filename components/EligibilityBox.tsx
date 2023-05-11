import Image from 'next/image'
import React from 'react'
import Logo from '../public/logo.png'

function EligibilityBox() {
  return (
    <div className="z-1 relative w-full h-96 overflow-hidden border-t-8 border-t-[#153b50]">
        <Image src={Logo} alt="BG" className="z-10 absolute h-96 object-contain opacity-30" />
        <div className="z-20 absolute h-full w-full flex flex-col items-center justify-center space-y-4 rounded bg-yellow-500/70 text-white"></div>
        <div className="z-30 px-10 py-6 h-full w-full flex flex-col items-center justify-center space-y-6 text-[#153b50]">
            <span className="z-40 leading-6 text-xl tracking-wide text-center">You don’t need to run for office to make a change. You can influence government decision-making through voting.</span>
            <button className="px-4 py-3 z-40 rounded-sm border-4 border-[#153b50] text-lg font-bold font-roboto">CHECK ELIGIBITY</button>
        </div>
    </div>
  )
}

export default EligibilityBox