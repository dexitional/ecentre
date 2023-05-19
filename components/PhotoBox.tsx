import React from 'react'
import Image from 'next/image'
import Logo from '../public/logo.png'

type Props = {
    label: string;
    image?: string;
}

function PhotoBox({ label,image }: Props) {
  return (
    <div className="mx-auto w-full md:w-4/5 rounded-md border-2 border-[#153B50] ">
        <div className="mx-auto my-2 pt-2 relative h-16 w-16 md:h-36 md:w-36">
          <Image className="object-contain" src={image || Logo} alt="Photo of Aspirant" fill />
        </div>
        <p className="py-1 px-3 text-[0.6rem] md:text-sm  md:text-normal text-center bg-[#153B50]  text-slate-50 tracking-widest font-semibold">{label}</p>
    </div>
  )
}

export default PhotoBox