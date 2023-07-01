import React from 'react'
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { getServerSession } from 'next-auth/next';
import { options } from '@/options';
import { GiPaper } from 'react-icons/gi';
import { FiPrinter, FiUsers } from 'react-icons/fi';
import { MdBallot, MdSms } from 'react-icons/md';
import { FaSms } from 'react-icons/fa';
import { BiNotepad } from 'react-icons/bi';
import Link from 'next/link';
import UserPill from './UserPill';
import AdminPill from './AdminPill';

type Props = {
  serial: string;
  pin: string;
}

async function AdminBanner() {

  const session:any = await getServerSession(options)
  console.log(session?.user)
  return (
    
    session?.user.gid == 2 ?

    <div className="w-full h-80 bg-red-200 bg-[url('../public/bg3.jpg')] bg-center">
      <div className="mx-auto h-full w-full md:max-w-6xl grid place-content-center">
        <div className="px-10 py-6 mx-auto w-full rounded-2xl shadow-xl border-2 md:border-4 border-white/70 backdrop-blur-sm bg-opacity-40 md:bg-opacity-60 bg-blue-950 grid place-content-center gap-y-4">
          <h1 className="pb-2 w-full font-bold md:font-semibold font-inter text-xs md:text-2xl tracking-[0.1em] text-center text-yellow-100">WELCOME, ADMIN: <span className="text-white">{ session?.user?.tag }</span> !!</h1>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-y-3 md:gap-y-3 gap-x-3 md:gap-x-6 font-semibold">
              <AdminPill link="/vouchers" label="VOUCHERS" Icon={BiNotepad} />
              <AdminPill link="/nominees" label="NOMINEES" Icon={FiPrinter} />
          </div>
        </div>
      </div>
    </div>
    : null
  ) 
}

export default AdminBanner