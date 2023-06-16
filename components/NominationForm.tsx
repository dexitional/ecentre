"use client"
import React, { useRef, useState } from 'react'
import Input from './Input';
import Select from './Select';
import Legend from './Legend';
import File from './File';
import PhotoBox from './PhotoBox';
import None from '../public/none.png'
import { useSession } from 'next-auth/react';
import uploadImage from '@/utils/uploadImage';
import Notiflix from 'notiflix'
import { useRouter } from 'next/navigation';
import { objectToFormData } from '@/utils/objectToFormData';
import { uploadCv, uploadPicture } from '@/firabase';
import Image from 'next/image';
import { CgClose, CgCloseO } from 'react-icons/cg';
import PhotoCard from './PhotoCard';
import PdfCard from './PdfCard';

export type Inputs = {
  aspirant_regno: string;
  positionId: string;
  mate_regno: string;
  has_mate: string;
  guarantor1_regno: string;
  guarantor2_regno: string;
  teaser: string;
  photo: string;
  cv: string;
  position: string;
  consent: boolean;
  //is_candidate, vetscore, vettotal, 
  
};

function NominationForm({ data: [ applicant , positions ] }: { data: any}) {

  const formRef = useRef<any>(null)
  const router = useRouter()
  const { data:session }: any = useSession()
  const newData = applicant?.documents[0];
  const [ picture, setPicture ] = useState(newData?.photo)
  const [ cv, setCV ] = useState(newData?.photo)
  const [ photoUrl, setPhotoUrl ] = useState('')
  const [ cvUrl, setCvUrl ] = useState('')
  const [ form, setForm ] = useState<Inputs | any>({
    photo: newData?.photo || '',
    cv: newData?.cv || '',
    positionId: newData?.positionId || null,
    has_mate: newData?.has_mate || '0',
    mate_regno: newData?.mate_regno || '',
    guarantor1_regno: newData?.guarantor1_regno || '',
    guarantor2_regno: newData?.guarantor2_regno || '',
    g1_verified: newData?.g1_verified || false,
    g2_verified: newData?.g2_verified || false,
    teaser: newData?.teaser || '',
    consent: newData?.consent || false,
    form_submit: newData?.form_submit || false,
    serial: newData?.serial || session?.user?.serial,
    groupId: newData?.groupId || session?.user?.groupId,
    aspirant_regno: newData?.aspirant_regno || '',
  })

  //const { NEXT_PUBLIC_IMAGE_URL : IMAGE_URL } = process.env
  const IMAGE_URL = `https://ehub.ucc.edu.gh`
 
  // Activate Group or Category
  const groupId = session?.user?.groupId;
  const serial = session?.user?.serial;

  let portfolios = positions.documents?.filter((row: any) => row.groupId.includes(groupId))
  portfolios = portfolios?.map((row:any) => ({ label: row.title, value: row.$id }))
  


  const onChange = async (e:any) => {
     if(e.target.name == 'photo'){
        setPicture(URL.createObjectURL(e.target.files[0]));
        const photo = await uploadPicture(e.target.files[0], serial)
        setPhotoUrl(photo)
        console.log(photoUrl)
     }

     if(e.target.name == 'cv'){
        setCV(URL.createObjectURL(e.target.files[0]));
        const cv = await uploadCv(e.target.files[0], serial)
        setCvUrl(cv)
        console.log(cvUrl)
     }

     if(['photo','cv'].includes(e.target.name)) 
       setForm({ ...form, [e.target.name] : e.target.files[0] })
     else if(e.target.name == 'consent') 
       setForm({ ...form, [e.target.name] : !form.consent })
     else 
       setForm({ ...form, [e.target.name] : e.target.value })
  }

  const saveForm = (e: any) => {
     //e.preventDefault()
     setForm({ ...form, 'form_submit': false })
  } 

  const submitForm = (e: any) => {
    //e.preventDefault()
    setForm({ ...form, 'form_submit': true })
  } 

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const ok = window.confirm("DO YOU WANT COMMIT CHANGES AND PROCEED ?")
      if(!ok) return
      try {
        
        // Validations
        if(!form.aspirant_regno) throw new Error("Please Aspirant Registration Number!")
        if(!form.positionId) throw new Error("Please Choose Position!")
        if(!form.teaser) throw new Error("Please Provide Teaser!")
        if(!form.guarantor1_regno) throw new Error("Please First Guarantor!")
        if(!form.guarantor2_regno) throw new Error("Please Second Guarantor!")

        // Upload to Storage
        // var photo,cv
        // if(form?.photo){
        //   photo = await uploadPicture(form?.photo, form?.serial)
        //   console.log(photo)
        // }

        // if(form?.cv){
        //   cv = await uploadCv(form?.cv, form?.serial)
        //   console.log(cv)
        // }

        // TODO: Work on pagination
        // TODO: Medical school check (sm/sms, sm/gem)
        // TODO: 

        // Add Extra data
        const newForm: any = { 
          ...form,
          ...(session?.user?.serial && { serial: session?.user?.serial}),
          ...(session?.user?.groupId && { groupId: session?.user?.groupId}),
          ...(photoUrl && { photo: photoUrl }),
          ...(cvUrl && { cv: cvUrl })
        }

        console.log("NEWFORM: ", newForm)

        const formData = objectToFormData(newForm);
        console.log(formData)
        
        // Save to Database
        const resp = await fetch('/api/nominee',{
          method: 'POST',
          body: formData
        })
        
        const response = await resp.json()
        if(response.success){
           if(form.form_status){
             router.push(`/user/${form.serial}/printout`)
           } else {
             router.push('/')
           }
           Notiflix.Notify.success('APPLICATION SUBMITTED !');
        } else {
           Notiflix.Notify.failure(response?.msg?.toUpperCase());
        }

      } catch(e:any){
          console.log(e)
          Notiflix.Notify.failure(e.message?.toUpperCase());
      }
  }


  return (
    <div className="space-y-4"> 
     {/* { errors ?
        <div className="p-2 md:px-6 md:py-2 rounded shadow shadow-red-300/60 bg-red-50/80 space-y-4">
            <div className="text-sm md:text-inherit space-y-3">
              { errors.aspirant_regno ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Provide Aspirant Registration Number</p> : null }
              { errors.positionId ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Choose a Portfolio</p> : null }
              { errors.guarantor1_regno ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Provide First (1st) Guarantor</p> : null }
              { errors.guarantor2_regno ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Provide First (2nd) Guarantor</p> : null }
              { errors.teaser ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Provide Candidate Teaser</p> : null }
              { errors.consent ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Agree to the Terms & Conditions</p> : null }
            </div>
        </div> : null
     } */}
    <div className="grid md:grid-cols-3 gap-8">
        <form ref={formRef} className="md:col-span-2 space-y-6 md:space-y-14 order-2 md:order-1"  onSubmit={onSubmit}>
            <div className="space-y-4">
                <Legend label="ASPIRANT" />
                <Input name="aspirant_regno" defaultValue={form.aspirant_regno} onChange={onChange} required label="Registration Number of Aspirant" placeholder="Registration Number of Aspirant" />
                <Select name="positionId" defaultValue={form.positionId} value={form.positionId} onChange={onChange} required label="Position Being Applied" placeholder="Choose Position" optionData={portfolios}/>
                <Select name="has_mate" defaultValue={form.has_mate} onChange={onChange} label="Add Running Mate ?" placeholder="Add Running Mate" optionData={[{ label:'YES', value:'1' },{ label:'NO', value:'0' }]} />
                
                {/* <Input register={register} label="Registration Number of Aspirant" name="aspirant_regno" placeholder="Registration Number of Aspirant" /> */}
            </div>
            { form?.has_mate && form?.has_mate == '1' ?
            <div className="space-y-4">
                <Legend label="RUNNING MATE" />
                <Input name="mate_regno" defaultValue={form.mate_regno} onChange={onChange} required  label="Registration Number of Running-mate" placeholder="Registration Number of Running-mate" />
            </div> : null 
            }
            <div className="space-y-4">
                <Legend label="GUARANTORS (ENDORSEMENT)" />
                <Input name="guarantor1_regno" defaultValue={form.guarantor1_regno} onChange={onChange} required label="Registration Number of First (1st) Guarantor" placeholder="Registration Number of 1st Guarantor" />
                <Input name="guarantor2_regno" defaultValue={form.guarantor2_regno} onChange={onChange} required label="Registration Number of Second (2nd) Guarantor" placeholder="Registration Number of 2nd Guarantor" />
            </div>
            <div className="space-y-4">
                <Legend label="ADDITIONAL INFORMATION" />
                <Input name="teaser" defaultValue={form.teaser} onChange={onChange} required label="Candidacy Teaser" placeholder="Teaser" />
                <hr/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   { picture
                    ? <PhotoCard src={picture} label="Candidate Photo" onClick={() => setPicture(null)} />
                    : <File name="photo" label="Candidate Photo Upload" onChange={onChange} />
                   }

                   { cv
                    ? <PdfCard src={picture} label="Curriculum Vitae (CV)" onClick={() => setCV(null)} />
                    : <File name="cv" label="Candidate Resume Upload" onChange={onChange} />
                   }
                </div>
                <hr/>
                {/* <label id="agree-1" className="mt-10 flex flex-row space-y-0 space-x-4 md:space-x-8 md:items-center md:justify-center">
                    <input {...register("consent")} id="agree-1" className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                    <p className="w-full font-serif text-base tracking-wider">I agree that all information provided in this form is true and therefore held accountable and suffer disqualification if proven false.</p>
                </label>
                <hr/> */}
                <label id="agree-2" className="mt-10 flex flex-row space-y-0 space-x-4 md:space-x-8 md:items-center md:justify-center">
                    <input name="consent" checked={form.consent} onChange={onChange} id="agree-2" className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                    <p className="w-full font-serif text-base tracking-wider">I hereby pledge to abide by all rules and regulations governing elections and students conduction on UCC campus during the electioneering and voting period, and that should I or any of my polling agents/supporters do contrary, I be disqualified from the elections.</p>
                </label>
                <hr/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <button type="submit" disabled={!form?.consent} onClick={saveForm} className="py-3 px-6 rounded font-semibold tracking-wider text-white bg-[#153B50] disabled:bg-[#153B50]/20">SAVE & EXIT</button>
                <button type="submit" disabled={!form?.consent} onClick={submitForm} className="py-3 px-6 rounded font-semibold tracking-wider text-white ring-1 ring-green-700 bg-green-700 disabled:bg-green-700/20 disabled:ring-green-700/20">SUBMIT NOMINATION</button>
            </div>
        </form>
        <section className="col-span-1 md:space-y-14 order-1 md:order-2">
            <div className="p-4 py-6 pb-10 flex-1 space-y-4 bg-gray-50 shadow-md shadow-gray-600/20 rounded-lg">
                <legend className="px-4 py-2 bg-slate-100 border text-[#153B50] text-center md:text-left font-semibold tracking-widest">ELECTORAL SETUP</legend>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    <PhotoBox label="CANDIDACY PHOTO" image={ picture ? picture : None } />
                    <PhotoBox label="ASPIRANT" image={form?.aspirant_regno ? encodeURI(`${IMAGE_URL}/api/photos/?tag=${form?.aspirant_regno}`) : None } />
                    { form?.has_mate && form?.has_mate == '1' ? <PhotoBox label="RUNNING MATE" image={form?.mate_regno ? encodeURI(`${IMAGE_URL}/api/photos/?tag=${form?.mate_regno}`) : None } /> : null }
                    <PhotoBox label="GUARANTOR #1" image={form?.guarantor1_regno ? encodeURI(`${IMAGE_URL}/api/photos/?tag=${form?.guarantor1_regno}`) : None } verified={form?.g1_verified} submitted={form?.form_submit} />
                    <PhotoBox label="GUARANTOR #2" image={form?.guarantor2_regno ? encodeURI(`${IMAGE_URL}/api/photos/?tag=${form?.guarantor2_regno}`) : None } verified={form?.g2_verified} submitted={form?.form_submit}/>
                </div>
            </div>
        </section>
    </div>
            
   
   
    </div>

  )
}

export default NominationForm