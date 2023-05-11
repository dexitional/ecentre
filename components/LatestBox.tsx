import Link from 'next/link';
import React from 'react'

type Props = {
    links?: object[];
}

function LatestBox({links}: Props) {
  return (
    <div className="flex flex-col justify-center space-y-6">
    <h1 className="font-serif text-base">Latest Press Releases</h1>
        <nav className="flex flex-col space-y-4 text-[0.65rem] leading-1">
          { links?.map((row:any) => (
             <Link key={row.title} href={row.link} className="pt-1.5 flex flex-col space-y-1.5">
                <h2 className="text-sm font-semibold tracking-widest uppercase">KUMAWU CONSTITUENCY PARLIAMENTARY BY-ELECTION</h2>
                <span className="font-inter text-[0.6rem] text-green-600/90 tracking-widest font-semibold uppercase">April 17, 2023</span>
             </Link>
            ))
          }
        </nav>
    </div>
  )
}

export default LatestBox