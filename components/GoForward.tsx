import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

function GoForward() {
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
 
  const nextPage = useCallback(() => {
      const params = new URLSearchParams(searchParams);
      const pg = params.get('page') || 0
      params.set('page', Math.min(50,+pg+1).toString());
      return params.toString();
    }, [searchParams],
  );

 return (
    <button onClick={() => router.push(pathname + '?' + nextPage())} className="p-0.5 w-fit flex items-center justify-center rounded shadow shadow-blue-900/40 border border-blue-900/40 ">
        <MdKeyboardArrowRight className="w-7 h-7 text-blue-900/80" />
    </button>
  )
}

export default GoForward