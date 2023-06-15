'use client'
import { useRouter } from 'next/navigation'
import Notiflix from 'notiflix'
import React,{ useState } from 'react'

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

  return (
    <div className="w-full">
        { print ? 
            (
            <div className="px-6 py-4 w-full max-w-md mx-auto flex flex-col item-center justify-center rounded border bg-slate-50 shadow shadow-slate-300/20">
                <div className="border p-4 m-2">
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
                <div className="px-4 flex items-center justify-between">
                    <button className="print:hidden text-sm italic" onClick={()=> router.push('/vouchers')}>{`<< `}GO BACK</button>
                    <button className="print:hidden text-sm italic" onClick={()=> window.print() }>PRINT VOUCHER</button>
                </div>
                
                
               
            </div>
            ) :
            (
            <div className="w-full max-w-md mx-auto flex item-center justify-center rounded border bg-slate-100 shadow shadow-slate-400/20">
                <button className="m-4 py-2 px-6 bg-slate-600 border-2 border-blue-950/70 rounded text-white font-bold" onClick={e => sellVoucher(params?.id)}>SELL VOUCHER</button>
            </div>
            )
        }

    </div>
  )
}

export default Page
