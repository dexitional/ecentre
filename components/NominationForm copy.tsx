"use client"
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import Input from './Input';
import Select from './Select';
import Legend from './Legend';
import File from './File';
import PhotoBox from './PhotoBox';
import None from '../public/none.png'
import { useSession } from 'next-auth/react';
import uploadImage from '@/utils/uploadImage';
import Notiflix from 'notiflix'

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
  consent: string;
  //is_candidate, vetscore, vettotal, 
  
};

function NominationForm({ data: [ applicant , positions ] }: { data: any}) {

  const [ picture, setPicture ] = useState('')
  const { data:session }:any = useSession()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  //const { NEXT_PUBLIC_IMAGE_URL : IMAGE_URL } = process.env
  const IMAGE_URL = `https://ehub.ucc.edu.gh`
  
  // Activate Group or Category
  const groupId = session?.user?.groupId;
  let portfolios = positions.documents?.filter((row: any) => row.groupId.includes(groupId))
  portfolios = portfolios?.map((row:any) => ({ label: row.title, value: row.$id }))
  
  const { aspirant_regno, has_mate, mate_regno, guarantor1_regno, guarantor2_regno  } = watch()
  
  console.log(aspirant_regno,guarantor1_regno);

  const onSubmit: SubmitHandler<Inputs> = async data => {
      alert(JSON.stringify(data))
      try {
        // Upload to Storage

        // let file;
        // if(data.photo && data.photo[0]){
        //     // @ts-ignore
        //     const fileUploaded = await uploadImage(data.photo[0])
        //     console.log(fileUploaded)
        //     if(fileUploaded){
        //         file = {
        //             bucketId: fileUploaded.bucketId,
        //             fileId: fileUploaded.$id,
        //         }
        //     }
        // }

        // Add Extra data
        const formData: any = {...data }
        formData.serial = session.user.serial
        

        // Save to Database
        // const resp = await fetch('/api/nominee',{
        //    method: 'POST',
        //    body: JSON.stringify(formData)
        // })
        
        // const response = await resp.json()
        // if(response.success){
        //   Notiflix.Notify.success('APPLICATION SUBMITTED !');
        // } else {
        //   Notiflix.Notify.failure(response.msg.toUpperCase());
        // }

      } catch(e:any){
        Notiflix.Notify.failure(e.message);
      }
  }

  const onChangePicture = (e: any) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="space-y-4"> 
     {aspirant_regno}
     { errors ?
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
     }
    <div className="grid md:grid-cols-3 gap-8">
        <form className="md:col-span-2 space-y-6 md:space-y-14 order-2 md:order-1"  onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <Legend label="ASPIRANT" />
                <Input {...register("aspirant_regno", { required: true })} label="Registration Number of Aspirant" placeholder="Registration Number of Aspirant" />
                <Select {...register("positionId", { required: true })} label="Position Being Applied" placeholder="Choose Position" optionData={portfolios}/>
                <Select {...register("has_mate")} label="Add Running Mate ?" placeholder="Add Running Mate" optionData={[{ label:'YES', value:'1' },{ label:'NO', value:'0' }]} />
                
                {/* <Input register={register} label="Registration Number of Aspirant" name="aspirant_regno" placeholder="Registration Number of Aspirant" /> */}
            </div>
            { has_mate && has_mate == '1' ?
            <div className="space-y-4">
                <Legend label="RUNNING MATE" />
                <Input {...register("mate_regno", { required: true, maxLength: 15 })} label="Registration Number of Running-mate" placeholder="Registration Number of Running-mate" />
            </div> : null 
            }
            <div className="space-y-4">
                <Legend label="GUARANTORS (ENDORSEMENT)" />
                <Input {...register("guarantor1_regno", { required: true, maxLength: 15 })} label="Registration Number of First (1st) Guarantor" placeholder="Registration Number of 1st Guarantor" />
                <Input {...register("guarantor2_regno", { required: true, maxLength: 15 })} label="Registration Number of Second (2nd) Guarantor" placeholder="Registration Number of 2nd Guarantor" />
            </div>
            <div className="space-y-4">
                <Legend label="ADDITIONAL INFORMATION" />
                <Input {...register("teaser", { required: true, maxLength: 30 })} label="Candidacy Teaser" name="teaser" placeholder="Teaser" />
                <hr/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <File {...register("photo", { required: true })} label="Candidate Photo Upload" onChange={onChangePicture} />   
                    <File {...register("cv", { required: true })} label="Candidate Resume Upload" onChange={onChangePicture} />
                </div>
                <hr/>
                {/* <label id="agree-1" className="mt-10 flex flex-row space-y-0 space-x-4 md:space-x-8 md:items-center md:justify-center">
                    <input {...register("consent")} id="agree-1" className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                    <p className="w-full font-serif text-base tracking-wider">I agree that all information provided in this form is true and therefore held accountable and suffer disqualification if proven false.</p>
                </label>
                <hr/> */}
                <label id="agree-2" className="mt-10 flex flex-row space-y-0 space-x-4 md:space-x-8 md:items-center md:justify-center">
                    <input {...register("consent", { required: true })} id="agree-2" className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                    <p className="w-full font-serif text-base tracking-wider">I hereby pledge to abide by all rules and regulations governing elections and students conduction on UCC campus during the electioneering and voting period, and that should I or any of my polling agents/supporters do contrary, I be disqualified from the elections.</p>
                </label>
                <hr/>
            </div>
            <div className="grid md:grid-cols-1 gap-2 md:gap-4">
                <button className="py-3 px-6 rounded font-semibold tracking-wider text-white ring-1 ring-green-700 bg-green-700">SAVE APPLICATION</button>
                {/* <button className="py-3 px-6 rounded font-semibold tracking-wider text-white bg-[#153B50]">SAVE & PRINT</button> */}
                
            </div>
        </form>
        <section className="col-span-1 md:space-y-14 order-1 md:order-2">
            <div className="p-4 py-6 pb-10 flex-1 space-y-4 bg-gray-50 shadow-md shadow-gray-600/20 rounded-lg">
                <legend className="px-4 py-2 bg-slate-100 border text-[#153B50] text-center md:text-left font-semibold tracking-widest">ELECTORAL SETUP</legend>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    <PhotoBox label="CANDIDACY PHOTO" image={ picture ? picture : None } />
                    <PhotoBox label="ASPIRANT" image={aspirant_regno ? encodeURI(`${IMAGE_URL}/api/photos/?tag=${aspirant_regno}`) : None } />
                    { has_mate && has_mate == '1' ? <PhotoBox label="RUNNING MATE" image={mate_regno ? encodeURI(`${IMAGE_URL}/api/photos/?tag=${mate_regno}`) : None } /> : null }
                    <PhotoBox label="GUARANTOR #1" image={guarantor1_regno ? encodeURI(`${IMAGE_URL}/api/photos/?tag=${guarantor1_regno}`) : None } />
                    <PhotoBox label="GUARANTOR #2" image={guarantor2_regno ? encodeURI(`${IMAGE_URL}/api/photos/?tag=${guarantor2_regno}`) : None } />
                </div>
            </div>
        </section>
    </div>
            
   
   
    </div>

  )
}

export default NominationForm