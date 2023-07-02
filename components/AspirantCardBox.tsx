
import Image from 'next/image'
import React from 'react'
import Logo from '@/public/logo.png'
import { fetchRecord } from '@/utils/fetchRecord'
type Props = {
    data: any
}


async function AspirantCardBox({ data }: Props) {
  
  const dm = await fetchRecord(data?.aspirant_regno)
  const aspirant = dm?.data[0]?.user

  return (
    <div className="relative pb-4 p-2 w-full flex items-center justify-between rounded-xl bg-blue-50 border-2 border-red-900 ">
        <div className="flex-1 flex flex-col items-center">
            <Image src={data?.photo || Logo } alt="Candidate" className="p-1 object-cover object-top w-full h-64 rounded-lg bg-slate-50" height={100} width={100} />
            <div className="space-y-1 flex-1 text-center">
                <h2 className="px-2 text-base text-gray-800 font-bold tracking-wider uppercase">{aspirant?.name?.toUpperCase()}</h2>
                <h2 className="px-2 py-1 bg-blue-200/60 rounded-2xl border-2 border-blue-950 font-extrabold text-blue-950 text-sm uppercase tracking-wider"><span className="italic">#</span> &nbsp;{data?.teaser}</h2>
            </div>
        </div>
        { true ?
        <div className="absolute bottom-[30%] min-h-fit w-16 flex items-center rounded-md bg-white bg-opacity-80 border-2 border-blue-950 overflow-hidden">
            { data?.ballot_no && <div className="p-2 text-2xl text-blue-950 font-bold">#</div>}
            <div className="px-2 py-1 flex flex-wrap items-center justify-center rounded-tl rounded-bl bg-blue-950/95 italic text-2xl text-white font-bold tracking-widest">{data?.ballot_no || 'Q'}</div>
        </div>
        : null
        }
    </div>
  )
}

export default AspirantCardBox