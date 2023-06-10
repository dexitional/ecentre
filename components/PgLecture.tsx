import React, { useState,useEffect } from 'react'
import PageHeader from './PageHeader';
import PageLecture from './PageLecture';

async function PgLecture() {
    
    return (
        <>
            <PageHeader title="Lectures" addUrl="/lectures/add"  />
            {/* @ts-ignore */}
            <PageLecture />
        </>
    )
}

export default PgLecture