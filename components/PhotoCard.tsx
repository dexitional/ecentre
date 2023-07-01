import Image from 'next/image';
import React from 'react'
import { CgCloseO } from 'react-icons/cg';

type Props = {
    label: string;
    src: string;
    onClick: () => void;
}

function PhotoCard({ label, src, onClick }: Props) {
  return (
    <div className="rounded border-2 border-[#153B50] flex items-center overflow-hidden">
            <div className="relative w-16 h-16">
                <Image className="object-cover" alt="Photo" src={src} fill />
            </div>
            <div className="flex-1">
                <span className="px-4 text-base md:text-sm text-center font-bold italic text-[#153B50]">{label}</span>
            </div>
            <button onClick={onClick} className="w-10 h-full flex items-center justify-center bg-[#153B50] text-white">
                <CgCloseO className="h-6 w-6 text-white" />
            </button>
    </div>
  )
}

export default PhotoCard