import { useState } from "react"
import Statistics from "@/components/Statistics";
import Banner from "@/components/Banner";
import BreakNews from "@/components/BreakNews";
import QuickGuide from "@/components/QuickGuide";
import ElectionSection from "@/components/ElectionSection";
import UserBanner from "@/components/UserBanner";
import AdminBanner from "@/components/AdminBanner";

export default function Home() {

  return (
    <main className="w-full">
       <Banner />
       {/* @ts-ignore */}
       <UserBanner /> <AdminBanner />
      <Statistics />     
       <BreakNews />
       <QuickGuide />
       <ElectionSection />
    </main>
  )
}
