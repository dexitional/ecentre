import Link from 'next/link';
import React from 'react'
import { GiPublicSpeaker } from 'react-icons/gi'
import { IconType } from 'react-icons/lib';

type Props = {
    title: string;
    Icon: IconType;
}

function IntroPill({ title, Icon }: Props) {
  return (
    <Link href="" className="p-6 flex items-center space-x-8 bg-white">
        <Icon className="h-20 w-20 text-[#251577]" />
        <span className="text-xl">{title}</span>
    </Link>
  )
}

export default IntroPill