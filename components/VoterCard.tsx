import Image from 'next/image'
import React from 'react'

type Props = {
   data?: any;
}

function VoterCard({ data }: Props) {
  return (
    <div className="px-3 p-2 flex-1 border border-slate-300 rounded flex space-x-3 items-start">
        <div className="relative h-10 w-10 md:h-14 md:w-14 rounded bg-slate-200">
            <Image src={`https://ehub.ucc.edu.gh/api/photos/?tag=${data?.tag}`} className="rounded object-cover object-top" alt="Voter" fill />
        </div>
        <div className="flex flex-col items-start justify-start">
            <h3 className="text-[0.68rem] md:text-[0.87rem] text-blue-950/80 md:text-blue-950/80 font-bold md:font-bold">{data?.name}</h3>
            <h3 className="text-xs md:text-sm text-gray-600 font-medium italic">{data?.mail}</h3>
            <h3 className="text-xs text-gray-500 font-bold tracking-widest">{data?.tag}</h3>
        </div>
    </div>
  )
}

export default VoterCard