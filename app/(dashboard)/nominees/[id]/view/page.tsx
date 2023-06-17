import FormPrintAdmin from '@/components/FormPrintAdmin'
import Link from 'next/link'
import React from 'react'

function Page({ params }:{ params: { id: string, page: string }}) {
 
   return(
    <div className="space-y-6"> 
      <Link href={`/nominees?page=${params?.page || 1}`} className="px-6 py-2 w-fit rounded border-2 border-blue-950 bg-slate-100 text-blue-950 font-extrabold print:hidden">GO BACK</Link>
      <hr className="print:hidden mb-14"/>
      {/* @ts-ignore */}
      <FormPrintAdmin serial={params?.id} />
    </div>
   )
  //return (<div>Nominations are still opened!</div>)
}

export default Page
