'use client';
import SideBar from '@/components/SideBar'
import React, { ReactElement } from 'react'
import Header from '@/components/Header';
import { Menu, Transition } from '@headlessui/react'
import RelatedBox from '@/components/RelatedBox';
import Connect from '@/components/Connect';
import LatestBox from '@/components/LatestBox';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import FAQ from '@/components/FAQ';
import MainSideBar from '@/components/MainSideBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="z-0 w-full bg-white">
      <div className="py-10 px-10 mx-auto w-full max-w-6xl flex flex-col md:flex-row md:space-x-14 ">
        <main className="flex-1">
          {children}
        </main>
        <MainSideBar />
      </div>
    </div>
  )
}

export default Layout