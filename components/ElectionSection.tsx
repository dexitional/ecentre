import React from 'react'
import IntroVideoBox from './IntroVideoBox'
import EligibilityBox from './EligibilityBox'
import InstructBox from './InstructBox'

function ElectionSection() {
  return (
    <div className="bg-white">
        <div className="py-10 flex flex-col items-center justify-center space-y-1">
            <h1 className="text-3xl font-medium tracking-widest">Every Vote Counts.</h1>
            <h2 className="text-xl font-medium">Take the Next Step Forward and Check Eligibility!</h2>
        </div>
        <div className="w-full grid grid-cols-3">
            <IntroVideoBox />
            <EligibilityBox />
            <InstructBox />
        </div>
    </div>
  )
}

export default ElectionSection