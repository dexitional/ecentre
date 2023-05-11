import React from 'react'

type Props = {
    label: string;
    content: string;
}

function PrintPill({ label,content }: Props) {
  return (
    <div className="flex flex-col space-y-1">
        <label className="w-full font-serif text-lg tracking-wider">{label}</label>
        <span className="w-full rounded font-semibold text-sm text-red-900/90 tracking-widest">{content}</span>
    </div>
  )
}

export default PrintPill