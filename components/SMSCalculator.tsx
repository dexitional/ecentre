'use client'
import React, { useState } from 'react'

function SMSCalculator() {

    const [ charge, setCharge ] = useState<any>()
    const [ value, setValue ] = useState<any>()

    const onChange  = (e: any) => {
       //setValue(e.target.value);
       //setCharge((parseFloat(e.target.value) * 0.04).toFixed(2).toString());
       const ch = (parseFloat(e.target.value) * 0.04).toFixed(2).toString()
       setCharge(ch)
    }
  
  return (
    <form className="p-4 w-48 flex flex-col">
        <div className=" rounded bg-slate-50 shadow-xl shadow-slate-200 overflow-hidden">
            <h1 className="px-2 py-1 bg-blue-950 text-xs font-bold text-center text-white tracking-wider">SMS CALCULATOR</h1>
            <p className="px-2 py-1 font-mono font-semibold text-sm">SMS RATE: <span className="p-0.5 bg-gray-100/50 text-lg font-bold tracking-wider">₵ 0.04</span></p>
            <input onChange={onChange} placeholder="SMS Amount" />
            <p>CHARGE {charge} </p>
        </div>

        {/* <form className="w-full flex items-center justify-between space-x-2">
        <input className="flex-1 w-36 placeholder:text-sm" type="text" maxLength={10} placeholder="Sender ID" />
        <button className="px-4 py-4 w-10 bg-blue-950 font-bold text-white text-xs text-center rounded">ADD</button>
        </form> */}
    </form>
  )
}

export default SMSCalculator