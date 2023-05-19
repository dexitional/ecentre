import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";


type Props = { 
    label: string;
    name: string;
    placeholder: string;
    defaultValue?: string;
    optionData?: any;
    register: any;  
}

function Select({ label, name, register, placeholder, defaultValue, optionData }: Props) {
  //const { register } = useForm();
  
  return (
    <div>
      <label className="w-full font-serif text-base mxd:text-lg tracking-wider">{label}</label>
      <select {...register(name)}  defaultValue={defaultValue} className="w-full rounded">
        <option>-- {placeholder} --</option>
        { optionData?.map( (row:any) => <option key={row} value={row?.value}>{row?.label}</option> ) }
      </select>
    </div>
  )
}

export default Select