import NominationForm from "@/components/NominationForm"
import None from '@/public/none.png'
import { options } from "@/options";
import { fetchNominee, fetchPositions, fetchSession, fetchVoucher } from "@/utils/serverApi";
import moment from 'moment'
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Page({ params}:{ params: { serial: string }}) {
  const session:any = await getServerSession(options)
  const applicant:any = await fetchNominee(params?.serial);
  const positions = await fetchPositions();
  const data:any = await Promise.all([applicant,positions])
  const sess = await fetchSession(session?.user?.sessionId);
  const sess_res:any =  await sess?.documents[0];
  const IMAGE_URL = `https://ehub.ucc.edu.gh`
 
  //if(moment().isAfter(sess_res?.end_date)) redirect(`/user/${params?.serial}/printout`)
  if(data[0]?.documents[0]?.form_submit && !moment().isAfter(sess_res?.end_date)) redirect(`/user/${params?.serial}/printout`)
  return (
    <main className="flex-1 space-y-8">
        <h1 className="px-4 py-2 text-lg md:text-3xl text-center font-bold tracking-wider rounded border-2 border-[#153B50] text-[#153B50]">{ sess_res?.title?.toUpperCase() } NOMINATION</h1>
        <div className="p-4 md:px-10 md:py-6 rounded shadow shadow-blue-300/50 bg-blue-50/80 space-y-4">
          { !moment().isAfter(sess_res?.end_date) ? (<>
          <h2 className="text-lg md:text-xl font-semibold text-[#153B50]">INSTRUCTIONS</h2>
          <div className="text-sm md:text-inherit space-y-3">
            <p>Please provide the requested information. Falsification of any information leads to automatic disqualification.</p>
            <p><b>**</b> <b>All Guarantors & Aspirants</b> must be <b>registered students</b> for current academic session!</p>
            <p><b>**</b> <b>Guarantors for Halls or JCRC Portfolios</b> must be Hall affiliates of the <b>Aspirant</b>!</p>
            <p><b>**</b> Minimum <b>CGPA</b> requirement is <b>2.5 <em>( Postgraduate & Undergraduate )</em></b> and <b>Pass</b> for Medical students only!</p>
            {/* Set Dynamic active Nomination Deadline */}
            <p className="italic text-sm md:text-inherit font-semibold text-[#153B50]">Deadline for submission of online Nomination is extended to { moment(sess_res?.end_date).format('LLL')}.</p>
          </div></>
          ): <h1 className="text-center font-bold text-[#153B50] flex flex-col items-center justify-center space-y-4"> NOMINATIONS ARE CLOSED ! <br/><Link href={`/user/${params?.serial}/printout`} className="my-4 px-4 py-2 w-fit rounded border text-xs bg-[#153B50] text-white">NOMINATION PRINTOUT</Link></h1> }
        </div>
        <div className="">
          { !moment().isAfter(sess_res?.end_date) 
            ? <NominationForm data={data} />
            : <div className="mx-auto my-4 w-full max-w-sm rounded border-2 border-[#153B50] bg-blue-50/80 "> 
                 <div className="flex-1 flex items-center justify-between overflow-hidden">
                    <Image src={applicant?.documents[0]?.aspirant_regno ? encodeURI(`${IMAGE_URL}/api/photos/?tag=${applicant?.documents[0]?.aspirant_regno}`) : None } alt="Candidate" width={100} height={100} className="m-2 rounded border border-[#153B50]/60 h-20 w-20 object-cover"/>
                    <div className="md:px-6 px-2 p">
                         <h1 className="font-mono font-extrabold">ASPIRANT: {applicant?.documents[0]?.aspirant_regno}</h1>
                         <h3 className="font-mono font-bold text-sm">SERIAL: <span>{applicant?.documents[0]?.serial}</span></h3>
                         <h4 className="font-mono font-bold text-sm">GUARANTOR #1: <span>{applicant?.documents[0]?.guarantor1_regno}</span></h4>
                         <h4 className="font-mono font-bold text-sm">GUARANTOR #2: <span>{applicant?.documents[0]?.guarantor2_regno}</span></h4>
                    </div>
                 </div>
                 <div className="px-14 py-2 flex-1 flex items-center justify-between overflow-hidden bg-blue-50">
                    <h4 className="font-mono font-bold text-sm">CV: <span>{applicant?.documents[0]?.cv ? 'UPLOADED': 'NOT UPLOADED'}</span></h4>
                    <h4 className="font-mono font-bold text-sm">FLYER: <span>{applicant?.documents[0]?.photo ? 'UPLOADED': 'NOT UPLOADED'}</span></h4>
                 </div>
              </div>
          }
        </div>
    </main>
  )
}
