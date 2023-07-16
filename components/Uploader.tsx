"use client"
import React, { useState } from 'react'
import PhotoCard from './PhotoCard'
import File from './File'
import PdfCard from './PdfCard'
import { uploadCv, uploadPicture } from '@/firabase'
import { objectToFormData } from '@/utils/objectToFormData'
import { useRouter } from 'next/navigation'
import Notiflix from 'notiflix'
import { BiLoaderCircle } from 'react-icons/bi'

type Props = {
    serial: string;
    data: { photo: string; cv: string, aspirant_regno: string; $id: string };
}

function Uploader({ serial, data }: Props) {
    const router = useRouter()
    const [ picture, setPicture ] = useState(data?.photo)
    const [ cv, setCV ] = useState(data?.cv)
    const [ loading, setLoading ] = useState(false)
    const [ isPhotoLoading, setIsPhotoLoading ] = useState(false)
    const [ isCvLoading, setIsCvLoading ] = useState(false)
    const [ photoUrl, setPhotoUrl ] = useState('')
    const [ cvUrl, setCvUrl ] = useState('')
    const [ form, setForm ] = useState<any>({
      photo: data?.photo || '',
      cv: data?.cv || '',
      aspirant_regno: data?.aspirant_regno,
      $id: data?.$id  
    })

    const onChange = async (e:any) => {
        // if(e.target.name == 'photo'){
        //     setIsPhotoLoading(true)
        //     setPicture(URL.createObjectURL(e.target.files[0]));
        //     const photo = await uploadPicture(e.target.files[0], serial)
        //     if(photo){
        //       setIsPhotoLoading(false)
        //       setPhotoUrl(photo)
        //     } console.log(photoUrl)
        // }

        // if(e.target.name == 'cv'){
        //     setIsCvLoading(true)
        //     setCV(URL.createObjectURL(e.target.files[0]));
        //     const cv = await uploadCv(e.target.files[0], serial)
        //     if(cv){
        //       setIsCvLoading(false)
        //       setCvUrl(cv)
        //     } console.log(cvUrl)
        // }

        if(e.target.name == 'photo'){
           if(['image/jpeg','image/png','image/gif','image/svg','image/avif','image/webp'].includes(e.target?.files[0]?.type)){
             setIsPhotoLoading(true)
             setPicture(URL.createObjectURL(e.target.files[0]));
             const photo = await uploadPicture(e.target.files[0], serial)
             if(photo){
               setIsPhotoLoading(false)
               setPhotoUrl(photo)
               setForm({ ...form, [e.target.name] : e.target.files[0] })
             } 
           } else {
             alert("Please choose an image with a picture format! \n Allowed formats are 'JPG','PNG','GIF','SVG','AVIF','WEBP'")
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

          alert(JSON.stringify(newForm))
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 scale-75">
          {   picture && !photoUrl && !isPhotoLoading
              ?  <PhotoCard src={picture} label="FLYER" onClick={() => { setPicture(''); setPhotoUrl(''); }} />
              :  picture && !photoUrl && isPhotoLoading
              ?   <div className="z-20 w-full h-full flex items-center space-x-2 justify-center rounded-lg bg-white bg-opacity-80 backdrop-blur-sm">
                      <BiLoaderCircle className="text-[#153B50] rounded-full h-6 w-6 animate-spin"/>
                      <span className="text-[#153B50] text-sm tracking-widest font-poppins font-bold animate-pulse">UPLOADING ...</span>
                  </div> 
              :  picture && photoUrl && !isPhotoLoading 
              ?  <PhotoCard src={picture} label="FLYER" onClick={() => { setPicture(''); setPhotoUrl(''); }} />
              :  <File name="photo" label="Flyer Upload" onChange={onChange} />
              }

              {   cv && !cvUrl && !isCvLoading
              ?  <PdfCard src={picture} label="CV" onClick={() => { setCV(''); setCvUrl(''); }} />
              :  cv && !cvUrl && isCvLoading
              ?   <div className="z-20 w-full h-full flex items-center space-x-2 justify-center rounded-lg bg-white bg-opacity-80 backdrop-blur-sm">
                      <BiLoaderCircle className="text-[#153B50] rounded-full h-6 w-6 animate-spin"/>
                      <span className="text-[#153B50] text-sm tracking-widest font-poppins font-bold animate-pulse">UPLOADING ...</span>
                  </div> 
              :  cv && cvUrl && !isCvLoading 
              ?  <PdfCard src={cv} label="CV" onClick={() => { setCV(''); setCvUrl(''); }} />
              :  <File name="cv" label="CV Upload" onChange={onChange} />
            }
        </div>
        <div className="w-full flex items-center justify-center">
            <button disabled={ !picture || !cv } className="mx-auto my-2 px-4 py-2 w-4/5 rounded bg-[#153B50] disabled:opacity-50 font-bold tracking-widest text-white text-sm" type="submit">UPLOAD</button>
        </div>
       </form>
  )
}

export default Uploader