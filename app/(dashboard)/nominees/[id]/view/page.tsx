import React from 'react'

function Page({ params }:{ params: { id: string }}) {
   // @ts-ignore
   return <FormPrint serial={params?.id} />
}

export default Page
