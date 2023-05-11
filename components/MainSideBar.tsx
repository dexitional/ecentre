import React from 'react'
import RelatedBox from './RelatedBox'
import Connect from './Connect'
import LatestBox from './LatestBox'
import FAQ from './FAQ'
import Contact from './Contact'

type Props = {}

function MainSideBar({}: Props) {
  return (
    <aside className="w-full md:w-[22.5rem] flex flex-col space-y-14">
        <RelatedBox 
            links={[
                { title: 'About Us', link:'/about-us'},
                { title: 'Acts Establishing The Commission', link:'/acts'},
                { title: 'Structure Of The Commission', link:'/structure'},
            ]} 
        />
        <Connect links={{ facebook:'https://www.facebook.com/dfdf', twitter: 'http', instagram: 'http', youtube:'http' }} />
        <LatestBox 
            links={[
                { title: 'About Us', link:'/about-us'},
                { title: 'Acts Establishing The Commission', link:'/acts'},
                { title: 'Structure Of The Commission', link:'/structure'},
            ]} 
        />
        <FAQ 
            heading="FAQ" 
            contents={[
            { heading: 'Coming together man', content : <><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eaque dignissimos beatae, laborum illum molestiae facilis nesciunt et, expedita aliquid incidunt amet perspiciatis! Quis incidunt corporis aut voluptatem sapiente soluta.</p><p>John Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias repudiandae aut autem, saepe veritatis nemo sapiente delectus. Mollitia, assumenda. Amet inventore voluptatum, necessitatibus optio pariatur beatae obcaecati sunt culpa quibusdam.</p></> },
            { heading: 'Coming together man', content : <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eaque dignissimos beatae, laborum illum molestiae facilis nesciunt et, expedita aliquid incidunt amet perspiciatis! Quis incidunt corporis aut voluptatem sapiente soluta.</p> },
            ]} 
        />
        <Contact />
    </aside>
  )
}

export default MainSideBar