'use client'
import React from 'react'

function ActionGroup() {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 text-xs">
       <button className="px-2 py-1 rounded border">CLOSE FORMS</button>
       <button className="px-2 py-1 rounded border">SEND REMINDERS</button>
    </div>
  )
}

export default ActionGroup