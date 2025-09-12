'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Onboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [teach, setTeach] = useState<number[]>([]);
  const [learn, setLearn] = useState<number[]>([]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated' || !session) return <p>Please log in</p>;

  async function submit() {
    try {
      await fetch('/api/onboard', {
        method: 'POST',
        body: JSON.stringify({ teach, learn }),
        headers: { 'Content-Type': 'application/json' },
      });
      router.push('/dashboard');
    } catch (err) {
      console.error('Onboarding failed:', err);
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">திறன்களை தேர்ந்தெடுக்கவும்</h2>
      <SkillCheck
        title="நீங்கள் கற்றுத் தர இயலும்"
        selected={teach}
        setSelected={setTeach}
      />
      <SkillCheck
        title="நீங்கள் கற்றுக்கொள்ள விரும்பும்"
        selected={learn}
        setSelected={setLearn}
      />
      <button
        onClick={submit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        சேமி
      </button>
    </div>
  );
}

function SkillCheck({
  title,
  selected,
  setSelected,
}: {
  title: string;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const skills = [
    'Arduino',
    'Photoshop',
    'Spoken English',
    'Tailoring',
    'Python',
    'Welding',
    'Maths',
    'Video Editing',
  ];

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {skills.map((s, i) => (
          <label key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(i)}
              onChange={(e) => {
                if (e.target.checked) setSelected([...selected, i]);
                else setSelected(selected.filter((x) => x !== i));
              }}
            />
            {s}
          </label>
        ))}
      </div>
    </div>
  );
}

// 🚀 Prevents Next.js from prerendering at build time
export const dynamic = 'force-dynamic';

}