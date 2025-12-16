import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSocketStore } from '@/stores/socketStore';
import { useFollowStore } from '@/stores/followStore';
import { NotificationType } from '@/types/notification';

export function useSocketClient(userId: number | undefined, accessToken: string | undefined) {
  const socketRef = useRef<Socket | null>(null);
  const setNotification = useSocketStore((s) => s.setNotification);
  const { updateUserStatus, addFollower } = useFollowStore();

  useEffect(() => {
    if (typeof userId !== 'number' || !accessToken) return;
    if (socketRef.current) return;

    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    socketRef.current.on('connect', () => {
      console.log(`WebSocket connected: ${userId}`);
      socketRef.current?.emit('join', { userId: userId });
    });

    socketRef.current.on('notification', (data) => {
      console.log('Received notification data:', data);

      // 1. 알림으로 표시
      setNotification(data);

      // 2. 팔로우 관련 실시간 상태 업데이트
      if (data.type === NotificationType.FOLLOW_REQUESTED) {
        // 팔로우 요청 받음 → 팔로워 목록에 추가
        const requesterData = data.meta?.requester;
        if (requesterData) {
          addFollower({
            id: requesterData.id,
            nickname: requesterData.nickname,
            email: requesterData.email,
            image: requesterData.image,
            status: 'pending_received',
            isMutualFollow: false,
          });
        }
      } else if (data.type === NotificationType.FOLLOWED) {
        // 팔로우 승인됨 → 상태 업데이트
        const followerId = data.meta?.followerId;
        if (followerId) {
          updateUserStatus(followerId, 'mutual');
        }
      }
    });

    return () => {
      console.log('🔌 WebSocket disconnected.');
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [userId, accessToken, addFollower, setNotification, updateUserStatus]);
}
