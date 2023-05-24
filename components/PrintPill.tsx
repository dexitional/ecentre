import React from 'react'

type Props = {
    label: string;
    content: string;
}

function PrintPill({ label,content }: Props) {
  return (
    <div className="flex flex-col space-y-1 print:space-y-0">
        <label className="w-full font-serif text-base md:text-lg print:text-xs tracking-wider">{label}</label>
        <span className="w-full rounded font-semibold text-xs md:text-sm print:text-[0.65rem] text-red-900/90 print:text-gray-800 tracking-widest">{content}</span>
    </div>
  )
}

export default PrintPill