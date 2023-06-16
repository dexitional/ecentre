import NominationForm from "@/components/NominationForm"
import { options } from "@/options";
import { fetchNominee, fetchPositions, fetchSession, fetchVoucher } from "@/utils/serverApi";
import moment from 'moment'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({ params}:{ params: { serial: string }}) {
  const session:any = await getServerSession(options)
  const applicant = await fetchNominee(params?.serial);
  const positions = await fetchPositions();
  const data:any = await Promise.all([applicant,positions])
  const sess = await fetchSession(session?.user?.sessionId);
  const sess_res:any =  await sess?.documents[0];
  
  if(moment().isAfter(sess_res?.end_date)) redirect(`/user/${params?.serial}/printout`)
  if(data[0]?.documents[0]?.form_submit) redirect(`/user/${params?.serial}/printout`)
  return (
    <main className="flex-1 space-y-8">
        <h1 className="px-4 py-2 text-lg md:text-3xl text-center font-bold tracking-wider rounded border-2 border-[#153B50] text-[#153B50]">{ sess_res?.title?.toUpperCase() } NOMINATION</h1>
        <div className="p-4 md:px-10 md:py-6 rounded shadow shadow-blue-300/50 bg-blue-50/80 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#153B50]">INSTRUCTIONS</h2>
          <div className="text-sm md:text-inherit space-y-3">
            <p>Please provide the requested information. Falsification of any information leads to automatic disqualification.</p>
            <p><b>**</b> <b>All Guarantors & Aspirants</b> must be <b>registered students</b> for current academic session!</p>
            <p><b>**</b> <b>Guarantors for Halls or JCRC Portfolios</b> must be Hall affiliates of the <b>Aspirant</b>!</p>
            <p><b>**</b> Minimum <b>CGPA</b> requirement is <b>2.5 <em>( Postgraduate & Undergraduate )</em></b> and <b>Pass</b> for Medical students only!</p>
            {/* Set Dynamic active Nomination Deadline */}
            <p className="italic text-sm md:text-inherit font-semibold text-[#153B50]">Deadline for submission of online Nomination is extended to { moment(sess_res?.end_date).format('LLL')}.</p>
          </div>
        </div>
        <div className="">
          <NominationForm data={data} />
        </div>
    </main>
  )
}
