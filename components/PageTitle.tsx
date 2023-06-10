import React from 'react'

function PageTitle({ title }: any) {
  return (
    <div className="relative px-6 py-1 w-full md:w-fit flex items-start rounded border border-b-0 border-blue-900/40">
        <div className="w-full md:w-max font-prism font-bold text-blue-900 tracking-[0.4em]">{title}</div>
        <div className="w-full absolute bottom-0 left-0 flex items-center">
            <div className="h-1 -skew-y-20 flex-1 bg-blue-900/40"></div>
            {/* <div className="h-1 skew-x-10 flex-1 bg-red-600"></div>
            <div className="h-1 skew-x-10 flex-1 bg-white"></div>
            <div className="h-1 skew-x-10 flex-1 bg-yellow-600"></div> */}
        </div>
    </div>
  )
}

export default PageTitle