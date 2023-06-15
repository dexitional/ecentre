// import { useSearchParams } from 'next/navigation';
import { fetchGroup, fetchNomineeOffset, fetchNomineeOffsetById, fetchNominees, fetchPosition, fetchSession, fetchVouchers } from '@/utils/serverApi';
import React from 'react'
import { FiEdit3 } from 'react-icons/fi';
import BadgeIcon from './BadgeIcon';
import { MdOutlineArticle } from 'react-icons/md';
import Link from 'next/link';
import { getGroup } from '@/utils/getGroup';
import { getUserDetail } from '@/utils/getUserDetail';
import { getServerSession } from 'next-auth';
import { options } from '@/options';


const getHelper = async( sessionId: string, positionId: string) => {
    const session_res:any = await fetchSession(sessionId)
    const session =  session_res?.documents[0]
    const position_res = await fetchPosition(positionId)
    const position = position_res?.documents[0]
    // const group_res = await fetchGroup(groupId)
    // const group = group_res?.documents[0]
    return { position, session }
}

async function PageNominee() {
    const session:any = await getServerSession(options)
   //console.log(data)
//    const searchParams = useSearchParams()
//    const keyword = searchParams.get('search') || ''
//    const page = searchParams.get('page') || 1;
//    console.log(searchParams.get('search'))
//    const data = await getData(keyword,+page);
    // const data:any = { documents: [] }

    const userDetail:any = await getUserDetail(session?.user?.email);
    const group:any = userDetail?.groupId ? await getGroup(userDetail?.groupId) : {};

    const dt = userDetail?.groupId ? await fetchNomineeOffsetById(userDetail?.groupId,0) : await fetchNomineeOffset(0);
    
    const data:any = await Promise.all(dt?.documents?.map(async (row: any) => {
          const { position, session } = await getHelper(row.sessionId, row.positionId);
          return { ...row, position, session }
    }))

   return (
    <div className="pb-12 overflow-y-scroll scrollbar-hide">
        <h1 className="my-4 md:my-6 p-1 md:px-6 md:py-2 font-bold text-base md:text-2xl- tracking-widest rounded border md:border-2 border-blue-950/60 text-blue-950">{ group?.title?.toUpperCase() || 'ADMINISTRATOR' }</h1>
        <table className="w-full border-separate border-spacing-0 border border-blue-900/30 rounded text-[0.83rem] text-blue-900/80 font-medium">
            <tr className="hidden md:grid md:grid-cols-5 bg-blue-900/5 text-blue-900 text-[0.86rem] font-inter font-bold tracking-wider">
              <td className="px-6 py-3 md:border-b border-blue-900/20">Serial</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">Applicant</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">Position</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">Group</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">&nbsp;</td>
            </tr>
            { data?.map((row:any,i:React.Key) => {
               
                return (
                <tr key={row.code} className="grid grid-cols-1 md:grid-cols-5 text-left ">
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">SERIAL</span>
                        <span className="ml-3 md:m-0 font-bold text-xs tracking-wide">{row?.serial}</span>
                    </td>
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">APPLICANT</span>
                        <span className="ml-3 md:m-0">{row?.aspirant_regno?.toUpperCase()}</span>
                    </td>
                    
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-blue-900/5 font-bold">POSITION</span>
                        <span className="ml-3 md:m-0">{ row?.position?.title?.toUpperCase() }</span>
                        {/* <span className="ml-3 md:m-0">{group?.name?.toUpperCase()}</span> */}
                    </td>
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">GROUP</span>
                        <span className="ml-3 md:m-0">{row?.session?.title}</span>
                        {/* <span className="ml-3 md:m-0">{session?.name?.toUpperCase()}</span> */}
                        {/* <div className="ml-3 md:m-0">
                            <Badge title="275" />
                        </div> */}
                    </td>
                    <td className="px-6 py-3 border-b border-blue-900/10 flex md:justify-end">
                        <div className="md:px-2 w-fit flex items-center space-x-4">
                            {/* <BadgeIcon title="FORM" Icon={MdOutlineArticle}/> */}
                            <Link href={`/nominees/${row?.serial}/view`}><BadgeIcon title="FORM" Icon={MdOutlineArticle}/></Link>
                            
                            {/* <FiEdit3 className="w-3.5 h-3.5" /> */}
                            {/* <FiTrash className="w-3.5 h-3.5" /> */}
                        </div>
                    </td>
                </tr>
            )})}

        </table>
    </div>
  )
}

export default PageNominee