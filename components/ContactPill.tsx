import React from 'react'
import { IconType } from 'react-icons/lib';

type Props = {
    title: string;
    Icon: IconType;
}

function ContactPill({ title, Icon }: Props) {
  return (
    <div className="flex items-center space-x-4 text-xs">
        <Icon className="h-4 w-4 " />
        <span>{title} </span>
    </div>
  )
}

export default ContactPill