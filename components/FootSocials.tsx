import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

type Props = {
    heading: string;
    links?: object[];
}

function FootSocials({ heading, links }: Props) {
  return (
    <div className="space-y-6">
        <h1 className="text-lg font-serif tracking-wide">{ heading }</h1>
        <div className="flex items-center space-x-8">
            <Link href="">
                <FaTwitter className="h-7 w-7" />
            </Link>
            <Link href="">
                 <FaFacebookF className="h-6 w-6" />
            </Link>
            <Link href="">
                <FaInstagram className="h-6 w-6" />
            </Link>
            <Link href="">
                <FaYoutube className="h-7 w-7" />
            </Link>
        </div>
    </div>
  )
}

export default FootSocials