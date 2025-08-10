import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSocketStore } from '@/stores/socketStore';

export function useSocketClient(userId: number | undefined) {
  //   const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const setNotification = useSocketStore((s) => s.setNotification);

  useEffect(() => {
    if (typeof userId !== 'number') return;
    if (socketRef.current) return;
    console.log(userId);
    // const socket = io('https://api.calog-app.link/notification');
    socketRef.current = io('https://api.calog-app.link/notification', { transports: ['websocket'] });
    socketRef.current?.on('connect', () => {
      console.log('이구맹맹이111');
      socketRef.current?.emit('subscribe', { id: userId });
      console.log('이구맹맹이');
    });
    socketRef.current?.on('notification', (data) => {
      setNotification(data);
    });

    console.log('이구맹');

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [userId]);
}
