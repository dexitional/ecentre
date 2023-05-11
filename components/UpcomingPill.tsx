import Image from 'next/image'
import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import Logo from '../public/logo.png'
import { MdHowToVote } from 'react-icons/md'
import Link from 'next/link'

type Props = {
   title: string;
   image?: string;
   link: string
   date: string;
}

function UpcomingPill( { title,image,link,date}: Props) {
  return (
    <Link href={link} className="z-1 relative w-full h-96 rounded-lg overflow-hidden group">
        <Image src={image || Logo} alt="BG" className="z-10 absolute h-96 object-contain opacity-30 transition ease-in group-hover:scale-105" />
        <div className="z-20 absolute h-full w-full flex flex-col items-center justify-center space-y-4 bg-black/70 text-white"></div>
        <div className="p-6 w-full absolute left-1/5 z-30 h-full flex flex-col items-center justify-center space-y-4">
          <span className="z-40 text-center text-sm text-semibold text-white group-hover:text-orange-400 font-medium tracking-wider flex flex-col space-y-4">{title}</span>
          <span className="text-[0.65rem] font-medium tracking-[0.2em] text-white">{date}</span>
        </div>
    </Link>
  )
}

export default UpcomingPill