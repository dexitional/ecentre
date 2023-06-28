
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
            <div className="p-4 w-48 flex flex-col">
                 <div className=" rounded bg-slate-50 shadow-xl shadow-slate-200 overflow-hidden">
                    <h1 className="px-2 py-1 bg-blue-950 text-xs font-bold text-center text-white tracking-wider">SMS CALCULATOR</h1>
                    <div className="p-2">
                        <p className="font-mono font-semibold text-sm">SMS RATE: <code className="p-0.5 bg-gray-100/50 text-lg font-bold tracking-wider">₵{Intl.NumberFormat("GHC").format(0.04).toString()}</code></p>
                    </div>
                    <form>
                       <input value={value} onChange={onChange}  />
                       <p>CHARGE {charge} </p>
                    </form>
                 </div>

                 {/* <form className="w-full flex items-center justify-between space-x-2">
                    <input className="flex-1 w-36 placeholder:text-sm" type="text" maxLength={10} placeholder="Sender ID" />
                    <button className="px-4 py-4 w-10 bg-blue-950 font-bold text-white text-xs text-center rounded">ADD</button>
                 </form> */}
            </div>
         </section>
    </main>
  )
}
