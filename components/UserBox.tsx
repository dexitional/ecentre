'use client'
import Link from 'next/link'
import React from 'react'
import { BiPowerOff, BiUserCircle } from 'react-icons/bi'
import { signOut, useSession } from 'next-auth/react'
import { GoSignOut } from 'react-icons/go'
import { FaPowerOff } from 'react-icons/fa'

function UserBox() {

  const { data: session }:any = useSession()
  
  if(session && session.user){
    const user:any = session.user;
    console.log(session)

    return (
      <div className="m-1 w-sm h-8 rounded-full shadow-lg shadow-blue-950/30 border-2 border-blue-950 flex overflow-hidden">
          <Link href={`/user/${user?.serial}/application`} className="w-12 h-full bg-blue-950/90 flex items-center justify-center">
              <BiUserCircle className="h-8 w-8 text-white" />
          </Link>
          <button onClick={()=> signOut() } className="w-12 h-full bg-red-700/90 flex items-center justify-center">
              <FaPowerOff className="h-5 w-5 text-yellow-300" />
          </button>
          {/* <div className="flex-1 flex-col justify-center text-xs">
              <div className="w-full p-1 text-[0.6rem] text-center font-semibold">CODE: { user?.serial } </div>
              <div className="h-full w-full flex items-center justify-center font-bold">
                  <Link href={`/user/${session?.user.serial}/application`} className="py-0.5 px-1 flex-1 border border-yellow-400  text-[0.55rem] text-center tracking-wide bg-yellow-200">DASHBOARD</Link>
                  <button onClick={()=> signOut() } className="px-1 w-full h-full flex-1 flex border border-red-400  text-[0.55rem] text-center tracking-wide bg-red-200">LOGOUT</button>
              </div>
          </div> */}
              
      </div>
    )
  }


}

export default UserBox