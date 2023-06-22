import FormMenu from '@/components/FormMenu'
import FormPrintAdmin from '@/components/FormPrintAdmin'
import Link from 'next/link'
import React from 'react'

function Page({ searchParams, params }:{ searchParams:any, params: { id: string, returnpage: string }}) {
   const page = searchParams?.returnpage

   return(
    <div className="space-y-6"> 
      <FormMenu page={page} serial={params?.id} />
      <hr className="print:hidden mb-14"/>
      {/* @ts-ignore */}
      <FormPrintAdmin serial={params?.id} />
    </div>
   )
  //return (<div>Nominations are still opened!</div>)
}

export default Page
 