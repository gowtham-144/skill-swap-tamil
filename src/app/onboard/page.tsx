'use client';
export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';

export default function Onboard() {
  const session = useSession();
  if (session.status === 'loading') return <p>Loading...</p>;
  if (session.status === 'unauthenticated') return <p>Please log in</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Onboard</h2>
      <p>Skills selection coming soon...</p>
    </div>
  );
}