import Link from 'next/link'
import React from 'react'
import { BiFastForward } from 'react-icons/bi'
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'
import { GiBirdTwitter } from 'react-icons/gi'
import { MdFacebook } from 'react-icons/md'

function Socials() {
  return (
    <div className="flex items-center space-x-5">
        <Link href="" alt="">
           <FiTwitter className="h-4 w-4" />
        </Link>
        <Link href="" alt="">
           <FiFacebook className="h-4 w-4" />
        </Link>
        <Link href="" alt="">
           <FiInstagram className="h-4 w-4" />
        </Link>
        <Link href="" alt="">
           <FiYoutube className="h-5 w-5" />
        </Link>
    </div>
  )
}

export default Socials