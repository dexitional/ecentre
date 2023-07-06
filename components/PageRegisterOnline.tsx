'use client';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import VoterCard from './VoterCard'

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
      <section className="px-6 py-4 md:py-16 md:px-10 rounded bg-blue-600 space-y-2">
         <h1 className="text-lg text-white">VOTER REGISTER</h1>
         <h2 className="text-base text-white">{data?.name}</h2>
         <div className="w-full md:w-96 relative flex items-center rounded border border-blue-700 ring-1 ring-white">
            <input className="w-full h-10 rounded" name="" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search register" />
            <BiSearch className="absolute right-6 h-5 w-5 peer-focus:hidden" />
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