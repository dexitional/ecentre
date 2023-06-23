"use client"
import React, { useState } from 'react'
import PhotoCard from './PhotoCard'
import File from './File'
import PdfCard from './PdfCard'
import { uploadCv, uploadPicture } from '@/firabase'
import { objectToFormData } from '@/utils/objectToFormData'
import { useRouter } from 'next/navigation'
import Notiflix from 'notiflix'

type Props = {
    serial: string;
    data: { photo: string; cv: string };
}

function Uploader({ serial, data }: Props) {
    const router = useRouter()
    const [ picture, setPicture ] = useState(data?.photo)
    const [ cv, setCV ] = useState(data?.cv)
    const [ loading, setLoading ] = useState(false)
    const [ photoUrl, setPhotoUrl ] = useState('')
    const [ cvUrl, setCvUrl ] = useState('')
    const [ form, setForm ] = useState<any>({
      photo: data?.photo || '',
      cv: data?.cv || '',
    })

    const onChange = async (e:any) => {
        if(e.target.name == 'photo'){
           setPicture(URL.createObjectURL(e.target.files[0]));
           const photo = await uploadPicture(e.target.files[0], serial)
           setPhotoUrl(photo)
        }
   
        if(e.target.name == 'cv'){
           setCV(URL.createObjectURL(e.target.files[0]));
           const cv = await uploadCv(e.target.files[0], serial)
           setCvUrl(cv)
        }
   
        if(['photo','cv'].includes(e.target.name)) 
          setForm({ ...form, [e.target.name] : e.target.files[0] })
     }


     const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
  
        const ok = window.confirm("DO YOU WANT COMMIT CHANGES AND PROCEED ?")
        if(!ok) return
        try {
          setLoading(true)
          const newForm: any = { 
            ...form,
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
             router.refresh()
             setLoading(false)
             Notiflix.Notify.success('UPLOAD SUCCESS !');
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
  
    //const { NEXT_PUBLIC_IMAGE_URL : IMAGE_URL } = process.env
    const IMAGE_URL = `https://ehub.ucc.edu.gh`

  return (
    <form className="w-full" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 scale-75">
            { picture
            ? <PhotoCard src={picture} label="Flyer" onClick={() => setPicture('')} />
            : <File name="photo" label="Flyer Upload" onChange={onChange} />
            }

            { cv
            ? <PdfCard src={picture} label="Curriculum Vitae" onClick={() => setCV('')} />
            : <File name="cv" label="CV Upload" onChange={onChange} />
            }
        </div>
        <div className="w-full flex items-center justify-center">
            <button className="mx-auto my-2 px-4 py-2 w-4/5 rounded bg-[#153B50] font-bold tracking-widest text-white text-sm" type="submit">UPLOAD</button>
        </div>
       </form>
  )
}

export default Uploader