import React, { Suspense } from 'react'
import PageHeader from './PageHeader';
import PageNominee from './PageNominee';

async function PgNominee({slug}:any) {
    return (
        <>
            <PageHeader title="Nominations" addUrl=""  />
           
            <Suspense fallback={<>Testing Loading</>}> {
              /* @ts-ignore */}
              <PageNominee slug={slug} />
            </Suspense>
        </>
    )
}

export default PgNominee