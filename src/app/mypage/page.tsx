'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserInfo } from '@/api/user/user';
import useAuthStore from '@/stores/authStore';
import UserProfile from '@/components/domains/mypage/UserProfile';
import UserList from '@/components/commons/userList/UserList';
// import { useSocketStore } from '@/stores/socketStore';
import Button from '@/components/commons/button/Button';

export default function MyPage() {
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  // const { notifications } = useSocketStore();

  const { user, accessToken } = useAuthStore();
  const nickname = user?.nickname;
  const profileImage = user?.image || '/images/user.svg';

  useEffect(() => {
    const fetchFollowData = async () => {
      if (!accessToken || !user?.id) return;
      try {
        const res = await getUserInfo(user?.id, accessToken);
        setFollower(res.followerCount);
        setFollowing(res.followingCount);
      } catch (error) {
        console.error('팔로우 정보 불러오기 실패:', error);
      }
    };

    fetchFollowData();
  }, [accessToken, user?.id]);

  return (
    <main className="w-full h-full flex items-center justify-center gap-[48px]">
      <div className="relative h-[90%] flex p-10 rounded-[8px] w-[40%] my-[12px] flex-col justify-top items-center shadow-md gap-[20px]">
        <UserProfile profileImage={profileImage} nickname={nickname ?? ''} follower={follower} following={following} />
        <Link href="/mypage/edit" className="w-full">
          <Button buttonSize="normal" bgColor="ghost" className="w-full">
            프로필 수정
          </Button>
        </Link>
        <div className="w-[100px] flex items-center justify-between h-[32px]">
          <div className="h-[3px] w-[3px] border border-primary border-[2px] rounded-full" />
          <div className="h-[3px] w-[3px] border border-primary border-[2px] rounded-full" />
          <div className="h-[3px] w-[3px] border border-primary border-[2px] rounded-full" />
        </div>

        <ul className="relative flex flex-col justify-start w-full gap-[20px] text-[18px] text-bold">
          <li>프로필 정보</li>
          <li>게시글</li>
          <li>알림 보기</li>
          <li>즐겨찾기/저장된 일정</li>
        </ul>
      </div>
      <div className="relative h-[90%] w-[40%] flex wrap items-center justify-center shadow-md rounded-[8px] my-[12px]">
        <UserList />
      </div>
    </main>
  );
}
