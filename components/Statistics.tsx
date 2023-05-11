import React from 'react'
import StatPill from './StatPill'
import { FaRegFlag, FaVoteYea } from 'react-icons/fa'
import { GiVote } from 'react-icons/gi'
import { BsPersonVcard } from 'react-icons/bs'

function Statistics() {
  return (
    <div className="w-full bg-[#153B50]">
        <div className="mx-auto px-6 h-40 w-full max-w-6xl grid grid-cols-4 gap-10 place-content-center">
            <StatPill title="VOTING CENTRES" value="10" Icon={FaVoteYea} />
            <StatPill title="ELECTORAL GROUPS" value="4" Icon={FaRegFlag} />
            <StatPill title="FILLED NOMINATIONS" value="206" Icon={GiVote} />
            <StatPill title="ELIGIBLE VOTERS" value="33,000" Icon={BsPersonVcard} />
        </div>
    </div>
  )
}

export default Statistics