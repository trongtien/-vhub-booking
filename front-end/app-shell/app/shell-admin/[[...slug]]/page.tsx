'use client';

import dynamic from 'next/dynamic';

const RemoteComponent = dynamic<{ remoteName: string; moduleName: string }>(
  () => import('../../components/RemoteComponent'),
  {
    ssr: false,
    loading: () => <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Admin App...</div>,
  }
);

export default function ShellAdminPage() {
  return <RemoteComponent remoteName="shellAdmin" moduleName="./App" />;
}
