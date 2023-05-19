import React from 'react'
import Logo from '../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import NavPill from './NavPill';
import MobileMenu from './MobileMenu';
import MainMenu from './MainMenu';
import { BiUserCircle } from 'react-icons/bi';
import UserBox from './UserBox';
import { cookies } from 'next/headers';

function Navigation() {
  
  return (
    <div className="z-10 w-full shadow-xl shadow-black/20 text-gray-800">
        <div className="px-3 md:px-6 md:mx-auto w-full md:max-w-6xl h-[4.3rem] md:h-[5.8rem] flex items-center justify-between space-x-8">
            <MobileMenu />
            <Link href="/" className="relative">
                <Image src={Logo} alt="Logo" className="h-10 w-10 md:h-20 md:w-20 object-contain" />
            </Link>
            {/* @ts-ignore */}
            <MainMenu />
            {/* @ts-ignore */}
            <UserBox />
        </div>
    </div>
  )
}

export default Navigation