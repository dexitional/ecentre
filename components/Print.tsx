'use client'
import React from 'react'

function Print() {
  return (
    <button onClick={() => window.print()} className="ml-8 mx-2 p-0.5 px-3 bg-white text-[#153B50] rounded text-xs md:text-sm tracking-wide font-bold print:hidden">Click here to Print</button>
  )
}

export default Print