import React from 'react'
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { Inputs } from './NominationForm';


type Props = {
    label: string;
    onChange?: (e: any) => void
 }

function File(props: Props) {
 // const { register } = useForm();
  return (
    <div className="flex flex-col space-y-2">
        <label className="w-full font-serif text-lg tracking-wider">{props.label}</label>
        <input {...props} onChange={props.onChange} className="w-full file:bg-[#153B50] file:text-white file:border-0 file:px-3 file:py-1 file:rounded-full focus:ring-0" type="file"/>
    </div>

  )
}

export default File