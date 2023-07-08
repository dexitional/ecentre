import PageRegisterOnline from "@/components/PageRegisterOnline"

export default function Page({ searchParams, params }:{ searchParams:any, params: { eid: string, returnpage: string }}) {
  return (
   <PageRegisterOnline eid={params?.eid || '50'} />
  )
}

