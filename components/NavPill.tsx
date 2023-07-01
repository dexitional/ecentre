'use client'
import Link from 'next/link';
import React from 'react'
import { BsCaretDownFill } from 'react-icons/bs';
import { FaSortDown } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react'

type Props = {
    title: string;
    link: string;
    subMenu?: object[] | null
}

function NavPill({ title,link,subMenu = null }: Props) {
  return (
    <Menu as="div" className="relative ring-0 focus:ring-0">
        { !subMenu 
        ? <Link href={link} className="flex items-center space-x-0.5">
            <span className="text-xs font-medium font-serif">{title}</span>
          </Link>
        : <Menu.Button className="flex items-center space-x-2">
            <span className="text-xs font-medium font-serif">{title}</span>
            <BsCaretDownFill className="h-3 w-3 text-gray-500"/>
          </Menu.Button>
        }

        <Menu.Items className="absolute top-10 w-48 flex flex-col rounded-lg bg-white text-gray-600 shadow-xl shadow-gray-800/ divide-y divide-gray-400 divide-opacity-20 text-[0.65rem] tracking-widest font-semibold font-roboto overflow-hidden">
            { subMenu?.map((row:any) => (
                <Menu.Item key={row.title}>
                    <Link href={row.link} className="px-6 py-2.5 w-full hover:bg-gray-600 hover:text-white">{row.title}</Link>
                </Menu.Item>
              ))
            }
        </Menu.Items>
    </Menu>
  )
}

export default NavPill