import Image from 'next/image'
import React from 'react'
import Logo from '../public/logo.png'
import Link from 'next/link'
import FootSection from './FootSection'
import Socials from './Socials'
import FootSocials from './FootSocials'

function Footer() {
  return (
    <footer className="w-full print:hidden">
      <section className="hidden w-full h-96 bg-[#153B50E8] text-white">
         <div className="mx-auto h-full w-full max-w-6xl grid grid-cols-4 gap-x-20 place-items-center">
             <div className="col-span-1 flex flex-col items-center justify-center space-y-10">
                <Image src={Logo} alt="" className="h-20 w-20 object-contain" />
                <p className="text-[0.75rem] text-center font-medium">We are the independent body overseeing elections in Ghana. We work to promote public confidence in the democratic process and ensure its integrity. All rights reserved.</p>
             </div>
             <div className="pt-6 col-span-2 w-4/5 grid grid-cols-2 gap-24">
                 <FootSection 
                    heading="Additional Links" 
                    links={
                     [
                      { title:'FAQ', link:'/faq'},
                      { title:'Voting', link:'/voting'},
                      { title:'Opinion Center', link:'/opinion'},
                      { title:'Electoral Calendar', link:'/calendar'},
                     ]
                    } 
                 />
                 <FootSection 
                    heading="Miscellaneous" 
                    links={
                     [
                      { title:'Home', link:'/faq'},
                      { title:'About Us', link:'/voting'},
                      { title:'Contact Us', link:'/opinion'},
                      { title:'Events', link:'/events'},
                      { title:'Press Releases', link:'/press'},
                      { title:'Election Instructions', link:'/instruction'},
                     ]
                    } 
                 />
             </div>
             <div className="pt-20 col-span-1 place-self-start">
                <FootSocials heading="Connect With Us" />
             </div>
         </div>
      </section>
      <section className="w-full h-14 bg-[#153b50] flex items-center">
         <div className="md:mx-auto w-full md:max-w-6xl flex items-center justify-center">
            <p className="text-xs md:text-sm text-white text-center">&copy; Copyright {new Date().getFullYear()} | Electoral Unit | All Rights Reserved.</p>
         </div>
      </section>
   </footer>
  )
}

export default Footer