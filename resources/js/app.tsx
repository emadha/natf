import {createInertiaApp} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  layout: (name) => {

    return AppLayout;

  },
  strictMode: true,
  withApp(app) {
    return (
        <>{app}</>
    );
  },
  progress: {
    color: '#4B5563',
  },
});