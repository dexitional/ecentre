import React from 'react'
import ECMessage from './ECMessage'
import QuickCard from './QuickCard'

function QuickGuide() {
  return (
    <div className="md:py-14 w-full h-full bg-white grid md:grid-cols-3">
        <ECMessage />
        <QuickCard />
    </div>
  )
}

export default QuickGuide