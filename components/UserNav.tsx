'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
   session: any ;
}

function UserNav({ session }: Props) {
  const pathname = usePathname()
     
  return (
    <aside className="w-full md:m-0 md:w-48 print:hidden">
        <nav className="grid grid-col-1 border rounded overflow-hidden shadow-lg shadow-gray-200/30 divide-y divide-slate-200 text-[#153B50] text-xs tracking-widest">
        <Link href={`/user/${session?.user?.serial}/application`} className={ pathname.startsWith(`/user/${session?.user?.serial}/application`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>APPLICATION FORM</Link>
        <Link href={`/user/${session?.user?.serial}/printout`} className={ pathname.startsWith(`/user/${session?.user?.serial}/printout`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>APPLICATION PRINT</Link>
        {/* <Link href={`/user/${session?.user?.serial}/vetting`} className={ pathname.startsWith(`/user/${session?.user?.serial}/vetting`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>VETTING RESULTS</Link>
        <Link href={`/user/${session?.user?.serial}/voters`} className={ pathname.startsWith(`/user/${session?.user?.serial}/voters`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>VOTERS REGISTER</Link>
        <Link href={`/user/${session?.user?.serial}/smsfly`} className={ pathname.startsWith(`/user/${session?.user?.serial}/smsfly`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>SMS-FLY SYSTEM <sup>&reg;</sup></Link> */}
        </nav> 
    </aside>
  )
}

export default UserNav