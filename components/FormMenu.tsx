'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Notiflix from 'notiflix'
import React from 'react'

type Props = {
    page?: string
    serial: string;
}

function FormMenu({ page, serial }: Props) {
  
  const router = useRouter()
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

  const deleteForm = async (e: any) => {
    const ok = window.confirm("DELETE NOMINATION FORM!")
    if(ok){
        try {
            const resp = await fetch(`/api/nominee?action=delete&serial=${serial}`)
            const response = await resp.json()
            console.log(response)
            if(response.success){
               Notiflix.Notify.success('FORM DELETED !');
            } else {
               Notiflix.Notify.failure("FORM DELETION FAILED !");
            }
            // @ts-ignore
            window.location = `/nominees?page=${page || 1}`
            
        } catch (error: any) {
            console.log(error)
        // Notiflix.Notify.failure(error);
        }
    }  return
  }

  const deletePhoto = async (e: any) => {
    const ok = window.confirm("REMOVE UPLOADED PHOTO/FLYER !")
    if(ok){
        try {
            const resp = await fetch(`/api/nominee?action=delphoto&serial=${serial}`)
            const response = await resp.json()
            console.log(response)
            if(response.success){
               Notiflix.Notify.success('PHOTO DELETED !');
            } else {
               Notiflix.Notify.failure("PHOTO DELETION FAILED !");
            }
            // @ts-ignore
            window.location = `/nominees?page=${page || 1}`
            
        } catch (error: any) {
            console.log(error)
        // Notiflix.Notify.failure(error);
        }
    }  return
  }

  const deleteCv = async (e: any) => {
    const ok = window.confirm("REMOVE UPLOADED CV !")
    if(ok){
        try {
            const resp = await fetch(`/api/nominee?action=delcv&serial=${serial}`)
            const response = await resp.json()
            console.log(response)
            if(response.success){
               Notiflix.Notify.success('CV DELETED !');
            } else {
               Notiflix.Notify.failure("CV DELETION FAILED !");
            }
            // @ts-ignore
            window.location = `/nominees?page=${page || 1}`
            
        } catch (error: any) {
            console.log(error)
        // Notiflix.Notify.failure(error);
        }
    }  return
  }

  const viewCV = async (e: any) => {
    const ok = window.confirm("VIEW UPLOADED CV !")
    if(ok){
        try {
            // const resp = await fetch(`/api/generate?action=endorse&id=${serial}`)
            // const response = await resp.json()
            // if(response.success){
            //    Notiflix.Notify.success('VERIFICATION SENT !');
            // } else {
            //    Notiflix.Notify.failure(response?.msg);
            // }
        } catch (error: any) {
            console.log(error)
        // Notiflix.Notify.failure(error);
        }
    }  return
    
  }
 
  return (
    <div className="print:hidden flex flex-col md:flex-row ">
        {/* Go Back */}
        <Link href={`/nominees?page=${page || 1}`} className="px-6 py-2 flex-1 flex items-center justify-center border-blue-950 bg-slate-100 text-blue-950 text-sm text-center font-extrabold print:hidden">GO BACK</Link>
        <button onClick={viewCV} className="px-6 py-2 flex-1 border-blue-950 bg-blue-200 text-blue-950 text-center font-extrabold print:hidden">VIEW CV</button>
        <button onClick={resetForm} className="px-6 py-2 flex-1 border-blue-950 bg-slate-200 text-blue-950 text-center font-extrabold print:hidden">RESET FORM</button>
        <button onClick={verifyForm} className="px-6 py-2 flex-1 border-blue-950 bg-blue-200 text-blue-950 text-center font-extrabold print:hidden">RESEND LINKS</button>
        <button onClick={deleteCv} className="px-6 py-2 flex-1 border-blue-950 bg-slate-200 text-blue-950 text-center font-extrabold print:hidden">REMOVE CV</button>
        <button onClick={deletePhoto} className="px-6 py-2 flex-1 border-blue-950 bg-blue-200 text-blue-950 text-center font-extrabold print:hidden">REMOVE FLYER</button>
        <button onClick={deleteForm} className="px-6 py-2 flex-1 border-blue-950 bg-slate-200 text-blue-950 text-center font-extrabold print:hidden">DELETE FORM</button>
    </div>
  )
}

export default FormMenu