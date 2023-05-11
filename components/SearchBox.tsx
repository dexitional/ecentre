'use client';
import React from 'react' 
import { FiSearch } from 'react-icons/fi';

type Props = {
  keyword: string;
  setKeyword: any;
}

function SearchBox({ keyword, setKeyword }: Props) {
  return (
    <div className="px-2 py-1 flex items-center space-x-4 rounded bg-green-300/10 border border-green-300/50">
        <FiSearch className="w-3.5 h-3.5 text-green-200" />
        <input value={keyword} onChange={(e) => setKeyword(e.target.value )} className="p-0 w-36 focus:ring-0 border-0 bg-transparent text-green-200 placeholder:text-green-300/40 placeholder:text-sm ring-0 focus:outline-0 focus:border-0" type="text" placeholder="Filter records" />
    </div>
  )
}

export default SearchBox