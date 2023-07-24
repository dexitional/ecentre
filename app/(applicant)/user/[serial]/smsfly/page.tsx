import SMSForm from "@/components/SMSForm";
import TeaserPreview from "@/components/TeaserPreview";
import { fetchNominee, fetchSmsData } from "@/utils/serverApi";
import { CgAdd } from "react-icons/cg";
import { GrAddCircle } from "react-icons/gr";
import { MdAdd } from "react-icons/md";

const getApplicant = async (serial: string) => {
   const applicant:any = await fetchNominee(serial);
   if(applicant.total <= 0) return null;
   const vdata = await fetchSmsData(applicant.documents[0].groupId)
   return { applicant: applicant.documents[0], voterdata: vdata?.data[0] }
}

export default async function Page({ params}:{ params: { serial: string }}) {
  const data:any = await getApplicant(params?.serial);
  return (
    <main className="p-2 md:px-6 md:py-4 flex-1 space-y-0">
         {/* Overview Cards  */}
         <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 md:p-4">
             <div className=" p-4 rounded shadow-inner shadow-slate-600/30 bg-orange-50 flex flex-col justify-center space-y-2">
                 <h1 className="px-4 py-2 shadow-inner shadow-blue-950/30 rounded-lg bg-blue-950 font-bold text-center text-blue-100">SMS CREDIT</h1>
                 <p className="font-extrabold text-blue-950 text-2xl text-center italic">{data?.applicant?.credit}</p>
             </div>
             <div className=" p-4 rounded shadow-inner shadow-slate-600/30 bg-orange-50 flex flex-col justify-center space-y-2">
                 <h1 className="px-4 py-2 rounded-lg bg-blue-950 font-bold text-center text-blue-100">CAMPAIGNS</h1>
                 <p className="font-extrabold text-blue-950 text-2xl text-center italic">{data?.applicant?.campaigns}</p>
             </div>
             <TeaserPreview senderId={data?.applicant?.sender_id} serial={params?.serial} />
             <div className=" p-4 rounded shadow-inner shadow-slate-600/30 bg-orange-50 flex flex-col justify-center space-y-2">
                 {/* <h1 className="px-4 py-2 rounded-lg bg-blue-950 font-bold text-center text-blue-100">BUY CREDIT</h1> */}
                 <div className="grid grid-cols-1">
                    <button className="py-0.5 px-1 shadow-inner shadow-slate-600/30 rounded border-2 border-black bg-yellow-400 text-black text-lg font-extrabold italic">MTN MoMo</button>
                    {/* <button className="py-0.5 px-1  border-4 border-pink-700 bg-blue-950 text-white text-xl font-extrabold italic">AirtelTigo</button> */}
                </div>
             </div>
         </section>
         <section className="p-4">
           <div className="p-4 bg-blue-100 rounded space-y-2">
              <h3 className="text-base md:text-xl font-bold text-slate-700">HOW TO BUY SMS CREDIT</h3>
              <ol className="px-6 py-3 space-y-2 list-decimal font-medium italic">
                <li>Confirm cost of SMS with Calculator.</li>
                <li>Send Amount to <span className="underline font-semibold">MOMO Number</span>: <b>0559100608</b>.</li>
                <li>After transaction, <b>Send a text message</b> to the <b>same number</b> with message,</li>
                <li><code className="font-semibold">{`"`}Ref: serial number of aspirant, Amount: GHC 130, senderID: xxxxxx{`"`}</code></li>
                <li>Your <b>SMS credit</b> shall be <b>credited after confirmation</b> by System Administrator.</li>
              </ol>

           </div>
            
         </section>
       
         <section className="flex">
            <SMSForm data={data?.voterdata} applicant={data?.applicant} serial={params?.serial} />
            {/* <SMSCalculator /> */}
         </section>
    </main>
  )
}


// const sql = "select tag as hallid, JSON_SEARCH(voters, 'all', '"+tag+"') as voter from ehub_vote.sms_elector where ((json_search(voters, 'one', '"+tag+"') is not null";
//     var res = await db.query(sql, [tag, tag]);