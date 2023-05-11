import React from 'react'
import { HiOutlinePlusCircle } from 'react-icons/hi2'

type Props = {
    heading: string;
    content?: string
}

function Detail({ heading,content }: Props) {
  return (
    <details  className="group" open={false}>
        <summary className="my-2 pl-6 pr-2 py-3 w-full flex items-center justify-between rounded border-t border-gray-300/20 group-hover:pl-5 group-hover:transition-all group-hover:border-l-4 group-hover:border-t-gray-300/20 group-hover:border-lime-700 shadow-lg shadow-gray-900/20 cursor-pointer">
          <span className="text-xs">{heading}</span>
          <HiOutlinePlusCircle className="h-5 w-5 text-gray-400" />
        </summary>
        <div className="py-4 px-2 text-xs flex flex-col space-y-2 text-gray-500">
          { content }
        </div>
    </details>
  )
}

export default Detail