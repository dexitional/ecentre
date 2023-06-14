import FormPrint from "@/components/FormPrint"
import { useState } from "react"

export default async function Page({ params}:{ params: { serial: string }}) {
    // @ts-ignore
    return <FormPrint serial={params?.serial} />
  
}
