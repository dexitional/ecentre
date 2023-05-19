"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import Input from './Input';
import Select from './Select';
import Legend from './Legend';
import File from './File';
import PhotoBox from './PhotoBox';

export type Inputs = {
  aspirant_regno: string;
  aspirant_phone: string;
  mate_regno: string;
  mate_phone: string;
  guarantor1_regno: string;
  guarantor1_phone: string;
  guarantor2_regno: string;
  guarantor2_phone: string;
  teaser: string;
  photo: string;
  position: string;
  consent: string;
};

function NominationForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { NEXT_PUBLIC_IMAGE_URL : IMAGE_URL } = process.env
  const { aspirant_regno, mate_regno, guarantor1_regno, guarantor2_regno } = watch()
  console.log(IMAGE_URL)
  // const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  const onSubmit: SubmitHandler<Inputs> = async data => {
      try {
        const resp = await fetch('/api/nominee',{
           method: 'POST',
           body: JSON.stringify(data)
        })
        console.log(data)
      } catch(e){

      }
  }

  return (
    <>
    <form className="md:col-span-2 space-y-6 md:space-y-14 order-2 md:order-1"  onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
            <Legend label="ASPIRANT" />
            <Input  register={register} label="Registration Number of Aspirant" name="aspirant_regno" placeholder="Registration Number of Aspirant" />
            <Input  register={register} label="Phone Number of Aspirant" name="position" placeholder="Phone Number of Aspirant" />
            <Select register={register} label="Position Being Applied" name="position" placeholder="Choose Position" />
            {/* <Input register={register} label="Registration Number of Aspirant" name="aspirant_regno" placeholder="Registration Number of Aspirant" /> */}
        </div>
        <div className="space-y-4">
            <Legend label="RUNNING MATE <sub>( IF ANY )</sub>" />
            <Input register={register} label="Registration Number of Running-mate" name="mate_regno" placeholder="Registration Number of Running-mate" />
            <Input register={register} label="Phone Number of Running-mate" name="mate_phone" placeholder="Phone Number of Running-mate" />
        </div>
        <div className="space-y-4">
            <Legend label="GUARANTORS ( ENDORSEMENT )" />
            <Input register={register} label="Registration Number of First (1st) Guarantor" name="guarantor1_regno" placeholder="Registration Number of 1st Guarantor" />
            <Input register={register} label="Phone Number of First (1st) Guarantor" name="guarantor1_phone" placeholder="Phone Number of 1st Guarantor" />
            <Input register={register} label="Registration Number of Second (2nd) Guarantor" name="guarantor2_regno" placeholder="Registration Number of 2nd Guarantor" />
            <Input register={register} label="Phone Number of Second (2nd) Guarantor" name="guarantor2_phone" placeholder="Phone Number of 2nd Guarantor" />
        </div>
        <div className="space-y-4">
            <Legend label="ELECTION SETUP" />
            <Input register={register} label="Candidacy Teaser" name="teaser" placeholder="Teaser" />
            <File register={register} label="Candidacy Photo Upload" name="photo" />
            <hr/>
            <label id="agree-1" className="mt-10 flex flex-row space-y-0 space-x-4 md:space-x-8 md:items-center md:justify-center">
                <input {...register("consent")} id="agree-1" className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                <p className="w-full font-serif text-base tracking-wider">I agree that all information provided in this form is true and therefore held accountable and suffer disqualification if proven false.</p>
            </label>
            <hr/>
            <label id="agree-2" className="mt-10 flex flex-row space-y-0 space-x-4 md:space-x-8 md:items-center md:justify-center">
                <input {...register("consent")} id="agree-2" className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                <p className="w-full font-serif text-base tracking-wider">I hereby pledge to abide by all rules and regulations governing elections and students conduction on UCC campus during the electioneering and voting period, and that should I or any of my polling agents/supporters do contrary, I be disqualified from the elections.</p>
            </label>
            <hr/>
        </div>
        <div className="grid md:grid-cols-2 gap-2 md:gap-4">
            <button className="py-3 px-6 rounded font-semibold tracking-wider text-white bg-[#153B50]">SAVE & PRINT</button>
            <button className="py-3 px-6 rounded font-semibold tracking-wider text-white ring-1 ring-green-700 bg-green-700">SUBMIT APPLICATION</button>
        </div>
    </form>
    <section className="col-span-1 md:space-y-14 order-1 md:order-2">
        <div className="p-4 py-6 pb-10 flex-1 space-y-4 bg-gray-50 shadow-md shadow-gray-600/20 rounded-lg">
            <legend className="px-4 py-2 bg-slate-100 border text-[#153B50] text-center md:text-left font-semibold tracking-widest">ELECTORAL SETUP</legend>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                <PhotoBox label="CANDIDACY PHOTO" image={encodeURI(`${IMAGE_URL}/api/photos/?tag=${aspirant_regno || '15666'}`)} />
                <PhotoBox label="ASPIRANT" image={encodeURI(`${IMAGE_URL}/api/photos/?tag=${aspirant_regno || '90000'}`)} />
                <PhotoBox label="RUNNING MATE" image={encodeURI(`${IMAGE_URL}/api/photos/?tag=${mate_regno || '90000'}`)} />
                <PhotoBox label="GUARANTOR #1" image={encodeURI(`${IMAGE_URL}/api/photos/?tag=${guarantor1_regno || '90000'}`)} />
                <PhotoBox label="GUARANTOR #2" image={encodeURI(`${IMAGE_URL}/api/photos/?tag=${guarantor2_regno || '90000'}`)} />
            </div>
        </div>
    </section>
    </>

  )
}

export default NominationForm