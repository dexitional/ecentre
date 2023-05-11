import React from 'react'
import { IconType } from 'react-icons/lib';

type Props = {
    title: string;
    value: string;
    Icon: IconType
}

function StatPill({ title,value, Icon }: Props) {
  return (
    <div className="h-full flex items-center space-x-4 ">
    <Icon className="h-14 w-14 text-white" />
        <div className="flex flex-col space-y-2 font-medium text-white">
            <span className="text-3xl">{value}</span>
            <span className="text-xs tracking-widest font-semibold">{title}</span>
        </div>
    </div>
  )
}

export default StatPill