'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Client side');
  }, []);

  return (
    <div>
      <h1>Hello ProfilePage</h1>
      <hr />

      <div className='flex flex-col'>
        <span>{session?.user?.name ?? 'No name'}</span>
        <span>{session?.user?.email}</span>
        <span>{session?.user?.image}</span>
        <span>{session?.user?.id ?? 'no-uuid'}</span>
        <span>{session?.user?.roles?.join(', ') ?? ['no-roles']}</span>
      </div>
    </div>
  );
}
