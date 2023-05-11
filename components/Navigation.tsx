import React from 'react'
import Logo from '../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import NavPill from './NavPill';

function Navigation() {
  return (
    <div className="z-10 w-full shadow-xl shadow-black/20 text-gray-800">
        <div className="px-6 mx-auto w-full max-w-6xl h-[5.8rem] flex items-center space-x-8">
            <Link href="/" className="relative">
                <Image src={Logo} alt="Logo" className="h-20 w-20 object-contain" />
            </Link>
            <nav className="flex items-center space-x-10">
               <NavPill
                    title="HOME" 
                    link="/" 
                />
                <NavPill
                    title="PRESS RELEASES" 
                    link="/" 
                />
                <NavPill
                    title="ELECTORAL CALENDAR" 
                    link="/" 
                />
                <NavPill
                    title="GENERAL INSTRUCTIONS" 
                    link="/" 
                />
                <NavPill
                    title="FAQ" 
                    link="/" 
                />
                 
                {/* <NavPill
                    title="ABOUT US" 
                    link="#" 
                    subMenu={
                      [
                        { title:'ABOUT ASSOCIATION', link:'/about-asociation'},
                        { title:'ABOUT LEADER', link:'/about-leader'},
                        { title:'MISSION, GOALS & PROJECTIONS', link:'/mission'},
                        { title:'LEADERSHIP', link:'/leadership'},
                      ]
                    }
               /> */}
               
               <NavPill
                    title="CONTACT US" 
                    link="/contact" 
                />
            </nav>

        </div>
    </div>
  )
}

export default Navigation