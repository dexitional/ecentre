import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";


type Props = { 
    label: string;
    placeholder: string;
    defaultValue?: string;
    optionData?: any;
}

function Select(props: Props) {
  //const { register } = useForm();
  
  return (
    <div>
      <label className="w-full font-serif text-base mxd:text-lg tracking-wider">{props.label}</label>
      <select {...props} className="w-full rounded">
        <option>-- {props.placeholder} --</option>
        { props.optionData?.map( (row:any) => <option key={row.label} value={row?.value}>{row?.label}</option> ) }
      </select>
    </div>
  )
}

export default Select