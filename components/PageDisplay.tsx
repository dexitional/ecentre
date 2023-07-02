import Image from 'next/image'
import React from 'react'
import Logo from '@/public/logo.png'
import AspirantCard from './AspirantCard'
import { getServerSession } from 'next-auth'
import { options } from '@/options'
import { fetchNomineesDisplay, fetchPosition } from '@/utils/serverApi'
import { getGroup } from '@/utils/getGroup'
import AspirantCardBox from './AspirantCardBox'

type Props = {}

const getData = async (groupId: string) => {
   const data:any = await fetchNomineesDisplay(groupId)
   const dt = data && data.documents;
   const hash = new Map()
   for(const d of dt){
      // Get Position
      const post:any = await fetchPosition(d.positionId);
      if(post.total > 0){
        if(hash.has(post?.documents[0]?.title)){
          const dm = hash.get(post?.documents[0]?.title)
          hash.set(post?.documents[0]?.title, [ ...dm, {...d} ])
        } else{
          hash.set(post?.documents[0]?.title, [{...d}])
        }
      }
   }  return Object.fromEntries(hash)
}

export const revalidate = 60;
async function PageDisplay({}: Props) {

  const session:any = await getServerSession(options)
  const data:any = await getData(session?.user?.groupId)  
  const group:any = await getGroup(session?.user?.groupId)  
  

  return (
    <div className="w-full">
        <header className="relative h-24 bg-red-800 flex items-center rounded-md">
            <h1 className="absolute top-4 left-[50%] -translate-x-[50%] text-5xl print:scale-95 text-white font-poppins font-bold tracking-widest ">{new Date().getFullYear()}/{new Date().getFullYear()+1}</h1>
            <h2 className="z-20 px-6 py-3 w-4/5 h-14 flex items-center justify-center rounded-tl-full rounded-bl-full bg-blue-950 text-blue-50 text-3xl print:text-2xl font-bold tracking-widest absolute top-16 left-[50%] -translate-x-[50%] ">{group?.title?.toUpperCase()}</h2>
            <h2 className="z-10 px-4 py-5 pb-0 w-3/5 h-14 flex items-center justify-center rounded-br-full rounded-bl-full border-4 border-blue-950 bg-blue-100 text-blue-950 text-2xl print:text-2xl font-extrabold tracking-widest absolute top-24 left-[50%] -translate-x-[50%] ">DISPLAY OF ASPIRANTS</h2>
            <div className="z-20 p-2 absolute right-10 top-6 bg-white shadow-xl shadow-slate-900/30  rounded-full">
               <div className="h-20 w-20 flex items-center justify-center "><Image src={Logo} className="w-16 object-cover rounded" alt="Logo" height={100} width={100} /></div>
            </div>
        </header>
        <main className="mt-32 my-10 space-y-10">
            { Object.entries(data).map( ([key, value]: any) => {
             return(
                <section key={key} className="space-y-4 pb-10 border-b-2 border-red-700/80 border-dashed">
                    <h1 className="text-red-800 text-2xl text-center font-extrabold tracking-widest">{key?.toUpperCase()}</h1>
                    <div className="grid grid-cols-3 gap-4 place-content-center">
                     { value?.map( (aspirant: any) => {
                        // @ts-ignore
                        return (<AspirantCardBox key={aspirant.aspirant_regno} data={aspirant} />)
                     })}
                       
                    </div>
                </section>
             )})}
            
        </main>
    </div>
  )
}

export default PageDisplay