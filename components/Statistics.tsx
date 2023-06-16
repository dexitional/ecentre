import React from 'react'
import StatPill from './StatPill'
import { FaRegFlag, FaVoteYea } from 'react-icons/fa'
import { GiVote } from 'react-icons/gi'
import { BsPersonVcard } from 'react-icons/bs'
import { fetchNominees } from '@/utils/serverApi'

function Statistics() {

 // const nominations = await fetchNominees()

  return (
    <div className="p-6 md:p-0 w-full bg-[#153B50]">
        <div className="mx-auto px-6 md:h-40 w-full md:max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-10 place-content-center">
            <StatPill title="VOTING CENTRES" value="10" Icon={FaVoteYea} />
            <StatPill title="ELECTORAL GROUPS" value="4" Icon={FaRegFlag} />
            {/* <StatPill title="FILLED NOMINATIONS" value={nominations?.total?.toString()} Icon={GiVote} /> */}
            <StatPill title="FILLED NOMINATIONS" value="204" Icon={GiVote} />
            <StatPill title="ELIGIBLE VOTERS" value="33,000" Icon={BsPersonVcard} />
        </div>
    </div>
  )
}

export default Statistics