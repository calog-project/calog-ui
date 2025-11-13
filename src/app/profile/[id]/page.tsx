'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getUserInfo } from '@/api/user/user';
import FollowButton from '@/components/commons/button/FollowButton';
import UserProfile from '@/components/domains/mypage/UserProfile';
import useAuthStore from '@/stores/authStore';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { accessToken, user } = useAuthStore();
  const id = Number(params?.id);

  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('/images/user.svg');
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [followStatus, setFollowStatus] = useState<'none' | 'pending' | 'approved'>('none');
  const [isMutualFollow, setIsMutualFollow] = useState(false);
  const [isUserFound, setIsUserFound] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!accessToken || !id) return;

      // 본인일 경우 바로 마이페이지로 이동
      if (user?.id === id) {
        router.push('/mypage');
        return;
      }

      try {
        const res = await getUserInfo(id, accessToken);
        setNickname(res.nickname);
        setProfileImage(res.image || '/images/user.svg');
        setFollower(res.followerCount);
        setFollowing(res.followingCount);
        setFollowStatus(res.followStatus?.sent);
        setIsMutualFollow(res.isMutualFollow);
        setIsUserFound(true);
      } catch (error) {
        console.error('프로필 정보 불러오기 실패:', error);
        setIsUserFound(false); //
      }
    };

    fetchUserProfile();
  }, [id, accessToken, user?.id, router]);

  const handleStatusChange = (newStatus: 'none' | 'pending' | 'approved') => {
    setFollowStatus(newStatus);
    if (newStatus === 'none') {
      setIsMutualFollow(false);
    }
  };

  if (!isUserFound) {
    return (
      <main className="w-full h-full flex justify-center items-center text-gray-600 text-lg">
        존재하지 않는 사용자입니다.
      </main>
    );
  }

  return (
    <main className="relative flex h-full py-10 px-10 border w-[680px] mx-auto flex-col justify-top items-center">
      <div className="relative w-[70%] h-auto flex flex-col items-center justify-center gap-[20px]">
        <UserProfile profileImage={profileImage} nickname={nickname} follower={follower} following={following} />
        <FollowButton
          targetUserId={id}
          followStatus={followStatus}
          isMutualFollow={isMutualFollow}
          onStatusChange={handleStatusChange}
        />
      </div>
    </main>
  );
}
