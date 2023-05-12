import { useState } from "react"
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import NominationForm from "@/components/NominationForm"
import Link from "next/link"
import PrintPill from "@/components/PrintPill"


export default function Page() {
  
  return (
    <main className="flex-1 space-y-3 md:space-y-8">
        <div className="space-y-2">
          <div className="-space-y-4">
            <h1 className="px-4 py-2 text-xl md:text-4xl text-center font-bold tracking-wider rounded  text-[#153B50]">UNIVERSITY OF CAPE COAST - GHANA</h1>
            <h1 className="px-4 py-2 text-md md:text-2xl text-center font-bold tracking-wider rounded text-[#153B50]">2023/2024 SRC/GRASAG/JCRC ELECTIONS NOMINATION FORM</h1>
          </div>
          <div className="my-2 mx-auto relative h-12 w-12 md:h-24 md:w-24">
            <Image className="object-contain" src={Logo} alt="" fill/>
          </div>
        </div>
        
        <div className="my-3 md:my-6 md:px-6 px-3 md:py-2 py-1 w-fit -skew-x-6 ring-2 ring-[#153B50] border-2 border-white bg-[#153B50] text-white ">
          <h2 className="text-xs md:text-lg tracking-widest font-bold">ADEHYE HALL PRESIDENT NOMINATION</h2>
          <div className="hidden">
            <p>Please provide the requested information. Falsification of any information leads to automatic disqualification.</p>
            <p>Deadline for submission of Online Nomination is Friday, June 9, 2023 at 11:59 PM.</p>
          </div>
        </div>
        <div className="mt-2">
          <div className="grid md:grid-cols-2 md:gap-8">
            <section className="col-span-1 space-y-14">
                <div className=" relative space-y-4 border-r-2 border-dashed">
                    <legend className="my-4 px-4 py-2 bg-slate-100 border text-sm md:text-base text-[#153B50] font-semibold tracking-[0.2em]">ASPIRANT</legend>
                    <div className="p-2 absolute -top-8 md:-top-14 -right-2 bg-white rounded border md:border-2 h-20 w-20 md:h-28 md:w-28">
                      <Image className="object-contain" src={Logo} alt="" fill/>
                    </div>
                    <PrintPill label="Name" content="EBENEZER KWABENA BLAY ACKAH" />
                    <PrintPill label="Position" content="ADEHYE HALL PRESIDENT" />
                    <PrintPill label="Hall of Affiliation" content="ADEHYE HALL" />
                    <PrintPill label="Department" content="DEPARTMENT OF RELIGION" />
                    <PrintPill label="Program of Study" content="BSC. NURSING" />
                    <PrintPill label="Registration Number" content="BS/BSC/10/0034" />
                    <PrintPill label="Phone Number" content="BS/BSC/10/0034" />
                    <PrintPill label="ASPIRANT CGPA" content="2.49" />
                </div>

                 {/* Guarantor #1 */}
                 <div className="relative space-y-4 border-r-2 border-dashed">
                    <legend className="my-4 px-4 py-2 bg-slate-100 border text-sm md:text-base text-[#153B50] font-semibold tracking-[0.2em]">GUARANTOR #1</legend>
                    <div className="p-2 absolute -top-8 md:-top-14 -right-2 bg-white rounded border md:border-2 h-20 w-20 md:h-28 md:w-28">
                      <Image className="object-contain" src={Logo} alt="" fill/>
                    </div>
                    <PrintPill label="Name" content="EBENEZER KWABENA BLAY ACKAH" />
                    <PrintPill label="Hall of Affiliation" content="ADEHYE HALL" />
                    <PrintPill label="Department" content="DEPARTMENT OF RELIGION" />
                    <PrintPill label="Program of Study" content="BSC. NURSING" />
                    <PrintPill label="Registration Number" content="BS/BSC/10/0034" />
                    <PrintPill label="Phone Number" content="BS/BSC/10/0034" />
                   
                </div>

            </section>
            <section className="col-span-1 space-y-14">
                <div className="relative space-y-4 border-r-2 border-dashed">
                    <legend className="my-4 px-4 py-2 bg-slate-100 border text-sm md:text-base text-[#153B50] font-semibold tracking-[0.2em]">RUNNNING MATE <sub>( IF ANY )</sub></legend>
                    <div className="p-2 absolute -top-8 md:-top-14 -right-2 bg-white rounded border md:border-2 h-20 w-20 md:h-28 md:w-28">
                      <Image className="object-contain" src={Logo} alt="" fill/>
                    </div>
                    <PrintPill label="Name" content="EBENEZER KWABENA BLAY ACKAH" />
                    <PrintPill label="Position" content="ADEHYE HALL PRESIDENT" />
                    <PrintPill label="Hall of Affiliation" content="ADEHYE HALL" />
                    <PrintPill label="Department" content="DEPARTMENT OF RELIGION" />
                    <PrintPill label="Program of Study" content="BSC. NURSING" />
                    <PrintPill label="Registration Number" content="BS/BSC/10/0034" />
                    <PrintPill label="Phone Number" content="BS/BSC/10/0034" />
                    <div className="flex flex-col space-y-1">
                      <label className="w-full font-serif text-lg tracking-wider">&nbsp;</label>
                      <span className="w-full rounded">&nbsp;</span>
                    </div>
                    
                </div>

                {/* Guarantor #2 */}
                <div className="relative space-y-4 border-r-2 border-dashed">
                    <legend className="my-4 px-4 py-2 bg-slate-100 border text-sm md:text-basetext-[#153B50] font-semibold tracking-[0.2em]">GUARANTOR #2</legend>
                    <div className="p-2 absolute -top-8 md:-top-14 -right-2 bg-white rounded border md:border-2 h-20 w-20 md:h-28 md:w-28">
                      <Image className="object-contain" src={Logo} alt="" fill/>
                    </div>
                    <PrintPill label="Name" content="EBENEZER KWABENA BLAY ACKAH" />
                    <PrintPill label="Hall of Affiliation" content="ADEHYE HALL" />
                    <PrintPill label="Department" content="DEPARTMENT OF RELIGION" />
                    <PrintPill label="Program of Study" content="BSC. NURSING" />
                    <PrintPill label="Registration Number" content="BS/BSC/10/0034" />
                    <PrintPill label="Phone Number" content="BS/BSC/10/0034" />
                </div>
            </section>
            
          </div>
        </div>
    </main>
  )
}
