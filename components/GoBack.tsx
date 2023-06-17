'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

function GoBack() {
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
 
  const prevPage = useCallback(() => {
      const params = new URLSearchParams(searchParams);
      const pg = params.get('page') || 0
      params.set('page', Math.max(1,+pg-1).toString());
      return params.toString();
    }, [searchParams],
  );

  return (
    <button onClick={() => router.push(pathname + '?' + prevPage())} className="p-0.5 w-fit flex items-center justify-center rounded shadow shadow-blue-900/40 border border-blue-900/40">
        <MdKeyboardArrowLeft className="w-7 h-7 text-blue-900/80" />
    </button>
  )
}

export default GoBack