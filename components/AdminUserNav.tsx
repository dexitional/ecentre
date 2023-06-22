// 'use client'
import Link from 'next/link';
import React from 'react'
import { headers } from 'next/headers';

type Props = {
   session: any ;
}

async function AdminUserNav({ session }: Props) {
  // const pathname = usePathname()
  
  const headersList = headers();
  const url = headersList.get('x-url') || ""; // Middleware projects x-url
  const pathname = new URL(url).pathname
 
    
  return (
    <aside className="w-full md:m-0 md:w-48 print:hidden">
        <nav className="grid grid-col-1 border rounded overflow-hidden shadow-lg shadow-gray-200/30 divide-y divide-slate-200 text-[#153B50] text-xs tracking-widest">
          <Link href={`/vouchers`} className={ pathname.startsWith(`/vouchers`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>VOUCHERS</Link>
          <Link href={`/nominees`} className={ pathname.startsWith(`/nominees`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>NOMINEES</Link>
          <Link href={`/display`} className={ pathname.startsWith(`/display`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>DISPLAY</Link>
          
          {/* <Link href={`/statistics`} className={ pathname.startsWith(`/statistics`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>STATISTICS</Link> */}
          {/* <Link href={`/user/${session?.user?.serial}/vetting`} className={ pathname.startsWith(`/user/${session?.user?.serial}/vetting`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>VETTING RESULTS</Link>
          <Link href={`/user/${session?.user?.serial}/voters`} className={ pathname.startsWith(`/user/${session?.user?.serial}/voters`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>VOTERS REGISTER</Link>
          <Link href={`/user/${session?.user?.serial}/smsfly`} className={ pathname.startsWith(`/user/${session?.user?.serial}/smsfly`) ? `p-2 px-6 md:py-4 font-semibold text-white bg-[#153B50]` : `p-2 px-6 md:py-4 font-semibold bg-slate-50`}>SMS-FLY SYSTEM <sup>&reg;</sup></Link> */}
        </nav> 
    </aside>
  )
}

export default AdminUserNav