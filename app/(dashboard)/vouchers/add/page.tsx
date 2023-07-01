import PageLectureForm from '@/components/PageLectureForm'
import PageVoucherForm from '@/components/PageVoucherForm'
import PgLecture from '@/components/PgVoucher'
import { fetchGroups } from '@/utils/serverApi';
import React from 'react'

async function Dashboard() {

  const groups:any = await fetchGroups();
  
  return (
    <PageVoucherForm data={groups?.documents}/>
  )
}

export default Dashboard