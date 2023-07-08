import { useState } from "react"
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import FAQ from "@/components/FAQ"
import Link from "next/link"


export default function Home({ searchParams }: { searchParams: { eid: string}}) {

  return (
    <main className="space-y-6">
      <Link href="/">Goto Voters Register</Link>
    </main>
  )
}

