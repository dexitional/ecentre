import Link from 'next/link'
import React from 'react'

function BreakNews() {
  return (
    <div className="w-full bg-[#251577]">
        <div className="md:mx-auto px-3 md:px-6 w-full h-14 md:max-w-6xl flex space-x-0 divide-x-8 divide-red-700">
            <div className="px-3 w-fit h-full flex items-center text-white font-semibold border-r-8 border-yellow-400">PRESS <span className="hidden md:flex ml-2">RELEASES</span></div>
            <div className="flex-1 h-full flex items-center">
              {/* @ts-ignore */}
              <marquee scrollAmount="5" scrollType="alternate" className="text-sm text-slate-100 flex items-center space-x-20" >
                <Link href="/">
                  <span> RE: EC CHAIRPERSON DISRESPECTS PARLIAMENT BY NOT ATTENDING A MEETING OF PARLIAMENT</span>
                </Link>
                <Link href="/">
                  <span> RE: EC CHAIRPERSON DISRESPECTS PARLIAMENT BY NOT ATTENDING A MEETING OF PARLIAMENT</span>
                </Link>
              {/* @ts-ignore */}
              </marquee>
            </div>
        </div>
    </div>
    
  )
}

export default BreakNews