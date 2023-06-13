'use client';
import React, { useState } from 'react'
import { MdOutlineArticle, MdSave } from 'react-icons/md';
import Input from './Input';
import Select from './Select';
import GoBack from './GoBack';
import ActionButton from './ActionButton';
import PageTitle from './PageTitle';
import Notiflix from 'notiflix';
import { useRouter } from 'next/navigation';

type Props = {
    data?: any;
}

function PageVoucherForm({ data }: Props) {
   
  const [ form, setForm ] = useState<any>({});
  const [ loading, setLoading ] = useState<any>(false);
  const router = useRouter();

  const groups:any = data?.map((row: any) => {
    return { label: row.title, value: row.$id }
  })


  const onChange = (e: any) => {
     setForm({ ...form, [e.target.name]: e.target.value })
  }
  

  const onSubmit = async (e: any) => {
      e.preventDefault();
      
      const ok = window.confirm("DO YOU WANT TO PROCEED ?")
      if(!ok) return
      try {
        setLoading(true);
        // Save to Database
        const resp = await fetch('/api/generate',{
          method: 'POST',
          body: JSON.stringify(form)
        })
        
        const response = await resp.json()
        if(response.success){
           router.push('/vouchers')
           Notiflix.Notify.success('NEW VOUCHERS ADDED !');
        } else {
           Notiflix.Notify.failure(response.msg.toUpperCase());
        }
        setLoading(false)

      } catch(e:any){
          setLoading(false)
          console.log(e)
          Notiflix.Notify.failure(e.message);
      }
  }
  
  return (
    <>
        <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between md:space-x-4 md:space-y-0 space-y-2">
            <div className="w-full md:w-fit flex flex-col md:flex-row md:items-center md:space-x-4 md:space-y-0 space-y-2">
                <div className="w-full flex items-center justify-between space-x-4">
                    <GoBack />
                    <div className="md:hidden">
                        <ActionButton title="" Icon={MdSave} onClick={null} />
                    </div>
                </div>
                <PageTitle title="VOUCHER GENERATION" />
            </div>
            <div className="hidden md:flex">
                <ActionButton title="Save" Icon={MdSave} onClick={null} />
            </div>
        </div>
        <div className="pb-12 overflow-y-scroll scrollbar-hide">
            <div className="w-full border-separate border-spacing-0 border border-blue-300/20 rounded text-[0.86rem] text-blue-900/60">
                <div className="md:grid md:grid-cols-5 bg-blue-400/10 text-blue-900/80 text-[0.86rem] font-inter font-medium tracking-wider">
                    <div className="px-6 py-3 font-semibold">GENERATION</div>
                </div>
                <div>
                  <form onSubmit={onSubmit}>
                    <div className="p-2 md:px-6 md:py-4 flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-6">
                        <div className="p-2 md:p-4 flex-1 flex flex-col space-y-2 rounded border border-blue-300/20 ">
                           <Select onChange={onChange} label="Electoral Group" name="groupId" optionData={groups} />
                        </div>
                        <div className="p-2 md:p-4  flex-1 flex flex-col space-y-2 rounded border border-blue-300/20 ">
                           <Input onChange={onChange} label="Voucher Quantity" name="quantity" />
                        </div>
                    </div>
                    <div className="px-2 pb-2 md:px-6 md:pb-4 flex flex-col md:flex-row md:items-start space-y-2 md:space-y-0 md:space-x-3">
                        { loading 
                          ? <span className="px-3 py-2 w-full rounded border-2 border-green-500 bg-green-700 text-green-200 font-semibold text-base animate-pulse">Generating ...</span>
                          : <button className="px-3 py-2 w-full rounded border-2 border-blue-500 bg-blue-900 text-blue-200 font-semibold text-base">Save</button>
                        }
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default PageVoucherForm