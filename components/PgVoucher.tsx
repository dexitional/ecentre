import React, { useState,useEffect } from 'react'
import PageHeader from './PageHeader';
import PageLecture from './PageVoucher';
import PageVoucher from './PageVoucher';

async function PgVoucher() {
    
    return (
        <>
            <PageHeader title="Vouchers" addUrl="/vouchers/add"  />
            {/* @ts-ignore */}
            <PageVoucher />
        </>
    )
}

export default PgVoucher