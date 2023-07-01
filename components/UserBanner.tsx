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

type Props = {
  serial: string;
  pin: string;
}

async function UserBanner() {

  const session:any = await getServerSession(options)
  console.log(session?.user)
  return (
    
    session?.user?.gid == 1 ?

    <div className="w-full h-80 bg-red-200 bg-[url('../public/bg3.jpg')] bg-center">
        <div className="mx-auto h-full w-full md:max-w-6xl grid place-content-center">
            <div className="px-10 py-6 mx-auto w-full rounded-2xl shadow-xl border-2 md:border-4 border-white/70 backdrop-blur-sm bg-opacity-40 md:bg-opacity-60 bg-blue-950 grid place-content-center gap-y-4">
                <h1 className="pb-2 w-full font-bold md:font-semibold font-inter text-xs md:text-2xl tracking-[0.1em] text-center text-yellow-100">WELCOME, SERIAL: <span className="text-white">{ session?.user?.serial }</span> !!</h1>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-y-3 md:gap-y-3 gap-x-3 md:gap-x-6 font-semibold">
                   <UserPill user={session?.user} label="APPLY" Icon={BiNotepad} />
                   <UserPill user={session?.user} label="PRINTOUT" Icon={FiPrinter} />
                   <UserPill user={session?.user} label="VETTED" Icon={MdBallot} />
                   <UserPill user={session?.user} label="VOTERS" Icon={MdBallot} />
                   <UserPill user={session?.user} label="SMS-FLY <sup>&reg;</sup>" Icon={FaSms} />
                </div>
                {/* <button type="submit" className="px-6 py-2 h-14 min-w-md rounded-lg bg-slate-100 border-b border-blue-950 text-blue-950 font-semibold flex items-center justify-center space-x-4">
                    <span className="text-xl tracking-widest font-extrabold text-blue-950">GOTO DASHBOARD</span>
                    <BsArrowDownRightCircle className="h-7 w-7 text-blue-950"/>
                </button> */}
            </div>
        </div>
    </div>
    : null
  ) 
}

export default UserBanner