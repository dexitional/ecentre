import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons/lib';

type Props = {
    label: string;
    Icon: IconType;
    link: string;
}

function AdminPill({ label, Icon, link }: Props) {
  return (
    <Link href={link}  className="px-4 py-4 flex flex-col space-y-1.5 items-center justify-center rounded-full text-white bg-blue-950/70 ring-2 md:ring-4 ring-yellow-300 border-2 border-white shadow-lg shadow-white/50 col-span-1">
        <Icon className="h-8 w-8 md:h-12 md:w-12 text-white" />
        <span className="text-[0.6rem] md:text-xs tracking-wider" dangerouslySetInnerHTML={{__html: label }} />
    </Link>
  )
}

export default AdminPill