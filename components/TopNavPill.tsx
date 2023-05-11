import React from 'react'
import { IconType } from 'react-icons/lib';

type Props = {
    title: string;
    Icon: IconType;
}

function TopNavPill({ title, Icon }: Props) {
  return (
    <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <span className="text-xs font-sembold">{title}</span>
    </div>
  )
}

export default TopNavPill