import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for client-only component (WebSocket)
const SalesDashboard = dynamic(
  () => import('../src/components/SalesDashboard'),
  { ssr: false }
);

export default function Home() {
  return <SalesDashboard />;
}
