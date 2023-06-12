import React, { useState,useEffect } from 'react'
import PageHeader from './PageHeader';
import PageLecture from './PageVoucher';
import PageNominee from './PageNominee';

async function PgNominee() {
    
    return (
        <>
            <PageHeader title="Nominations" addUrl=""  />
            {/* @ts-ignore */}
            <PageNominee />
        </>
    )
}

export default PgNominee