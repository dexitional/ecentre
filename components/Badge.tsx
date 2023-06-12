import React from 'react'

type Props = {
    title: string;
}

function Badge({ title }: Props) {
  return (
    <span className="px-1.5 py-0.5 text-xs font-medium rounded border border-green-300/20 bg-green-300/10 text-green-200">{title}</span>
  )
}

export default Badge