'use client'
import React, { FormEvent } from 'react'
import { GrAddCircle } from 'react-icons/gr'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
    senderId: string;
    serial: string;
}

function TeaserPreview({ senderId,serial }: Props) {
 
  const router = useRouter()
  const getTeaser = async (e:FormEvent) => {
    e.preventDefault;
    const senderid = window.prompt("Please enter 10-character Sender ID without spaces for Campaign !")
    if(senderid && senderid != ''){
         alert(senderid)
         // Submit Sender ID
         const res = await axios.get(`/api/sms?action=updatesenderid&sender_id=${senderid}&serial=${serial}`)
         console.log(res.data)
         const resp = res.data;
         if(resp.success){
           router.refresh()
         } 
    }
  }

  return (
    <div className=" p-4 rounded shadow-inner shadow-slate-600/30 bg-orange-50 flex flex-col justify-center space-y-2">
        <h1 className="px-4 py-2 rounded-lg flex items-center justify-between space-x-1 bg-blue-950 font-bold text-center text-blue-100">
            <span>SENDER ID</span>
            <button onClick={getTeaser} className="p-1 rounded-full bg-white"><GrAddCircle className="h-4 w-4 text-blue-950"/></button>
        </h1>
       { senderId 
         ? <p className="font-extrabold text-blue-950 text-lg text-center italic">{senderId}</p>
         : <div className="rounded text-center font-semibold text-blue-950 text-base italic">-- No Sender ID --</div>
       }
    </div>
    )
}

export default TeaserPreview