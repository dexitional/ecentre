'use client'
import React from 'react'
import GoBack from './GoBack'
import GoForward from './GoForward'
import SearchBox from './SearchBox'
import ActionButton from './ActionButton'
import PageTitle from './PageTitle'
import { MdAdd } from 'react-icons/md'
import Link from 'next/link'

type Props = {
    title: string;
    addUrl: string;
}

export default function PageHeader({ title, addUrl }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between md:space-x-4 md:space-y-0 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:space-y-0 space-y-2">
            <div className="w-full flex items-center justify-between md:justify-start space-x-4">
                <div className="flex items-center space-x-2">
                    <GoBack />
                    <GoForward />
                </div>
                
                <SearchBox />
                <Link href={addUrl} className="md:hidden">
                    <ActionButton title="" Icon={MdAdd} />
                </Link>
            </div>
            <PageTitle title={title} />
        </div>
        <Link href={addUrl} className="hidden md:flex">
            <ActionButton title="New Record" Icon={MdAdd} />
        </Link>
    </div>
  )
}