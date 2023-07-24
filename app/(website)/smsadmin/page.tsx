'use client'
import moment from 'moment'
import Input from "@/components/Input";
import Legend from "@/components/Legend";
import { useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

export default async function Page() {
  const [ loading, setLoading ] = useState(false)
  return (
    <main className="flex-1 space-y-8">
        <h1 className="px-4 py-2 text-lg md:text-3xl text-center font-bold tracking-wider rounded border-2 border-[#153B50] text-[#153B50]">SMS CREDIT MANAGEMENT SYSTEM</h1>
        <div className="p-4 md:px-10 md:py-6 rounded shadow shadow-blue-300/50 bg-blue-50/80 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#153B50]">INSTRUCTIONS</h2>
          <div className="text-sm md:text-inherit space-y-3">
            {/* <p>Please provide the requested information. Falsification of any information leads to automatic disqualification.</p>
            <p><b>**</b> <b>All Guarantors & Aspirants</b> must be <b>registered students</b> for current academic session!</p>
            <p><b>**</b> <b>Guarantors for Halls or JCRC Portfolios</b> must be Hall affiliates of the <b>Aspirant</b>!</p>
            <p><b>**</b> Minimum <b>CGPA</b> requirement is <b>2.5 <em>( Postgraduate & Undergraduate )</em></b> and <b>Pass</b> for Medical students only!</p>
            Set Dynamic active Nomination Deadline */}
            <p className="italic text-sm md:text-inherit font-semibold text-[#153B50]">Deadline for submission of online Nomination is extended to .</p>
          </div>
        </div>
        <div className="grid md:grid-cols-1">
        <form ref={null} className="md:col-span-2 space-y-6 md:space-y-14 order-2 md:order-1"  >
            <div className="space-y-4">
                <Legend label="SMS ACCOUNT MANAGEMENT" />
                <Input name="serial" defaultValue={''} onChange={null} required label="Serial #" placeholder="Serial #" />
                <Input name="credit" defaultValue={''} onChange={null} required label="SMS Credit Amount" placeholder="SMS Credit Amount" />
                </div>
            <div className="relative p-2 grid grid-cols-1">
                { loading ?
                  <div className="z-20 absolute w-full h-full flex items-center space-x-4 justify-center rounded-lg bg-white bg-opacity-80 backdrop-blur-sm">
                      <BiLoaderCircle className="text-[#153B50] rounded-full h-8 w-8 animate-spin"/>
                      <span className="text-[#153B50] text-lg tracking-widest font-poppins font-bold animate-pulse">PROCESSING ...</span>
                  </div> : null
                }
                  <button type="submit" className="z-10 py-3 px-6 rounded font-semibold tracking-wider text-white bg-[#153B50] disabled:bg-[#153B50]/20">CREDIT ACCOUNT</button>
                </div>
        </form>
    </div>
            
    </main>
  )
}
