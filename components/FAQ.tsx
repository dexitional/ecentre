import Link from 'next/link';
import React from 'react'
import { FaTwitter,FaFacebookF, FaInstagram, FaYoutube, } from 'react-icons/fa'
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import Detail from './Detail';

type Props = {
    heading: string;
    contents?: any;
}

function FAQ({ heading,contents }: Props) {
  return (
    <div className="flex flex-col justify-center space-y-6">
        <h1 className="font-serif text-base">{heading}</h1>
        <div>
        { contents?.map((row:any) => (
            <Detail 
               key={row.heading}
               heading={row.heading}
               content={row.content} 
            />
          ))
        }
        </div>
    </div>
  )
}

export default FAQ    