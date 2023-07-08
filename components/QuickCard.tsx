import React from 'react'
import IntroPill from './IntroPill'
import { GiPublicSpeaker } from 'react-icons/gi'
import { GoCalendar } from 'react-icons/go'
import { HiOutlineDocumentCheck } from 'react-icons/hi2'
import { TfiTicket } from 'react-icons/tfi'
import { VscOrganization } from 'react-icons/vsc'
import { BsCardChecklist } from 'react-icons/bs'
import { FaSms } from 'react-icons/fa'
import Link from 'next/link'
import { MdBallot } from 'react-icons/md'

function QuickCard() {
  return (
    <div className="p-4 md:p-8 md:col-span-2 grid md:grid-cols-2 gap-4 md:gap-8 bg-slate-100">
        <IntroPill title="2023 Convocation Elections" Icon={MdBallot} url={`/elections/convocation-23`}/>
        <IntroPill title="Press Releases" Icon={GiPublicSpeaker} />
        <IntroPill title="Electoral Calendar" Icon={GoCalendar} />
        <IntroPill title="General Instructions" Icon={BsCardChecklist} />
        <IntroPill title="Engage Voters with SMS-FLY&reg;" Icon={FaSms} />
        {/* <IntroPill title="File Nomination" Icon={HiOutlineDocumentCheck} /> */}
        <IntroPill title="Electoral Groups" Icon={VscOrganization} />
        {/* <IntroPill title="Check Register" Icon={BsCardChecklist} /> */}
    </div>
  )
}

export default QuickCard