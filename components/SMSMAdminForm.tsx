'use client'
import React from 'react'
import Input from "@/components/Input";
import Legend from "@/components/Legend";
import axios from "axios";
import { useRouter } from "next/navigation";
import Notiflix from "notiflix";
import { useState,FormEvent, useEffect } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';


type Props = {}

function SMSMAdminForm({}: Props) {
    const router = useRouter()
    const [ loading, setLoading ] = useState(false)
    const [ form, setForm ] = useState<any>({})
    const onChange = (e:any) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
    
    const submitCredit = async (e:any) => {
         e.preventDefault();
         try {
                setLoading(true)
                const resp = await axios.get(`/api/sms?action=updatecredit&serial=${form.serial}&credit=${form.credit}`)
                console.log(resp)
                const response = resp?.data;
                console.log(response)
                if(response.success){
                router.refresh()
                setLoading(false)
                Notiflix.Notify.success('CREDIT SUBMITTED !');
                } else {
                setLoading(false)
                Notiflix.Notify.failure(response?.message?.toUpperCase());
                }
          } catch (error) {
            console.log(error)
            setLoading(false)
          }
    }
  
    useEffect(() => {
  
    },[])
  
  return (
    <form onSubmit={submitCredit} className="md:col-span-2 space-y-6 md:space-y-14 order-2 md:order-1">
        <div className="space-y-4">
            <Legend label="SMS ACCOUNT MANAGEMENT" />
            <Input name="serial" defaultValue={form.serial} type="text" onChange={onChange} required label="Serial Number of Candidate" placeholder="Serial #" />
            <Input name="credit" defaultValue={form.credit} type="number" onChange={onChange} required label="SMS Credit Amount" placeholder="Credit Amount" />
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
  )
}

export default SMSMAdminForm