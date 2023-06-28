
"use client"
import SMSCalculator from "@/components/SMSCalculator";
import { useRef, useState } from "react";


export default async function Page({ params}:{ params: { serial: string }}) {



 
  //if(moment().isAfter(sess_res?.end_date)) redirect(`/user/${params?.serial}/printout`)
  // if(data[0]?.documents[0]?.form_submit && !moment().isAfter(sess_res?.end_date)) redirect(`/user/${params?.serial}/printout`)
  return (
    <main className="p-2 md:px-6 md:py-4 flex-1 space-y-8">
         {/* Overview Cards  */}
         <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 md:p-4">
             <div className=" p-4 rounded shadow-lg shadow-slate-600/30 bg-orange-50 flex flex-col justify-center space-y-2">
                 <h1 className="px-4 py-2 rounded-lg bg-blue-950 font-bold text-center text-blue-100">SMS BALANCE</h1>
                 <p className="font-extrabold text-blue-950 text-2xl text-center italic">5000</p>
             </div>
             <div className=" p-4 rounded shadow-lg shadow-slate-600/30 bg-orange-50 flex flex-col justify-center space-y-2">
                 <h1 className="px-4 py-2 rounded-lg bg-blue-950 font-bold text-center text-blue-100">CAMPAIGNS</h1>
                 <p className="font-extrabold text-blue-950 text-2xl text-center italic">4</p>
             </div>
             <div className=" p-4 rounded shadow-lg shadow-slate-600/30 bg-orange-50 flex flex-col justify-center space-y-2">
                 <h1 className="px-4 py-2 rounded-lg bg-blue-950 font-bold text-center text-blue-100">SENDER ID</h1>
                 <p className="font-extrabold text-blue-950 text-lg text-center italic">BRA-BARKOO</p>
             </div>
             <div className=" p-4 rounded shadow-lg shadow-slate-600/30 bg-orange-50 flex flex-col justify-center space-y-2">
                 <h1 className="px-4 py-2 rounded-lg bg-blue-950 font-bold text-center text-blue-100">BUY CREDIT</h1>
                 <div className="grid grid-cols-1">
                    <button className="py-0.5 px-1  border-4 border-black bg-yellow-400 text-black text-lg font-extrabold italic">MTN MoMo</button>
                    {/* <button className="py-0.5 px-1  border-4 border-pink-700 bg-blue-950 text-white text-xl font-extrabold italic">AirtelTigo</button> */}
                </div>
             </div>
         </section>
       
         <section className="flex">
            <form className="p-4 flex-1">
                 <textarea className="w-full h-48 rounded">Message is here!</textarea>
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                       <div></div>
                       <button className="px-4 py-2 w-full bg-blue-950 text-white rounded">SEND MESSAGE</button>
                    </div>
                    <div>
                        <h2>SMS COST</h2>
                        <p>4332</p>
                    </div>
                 </div>
            </form>
            <SMSCalculator />
            
         </section>
    </main>
  )
}


