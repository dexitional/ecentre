"use client"
import React, { useRef, useState } from 'react'
import Input from './Input';
import Legend from './Legend';
import { useSession } from 'next-auth/react';
import Notiflix from 'notiflix'
import { useRouter } from 'next/navigation';
import { objectToFormData } from '@/utils/objectToFormData';
import { uploadCv, uploadPicture } from '@/firabase';
import { BiLoaderCircle } from 'react-icons/bi';
import Image from 'next/image';
import None from '@/public/none.png'

function VettingForm({ applicants, positions }: any ) {

  const getDefaultData = () => {
    let dm:any = {};
    for(let i = 0; i < applicants.length; i++){
      const row = applicants[i];
      dm[`ballot_no_${i}`] = row.ballot_no;
      dm[`vetscore_${i}`] = row.vetscore;
      dm[`is_candidate_${i}`] = row.is_candidate; 
    }
    return dm;
  }
  
  const formRef = useRef<any>(null)
  const router = useRouter()
  const { data:session }: any = useSession()
  const [ form, setForm ] = useState<any>(getDefaultData())
  const [ loading, setLoading ] = useState(false)
  
  console.log(applicants)
  console.log(form)

  const getPosition = (positionId: string) => {
     return positions.find((r:any) => r.$id == positionId)?.title
  }

  const onChange = async (e:any) => {
     if (!e || !e.target) {
       return;
     }else if (e.target.type == 'checkbox') {
       setForm({ ...form, [e.target.name] : !form[e.target.name] })
     } else 
       setForm({ ...form, [e.target.name] : e.target.value })
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      
      const ok = window.confirm("DO YOU WANT TO COMMIT CHANGES AND PROCEED ?")
      if(!ok) return
      try {
        setLoading(true)
        const idx:any = {};
        for(let i = 0; i < applicants.length; i++){
            idx[`id_${i}`] = applicants[i].$id
        }
        const newForm: any = { 
          ...form,
          ...idx,
          count: applicants?.length
        }
        alert(JSON.stringify(newForm))
        const formData = objectToFormData(newForm);
        
        // Save to Database
        const resp = await fetch('/api/vetting',{
          method: 'POST',
          body: formData
        })
        
        const response = await resp.json()
        if(response.success){
           router.push(`/nominees`)
           setLoading(false)
           Notiflix.Notify.success('VETCARD SAVED !');
        } else {
          setLoading(false)
           Notiflix.Notify.failure(response?.msg?.toUpperCase());
        }

      } catch(e:any){
          console.log(e)
          setLoading(false)
          Notiflix.Notify.failure(e.message?.toUpperCase());
      }
  }


  return (
    <div className="space-y-4"> 
     {/* <div className="p-2 md:px-6 md:py-2 rounded shadow shadow-red-300/60 bg-red-50/80 space-y-4">
        <div className="text-sm md:text-inherit space-y-3">
          { errors.positionId ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Choose a Portfolio</p> : null }
        </div>
     </div>  */}
    <div className="px-2">
        <form ref={formRef} className="md:col-span-2 space-y-4 md:space-y-4 order-2 md:order-1"  onSubmit={onSubmit}>
           { applicants?.map((row: any,i: React.Key) => (
            <div className="p-2 grid grid-cols-1 md:grid-cols-7 gap-2 place-items-center rounded shadow-lg shadow-blue-100/50 bg-blue-50/50 ">
                <div className="md:col-span-2 flex item-center space-x-2">
                  <div className='relative h-10 w-10'>
                    <Image src={`https://ehub.ucc.edu.gh/api/photos/?tag=${row?.aspirant_regno}` || None} className='object-contain' alt="" fill/>
                  </div>
                  <Legend label={row?.aspirant_regno} />
                </div>
                <div className="md:col-span-2 text-xs"><Legend label={getPosition(row?.positionId)?.toUpperCase()} /></div>
                <div className="col-span-1"><Input name={`vetscore_${i}`} defaultValue={form[`vetscore_${i}`]} onChange={onChange}  label="" placeholder="Score (%)" /></div>
                <div className="col-span-1"><Input name={`ballot_no_${i}`} defaultValue={form[`ballot_no_${i}`]} onChange={onChange}  label="" placeholder="Ballot #" /></div>
                <div className="col-span-1 place-self-center">
                  <label id={`passed_${i}`} className="flex flex-row space-y-0 space-x-2 md:items-center md:justify-center">
                      <input name={`is_candidate_${i}`} checked={form[`is_candidate_${i}`]} onChange={onChange} id={`passed_${i}`} className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                      <p className="w-full font-serif text-base tracking-wider">Passed</p>
                  </label>
                </div>
             </div>
            ))}
             

             
            <div className="relative p-2 grid grid-cols-1">
                { loading ?
                  <div className="z-20 absolute w-full h-full flex items-center space-x-4 justify-center rounded-lg bg-white bg-opacity-80 backdrop-blur-sm">
                      <BiLoaderCircle className="text-[#153B50] rounded-full h-8 w-8 animate-spin"/>
                      <span className="text-[#153B50] text-lg tracking-widest font-poppins font-bold animate-pulse">PROCESSING ...</span>
                  </div> : null
                }
                  <button type="submit"  className="z-10 py-3 px-6 rounded font-semibold tracking-wider text-white bg-[#153B50] disabled:bg-[#153B50]/20">SAVE & EXIT</button>
                  {/* <button type="submit"  onClick={submitForm} className="z-10 py-3 px-6 rounded font-semibold tracking-wider text-white ring-1 ring-green-700 bg-green-700 disabled:bg-green-700/20 disabled:ring-green-700/20">SUBMIT SCORES</button> */}
                </div>
        </form>
       
    </div>
            
   
   
    </div>

  )
}

export default VettingForm