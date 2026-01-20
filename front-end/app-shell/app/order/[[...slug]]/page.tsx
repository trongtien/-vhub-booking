'use client';

import dynamic from 'next/dynamic';

const RemoteComponent = dynamic<{ remoteName: string; moduleName: string }>(
  () => import('../../components/RemoteComponent'),
  {
    ssr: false,
    loading: () => <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Order App...</div>,
  }
);

export default function OrderPage() {
  return <RemoteComponent remoteName="order" moduleName="./App" />;
}
