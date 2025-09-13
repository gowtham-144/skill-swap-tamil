'use client';
export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Dashboard() {
  const session = useSession();
  if (session.status === 'loading') return <p>Loading...</p>;
  if (session.status === 'unauthenticated') return <p>Please log in</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded">Home</Link>
    </div>
  );
}