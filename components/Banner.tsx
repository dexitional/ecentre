"use client"
import React, { useState } from 'react'
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { cookies } from 'next/headers';
import { getVoucher } from '@/utils/serverApi';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from "next-auth/react"

type Props = {
  serial: string;
  pin: string;
}

function Banner() {

  // const validateVoucher = async (data: FormData) => {
  //   "use server"
  //   // Verify data
  //   const serial = data?.get('serial') || '';
  //   console.log(serial)
  //   const pin = data?.get('pin') || '';
  //   //signIn("voucher");
  //   await fetch('http://localhost:3000/api/auth/signin',)
  //   // const res = await getVoucher(serial,pin);
  //   // const { total, documents } = res;
  //   // if(total > 0){
  //   //   // @ts-ignore
  //   //   cookies().set('applicant', JSON.stringify({ serial, data: documents[0] }))   // Generate session token - cookie
  //   //   redirect('/application')  // Redirect to Secured Nomiation Page
  //   // }
  // }

  const [ form, setForm ] = useState<Props>({ serial:'', pin: '' })

  const authenticate = async (e: any) => {
      e.preventDefault()
      try {
        const resp = await signIn('credentials', { callbackUrl: '/application', serial: form?.serial, pin: form.pin })
        console.log(resp)
      } catch(e){
        console.log(e)
      }
      
  }

  return (
    <div className="w-full h-80 bg-red-200 bg-[url('../public/bg3.jpg')] bg-center">
        <div className="mx-auto h-full w-full md:max-w-6xl grid place-content-center">
            {/* @ts-ignore */}
            <form onSubmit={authenticate} className="px-10 py-6 mx-auto w-full rounded-lg shadow-xl border-2 md:border-4 border-white/70 backdrop-blur-sm bg-opacity-60 bg-blue-950 grid place-content-center gap-y-4">
                <h1 className="pb-2 w-full font-bold md:font-semibold font-inter text-xs md:text-2xl tracking-[0.2em] text-center text-yellow-100">FILL YOUR ONLINE NOMINATION !!</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 gap-x-3 font-semibold">
                   <input name="serial" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} className="px-6 py-3 rounded-lg text-white placeholder:tracking-[0.2em] placeholder:text-white bg-blue-950/70 border-2 focus:ring-0 focus:border-white border-white col-span-1" type="text" placeholder="SERIAL" />
                   <input name="pin" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} className="px-6 py-3 rounded-lg text-white placeholder:tracking-[0.2em] placeholder:text-white bg-blue-950/70 border-2 focus:ring-0 focus:border-white border-white col-span-1" type="text" placeholder="PIN" />
                </div>
                <button type="submit" className="px-6 py-2 h-14 min-w-md rounded-lg bg-slate-100 border-b border-blue-950 text-blue-950 font-semibold flex items-center justify-center space-x-4">
                    <span className="text-xl tracking-widest font-extrabold text-blue-950">ENTER</span>
                    <BsArrowDownRightCircle className="h-7 w-7 text-blue-950"/>
                </button>
                <button onClick={authenticate}>sdas</button>
            </form>
        </div>
    </div>
  )
}

export default Banner