import Link from 'next/link';
import React from 'react'
import { FaTwitter,FaFacebookF, FaInstagram, FaYoutube, } from 'react-icons/fa'

type Props = {
    links?: any;
}

function Connect({ links }: Props) {
  return (
    <div className="flex flex-col justify-center space-y-6">
        <h1 className="font-serif text-base">Connect With Us</h1>
        <nav className="flex space-x-3 text-[0.65rem] leading-1 divide-y divide-gray-400 divide-opacity-40 [&>]:py-6">
            { links?.twitter ? 
             <Link href={links?.twitter} className="p-3 w-fit flex items-center justify-center rounded-full bg-blue-400 hover:transition-all hover:duration-300 hover:scale-110">
                <FaTwitter className="h-4 w-4 text-white" />
            </Link>: null 
            }
             { links?.facebook ? 
            <Link href={links?.facebook} className="p-3 w-fit flex items-center justify-center rounded-full bg-blue-950 hover:transition-all hover:duration-300 hover:scale-110">
                <FaFacebookF className="h-4 w-4 text-white" />
            </Link>: null 
            }
             { links?.instagram ? 
            <Link href={links?.instagram} className="p-3 w-fit flex items-center justify-center rounded-full bg-gray-800 hover:transition-all hover:duration-300 hover:scale-110">
                <FaInstagram className="h-4 w-4 text-white" />
            </Link>: null 
            }
            { links?.youtube ? 
            <Link href={links?.youtube} className="p-3 w-fit flex items-center justify-center rounded-full bg-red-600  hover:transition-all hover:duration-300 hover:scale-110">
                <FaYoutube className="h-4 w-4 text-white" />
            </Link>: null 
            }
        </nav>
    </div>
  )
}

export default Connect    