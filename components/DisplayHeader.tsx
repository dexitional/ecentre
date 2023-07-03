import React from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image';

type Props = {
    title: string;
    print?: boolean;
}

function DisplayHeader({ title, print }: Props) {
  return (
    <header className={`relative h-24 bg-red-800 rounded-md ${print ? 'hidden print:flex mb-28':'flex print:hidden'} items-center `}>
        <h1 className="absolute top-4 left-[50%] -translate-x-[50%] text-3xl md:text-5xl print:scale-95 text-white font-poppins font-bold tracking-widest ">{new Date().getFullYear()}/{new Date().getFullYear()+1}</h1>
        <h2 className="z-20 px-4 py-2 md:px-6 md:py-3 w-[95%] md:w-4/5 h-fit md:h-14 flex items-center justify-center md:rounded-tl-full md:rounded-bl-full bg-blue-950 text-blue-50 text-sm md:text-3xl print:text-2xl font-bold tracking-widest absolute top-16 left-[50%] -translate-x-[50%] ">{title?.toUpperCase()}</h2>
        <h2 className="z-10 p-2 pb-2 md:px-4 md:py-5 md:pb-0 w-[80%] md:w-3/5 h-fit md:h-14 flex items-center justify-center rounded-br-xl rounded-bl-xl md:rounded-br-full md:rounded-bl-full border-2 md:border-4 border-blue-950 bg-blue-100 text-blue-950 text-sm md:text-2xl print:text-2xl font-extrabold tracking-widest absolute top-24 left-[50%] -translate-x-[50%] ">DISPLAY OF ASPIRANTS</h2>
        <div className="z-20 p-2 hidden md:flex absolute right-10 top-6 bg-white shadow-xl shadow-slate-900/30  rounded-full">
            <div className="h-20 w-20 flex items-center justify-center "><Image src={Logo} className="w-16 object-cover rounded" alt="Logo" height={100} width={100} /></div>
        </div>
    </header>
  )
}

export default DisplayHeader