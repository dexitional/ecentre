'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useCallback, useEffect, useState } from 'react' 
import { FiSearch } from 'react-icons/fi';

function SearchBox() {

  const [ keyword, setKeyword ] = useState('')

  const pathname = usePathname();
  const searchParams = useSearchParams()!;
 
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const onSubmit = (e: any) => {
    e.preventDefault()
    //const router = useRouter();
    //router.push(pathname + '?' + createQueryString('search', keyword))
    //router.push(`/john`)
  }

  return (
    <form onSubmit={onSubmit} className="px-1 py-1 hidden items-center space-x-4 rounded bg-blue-300/10 border border-blue-900/40">
      <FiSearch className="w-3.5 h-3.5 text-blue-900/60" />
      <input  onChange={(e) => setKeyword(e.target.value)} className="p-0 w-16 md:w-36 focus:ring-0 border-0 bg-transparent text-blue-900/60 placeholder:text-blue-900/40 placeholder:text-sm ring-0 focus:outline-0 focus:border-0" type="text" placeholder="Filter records" />
      <button type="submit" className="px-2 py-0.5 bg-blue-900/70 text-xs text-white rounded">
        Search
      </button>
    </form>
  )
}

export default SearchBox