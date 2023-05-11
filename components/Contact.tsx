import React from 'react'
import ContactPill from './ContactPill'
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { MdPhone } from 'react-icons/md'

type Props = {}

export default function Contact({}: Props) {
  return (
    <div className="flex flex-col justify-center space-y-6">
        <h1 className="font-serif text-base">Contact Information</h1>
        <div className="flex flex-col space-y-3">
           <ContactPill title="+233 (0) 30 396 8750" Icon={MdPhone} />
           <ContactPill title="info@ec.gov.gh" Icon={FaEnvelope} />
           <ContactPill title="P. o. Box M214, Accra – Ghana" Icon={FaMapMarkerAlt} />
        </div>
    </div>
  )
}