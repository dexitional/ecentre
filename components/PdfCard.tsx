import Image from 'next/image';
import React from 'react'
import { CgCloseO } from 'react-icons/cg';
import { FaFilePdf } from 'react-icons/fa';

type Props = {
    label: string;
    src: string;
    onClick: () => void;
}

function PdfCard({ label, src, onClick }: Props) {
  return (
    <div className="rounded border-2 border-red-800 flex items-center overflow-hidden">
            <div className="h-16 w-16 bg-red-800 flex items-center justify-center">
                <FaFilePdf className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
                <span className="px-4 text-base md:text-sm text-center font-bold italic text-[#153B50]">{label}</span>
            </div>
            <button onClick={onClick} className="w-10 h-full flex items-center justify-center bg-red-800 text-white">
                <CgCloseO className="h-6 w-6 text-white" />
            </button>
    </div>
  )
}

export default PdfCard