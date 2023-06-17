import PgNominee from '@/components/PgNominee'
import React from 'react'

function Dashboard({searchParams}: any) {
  return (
    // @ts-ignore
    <PgNominee slug={searchParams}/>
  )
}

export default Dashboard