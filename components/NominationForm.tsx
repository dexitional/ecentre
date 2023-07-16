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
import { BiLoaderCircle } from 'react-icons/bi';

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
  consent: boolean | undefined;
  $id: string;
  //is_candidate, vetscore, vettotal, 
  
};

function NominationForm({ data: [ applicant , positions ] }: { data: any}) {

  const formRef = useRef<any>(null)
  const router = useRouter()
  const { data:session }: any = useSession()
  const newData = applicant?.documents[0];
  const [ picture, setPicture ] = useState(newData?.photo)
  const [ cv, setCV ] = useState(newData?.cv)
  const [ loading, setLoading ] = useState(false)
  const [ isPhotoLoading, setIsPhotoLoading ] = useState(false)
  const [ isCvLoading, setIsCvLoading ] = useState(false)
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
    consent: newData?.consent ? true : undefined,
    form_submit: newData?.form_submit || false,
    serial: newData?.serial || session?.user?.serial,
    groupId: newData?.groupId || session?.user?.groupId,
    aspirant_regno: newData?.aspirant_regno || '',
    $id: newData?.$id || '',
  })

  //const { NEXT_PUBLIC_IMAGE_URL : IMAGE_URL } = process.env
  const IMAGE_URL = `https://ehub.ucc.edu.gh`
 
  // Activate Group or Category
  const groupId = session?.user?.groupId;
  const serial = session?.user?.serial;

  let portfolios = positions.documents?.filter((row: any) => row.groupId.includes(groupId))
  portfolios = portfolios?.map((row:any) => ({ label: row.title, value: row.$id }))
  


  const onChange = async (e:any) => {
     if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
       return;
     } else if(e.target.name == 'photo'){
        if(['image/jpeg','image/png','image/gif','image/svg','image/avif'].includes(e.target?.files[0]?.type)){
          setIsPhotoLoading(true)
          setPicture(URL.createObjectURL(e.target.files[0]));
          const photo = await uploadPicture(e.target.files[0], serial)
          if(photo){
            setIsPhotoLoading(false)
            setPhotoUrl(photo)
            setForm({ ...form, [e.target.name] : e.target.files[0] })
          } 
        } else {
          alert("Please choose an image with a picture format! \n Allowed formats are 'JPG','PNG','GIF','AVIF,'SVG'")
        }
     } else if(e.target.name == 'cv'){
        if(['application/pdf'].includes(e.target?.files[0]?.type)){
          setIsCvLoading(true)
          setCV(URL.createObjectURL(e.target.files[0]));
          const cv = await uploadCv(e.target.files[0], serial)
          if(cv){
            setIsCvLoading(false)
            setCvUrl(cv)
            setForm({ ...form, [e.target.name] : e.target.files[0] })
          } 
        } else {
          alert("Please choose a PDF document!")
        }
     } else if(e.target.name == 'consent') 
       setForm({ ...form, [e.target.name] : !form.consent })
     else 
       setForm({ ...form, [e.target.name] : e.target.value })
  }

  const saveForm = (e: any) => {
     setForm({ ...form, 'form_submit': false })
  } 

  const submitForm = (e: any) => {
     setForm({ ...form, 'form_submit': true })
  } 

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const ok = window.confirm("DO YOU WANT TO COMMIT CHANGES AND PROCEED ?")
      if(!ok) return
      try {
        setLoading(true)
        // Validations
        if(!form.aspirant_regno) throw new Error("Please Aspirant Registration Number!")
        if(!form.positionId) throw new Error("Please Choose Position!")
        if(!form.teaser) throw new Error("Please Provide Teaser!")
        if(!form.guarantor1_regno) throw new Error("Please First Guarantor!")
        if(!form.guarantor2_regno) throw new Error("Please Second Guarantor!")
        if(!picture && form.form_submit) throw new Error("Please Upload Candidate Photo or Flyer!")
        if(!cv && form.form_submit) throw new Error("Please Upload Candidate CV!")
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
        
        // Add Extra data
        const newForm: any = { 
          ...form,
          ...(session?.user?.serial && { serial: session?.user?.serial}),
          ...(session?.user?.groupId && { groupId: session?.user?.groupId}),
          ...(photoUrl && { photo: photoUrl }),
          ...(cvUrl && { cv: cvUrl })
        }
        
        const formData = objectToFormData(newForm);
        
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
           setLoading(false)
           Notiflix.Notify.success('APPLICATION SUBMITTED !');
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
   
     { !picture || !cv ?
     <div className="p-2 md:px-6 md:py-2 rounded shadow shadow-red-300/60 bg-red-50/80 space-y-4">
        <div className="text-sm md:text-inherit space-y-3">
          { !picture ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Upload Candidate Photo Before Final Submission</p> : null }
          { !cv ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Upload Candidate CV Before Final Submission</p> : null }
          {/* { errors.positionId ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Choose a Portfolio</p> : null }
          { errors.guarantor1_regno ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Provide First (1st) Guarantor</p> : null }
          { errors.guarantor2_regno ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Provide First (2nd) Guarantor</p> : null }
          { errors.teaser ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Provide Candidate Teaser</p> : null }
          { errors.consent ? <p className="italic text-xs md:text-inherit font-semibold text-red-950">** Please Agree to the Terms & Conditions</p> : null } */}
        </div>
     </div> : null }
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
                <Input name="guarantor1_regno" defaultValue={form.guarantor1_regno} onChange={onChange} required readOnly={form.g1_verified} label="Registration Number of First (1st) Guarantor" placeholder="Registration Number of 1st Guarantor" />
                <Input name="guarantor2_regno" defaultValue={form.guarantor2_regno} onChange={onChange} required readOnly={form.g2_verified} label="Registration Number of Second (2nd) Guarantor" placeholder="Registration Number of 2nd Guarantor" />
            </div>
            <div className="space-y-4">
                <Legend label="ADDITIONAL INFORMATION" />
                <Input name="teaser" defaultValue={form.teaser} onChange={onChange} required label="Candidacy Teaser" placeholder="Teaser" />
                <hr/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {   picture && !photoUrl && !isPhotoLoading
                    ?  <PhotoCard src={picture} label="Candidate Photo" onClick={() => { setPicture(null); setPhotoUrl(''); }} />
                    :  picture && !photoUrl && isPhotoLoading
                    ?   <div className="z-20 w-full h-full flex items-center space-x-4 justify-center rounded-lg bg-white bg-opacity-80 backdrop-blur-sm">
                            <BiLoaderCircle className="text-[#153B50] rounded-full h-6 w-6 animate-spin"/>
                            <span className="text-[#153B50] text-sm tracking-widest font-poppins font-bold animate-pulse">UPLOADING PHOTO ...</span>
                        </div> 
                    :  picture && photoUrl && !isPhotoLoading 
                    ?  <PhotoCard src={picture} label="Candidate Photo" onClick={() => { setPicture(null); setPhotoUrl(''); }} />
                    :  <File name="photo" label="Candidate Photo Upload" onChange={onChange} />
                   }

                   {   cv && !cvUrl && !isCvLoading
                    ?  <PdfCard src={picture} label="Curriculum Vitae (CV)" onClick={() => { setCV(null); setCvUrl(''); }} />
                    :  cv && !cvUrl && isCvLoading
                    ?   <div className="z-20 w-full h-full flex items-center space-x-4 justify-center rounded-lg bg-white bg-opacity-80 backdrop-blur-sm">
                            <BiLoaderCircle className="text-[#153B50] rounded-full h-6 w-6 animate-spin"/>
                            <span className="text-[#153B50] text-sm tracking-widest font-poppins font-bold animate-pulse">UPLOADING CV ...</span>
                        </div> 
                    :  cv && cvUrl && !isCvLoading 
                    ?  <PdfCard src={cv} label="Curriculum Vitae (CV)" onClick={() => { setCV(null); setCvUrl(''); }} />
                    :  <File name="cv" label="Candidate CV Upload" onChange={onChange} />
                   }


                </div>
                <hr/>
                {/* <label id="agree-1" className="mt-10 flex flex-row space-y-0 space-x-4 md:space-x-8 md:items-center md:justify-center">
                    <input {...register("consent")} id="agree-1" className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                    <p className="w-full font-serif text-base tracking-wider">I agree that all information provided in this form is true and therefore held accountable and suffer disqualification if proven false.</p>
                </label>
                <hr/> */}
                <label htmlFor="agree-2" className="mt-10 flex flex-row space-y-0 space-x-4 md:space-x-8 md:items-center md:justify-center">
                    <input name="consent" checked={undefined} onChange={onChange} id="agree-2" className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                    <p className="w-full font-serif text-base tracking-wider">I hereby pledge to abide by all rules and regulations governing elections and students conduction on UCC campus during the electioneering and voting period, and that should I or any of my polling agents/supporters do contrary, I be disqualified from the elections.</p>
                </label>
                <hr/>
            </div>
            <div className="relative p-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                { loading ?
                  <div className="z-20 absolute w-full h-full flex items-center space-x-4 justify-center rounded-lg bg-white bg-opacity-80 backdrop-blur-sm">
                      <BiLoaderCircle className="text-[#153B50] rounded-full h-8 w-8 animate-spin"/>
                      <span className="text-[#153B50] text-lg tracking-widest font-poppins font-bold animate-pulse">PROCESSING ...</span>
                  </div> : null
                }
                  <button type="submit" disabled={!form?.consent } onClick={saveForm} className="z-10 py-3 px-6 rounded font-semibold tracking-wider text-white bg-[#153B50] disabled:bg-[#153B50]/20">SAVE & EXIT</button>
                  <button type="submit" disabled={!form?.consent || !picture || !cv } onClick={submitForm} className="z-10 py-3 px-6 rounded font-semibold tracking-wider text-white ring-1 ring-green-700 bg-green-700 disabled:bg-green-700/20 disabled:ring-green-700/20">SUBMIT NOMINATION</button>
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