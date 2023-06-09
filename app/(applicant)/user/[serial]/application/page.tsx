import NominationForm from "@/components/NominationForm"
import { fetchNominee, fetchPositions, fetchSession, fetchVoucher } from "@/utils/serverApi";
import moment from 'moment'
import { redirect } from "next/navigation";

export default async function Page({ params}:{ params: { serial: string }}) {
  
  const applicant = await fetchNominee(params?.serial);
  const positions = await fetchPositions();
  const voucher = await fetchVoucher(params?.serial);
  const { sessionId }: any = voucher?.documents[0];
  const session = await fetchSession(sessionId);
  const { end_date, title : session_name }: any = session?.documents[0];
  const data:any = await Promise.all([applicant,positions])
  
  if(moment().isAfter(end_date)) redirect(`/user/${params?.serial}/printout`)
  //console.log("moment Test: ", moment().isAfter(end_date))
  return (
    <main className="flex-1 space-y-8">
        <h1 className="px-4 py-2 text-lg md:text-3xl text-center font-bold tracking-wider rounded border-2 border-[#153B50] text-[#153B50]">{ session_name?.toUpperCase() } NOMINATION</h1>
        <div className="p-4 md:px-10 md:py-6 rounded shadow shadow-blue-300/50 bg-blue-50/80 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#153B50]">INSTRUCTIONS</h2>
          <div className="text-sm md:text-inherit space-y-3">
            <p>Please provide the requested information. Falsification of any information leads to automatic disqualification.</p>
            {/* Set Dynamic active Nomination Deadline */}
            <p className="italic text-sm md:text-inherit font-semibold text-[#153B50]">Deadline for submission of online Nomination is { moment(end_date).format('LLL')}.</p>
          </div>
        </div>
        <div className="">
          <NominationForm data={data} />
        </div>
    </main>
  )
}
