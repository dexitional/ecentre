import Link from 'next/link';
import React from 'react'

type Props = {
    links?: object[];
}

function RelatedBox({links}: Props) {
  return (
    <div className="w-64 flex flex-col justify-center space-y-6">
    <h1 className="font-serif text-base">Related Links</h1>
        <nav className="flex flex-col space-y-3 text-[0.65rem] leading-1 divide-y divide-gray-400 divide-opacity-40 [&>]:py-6">
          { links?.map((row:any) => (
             <Link key={row.title} href={row.link} className="pt-1.5 block">{row.title}</Link>
            ))
          }
        </nav>
    </div>
  )
}

export default RelatedBox