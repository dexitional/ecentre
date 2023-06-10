'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { FiEdit3 } from 'react-icons/fi';

// async function getData(kw:string, pg:number) {
//     const res = await fetch(kw 
//         ? `http://localhost:3000/api/lecture?keyword=${encodeURI(kw)}&page=${pg}` 
//         : `http://localhost:3000/api/lecture?page=${pg}`,{ cache: 'no-store' });
//     if (!res.ok) throw new Error('Failed to fetch data');
//     const resp = await res.json()
//     return resp.data;
// }

async function PageLecture() {
   //console.log(data)
   const searchParams = useSearchParams()
   const keyword = searchParams.get('search') || ''
   const page = searchParams.get('page') || 1;
   console.log(searchParams.get('search'))
//    const data = await getData(keyword,+page);
    const data:any = { documents: [] }
   return (
    <div className="pb-12 overflow-y-scroll scrollbar-hide">
        <table className="w-full border-separate border-spacing-0 border border-blue-900/30 rounded text-[0.83rem] text-blue-900/80 font-medium">
            <tr className="hidden md:grid md:grid-cols-5 bg-blue-900/5 text-blue-900 text-[0.86rem] font-inter font-bold tracking-wider">
              <td className="px-6 py-3 md:border-b border-blue-900/20">Course</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">Period</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">Venue</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">Group</td>
              <td className="px-6 py-3 md:border-b border-blue-900/20">&nbsp;</td>
            </tr>
            { data?.documents?.map((row:any,i:React.Key) => {

                const course = JSON.parse(row?.course)
                const venue = JSON.parse(row?.venue)
                
                return (
                <tr key={row.code} className="grid grid-cols-1 md:grid-cols-5 text-left ">
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">Course</span>
                        <span className="ml-3 md:m-0 font-bold text-xs tracking-wide">{course?.title}<br/><span className="italic font-medium tracking-widest text-blue-900">( {course?.code} )</span></span>
                    </td>
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">Period</span>
                        <span className="ml-3 md:m-0">{row?.day?.toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-green-900/5 font-bold">Venue</span>
                        <span className="ml-3 md:m-0">{venue?.name?.toUpperCase()}</span>
                        {/* <div className="ml-3 md:m-0">
                            <Badge title="275" />
                        </div> */}
                    </td>
                    <td className="px-6 py-3 grid md:grid-cols-1 gap-y-2 md:border-b border-blue-900/10">
                        <span className="md:hidden py-0.5 px-3 rounded bg-blue-900/5 font-bold">Group</span>
                        <span className="ml-3 md:m-0">{row?.group || '--'}</span>
                    </td>
                    <td className="px-6 py-3 border-b border-blue-900/10 flex md:justify-end">
                        <div className="md:px-2 w-fit flex items-center space-x-4">
                            {/* <BadgeIcon title="" Icon={MdOutlineArticle}/> */}
                            <FiEdit3 className="w-3.5 h-3.5" />
                            {/* <FiTrash className="w-3.5 h-3.5" /> */}
                        </div>
                    </td>
                </tr>
            )})}

        </table>
    </div>
  )
}

export default PageLecture