import FormPrint from '@/components/FormPrint'
import React from 'react'

function Page({ params }:{ params: { id: string }}) {
   // @ts-ignore
//    return <FormPrint serial={params?.id} />
  return (<div>Nominations are still opened!</div>)
}

export default Page
