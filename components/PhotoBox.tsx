import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Logo from '../public/logo.png'

type Props = {
    label: string;
    image?: string | StaticImageData;
    verified?: boolean;
    submitted?: boolean;
}

function PhotoBox({ label,image = '', verified, submitted }: Props) {
  return (
    <div className="mx-auto w-full md:w-4/5 rounded-md border-2 border-[#153B50] ">
        <div className="mx-auto my-2 pt-2 relative h-16 w-16 md:h-36 md:w-36">
          <Image className="object-contain" src={image} alt="Photo of Aspirant" fill />
        </div>
        <p className="py-1 px-3 text-[0.6rem] md:text-sm  md:text-normal text-center bg-[#153B50]  text-slate-50 tracking-widest font-semibold">{label}</p>
        { submitted  
        ? verified
        ? <p className="py-0.5 px-3 text-[0.55rem] md:text-xs  md:text-normal text-center bg-green-700  text-slate-100 tracking-widest font-semibold">VERIFIED</p>
        : <p className="py-0.5 px-3 text-[0.55rem] md:text-xs  md:text-normal text-center bg-red-700  text-red-100 tracking-widest font-semibold">PENDING</p>
        : null }
    </div>
  )
}

export default PhotoBox