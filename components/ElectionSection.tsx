import React from 'react'
import IntroVideoBox from './IntroVideoBox'
import EligibilityBox from './EligibilityBox'
import InstructBox from './InstructBox'

function ElectionSection() {
  return (
    <div className="bg-white">
        <div className="py-4 md:py-10 flex flex-col items-center justify-center space-y-0.5">
            <h1 className="text-xl md:text-3xl font-medium tracking-widest">Every Vote Counts.</h1>
            <h2 className="text-sm md:text-xl text-center font-medium">Take the Next Step Forward and Check Eligibility!</h2>
        </div>
        <div className="w-full grid md:grid-cols-3">
            <IntroVideoBox />
            <EligibilityBox />
            <InstructBox />
        </div>
    </div>
  )
}

export default ElectionSection