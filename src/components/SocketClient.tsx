'use client';

import { useSocketClient } from '@/hooks/useSocketClient';
import { useSession } from 'next-auth/react';

export default function SocketClient() {
  const { data: session, status } = useSession();
  const userId = status === 'authenticated' ? session?.user.id : undefined;
  const accessToken = status === 'authenticated' ? session?.accessToken : undefined;

  console.log('[SocketClient] status:', status, 'userId:', userId);

  useSocketClient(userId, accessToken);

  return null;
}
