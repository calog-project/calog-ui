'use client';

import { useSocketClient } from '@/hooks/useSocketClient';
import { useSession } from 'next-auth/react';

export default function SocketClient() {
  const { data: session, status } = useSession();
  const userId = status === 'authenticated' ? session?.user.id : undefined;

  useSocketClient(userId);

  return null;
}
