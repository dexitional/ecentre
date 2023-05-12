import React from 'react'
import { HiMenu } from 'react-icons/hi'
function MobileMenu() {
  return (
    <button className="flex md:hidden">
        <HiMenu className="h-7 w-7 mx-2 text-gray-600" />
    </button>
  )
}

export default MobileMenu