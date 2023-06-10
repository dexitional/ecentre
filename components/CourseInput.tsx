'use client'
import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'

type Props = {
    label: string;
    name: string;
    register: any,
}

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]
// value,label,
function CourseInput({ label,name,register }: Props) {
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    const [query, setQuery] = useState('')
  
    const filteredPeople:any =
      query === ''
        ? [] //people
        : people.filter((person) => {
            return person.name.toLowerCase().includes(query.toLowerCase())
          })
    const data: any = []
    return (
      <div className="p-2 md:p-3 flex flex-col space-y-1 border border-blue-200/20 rounded">
           <span className="text-sm tracking-wider">{label}</span>
    {/* //     <select className="px-3 py-1 rounded border border-blue-400/20 bg-blue-300/10 focus:ring-0 text-base text-blue-900/60 scrollbar-hide file:text-red-500" name={name} {...register}>
    //         <option disabled selected className="p-2 py-4 ">-- select -- </option>
    //         { data.map(( row: any,i: React.Key ) => (<option key={i} value={row.value}>{row.label}</option>))}
    //     </select> */}
   
        <Combobox value={selectedPerson} onChange={setSelectedPerson} >
            <Combobox.Input className="px-3 py-1 rounded border border-blue-400/20 bg-blue-300/10 focus:ring-0 text-base text-blue-900/60 uppercase" onChange={(event) => setQuery(event.target.value)} placeholder="Enter Course Code" displayValue={(person:any) => person.name} />
            <Combobox.Options>
                {filteredPeople.map((person:any) => (
                <Combobox.Option className="cursor-pointer px-2 py-0.5 my-0.5 text-xs bg-yellow-50/40 border" key={person.id} value={person}>
                    {person.name}
                </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox> 
        </div>
    )
}

export default CourseInput