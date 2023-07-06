import VettingForm from "@/components/VettingForm";
import { options } from "@/options";
import { fetchNominee, fetchNomineesDisplay, fetchPositions, fetchSession, fetchVoucher } from "@/utils/serverApi";
import { getServerSession } from "next-auth";

export default async function Page({ params}:{ params: { serial: string }}) {
  const session:any = await getServerSession(options)
   const applicants:any = await fetchNomineesDisplay(session?.user?.groupId);
   const positions:any = await fetchPositions();
   console.log(applicants)
  const IMAGE_URL = `https://ehub.ucc.edu.gh`
 
  //if(moment().isAfter(sess_res?.end_date)) redirect(`/user/${params?.serial}/printout`)
  return (
    <main className="flex-1 space-y-8">
        <h1 className="px-4 py-2 text-lg md:text-3xl text-center font-bold tracking-wider rounded border-2 border-[#153B50] text-[#153B50]">VETTING CARD</h1>
        <div className="p-4 md:px-10 md:py-6 rounded shadow shadow-blue-300/50 bg-blue-50/80 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#153B50]">INSTRUCTIONS</h2>
          <div className="text-sm md:text-inherit space-y-3">
            <p>Please provide the requested information. Falsification of any information leads to automatic disqualification.</p>
          </div>
        </div>
        <VettingForm applicants={applicants?.documents} positions={positions?.documents} />
    </main>
  )
}
