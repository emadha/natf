import SubmissionForm from '@/components/submission-form';
import PageContainer from '@/pages/layouts/page-container';
import {Link} from '@inertiajs/react';
import React from 'react';

export default function Create({title}) {
  return (
      <PageContainer title={title}>

        <Link href={'/'} className={'text-center mb-10 text-xs text-muted-foreground hover:text-foreground transition-colors pt-2 block'}>
          العودة إلى الصفحة الرئيسية
        </Link>

        <SubmissionForm/>

      </PageContainer>
  );
}
