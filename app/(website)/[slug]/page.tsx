import { useState } from "react"
import Image from 'next/image'
import Logo from '../../../public/logo.png'


export default function Home() {

  return (
    <main className="space-y-6">
      <h1 className="my-3 md:my-10 text-2xl md:text-4xl text-gray-800 font-medium">Electoral System Of Ghana</h1>
      <div className="relative">
        <Image className="w-full aspect-video object-contain" src={Logo} alt="" />
        <div className="px-6 py-1.5 bg-slate-100/70 text-gray-500 font-semibold text-xs text-center">
          <p>Caption</p>
        </div>
      </div>
      <div className="w-full space-y-4 text-base text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro accusantium velit qui assumenda animi eligendi molestiae ipsum quos, placeat laboriosam adipisci, ut enim rem? Animi amet optio deleniti sequi sint.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur modi voluptate corporis laborum quisquam, architecto illo perferendis sunt ducimus delectus ipsa quos maxime provident, perspiciatis commodi nemo, numquam repellendus accusamus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur modi voluptate corporis laborum quisquam, architecto illo perferendis sunt ducimus delectus ipsa quos maxime provident, perspiciatis commodi nemo, numquam repellendus accusamus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur modi voluptate corporis laborum quisquam, architecto illo perferendis sunt ducimus delectus ipsa quos maxime provident, perspiciatis commodi nemo, numquam repellendus accusamus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur modi voluptate corporis laborum quisquam, architecto illo perferendis sunt ducimus delectus ipsa quos maxime provident, perspiciatis commodi nemo, numquam repellendus accusamus.</p>
      </div>
    </main>
  )
}
