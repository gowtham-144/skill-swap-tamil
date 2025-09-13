'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [list, setList] = useState<{ id: string; name: string; nameTa: string }[]>([]);
  useEffect(() => {
    if (status === 'authenticated') fetch('/api/match').then(r => r.json()).then(setList);
  }, [status]);
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated') return <p>Please log in</p>;
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">உங்கள் பொருத்தங்கள்</h2>
      {list.length  === 0 && <p>இன்னும் பொருத்தம் இல்லை. மேலும் திறன்கள் சேர்க்கவும்.</p>}
      {list.map((u) => (
        <div key={u.id} className="border rounded p-4 mb-3 flex justify-between items-center">
          <div>
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-gray-600">உங்களிடம் <span className="font-medium">{u.nameTa}</span> கற்றுக்கொள்ள விரும்புகிறார்</p>
          </div>
          <Link href={`/chat/${u.id}`} className="bg-blue-600 text-white px-4 py-2 rounded">சாட்</Link>
        </div>
      ))}
    </div>
  );
}