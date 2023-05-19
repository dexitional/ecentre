'use client'
import Link from 'next/link'
import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { signOut, useSession } from 'next-auth/react'

function UserBox() {

  const { data: session } = useSession({ required: true })
  
  if(session && session.user){
    const user:any = session.user;
    console.log(session)

    return (
      <div className="m-1 w-sm h-12 rounded border-2 border-blue-950 flex overflow-hidden">
          <div className="w-12 h-full bg-blue-950 flex items-center justify-center">
              <BiUserCircle className="h-10 w-10 text-white" />
          </div>
          <div className="flex-1 flex-col justify-center text-xs">
              <div className="w-full p-1 text-[0.6rem] text-center font-semibold">CODE: { user?.serial } </div>
              <div className="flex space-x-1 font-semibold">
                  <Link href="/application" className="py-0.5 px-1 flex-1 border border-yellow-400 rounded-tr-lg text-[0.55rem] text-center tracking-wide bg-yellow-200">PROFILE</Link>
                  <button onClick={()=> signOut() } className="py-0.5 px-1 flex-1 border border-red-400  rounded-tl-lg text-[0.55rem] text-center tracking-wide bg-red-200">LOGOUT</button>
              </div>
          </div>
              
      </div>
    )
  }


}

export default UserBox