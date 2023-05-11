import { useState } from "react"
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import FAQ from "@/components/FAQ"


export default function Home() {

  return (
    <main className="space-y-6">
      <FAQ 
            heading="Frequently Asked Questions" 
            contents={[
            { heading: 'How Do I Become A Registered Voter?', content : <><p>First-time voters must register to vote before casting a ballot. You can register as a voter online or at any designated voter registration centers within the electoral area where you wish to vote. Registration procedures can be found in the Registration page.</p></> },
            { heading: 'I split my time between Accra and my hometown. Can I register to vote both in Accra and in my hometown?', content : <p>No. You can only register at one location. We recommend that you register in the area where you spend the most time in. Remember: Where you register is where you vote. You will be assigned to your designated polling station permanently. If you go to a different polling place,your name will not appear on the roster and you might not be allowed to vote.</p> },
            { heading: 'I split my time between Accra and my hometown. Can I register to vote both in Accra and in my hometown?', content : <p>No. You can only register at one location. We recommend that you register in the area where you spend the most time in. Remember: Where you register is where you vote. You will be assigned to your designated polling station permanently. If you go to a different polling place,your name will not appear on the roster and you might not be allowed to vote.</p> },
            { heading: 'I split my time between Accra and my hometown. Can I register to vote both in Accra and in my hometown?', content : <p>No. You can only register at one location. We recommend that you register in the area where you spend the most time in. Remember: Where you register is where you vote. You will be assigned to your designated polling station permanently. If you go to a different polling place,your name will not appear on the roster and you might not be allowed to vote.</p> },
            { heading: 'I split my time between Accra and my hometown. Can I register to vote both in Accra and in my hometown?', content : <p>No. You can only register at one location. We recommend that you register in the area where you spend the most time in. Remember: Where you register is where you vote. You will be assigned to your designated polling station permanently. If you go to a different polling place,your name will not appear on the roster and you might not be allowed to vote.</p> },
            { heading: 'I split my time between Accra and my hometown. Can I register to vote both in Accra and in my hometown?', content : <p>No. You can only register at one location. We recommend that you register in the area where you spend the most time in. Remember: Where you register is where you vote. You will be assigned to your designated polling station permanently. If you go to a different polling place,your name will not appear on the roster and you might not be allowed to vote.</p> },
            ]} 
        />
      <div>
        <h1></h1>
        <form className="flex flex-col justify-center space-y-3">
          <input type="text" placeholder="Name" className="border border-gray-200 hover:border-gray-300 focus:ring-0" />
          <input type="text" placeholder="Email" className="border border-gray-200 hover:border-gray-300 focus:ring-0" />
          <textarea name="" rows={4} placeholder="Message" className="border border-gray-200 hover:border-gray-300 focus:ring-0"/>
          <button className="px-4 py-2 text-white bg-green-400 ">Send</button>

        </form>
      </div>
    </main>
  )
}

