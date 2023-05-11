'use client';
import Link from 'next/link';
import React, { ReactElement } from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
    <div className="my-10 mx-auto w-full max-w-6xl flex gap-x-4">
       <aside className="w-48">
          <nav className="grid grid-col-1 border rounded overflow-hidden shadow-lg shadow-gray-200/30 divide-y divide-slate-200 text-[#153B50] text-xs tracking-widest">
            <Link href="/application" className="px-6 py-4 font-semibold bg-slate-200">APPLICATION FORM</Link>
            <Link href="/printout" className="px-6 py-4 font-semibold bg-slate-50">APPLICATION PRINT</Link>
            <Link href="/vetting" className="px-6 py-4 font-semibold bg-slate-50">VETTING RESULTS</Link>
            <Link href="/sms-tron" className="px-6 py-4 font-semibold bg-slate-50">SMS-FLY SYSTEM <sup>&reg;</sup></Link>
          </nav> 
       </aside>

       { children }
    </div>
</div>
  )
}

export default Layout