import React from 'react'
import PageHeader from './PageHeader';
import PageNominee from './PageNominee';

async function PgNominee({slug}:any) {
    return (
        <>
            <PageHeader title="Nominations" addUrl=""  />
            {/* @ts-ignore */}
            <PageNominee slug={slug} />
        </>
    )
}

export default PgNominee