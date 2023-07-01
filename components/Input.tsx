import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";


type Props = { 
    label: string;
    name: string;
    placeholder?: string;
    msg?: string;
    defaultValue?: string;
    required?: any;
    readOnly?: any;
    onChange?: any;
}

function Input(props: Props) { //{ label, name, errors,msg, placeholder, defaultValue }
  //const { register } = useForm();
  
  return (
    <div>
        <label className="w-full font-serif text-base md:text-lg tracking-wider">{props.label}</label>
        { props.msg 
        ? <input {...props} className="w-full rounded" type="text" placeholder={props.placeholder} />
        : <input {...props} className="w-full rounded" type="text" placeholder={props.placeholder} />
        }
    </div>
  )
}

export default Input