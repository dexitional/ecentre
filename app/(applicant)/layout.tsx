'use client';
import Link from 'next/link';
import React, { ReactElement } from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
        <div className="my-10 md:mx-auto px-6 md:px-0 w-full md:max-w-6xl flex flex-col md:flex-row gap-6 md:gap-x-4">
          <aside className="w-full md:m-0 md:w-48">
              <nav className="grid grid-col-1 border rounded overflow-hidden shadow-lg shadow-gray-200/30 divide-y divide-slate-200 text-[#153B50] text-xs tracking-widest">
                <Link href="/application" className="p-2 md:px-6 md:py-4 font-semibold bg-slate-200">APPLICATION FORM</Link>
                <Link href="/printout" className="p-2 md:px-6 md:py-4 font-semibold bg-slate-50">APPLICATION PRINT</Link>
                <Link href="/vetting" className="p-2 md:px-6 md:py-4 font-semibold bg-slate-50">VETTING RESULTS</Link>
                <Link href="/sms-tron" className="p-2 md:px-6 md:py-4 font-semibold bg-slate-50">VOTERS REGISTER</Link>
                <Link href="/sms-tron" className="p-2 md:px-6 md:py-4 font-semibold bg-slate-50">SMS-FLY SYSTEM <sup>&reg;</sup></Link>
              </nav> 
          </aside>
          <div className="flex-1">
             { children }
          </div>
         
        </div>
    </div>
  )
}

export default Layout