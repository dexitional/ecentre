import React from 'react'

function NewsLetterBox() {
  return (
    <div className="w-full min-h-fit bg-[#153b50]">
        <form className="mx-auto px-2 py-10 w-full max-w-6xl grid grid- grid-cols-4 gap-4 place-content-center text-white">
            <h1 className="px-4 w-fit text-[1.65rem] font-serif text-center leading-1">Subscribe to our Newsletter</h1>
            <input type="text" placeholder="Name" className="h-12 grid-flow-col rounded focus:ring-0 focus:outline-none text-gray-600" />
            <input type="email" placeholder="Email"className="h-12 grid-flow-col rounded focus:ring-0 focus:outline-none text-gray-600"  />
            <button type="submit" className="px-10 w-fit h-12 border border-white">SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox