import Link from 'next/link'
import React from 'react'

type Props = {
    heading: string;
    links?: object[];
}

function FootSection({ heading, links }: Props) {
  return (
    <div className="space-y-6">
        <h1 className="text-lg font-serif tracking-wide">{heading}</h1>
        <ul className="list-none space-y-2 divide-y divide-white divide-opacity-50 text-xs">
            { links?.map((row:any) => (
              <Link key={row?.link} href={row?.link} className="pt-2 flex items-center"><li key={row.link}>{row?.title}</li></Link>
            ))}
        </ul>
    </div>
  )
}

export default FootSection