import React from 'react'
import NavPill from './NavPill'

async function MainMenu() {
  const menus = [
    { title: 'HOME', link: '/' },
    { title: 'PRESS RELEASES', link: '/' },
    { title: 'ELECTORAL CALENDAR', link: '/' },
    { title: 'GENERAL INSTRUCTIONS', link: '/' },
    { title: 'FAQ', link: '/' },
    // { title: 'CONTACT US', link: '/' },
  ]
   
  return (
    <nav className="hidden md:flex items-center space-x-8">
        { menus?.map((menu:any) => 
          menu.link 
          ? (<NavPill key={menu.title} title={menu.title?.toUpperCase()} link={menu.link} /> )
          : (<NavPill key={menu.title} title={menu.title?.toUpperCase()} link={menu.link} subMenu={menu.submenus}/>))}
    </nav>
  )
}

export default MainMenu