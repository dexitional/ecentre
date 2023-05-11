import React from 'react'
import { BiArrowFromRight } from 'react-icons/bi'
import { BsArrowDownRightCircle } from 'react-icons/bs'

function Banner() {
  return (
    <div className="w-full h-80 bg-red-200 bg-[url('../public/bg3.jpg')] bg-center">
        <div className="mx-auto h-full w-full max-w-6xl grid place-content-center">
            <div className="px-10 py-6 mx-auto w-full rounded-lg shadow-xl border-4 border-white/70 backdrop-blur-sm bg-opacity-60 bg-blue-950 grid place-content-center gap-y-4">
                <h1 className="pb-2 w-full font-semibold font-inter text-2xl tracking-[0.2em] text-center text-yellow-100">FILL YOUR ONLINE NOMINATION !!</h1>
                <div className="grid grid-cols-2 gap-x-3 font-semibold">
                   <input className="px-6 py-3 rounded-lg uppercase text-white placeholder:tracking-[0.2em] placeholder:text-white bg-blue-950/70 border-2 focus:ring-0 focus:border-white border-white col-span-1" type="text" placeholder="SERIAL" />
                   <input className="px-6 py-3 rounded-lg uppercase text-white placeholder:tracking-[0.2em] placeholder:text-white bg-blue-950/70 border-2 focus:ring-0 focus:border-white border-white col-span-1" type="text" placeholder="PIN" />
                </div>
                <button className="px-6 py-2 h-14 min-w-md rounded-lg bg-slate-100 border-b border-blue-950 text-blue-950 font-semibold flex items-center justify-center space-x-4">
                    <span className="text-xl tracking-widest font-extrabold text-blue-950">ENTER</span>
                    <BsArrowDownRightCircle className="h-7 w-7 text-blue-950"/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Banner