'use client';

import { followUser, unfollowUser } from '@/api/follow/follow';
import useAuthStore from '@/stores/authStore';

interface FollowButtonProps {
  targetUserId: number;
  followStatus: 'none' | 'pending' | 'approved';
  isMutualFollow: boolean;
  onStatusChange?: (newStatus: 'none' | 'pending' | 'approved') => void;
}

export default function FollowButton({
  targetUserId,
  followStatus,
  isMutualFollow,
  onStatusChange,
}: FollowButtonProps) {
  const { accessToken, user } = useAuthStore();

  // 본인일 경우 버튼 숨김
  if (!user || user.id === targetUserId) return null;

  const handleFollow = async () => {
    if (!accessToken) return;
    const success = await followUser(targetUserId, accessToken);
    if (success) onStatusChange?.('pending');
  };

  const handleUnfollow = async () => {
    if (!accessToken) return;
    const success = await unfollowUser(targetUserId, accessToken);
    if (success) onStatusChange?.('none');
  };

  if (isMutualFollow)
    return <p className="text-[16px] text-green-600 x-[400px] bg-gray-d9 rounded-[4px] py-2 px-4">팔로잉</p>;

  switch (followStatus) {
    case 'none':
      return (
        <button onClick={handleFollow} className="bg-blue-500 text-white px-3 py-1 rounded">
          팔로우
        </button>
      );
    case 'pending':
      return (
        <button onClick={handleUnfollow} className="bg-gray-400 text-white px-3 py-1 rounded">
          요청 중
        </button>
      );
    case 'approved':
      return (
        <button onClick={handleUnfollow} className="bg-blue-500 text-white px-3 py-1 rounded">
          언팔로우
        </button>
      );
    default:
      return null;
  }
}
