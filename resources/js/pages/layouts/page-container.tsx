import React from 'react';
import {Head} from '@inertiajs/react';

export default function PageContainer({title, children}: { title: any; children: React.ReactNode }) {
  return <div className={'py-20'}>
    <Head>
      <title>{title}</title>
    </Head>
    <div>
      <h1 className={'text-5xl mb-20 font-black text-center'}>
        {title}
      </h1>
    </div>
    <div className={'container mx-auto'}>
      {children}
    </div>
  </div>;
}