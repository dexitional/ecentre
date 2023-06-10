import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

function GoForward() {
  return (
    <button className="p-0.5 w-fit flex items-center justify-center rounded shadow shadow-blue-900/40 border border-blue-900/40 ">
        <MdKeyboardArrowRight className="w-7 h-7 text-blue-900/80" />
    </button>
  )
}

export default GoForward