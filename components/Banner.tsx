"use client"
import React, { useState } from 'react'
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn,useSession } from "next-auth/react"

type Props = {
  serial: string;
  pin: string;
}

function Banner() {

  const { data:session, status } = useSession()
  const [ form, setForm ] = useState<Props>({ serial:'', pin: '' })
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')


  const authenticate = async (e: any) => {
      e.preventDefault()
      try {
        const resp = await signIn('credentials', { callbackUrl: `/user/${form?.serial}/application`, serial: form?.serial, pin: form.pin })
        //const resp = await signIn('credentials', { redirect: false, callbackUrl: `/user/${form?.serial}/application`, serial: form?.serial, pin: form.pin })
        console.log(resp)
      } catch(e){
        console.log(e)
      }
      
  }

  const adminSignin = async (e: any) => {
      e.preventDefault()
      try {
        const resp = await signIn('google', { redirect: false, callbackUrl: `/vouchers` })
        console.log(resp)
        router.push('/vouchers')
      } catch(e){
        console.log(e)
      }
  }

  return (
    !session ?
    <div className="w-full h-80 bg-red-200 bg-[url('../public/bg3.jpg')] bg-center">
        <div className="mx-auto h-full w-full md:max-w-6xl grid place-content-center">
            {/* <form onSubmit={authenticate} className="px-10 py-6 mx-auto w-full rounded-2xl shadow-xl border-2 md:border-4 border-white/70 backdrop-blur-sm bg-opacity-60 bg-blue-950 grid place-content-center gap-y-4">
                <h1 className="pb-2 w-full font-bold md:font-semibold font-inter text-xs md:text-2xl tracking-[0.2em] text-center text-yellow-100">FILL YOUR ONLINE NOMINATION !!</h1>
                { error ? <div className="px-6 py-2 bg-red-200 rounded-full bg-opacity-60 text-base font-semibold text-white">Please Provide Valid Credentials !</div> : null }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 gap-x-3 font-semibold">
                   <input name="serial" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} className="px-6 py-3 rounded-lg text-white placeholder:tracking-[0.2em] placeholder:text-white bg-blue-950/70 border-2 focus:ring-0 focus:border-white border-white col-span-1" type="text" placeholder="SERIAL" />
                   <input name="pin" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} className="px-6 py-3 rounded-lg text-white placeholder:tracking-[0.2em] placeholder:text-white bg-blue-950/70 border-2 focus:ring-0 focus:border-white border-white col-span-1" type="text" placeholder="PIN" />
                </div>
                <button type="submit" className="px-6 py-2 h-14 min-w-md rounded-lg bg-slate-100 border-b border-blue-950 text-blue-950 font-semibold flex items-center justify-center space-x-4">
                    <span className="text-xl tracking-widest font-extrabold text-blue-950">ENTER</span>
                    <BsArrowDownRightCircle className="h-7 w-7 text-blue-950"/>
                </button>
            </form> */}

            <form onSubmit={authenticate} className="px-10 py-6 mx-auto w-full rounded-2xl shadow-xl border-2 md:border-4 border-white/70 backdrop-blur-sm bg-opacity-60 bg-blue-950 grid place-content-center gap-y-4">
                <h1 className="pb-2 w-full font-bold md:font-semibold font-inter text-xs md:text-2xl tracking-[0.2em] text-center text-yellow-100">FILL YOUR ONLINE NOMINATION !!</h1>
                { error ? <div className="px-6 py-2 bg-red-200 rounded-full bg-opacity-60 text-base font-semibold text-white">Please Provide Valid Credentials !</div> : null }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 gap-x-3 font-semibold">
                   <input name="serial" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} className="px-6 py-1 md:py-3 rounded-lg text-white placeholder:tracking-[0.2em] placeholder:text-white bg-blue-950/70 border-2 focus:ring-0 focus:border-white border-white col-span-1" type="text" placeholder="SERIAL" />
                   <input name="pin" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} className="px-6 py-1 md:py-3 rounded-lg text-white placeholder:tracking-[0.2em] placeholder:text-white bg-blue-950/70 border-2 focus:ring-0 focus:border-white border-white col-span-1" type="text" placeholder="PIN" />
                </div>
                <button type="submit" className="px-6 py-2 h-10 md:h-14 min-w-md rounded-lg bg-slate-100 border-b border-blue-950 text-blue-950 font-semibold flex items-center justify-center space-x-4">
                    { status == 'loading' ?
                      <>
                        <span className="text-sm md:text-lg tracking-widest font-bold text-blue-950 animate-pulse">LOADING ...</span>
                        {/* <BsArrowDownRightCircle className="h-5 w-5 md:h-7 md:w-7 text-blue-950"/> */}
                      </> :
                      status == 'unauthenticated' ?
                      <>
                        <span className="text-base md:text-xl tracking-widest font-extrabold text-blue-950">ENTER</span>
                        <BsArrowDownRightCircle className="h-5 w-5 md:h-7 md:w-7 text-blue-950"/>
                      </> : null
                    }
                    
                </button>
                <button type="button" onClick={adminSignin} className="px-6 py-2 h-10 md:h-14 min-w-md rounded-lg bg-yellow-100 border-b border-blue-950 text-blue-950 font-semibold flex items-center justify-center space-x-4">
                    <FcGoogle className="h-8 w-8 text-blue-950"/>
                    <span className="text-xs md:text-base tracking-widest font-bold text-blue-950">ADMINISTRATOR SIGN-IN</span>
                </button>
            </form>
        </div>
    </div> : null
  )
}

export default Banner