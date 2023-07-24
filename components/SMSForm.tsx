'use client';
import { useRouter } from 'next/navigation';
import Notiflix from 'notiflix';
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    data: any;
    applicant: any;
    serial: string;
}

function SMSForm({ data,applicant, serial }: Props) {

    const [ form, setForm ] = useState({ message:'', sgroup: '' })
    const [ cost, setCost ] = useState(0)
    const [ voterCount, setVoterCount ] = useState(1)
    const [ loading, setLoading ] = useState(false)
    const router = useRouter()
    
    const getCost = () => {
       const cost = Math.ceil(form.message?.length/160) * voterCount;
       setCost(cost)
    }

    const onChange = (e: any) => {
      if(e.target.name == 'sgroup'){
         const count = +(e.target.options[e.target.selectedIndex].getAttribute('data-count'))
         setVoterCount(count)
      }
      setForm({ ...form, [e.target.name]: e.target.value })
    }
   
    const onSubmit = async (e: any) => {
        e.preventDefault()
       // Validations
        const ok = window.confirm("SEND MESSAGE ?")
        if(ok){
           try {
              setLoading(true)
              const formData: any = {
                sgroup: form.sgroup,
                message: form.message,
                serial,
                credit: cost,
              }

              const resp = await fetch('/api/sms',{
                method: 'POST',
                body: JSON.stringify(formData)
              })
              
              const response = await resp.json()
              if(response.success){
                 setLoading(false)
                 Notiflix.Notify.success('SMS SENT !');
                 router.refresh()
              } else {
                 setLoading(false)
                 Notiflix.Notify.failure(response?.msg?.toUpperCase());
              }

            } catch (error) {
              setLoading(false)
              console.log(error)
            }
        }
    }

  
    useEffect(() => {
      getCost()
    },[form,voterCount])
  
  return (
   <form onSubmit={onSubmit} className="p-4 flex-1">
        <label>
          <span className="my-3 px-4 py-2 -skew-x-6 rounded-t bg-blue-950 text-white text-sm font-semibold tracking-wide">MESSAGE</span>
          <textarea name="message"  onChange={onChange} className="w-full h-48 rounded shadow-inner shadow-slate-600/30 bg-orange-50 focus:ring-0 border-0 border-orange-400 "></textarea>
        </label>
        <div className="my-4 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <div className="px-2 py-1 space-y-1">
                <b className="font-bold text-blue-950 text-base"><em>1 Message  = 160 characters = GHC 0.04</em></b>
                <p className="text-blue-950 text-sm font-black"><span className="text-gray-600">ACTIVE GROUP ::</span> {voterCount}</p>
                <div className="mx-4 my-3 px-4 py-2 rounded shadow-inner shadow-gray-500/20 bg-gray-50">
                    {/* <span className="text-sm font-semibold">SENDER GROUP</span> */}
                    {/* {JSON.stringify(Object.entries(JSON.parse(data?.data)))} */}
                    <select name="sgroup" onChange={onChange} className="px-4 py-2 w-full focus:ring-0 focus:outline-none bg-white text-xs font-bold">
                        <option disabled selected>-- CHOOSE VOTER GROUP --</option>
                       { data?.data && Object.entries(JSON.parse(data?.data)).map(([key,value]:any,i: React.Key) => (
                           <option key={i} data-count={value?.length} value={`${applicant.groupId}_${key?.toLowerCase()}`}>{data?.centre_name?.toUpperCase()} - {key?.toUpperCase()}</option>
                        ))
                       }
                    </select>
                </div>
              </div>  
              <div className="px-2 py-3 flex flex-col md:flex-row items-center space-x-4 shadow-inner shadow-slate-400 rounded bg-slate-50 text-blue-950">
                  <div className="flex flex-col items-center flex-1 rounded"><h3 className="px-3 py-0.5 bg-blue-900 text-sm text-white font-bold rounded-sm">SMS CREDIT</h3><p className="italic font-bold text-sm pt-2">{cost}</p></div>
                  <div className="flex flex-col items-center flex-1 rounded"><h3 className="px-3 py-0.5 bg-blue-900 text-sm text-white font-bold rounded-sm">SMS COST</h3><p className="italic font-bold text-sm pt-2">GHC {Math.round(cost*0.04)}</p></div>
                  <div className="flex flex-col items-center flex-1 rounded"><h3 className="px-3 py-0.5 bg-blue-900 text-sm text-white font-bold rounded-sm">CHARACTERS</h3><p className="italic font-bold text-sm pt-2">{form.message?.length}</p></div>
            </div>
          </div>
          <button type="submit" className="px-4 py-3 w-full font-bold bg-blue-950 text-white rounded tracking-widest">SEND MESSAGE</button>
        </div>
    </form>
  )
}

export default SMSForm