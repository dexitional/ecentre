import React from 'react'
import { CgArrowLongRight } from 'react-icons/cg'
import { TfiArrowCircleRight } from 'react-icons/tfi'

function ECMessage() {
  return (
    <div className="p-14 h-[35rem] col-span-1 bg-[#153b50] text-white text-sm leading-6 flex flex-col justify-center space-y-6">
        <h1 className="text-2xl">UNIVERSITY ELECTION CENTRE</h1>
        <p>On behalf of the Election Team, I am pleased to welcome you to the University Election Centre.</p>
        <p>This website offers a channel to stay abreast with electoral processes in the University. </p>
        <p>From Student Elections to Staff Association elections communicate directly with you. We value this opportunity immensely.</p>
        <p>We invite you to browse through our content, share the links across your networks, and return to us with your suggestions, questions, and comments.</p>
        <button className="pr-6 py-2 flex items-center space-x-4 group">
        <span className="group-hover:text-black">READ MORE</span>
        <TfiArrowCircleRight className="h-6 w-6 transition group-hover:hidden" />
        <CgArrowLongRight className="h-6 w-7 hidden transition group-hover:duration-700 group-hover:delay-500 group-hover:text-black group-hover:flex" />
        </button>
    </div>
  )
}

export default ECMessage