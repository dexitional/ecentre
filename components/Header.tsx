import React from 'react'
import TopNavPill from './TopNavPill'
import Socials from './Socials'
import { MdMail, MdPhone } from 'react-icons/md'
import TopNav from './TopNav'
import Navigation from './Navigation'

function Header() {
  return (
    <>
      <TopNav />
      <Navigation />
    </>
  )
}

export default Header