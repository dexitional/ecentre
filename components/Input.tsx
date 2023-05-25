import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";


type Props = { 
    label: string;
    name: string;
    placeholder: string;
    msg?: string;
    defaultValue?: string;
    register: any;
}

function Input({ label, name, register, msg, placeholder, defaultValue }: Props) {
  //const { register } = useForm();
  
  return (
    <div>
        <label className="w-full font-serif text-base md:text-lg tracking-wider">{label}</label>
        { msg 
        ? <input {...register(name, { required: msg })} defaultValue={defaultValue} className="w-full rounded" type="text" placeholder={placeholder} />
        : <input {...register(name)} defaultValue={defaultValue} className="w-full rounded" type="text" placeholder={placeholder} />
        }
    </div>
  )
}

export default Input