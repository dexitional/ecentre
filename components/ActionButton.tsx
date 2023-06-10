import React from 'react'
import { IconType } from 'react-icons';

type Props = {
    title: string;
    Icon: IconType;
    onClick?: unknown
}

function ActionButton({ title,Icon, onClick=null}: Props) {
  return (
    <button className="py-1 px-2 border-2 border-blue-900/60 bg-blue-900 rounded flex items-center space-x-2">
        <Icon className={`${title ? `h-3.5 w-3.5`:`h-5 w-5`} text-blue-200`} />
        { title ? <span className="text-blue-100 text-[0.8rem] font-semibold">{title}</span>: null }
    </button>
  )
}

export default ActionButton