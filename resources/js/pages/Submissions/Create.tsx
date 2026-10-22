import SubmissionForm from '@/components/submission-form';
import PageContainer from '@/pages/layouts/page-container';
import {Link} from '@inertiajs/react';
import React from 'react';

export default function Create({title}) {
  return (
      <PageContainer title={title}>

        <SubmissionForm/>

      </PageContainer>
  );
}
