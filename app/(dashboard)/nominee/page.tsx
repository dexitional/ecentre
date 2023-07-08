import PgNominee from '@/components/PgNominee'
import React from 'react'

export const revalidate = 60;

function Dashboard({ searchParams }: any) {
  return (
    // @ts-ignore
    <PgNominee slug={searchParams}/>
  )
}

export default Dashboard