
"use client"
import { useRef, useState } from "react";


export default async function Page({ params}:{ params: { serial: string }}) {

const calRef = useRef<any>(null)
const [ charge,setCharge ] = useState<any>('0')
const [ value,setValue ] = useState<any>(null)

const onChange  = (e: any) => {
   setValue(e.target.value);
   setCharge((parseFloat(e.target.value) * 0.04).toFixed(2).toString());
}
  

 
  //if(moment().isAfter(sess_res?.end_date)) redirect(`/user/${params?.serial}/printout`)
  // if(data[0]?.documents[0]?.form_submit && !moment().isAfter(sess_res?.end_date)) redirect(`/user/${params?.serial}/printout`)
  return (
    <main className="px-6 py-4 flex-1 space-y-8">
         {/* Overview Cards  */}
         <section className="grid grid-cols-4 gap-4 p-4">
             <div className=" p-4 rounded border border-orange-300 bg-orange-50 flex flex-col justify-center space-y-2">
                 <h1 className="px-4 py-2 rounded-lg bg-orange-400/90 font-bold text-center text-orange-100">SMS BALANCE</h1>
                 <p className="font-extrabold text-blue-950 text-2xl text-center italic">5000</p>
             </div>
             <div className=" p-4 rounded border border-orange-300 bg-orange-50 flex flex-col justify-center space-y-2">
                 <h1 className="px-4 py-2 rounded-lg bg-orange-400/90 font-bold text-center text-orange-100">CAMPAIGNS</h1>
                 <p className="font-extrabold text-blue-950 text-2xl text-center italic">4</p>
             </div>
             <div className=" p-4 rounded border border-orange-300 bg-orange-50 flex flex-col justify-center space-y-2">
                 <h1 className="px-4 py-2 rounded-lg bg-orange-400/90 font-bold text-center text-orange-100">SENDER ID</h1>
                 <p className="font-extrabold text-blue-950 text-lg text-center italic">BRA-BARKOO</p>
             </div>
             <div className=" p-4 rounded border border-orange-300 bg-orange-50 flex flex-col justify-center space-y-2">
                <h1 className="px-4 py-2 rounded-lg bg-orange-400/90 font-bold text-center text-orange-100">BUY CREDIT</h1>
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
            
         </section>
    </main>
  )
}
