import { useState } from "react"
import Statistics from "@/components/Statistics";
import Banner from "@/components/Banner";
import BreakNews from "@/components/BreakNews";
import QuickGuide from "@/components/QuickGuide";
import ElectionSection from "@/components/ElectionSection";
import EventSection from "@/components/EventSection";
import NewsLetterBox from "@/components/NewsLetterBox";
import UpcomingSection from "@/components/UpcomingSection";

export default function Home() {

  return (
    <main className="w-full">
       <Banner />
       <Statistics />
       <BreakNews />
       <QuickGuide />
       <ElectionSection />
       {/* <EventSection /> */}
       {/* <UpcomingSection /> */}
       {/* <NewsLetterBox /> */}
    </main>
  )
}
