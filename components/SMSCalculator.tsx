'use client'
import React, { useState } from 'react'

function SMSCalculator() {

    const [ charge, setCharge ] = useState<any>('0.00')
    const [ value, setValue ] = useState<any>()

    const onChange  = (e: any) => {
       const total = (parseFloat(e.target.value) * 0.04)
       const ch = (isNaN(total) ? '0.00' : total.toFixed(2)).toString()
       setCharge(ch)
    }
  
  return (
    <form className="p-4 w-48 flex flex-col">
        <div className="rounded bg-slate-50 shadow-xl shadow-slate-200 overflow-hidden flex flex-col space-y-2">
            <h1 className="px-2 py-1 bg-blue-950 text-xs font-bold text-center text-white tracking-wider">SMS CALCULATOR</h1>
            <div className="px-4 py-4 space-y-2">
               <p className="px-2 py-1 font-mono font-semibold text-sm">SMS RATE <span className="p-0.5 block rounded bg-blue-50  text-center text-lg font-bold italic tracking-wider">0.04</span> per SMS</p>
               <input className="px-4 py-1 w-full rounded border " onChange={onChange} placeholder="SMS Amount" />
               <p className="p-0.5 py-1 block rounded bg-blue-100 text-blue-950 text-center text-lg font-bold font-mono">₵ {charge } </p>
            </div>
            
        </div>
    </form>
  )
}

export default SMSCalculator