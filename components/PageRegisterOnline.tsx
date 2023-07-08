'use client';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import VoterCard from './VoterCard'
import Logo from '@/public/logo.png'
import Image from 'next/image';
import moment from 'moment';

type Props = {
    eid: string;
}

function PageRegisterOnline({ eid }: Props) {

  const [ data, setData ] = useState<any>({})
  const [ voters, setVoters ] = useState<any>([])
  const [ search, setSearch ] = useState('')
  
  const loadData =  async () => {
      try {
        const res = await fetch(`https://ehub.ucc.edu.gh/api/evs/register/${eid}`,{ next: { revalidate: 180 }})
        const resp = await res.json()
        if(resp.success){
          setData(resp.data)
          setVoters(JSON.parse(resp.data.voters_whitedata))
        }
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    loadData()
  },[])

  return (
    <main className="space-y-6">
      {/* Title & Search Section */}
      <section className="px-8 py-6 md:py-10 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded bg-[#153b50] overflow-hidden">
        <div className="z-10 space-y-2">
          <h1 className="text-2xl md:text-4xl text-white font-bugee tracking-widest">{data?.name}</h1>
          <h2 className="text-sm text-white tracking-widest">VOTERS REGISTER </h2>
          <div className="w-full md:w-96 relative flex items-center rounded border border-[#153b50] ring-1 ring-white">
              <input className="w-full h-10 rounded" name="" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search register" />
              <BiSearch className="absolute right-6 h-5 w-5 peer-focus:hidden" />
          </div>
         </div>
         <div className="relative">
            <Image className="z-1 absolute -top-20 right-0 w-80 h-80 opacity-10" src={Logo} alt="Logo" height={100} width={100} />
            <div className="flex flex-col items-start text-base font-bold font-poppins text-white tracking-widest space-y-2 ">
              <span className="space-x-3"><span>ELECTIONS STARTS:</span> <span className="inline-block rounded-lg py-0.5 px-4 bg-white text-[#153b50] tracking-wider text-sm md:text-base">{moment(data?.start).format('LLL').toUpperCase()}</span></span>
              <span className="space-x-3 md:space-x-8"><span>ELECTIONS ENDS:</span> <span className="inline-block rounded-lg py-0.5 px-4 bg-white text-[#153b50] tracking-wider text-sm md:text-base">{moment(data?.end).format('LLL').toUpperCase()}</span></span>
              <span className="space-x-3 md:space-x-7"><span>ELIGIBLE VOTERS:</span> <span className="inline-block rounded-lg py-0.5 px-4 bg-white text-[#153b50] font-extrabold tracking-widest">{voters.length}</span></span>
            </div>
         </div>
      </section>
      {/* Register section */}
      <section className="p-2 md:px-6 md:py-4 bg-white space-y-10">
          <div className="mb-4 border-b-2 text-clip">
              <h1 className="py-1 w-fit text-clip text-blue-950/80 font-bold font-poppins">LIST OF ELIGIBLE VOTERS</h1>
              <span className=""></span>
          </div>
          <div className="">
             <div className="max-h-96 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-scroll">
               {voters?.filter((r: any) => r.name?.toLowerCase().includes(search) || r.mail?.toLowerCase().includes(search) || r.tag?.toString().toLowerCase().includes(search)).map((row: object,i: React.Key) => (
                  <VoterCard key={i} data={row} />
               ))}  
             </div>
          </div>
      </section>
    </main>
  )
}

export default PageRegisterOnline