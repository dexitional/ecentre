'use client';
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react' 

function ModalBox({ isOpen,setIsOpen,data }:any) {

  const Switcher = () => {
   
  }

  return (
    <Dialog 
      open={isOpen} 
      onClose={() => null }
      className="relative z-50"
    >
     <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 text-green-800">
        <Dialog.Panel className="mx-auto w-full max-h-screen max-w-5xl rounded bg-white overflow-scroll md:overflow-y-auto scrollbar-hide">
          <p>Loving</p>
        </Dialog.Panel>
     </div>
    </Dialog>
  )
}

export default ModalBox