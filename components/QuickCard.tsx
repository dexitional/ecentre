import React from 'react'
import IntroPill from './IntroPill'
import { GiPublicSpeaker } from 'react-icons/gi'
import { GoCalendar } from 'react-icons/go'
import { HiOutlineDocumentCheck } from 'react-icons/hi2'
import { TfiTicket } from 'react-icons/tfi'
import { VscOrganization } from 'react-icons/vsc'
import { BsCardChecklist } from 'react-icons/bs'
import { FaSms } from 'react-icons/fa'

function QuickCard() {
  return (
    <div className="p-8 col-span-2 grid grid-cols-2 gap-8 bg-slate-100">
        <IntroPill title="Press Releases" Icon={GiPublicSpeaker} />
        <IntroPill title="Electoral Calendar" Icon={GoCalendar} />
        <IntroPill title="General Instructions" Icon={BsCardChecklist} />
        <IntroPill title="Nomination Voucher" Icon={TfiTicket} />
        <IntroPill title="Engage Voters with SMS-TRON&reg;" Icon={FaSms} />
        {/* <IntroPill title="File Nomination" Icon={HiOutlineDocumentCheck} /> */}
        <IntroPill title="Electoral Groups" Icon={VscOrganization} />
        {/* <IntroPill title="Check Register" Icon={BsCardChecklist} /> */}
    </div>
  )
}

export default QuickCard