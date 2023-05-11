import Image from 'next/image'
import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import Logo from '../public/logo.png'
import { MdHowToVote } from 'react-icons/md'

type Props = {
   title: string;
   image?: string;
   group: string
   date: string;
}

function EventPill( { title,image,group,date}: Props) {
  return (
    <div className="z-1 relative w-full h-96 rounded-lg overflow-hidden group">
        <Image src={image || Logo} alt="BG" className="z-10 absolute h-96 object-contain opacity-30 transition ease-in group-hover:scale-105" />
        <div className="z-20 absolute h-full w-full flex flex-col items-center justify-center space-y-4 bg-red-600/80 text-white"></div>
        <div className="p-6 w-full absolute left-1/5 bottom-5 z-30 h-full flex flex-col items-center justify-center space-y-4">
          <MdHowToVote className="z-40 h-20 w-20 text-white cursor-pointer"/>
          <span className="z-40 text-center text-lg text-white font-medium tracking-wider flex flex-col space-y-4"><span>{title}</span><span className="w-full text-3xl font-extrabold border-white bg-gradient-to-r from-white via-green-50 to-white bg-clip-text text-transparent">{group}</span></span>
          <span className="text-xs font-semibold tracking-[0.2em] text-white">{date}</span>
        </div>
    </div>
  )
}

export default EventPill