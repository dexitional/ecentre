import React from 'react'

type Props = {
    label: string;
}

function Legend({ label}: Props) {
  return (
    <legend className="px-4 py-2 text-sm md:text-base bg-slate-100 border text-[#153B50] font-semibold tracking-widest" dangerouslySetInnerHTML={{ __html: label }} />
  )
}

export default Legend