import NominationForm from "@/components/NominationForm"
import { fetchNominee, fetchPositions } from "@/utils/serverApi";


export default async function Page({ params}:{ params: { serial: string }}) {
  
  const applicant = await fetchNominee(params?.serial);
  const positions = await fetchPositions();
  const data:any = await Promise.all([applicant,positions])
  // Deadline - add to 
  // Session - [ deadline : datetime, ]
  
  return (
    <main className="flex-1 space-y-8">
        <h1 className="px-4 py-2 text-lg md:text-4xl text-center font-bold tracking-wider rounded border-2 border-[#153B50] text-[#153B50]">{ new Date().getFullYear() } GENERAL ELECTIONS NOMINATION</h1>
        <div className="p-4 md:px-10 md:py-6 rounded shadow shadow-red-300/50 bg-red-50/80 space-y-4">
          <h2 className="text-lg md:text-xl">INSTRUCTIONS</h2>
          <div className="text-sm md:text-inherit space-y-3">
            <p>Please provide the requested information. Falsification of any information leads to automatic disqualification.</p>
            {/* Set Dynamic active Nomination Deadline */}
            <p className="italic text-sm md:text-inherit font-semibold">Deadline for submission of online Nomination is yet to be announced.</p>
          </div>
        </div>
        <div className="">
          <div className="grid md:grid-cols-3 gap-8">
            <NominationForm data={data} />
          </div>
        </div>
    </main>
  )
}
