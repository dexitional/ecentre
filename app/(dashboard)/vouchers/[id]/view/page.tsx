'use client'
import { useRouter } from 'next/navigation'
import Notiflix from 'notiflix'
import React,{ useEffect, useState } from 'react'

function Page({ params }:{ params: { id: string }}) {
   const router = useRouter()
   const [ print, setPrint ] = useState<any>(null)


   const sellVoucher = async (id: string) => {
     const phone = window.prompt("Enter Buyer Phone Number !")
        if(phone != ''){
            try {
                const resp = await fetch(`/api/generate?action=sell&id=${id}&phone=${phone}`)
                const response = await resp.json()
                if(response.success){
                Notiflix.Notify.success('VOUCHER SOLD & SENT TO BUYER !');
                setPrint(response.data);
                } else {
                Notiflix.Notify.failure(response?.msg);
                }
            } catch (error: any) {
                console.log(error)
            // Notiflix.Notify.failure(error);
            }
        }  return
    }

    const sendVoucher = async (id: string) => {
        const ok = window.confirm("Resend Voucher to Buyer !")
        if(ok){
            try {
                const resp = await fetch(`/api/generate?action=send&id=${id}`)
                const response = await resp.json()
                if(response.success){
                   Notiflix.Notify.success('VOUCHER SOLD & SENT TO BUYER !');
                   setPrint(response.data?.documents[0]);
                } else {
                   Notiflix.Notify.failure(response?.msg);
                }
            } catch (error: any) {
                console.log(error)
            // Notiflix.Notify.failure(error);
            }
        }  return
    }

    const loadVoucher = async (id: string) => {
       console.log("SITE ID: ",id)
       try {
            const resp = await fetch(`/api/generate?action=print&id=${id}`)
            const response = await resp.json()
            console.log(response)
            if(response.success){
              setPrint(response.data?.documents[0]);
            }
        } catch (error: any) {
            console.log(error)
        // Notiflix.Notify.failure(error);
        }
    }

  useEffect(() => {
    loadVoucher(params.id)
  },[params.id])

  return (
    <div className="w-full">
       
            <div className="px-6 py-4 w-full max-w-md mx-auto flex flex-col item-center justify-center rounded border print:bg-white bg-slate-100 shadow shadow-slate-300/20">
                <div className="border px-10 py-4 m-2 bg-white">
                    <div className="w-full flex justify-between">
                        <span className="font-semibold">SERIAL: </span>
                        <span className="font-semibold text-black">{print?.serial}</span>
                    </div>
                    <div className="w-full flex justify-between">
                        <span className="font-semibold">PIN: </span>
                        <span className="font-semibold text-black">{print?.pin}</span>
                    </div>
                    <div className="w-full flex justify-between">
                        <span className="font-semibold">BUYER: </span>
                        <span className="font-semibold text-black">{print?.buyer_phone}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="px-4 py-2 print:hidden text-xs font-bold italic rounded border border-[#153b50] bg-white text-[#153b50]" onClick={() => window.location.href='/vouchers' }>GO BACK</button>
                    { ! print?.sold 
                      ? <button className="px-4 py-2 print:hidden text-xs font-bold italic rounded border bg-green-900 text-green-100" onClick={e => sellVoucher(params?.id)}>SELL VOUCHER</button>
                      : <button className="px-4 py-2 print:hidden text-xs font-bold italic rounded border bg-green-900 text-green-100" onClick={e => sendVoucher(params?.id)}>RESEND VOUCHER</button>
                    }
                    <button className="px-4 py-2 print:hidden text-xs font-bold italic rounded border border-[#153b50] bg-white text-[#153b50]" onClick={()=> window.print() }>PRINT VOUCHER</button>
                </div>
            </div>
    </div>
  )
}

export default Page
