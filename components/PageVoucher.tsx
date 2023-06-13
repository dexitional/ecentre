// import { useSearchParams } from 'next/navigation';
import { fetchGroup, fetchSession, fetchUsers, fetchVoucherOffsetById, fetchVouchers, fetchVouchersOffset } from '@/utils/serverApi';
import React from 'react'
import BadgeIcon from './BadgeIcon';
import { MdOutlineArticle } from 'react-icons/md';
import { getUserDetail } from '@/utils/getUserDetail';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '@/options';

// async function getData(kw:string, pg:number) {
//     const res = await fetch(kw 
//         ? `http://localhost:3000/api/lecture?keyword=${encodeURI(kw)}&page=${pg}` 
//         : `http://localhost:3000/api/lecture?page=${pg}`,{ cache: 'no-store' });
//     if (!res.ok) throw new Error('Failed to fetch data');
//     const resp = await res.json()
//     return resp.data;
// }


const getHelper = async( sessionId: string, groupId: string) => {
    const session_res:any = await fetchSession(sessionId)
    const session =  session_res?.documents[0]
    const group_res = await fetchGroup(groupId)
    const group = group_res?.documents[0]
    return { group, session }
}

const getGroup = async( groupId: string ) => {
    const group_res = await fetchGroup(groupId)
    const group = group_res?.documents[0]
    return { ...group }
}



async function PageVoucher() {

    const session:any = await getServerSession(options)
    console.log("USER", session?.user)
   //console.log(data)
//    const searchParams = useSearchParams()
//    const keyword = searchParams.get('search') || ''
//    const page = searchParams.get('page') || 1;
//    console.log(searchParams.get('search'))
//    const data = await getData(keyword,+page);
    // const data:any = { documents: [] }

    // let dt:any = [];
    // let pass = 0;
    // while(true){
    //     console.log(pass)
    //     const sl = await fetchVouchersWithOffset(pass);
    //     if(sl.total < 100) break;
    //     dt.push(sl.documents);
    //     pass++;
    // }

    const userDetail:any = await getUserDetail(session?.user?.email);
    const group:any = await getGroup(userDetail?.groupId)

    const dt = userDetail?.groupId ? await fetchVoucherOffsetById(userDetail?.groupId,0) : await fetchVouchersOffset(0);
    const data:any = await Promise.all(dt?.documents?.map(async (row: any) => {
        const { group, session } = await getHelper(row.sessionId, row.groupId);
        return { ...row, group, session }
    }))

   return (
    <div className="pb-12 overflow-y-scroll scrollbar-hide">
        <h1 className="my-4 md:my-6 p-1 md:px-6 md:py-2 font-bold text-base md:text-2xl- tracking-widest rounded border md:border-2 border-blue-950/60 text-blue-950">{ group?.title?.toUpperCase() || 'ADMINISTRATOR' }</h1>
        <table className="w-full border-separate border-spacing-0 border border-blue-900/30 rounded text-[0.83rem] text-blue-900/80 font-medium">
            <tr className="hidden md:grid md:grid-cols-5 bg-blue-900/5 text-blue-900 text-[0.86rem] font-inter font-bold tracking-wider">
              <td className="px-6 py-3 md:border-b border-blue-900/20">Serial</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">Pin</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">Electoral Group</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">Session</td>
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
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">PIN</span>
                        <span className="ml-3 md:m-0">{row?.pin}</span>
                    </td>
                    
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-blue-900/5 font-bold">GROUP</span>
                        <span className="ml-3 md:m-0">{ row?.group?.title }</span>
                        {/* <span className="ml-3 md:m-0">{group?.name?.toUpperCase()}</span> */}
                    </td>
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">SESSION</span>
                        <span className="ml-3 md:m-0">{row?.session?.title}</span>
                        {/* <span className="ml-3 md:m-0">{session?.name?.toUpperCase()}</span> */}
                        {/* <div className="ml-3 md:m-0">
                            <Badge title="275" />
                        </div> */}
                    </td>
                    <td className="px-6 py-3 border-b border-blue-900/10 flex md:justify-end">
                        <div className="md:px-2 w-fit flex items-center space-x-4">
                            <Link href={`/vouchers/${row.$id}/view`}><BadgeIcon title="SELL" Icon={MdOutlineArticle}/></Link>
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

export default PageVoucher