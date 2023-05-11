"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
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
  // const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  const onSubmit = (data:any) => {
    console.log(data)
  }

  return (
    <form className="col-span-2 space-y-14"  onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
            <legend className="px-4 py-2 bg-slate-100 border text-[#153B50] font-semibold tracking-widest">ASPIRANT</legend>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider">Registration Number of Aspirant</label>
            <input {...register("aspirant_regno")} className="w-full rounded" type="text" placeholder="Registration Number of Aspirant"/>
            </div>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider ">Phone Number of Aspirant</label>
            <input {...register("aspirant_phone")} className="w-full rounded" type="text" placeholder="Phone Number of Aspirant"/>
            </div>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider ">Position Being Applied</label>
            <select {...register("position")} className="w-full rounded">
                <option>-- Choose Position --</option>
                <option value="adehye-president">ADEHYE | PRESIDENT</option>
                <option value="adehye-president">ADEHYE | SECRETARY</option>
            </select>
            </div>
        </div>
        <div className="space-y-4">
            <legend className="px-4 py-2 bg-slate-100 border text-[#153B50] font-semibold tracking-widest">RUNNING MATE <sub>( IF ANY )</sub></legend>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider">Registration Number of Running-mate</label>
            <input {...register("mate_regno")} className="w-full rounded" type="text" placeholder="Registration Number of Running-mate"/>
            </div>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider ">Phone Number of Running-mate</label>
            <input {...register("mate_phone")} className="w-full rounded" type="text" placeholder="Phone Number of Running-mate"/>
            </div>
        </div>
        <div className="space-y-4">
            <legend className="px-4 py-2 bg-slate-100 border text-[#153B50] font-semibold tracking-widest">GUARANTORS ( ENDORSEMENT )</legend>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider">Registration Number of First (1st) Guarantor</label>
            <input {...register("guarantor1_regno")} className="w-full rounded" type="text" placeholder="Registration Number of 1st Guarantor"/>
            </div>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider ">Phone Number of First (1st) Guarantor</label>
            <input {...register("guarantor1_phone")} className="w-full rounded" type="text" placeholder="Phone Number of 1st Guarantor"/>
            </div>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider ">Registration Number of Second (2nd) Guarantor</label>
            <input {...register("guarantor2_regno")} className="w-full rounded" type="text" placeholder="Registration Number of 2nd Guarantor"/>
            </div>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider ">Phone Number of Second (2nd) Guarantor</label>
            <input {...register("guarantor2_phone")} className="w-full rounded" type="text" placeholder="Phone Number of 2nd Guarantor"/>
            </div>
        </div>
        <div className="space-y-4">
            <legend className="px-4 py-2 bg-slate-100 border text-[#153B50] font-semibold tracking-widest">ELECTION SETUP</legend>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider">Candidacy Teaser</label>
            <input {...register("teaser")} className="w-full rounded" type="text" placeholder="Teaser"/>
            </div>
            <div className="flex flex-col space-y-2">
            <label className="w-full font-serif text-lg tracking-wider">Candidacy Photo Upload</label>
            <input {...register("photo")} className="w-full file:bg-[#153B50] file:text-white file:border-0 file:px-3 file:py-1 file:rounded-full focus:ring-0" type="file"/>
            </div>
            <hr/>
            <div className="mt-10 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 md:items-center md:justify-center">
                <input {...register("consent")} className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                <p className="w-full font-serif text-base tracking-wider">I agree that all information provided in this form is true and therefore held accountable to any blame of suffer disqualification </p>
            </div>
            <hr/>
            <div className="mt-10 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 md:items-center md:justify-center">
                <input {...register("consent")} className="w-6 h-6 checked:bg-[#153B50] checked:hover:bg-[#153B50] focus:ring-0 focus:outline-none" type="checkbox"/>
                <p className="w-full font-serif text-base tracking-wider">I agree that all information provided in this form is true and therefore held accountable to any blame of suffer disqualification </p>
            </div>
            <hr/>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <button className="py-3 px-6 rounded font-semibold tracking-wider text-white bg-[#153B50]">SAVE & PRINT</button>
            <button className="py-3 px-6 rounded font-semibold tracking-wider text-white bg-[#153B50]">SUBMIT APPLICATION</button>
        </div>
    </form>

  )
}

export default NominationForm