import React from 'react'
import { FiPrinter } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'

function ModalMainHeader({ setIsOpen}: any) {
  return (
    <div className="px-6 py-2 mb-4 border-b-2 border-green-800 w-full sticky top-0 bg-green-100 flex items-center justify-between ">
        <div className="flex items-center space-x-3">
            {/* <label className="tracking-wide font-mono">CONSTITUENCY</label>
            <select name="" className="px-4 py-2 border-2 border-green-800  outline-none rounded w-96 bg-green-300/20">
                <option>AOWIN </option>
                <option>SUAMAN </option>
            </select>
            <button onClick={(e) => setIsOpen(false)} className="px-2 py-1 flex items-center space-x-2 border-2 border-green-800 rounded">
                <span>Fetch</span>
            </button> */}
            <button className="px-2 py-1 flex items-center space-x-2 border-2 border-green-800 rounded">
            <FiPrinter className="h-5 w-5" />
            <span>Print</span>
            </button>
            
        </div>
        <div className="flex items-center space-x-3">
            <button onClick={(e) => setIsOpen(false)} className="px-2 py-1 flex items-center space-x-2 border-2 border-green-800 rounded">
            <MdClose className="h-5 w-5" />
            <span>Close</span>
            </button>
        </div>
    </div>
  )
}

export default ModalMainHeader