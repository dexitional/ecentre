'use client'
import Link from 'next/link'
import Notiflix from 'notiflix'
import React from 'react'

type Props = {
    page?: string
    serial: string;
}

function FormMenu({ page, serial }: Props) {

  const resetForm = async (e: any) => {
    const ok = window.confirm("UNLOCK ASPIRANT FORM!")
    if(ok){
        try {
            const resp = await fetch(`/api/generate?action=unlock&id=${serial}`)
            const response = await resp.json()
            if(response.success){
               Notiflix.Notify.success('FORM UNLOCKED !');
            } else {
               Notiflix.Notify.failure(response?.msg);
            }
        } catch (error: any) {
            console.log(error)
        // Notiflix.Notify.failure(error);
        }
    }  return
    
  }

  const verifyForm = async (e: any) => {
    const ok = window.confirm("RESEND VERIFICATION LINKS!")
    if(ok){
        try {
            const resp = await fetch(`/api/generate?action=endorse&id=${serial}`)
            const response = await resp.json()
            if(response.success){
               Notiflix.Notify.success('VERIFICATION SENT !');
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
    <div className="print:hidden flex">
        {/* Go Back */}
        <Link href={`/nominees?page=${page || 1}`} className="px-6 py-2 flex-1 border-blue-950 bg-slate-100 text-blue-950 text-center font-extrabold print:hidden">GO BACK</Link>
        <button onClick={resetForm} className="px-6 py-2 flex-1 border-blue-950 bg-slate-200 text-blue-950 text-center font-extrabold print:hidden">RESET SUBMISSION</button>
        <button onClick={verifyForm} className="px-6 py-2 flex-1 border-blue-950 bg-blue-200 text-blue-950 text-center font-extrabold print:hidden">RESEND VERIFICATION</button>
    </div>
  )
}

export default FormMenu