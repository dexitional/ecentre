import React from 'react'
import IntroVideoBox from './IntroVideoBox'
import EligibilityBox from './EligibilityBox'
import InstructBox from './InstructBox'
import EventPill from './EventPill'
import UpcomingPill from './UpcomingPill'

function UpcomingSection() {
  return (
    <div className="bg-white">
        <div className="py-10 flex flex-col items-center justify-center space-y-1">
            <h1 className="text-3xl font-medium tracking-widest">Events</h1>
        </div>
        <div className="pb-6 px-6 w-full grid grid-cols-4 gap-6">
            <UpcomingPill title="NOMINATION OPENS" link="UCCABS" date="NOVEMBER 12, 2023" />
            <UpcomingPill title="NOMINATION OPENS lorem ipsum is coming" link="SRC/JCRC/GRASAG" date="NOVEMBER 12, 2023" />
            <UpcomingPill title="NOMINATION OPENS" link="UCCABS" date="NOVEMBER 12, 2023" />
            <UpcomingPill title="NOMINATION OPENS" link="UCCABS" date="NOVEMBER 12, 2023" />
        </div>
    </div>
  )
}

export default UpcomingSection