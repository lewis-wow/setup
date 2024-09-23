'use client';

import { useSession } from 'next-auth/react';

export const IndexClientPage = () => {
  const { data: session } = useSession();

  return <p>sesssion: {JSON.stringify(session)}</p>;
};
