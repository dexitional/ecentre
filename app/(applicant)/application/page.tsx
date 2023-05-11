import { useState } from "react"
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import NominationForm from "@/components/NominationForm"
import Link from "next/link"


export default function Page() {
  
  return (
    <main className="flex-1 space-y-8">
        <h1 className="px-4 py-2 text-4xl text-center font-bold tracking-wider rounded border-2 border-[#153B50] text-[#153B50]">GRASAG/JCRC ELECTIONS NOMINATION FORM</h1>
        <div className="px-10 py-6 bg-slate-50 space-y-4">
          <h2 className="text-xl">INSTRUCTIONS</h2>
          <div className="">
            <p>Please provide the requested information. Falsification of any information leads to automatic disqualification.</p>
            <p>Deadline for submission of Online Nomination is Friday, June 9, 2023 at 11:59 PM.</p>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-3 gap-8">
            <NominationForm />
            <section className="col-span-1 space-y-14">
                <div className="p-4 py-6 pb-10 flex-1 space-y-4 bg-gray-50 shadow-md shadow-gray-600/20 rounded-lg">
                    <legend className="px-4 py-2 bg-slate-100 border text-[#153B50] font-semibold tracking-widest">ELECTORAL SETUP</legend>
                    <div className="mx-auto w-4/5 rounded-md border-2 border-[#153B50] ">
                      <div className="my-2 pt-2 mx-2 relative h-36 w-36 ">
                        <Image className="object-contain" src={Logo} alt="Photo of Aspirant" fill />
                      </div>
                      <p className="py-1 px-3 text-center bg-[#153B50]  text-slate-50 tracking-widest font-semibold">CANDIDACY PHOTO</p>
                    </div>

                    <div className="mx-auto w-4/5 rounded-md border-2 border-[#153B50] ">
                      <div className="my-2 pt-2 mx-2 relative h-36 w-36 ">
                        <Image className="object-contain" src={Logo} alt="Photo of Aspirant" fill />
                      </div>
                      <p className="py-1 px-3 text-center bg-[#153B50] text-slate-50 tracking-widest font-semibold">ASPIRANT</p>
                    </div>

                    <div className="mx-auto w-4/5 rounded-md border-2 border-[#153B50] ">
                      <div className="my-2 pt-2 mx-2 relative h-36 w-36">
                        <Image className="object-contain" src={Logo} alt="Photo of Aspirant" fill />
                      </div>
                      <p className="py-1 px-3 text-center bg-[#153B50]  text-slate-50 tracking-widest font-semibold">RUNNING MATE</p>
                    </div>

                    <div className="mx-auto w-4/5 rounded-md border-2 border-[#153B50] ">
                      <div className="my-2 pt-2 mx-2 relative h-36 w-36 ">
                        <Image className="object-contain" src={Logo} alt="Photo of Aspirant" fill />
                      </div>
                      <p className="py-1 px-3 text-center bg-[#153B50]  text-slate-50 tracking-widest font-semibold">GUARANTOR #1</p>
                    </div>

                    <div className="mx-auto w-4/5 rounded-md border-2 border-[#153B50] ">
                      <div className="my-2 pt-2 mx-2 relative h-36 w-36 ">
                        <Image className="object-contain" src={Logo} alt="Photo of Aspirant" fill />
                      </div>
                      <p className="py-1 px-3 text-center bg-[#153B50]  text-slate-50 tracking-widest font-semibold">GUARANTOR #2</p>
                    </div>
                </div>
              
            </section>
          </div>
        </div>
    </main>
  )
}
