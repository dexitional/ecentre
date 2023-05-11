import React from 'react'
import IntroVideoBox from './IntroVideoBox'
import EligibilityBox from './EligibilityBox'
import InstructBox from './InstructBox'
import EventPill from './EventPill'

function EventSection() {
  return (
    <div className="bg-white">
        <div className="py-10 flex flex-col items-center justify-center space-y-1">
            <h1 className="text-3xl font-medium tracking-widest">Electoral Events.</h1>
            <h2 className="text-xl font-medium">Take Interest In Upcoming Electoral Processes!</h2>
        </div>
        <div className="pb-6 px-6 w-full grid grid-cols-4 gap-6">
            <EventPill title="NOMINATION OPENS" group="UCCABS" date="NOVEMBER 12, 2023" />
            <EventPill title="NOMINATION OPENS lorem ipsum is coming" group="SRC/JCRC/GRASAG" date="NOVEMBER 12, 2023" />
            <EventPill title="NOMINATION OPENS" group="UCCABS" date="NOVEMBER 12, 2023" />
            <EventPill title="NOMINATION OPENS" group="UCCABS" date="NOVEMBER 12, 2023" />
        </div>
    </div>
  )
}

export default EventSection