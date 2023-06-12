import { useState } from "react"
import Image from 'next/image'
import Logo from '../../../../../public/logo.png'
import PrintPill from "@/components/PrintPill"
import { fetchGroup, fetchNominee, fetchPosition, fetchVoucher } from "@/utils/serverApi"
import { fetchRecord } from "@/utils/fetchRecord"
import Print from "@/components/Print"
//const { NEXT_PUBLIC_IMAGE_URL : IMAGE_URL } = process.env
const IMAGE_URL = `https://ehub.ucc.edu.gh`;  

const getApplicant = async (serial: string) => {
    const applicant = await fetchNominee(serial);
    const voucher = await fetchVoucher(serial);
    const row:any = applicant?.documents[0]
    const { groupId }: any = voucher?.documents[0];
    const group = await fetchGroup(groupId);
    const { title : group_name }: any = group?.documents[0];
    const position = await fetchPosition(row.positionId);
    const { title }: any = position?.documents[0];
    const { aspirant_regno, has_mate, mate_regno, g1_verified, g2_verified, form_submit, guarantor1_regno, guarantor2_regno }: any = row
    const rowData: any = { aspirant: aspirant_regno, mate: mate_regno, guarantor1: guarantor1_regno, guarantor2: guarantor2_regno }
    const mapData: any = {};
    for(const r of Object.keys(rowData)){
      const newData = await fetchRecord(rowData[r])
      mapData[r] = rowData[r] && newData.success ? newData?.data[0]?.user : null;
    }
    return { applicant, has_mate,g1_verified, g2_verified, form_submit, title, group_name, data: mapData }
}

export default async function Page({ params}:{ params: { serial: string }}) {
  const data = await getApplicant(params?.serial);
  const { applicant, has_mate,g1_verified, g2_verified,form_submit, title, group_name, data: { aspirant, mate, guarantor1, guarantor2 }} :any = data
  
  return (
    <main className="flex-1 space-y-3 md:space-y-8">
        <div className="space-y-2">
          <div className="-space-y-4">
            <h1 className="px-4 py-2 text-xl md:text-4xl print:text-3xl text-center font-bold tracking-wider rounded  text-[#153B50]">UNIVERSITY OF CAPE COAST - GHANA</h1>
            <h1 className="px-4 py-2 text-md md:text-2xl print:text-lg text-center font-bold tracking-wider rounded text-[#153B50]">{ new Date().getFullYear() }  SRC/LOCAL NUGS/GRASAG/JCRC ELECTION NOMINATIONS</h1>
          </div>
          <div className="my-2 mx-auto relative h-12 w-12 md:h-24 md:w-24 print:w-16 print:h-16">
            <Image className="object-contain" src={Logo} alt="" fill/>
          </div>
        </div>
        
        <div className="my-3 md:my-6 md:px-6 px-3 md:py-2 py-1 w-fit -skew-x-6 ring-2 ring-[#153B50] print:ring-0 border-2 border-white print:border-slate-200 bg-[#153B50] print:bg-transparent text-white ">
          <div className="flex items-center justify-between">
            <h2 className="text-xs md:text-lg tracking-widest font-bold print:text-slate-600">{ group_name?.toUpperCase() } NOMINATION</h2>
            <Print />
          </div>
          <div className="hidden">
            <p>Please provide the requested information. Falsification of any information leads to automatic disqualification.</p>
            <p>Deadline for submission of Online Nomination is Friday, June 9, 2023 at 11:59 PM.</p>
          </div>
        </div>
        <div className="mt-2">
          <div className="grid md:grid-cols-2 md:gap-8 print:grid-cols-2 print:gap-8">
            <section className="col-span-1 space-y-14">
                 <div className=" relative space-y-4 border-r-2 border-dashed print:space-y-2">
                    <legend className="my-4 px-4 py-2 print:py-0.5 7/bg-slate-100 border text-sm md:text-base print:text-sm text-[#153B50] font-semibold tracking-[0.2em]">ASPIRANT</legend>
                    <div className="p-2 absolute -top-8 md:-top-14 -right-2 bg-white rounded border md:border-2 h-20 w-20 md:h-28 md:w-28 print:w-20 print:h-20">
                      <Image className="object-contain" src={encodeURI(`${IMAGE_URL}/api/photos/?tag=${aspirant?.regno}`)} alt="" fill/>
                    </div>
                    <PrintPill label="Name" content={aspirant?.name} />
                    <PrintPill label="Position" content={title?.toUpperCase()} />
                    <PrintPill label="Hall of Affiliation" content={aspirant?.hallid} />
                    <PrintPill label="Department" content={aspirant?.unitname} />
                    <PrintPill label="Program of Study" content={aspirant?.descriptor} />
                    <PrintPill label="Registration Number" content={aspirant?.regno} />
                    <PrintPill label="Phone Number" content={aspirant?.cellphone} />
                    <PrintPill label="ASPIRANT CGPA" content={aspirant?.cgpa} />
                 </div>

                 {/* Guarantor #1 */}
                 <div className="relative space-y-4 border-r-2 border-dashed print:space-y-2">
                    <legend className="my-4 px-4 py-2 flex flex-col md:flex-row items-start md:items-center space-x-6 print:py-0.5 bg-slate-100 border text-sm md:text-base print:text-sm text-[#153B50] font-semibold tracking-[0.2em]">
                        <span>GUARANTOR #1</span>
                        { g1_verified ? <span className="py-0.5 px-3 border-2 border-green-700 rounded bg-white text-green-900 text-xs">VERIFIED</span>: null }
                    </legend>
                    <div className="p-2 absolute -top-8 md:-top-14 -right-2 bg-white rounded border md:border-2 h-20 w-20 md:h-28 md:w-28 print:w-20 print:h-20">
                      <Image className="object-contain" src={encodeURI(`${IMAGE_URL}/api/photos/?tag=${guarantor1?.regno}`)} alt="" fill/>
                    </div>
                    <PrintPill label="Name" content={guarantor1?.name} />
                    <PrintPill label="Hall of Affiliation" content={guarantor1?.hallid} />
                    <PrintPill label="Department" content={guarantor1?.unitname} />
                    <PrintPill label="Program of Study" content={guarantor1?.descriptor} />
                    <PrintPill label="Registration Number" content={guarantor1?.regno} />
                    <PrintPill label="Phone Number" content={guarantor1?.cellphone} />
                </div>
            </section>
            <section className="col-span-1 space-y-14">
               { has_mate && has_mate == '1' ?
                <div className=" relative space-y-4 border-r-2 border-dashed print:space-y-2">
                    <legend className="my-4 px-4 py-2 print:py-0.5 bg-slate-100 border text-sm md:text-base print:text-sm text-[#153B50] font-semibold tracking-[0.2em]">RUNNNING MATE</legend>
                    <div className="p-2 absolute -top-8 md:-top-14 -right-2 bg-white rounded border md:border-2 h-20 w-20 md:h-28 md:w-28 print:w-20 print:h-20">
                      <Image className="object-contain" src={encodeURI(`${IMAGE_URL}/api/photos/?tag=${mate?.regno}`)} alt="" fill/>
                    </div>
                    <PrintPill label="Name" content={mate?.name} />
                    <PrintPill label="Hall of Affiliation" content={mate?.hallid} />
                    <PrintPill label="Department" content={mate?.unitname} />
                    <PrintPill label="Program of Study" content={mate?.descriptor} />
                    <PrintPill label="Registration Number" content={mate?.regno} />
                    <PrintPill label="Phone Number" content={mate?.cellphone} />
                    <div className="flex flex-col space-y-1 -print:mt-10">
                      <label className="w-full font-serif text-lg tracking-wider">&nbsp;</label>
                      <span className="w-full rounded">&nbsp;</span>
                    </div>
                    
                </div> : null 
              }

                {/* Guarantor #2 */}
                <div className="relative space-y-4 border-r-2 border-dashed print:space-y-2">
                    <legend className="my-4 px-4 py-2 flex flex-col md:flex-row items-start md:items-center space-x-6 print:py-0.5 bg-slate-100 border text-sm md:text-base print:text-sm text-[#153B50] font-semibold tracking-[0.2em]">
                        <span>GUARANTOR #2</span>
                        { form_submit 
                          ? g2_verified 
                          ? <span className="py-0.5 px-3 border-2 border-green-700 rounded bg-white text-green-900 text-xs">VERIFIED</span>
                          : <span className="py-0.5 px-3 border-2 border-red-700 rounded bg-white text-red-900 text-xs">PENDING</span>
                          : null 
                        }
                    </legend><div className="p-2 absolute -top-8 md:-top-14 -right-2 bg-white rounded border md:border-2 h-20 w-20 md:h-28 md:w-28 print:w-20 print:h-20">
                      <Image className="object-contain" src={encodeURI(`${IMAGE_URL}/api/photos/?tag=${guarantor2?.regno}`)} alt="" fill/>
                    </div>
                    <PrintPill label="Name" content={guarantor2?.name} />
                    <PrintPill label="Hall of Affiliation" content={guarantor2?.hallid} />
                    <PrintPill label="Department" content={guarantor2?.unitname} />
                    <PrintPill label="Program of Study" content={guarantor2?.descriptor} />
                    <PrintPill label="Registration Number" content={guarantor2?.regno} />
                    <PrintPill label="Phone Number" content={guarantor2?.cellphone} />
                </div>
            </section>
            
          </div>
        </div>
    </main>
  )
}
