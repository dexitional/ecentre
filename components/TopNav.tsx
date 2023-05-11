import React from 'react'
import TopNavPill from './TopNavPill'
import { MdMail, MdPhone } from 'react-icons/md'
import Socials from './Socials'

function TopNav() {
  return (
    <div className="w-full bg-[#153B50]">
        <div className="mx-auto px-4 w-full max-w-6xl h-14 flex flex-col md:flex-row items-center justify-between text-white">
           <div className="flex flex-col md:flex-row space-x-12">
               <div className="text-xs font-medium">Transparency. Fairness. Integrity</div>
               <div className="flex items-center flex-col md:flex-row space-x-16">
                  <TopNavPill title="ec@ucc.edu.gh" Icon={MdMail} />
                  <TopNavPill title="+233 (0) 55 864 1826" Icon={MdPhone} />
               </div>
           </div>
           <div className="pr-8">
               <Socials />
           </div>
        </div>
    </div>
  )
}

export default TopNav