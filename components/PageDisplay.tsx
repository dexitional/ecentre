import Image from 'next/image'
import React from 'react'
import Logo from '@/public/logo.png'
import AspirantCard from './AspirantCard'
import { getServerSession } from 'next-auth'
import { options } from '@/options'
import { fetchNomineesDisplay, fetchPosition } from '@/utils/serverApi'
import { getGroup } from '@/utils/getGroup'
import AspirantCardBox from './AspirantCardBox'
import DisplayHeader from './DisplayHeader'
import Print from './Print'

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
        <DisplayHeader title={group?.title} />
        <main className="mt-24 print:mt-0 my-10 space-y-10">
            <div className="mx-auto w-fit rounded text-lg print:hidden border-2 border-red-700/50 uppercase"><Print /></div>
        
            { Object.entries(data).map( ([key, value]: any) => {
             return(
                <section key={key} className="space-y-6 pb-10 print:border-0 border-b-2 border-red-700/80 border-dashed print:break-after-page">
                    <DisplayHeader title={group?.title} print={true} />
                    <h1 className="px-6 py-1 mx-auto w-fit -skew-x-12 bg-red-50/30 border-8 border-double border-red-700/80 text-red-800 text-2xl text-center font-extrabold tracking-widest">{key?.toUpperCase()}</h1>
                    <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fit,_32%)]">
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