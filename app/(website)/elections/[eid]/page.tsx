import PageRegisterOnline from "@/components/PageRegisterOnline"

export default function Home({ searchParams }: { searchParams: { eid: string}}) {
  return (
   <PageRegisterOnline eid={searchParams?.eid || '50'} />
  )
}

