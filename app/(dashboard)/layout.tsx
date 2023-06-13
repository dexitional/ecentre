import React from 'react'
import UserNav from '@/components/UserNav';
import { getServerSession } from 'next-auth';
import { options } from '@/options';
import AdminUserNav from '@/components/AdminUserNav';
import { redirect } from 'next/navigation';

async function Layout({ children }: { children: React.ReactNode }) {
  
  const session:any = await getServerSession(options)
  if(!session) redirect('/')
  
  return (
    <div className="w-full">
        <div className="my-10 md:mx-auto px-6 md:px-0 w-full md:max-w-6xl flex flex-col md:flex-row gap-6 md:gap-x-4">
          {/* @ts-ignore */}
          <AdminUserNav session={session} />
          <div className="p-4 print:p-0 rounded bg-slate-50/60 print:bg-transparent shadow print:shadow-none shadow-slate-300 flex-1">
             { children }
          </div>
         
        </div>
    </div>
  )
}

export default Layout