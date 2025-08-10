import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { searchUser, getFollowers, getFollowing } from '@/api/follow/follow';
import useAuthStore from '@/stores/authStore';
import UserSearchBox from '@/components/domains/mypage/UserSearchBox';
import Link from 'next/link';

export default function UserList() {
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [tab, setTab] = useState<'follower' | 'following'>('follower');
  const [followUserList, setFollowUserList] = useState<any[]>([]);

  const debouncedValue = useDebounce(inputValue, 300);
  const { user, accessToken } = useAuthStore();

  // 팔로우/팔로워 목록 불러오기
  useEffect(() => {
    const fetchFollowList = async () => {
      if (!accessToken || !user?.id) return;

      try {
        const result =
          tab === 'follower' ? await getFollowers(accessToken, user.id) : await getFollowing(accessToken, user.id);

        setFollowUserList(Array.isArray(result.users) ? result.users : []);

        console.log(result);
      } catch (error) {
        console.error(`${tab} 리스트 불러오기 실패:`, error);
      }
    };

    fetchFollowList();
  }, [tab, accessToken, user?.id]);

  // 유저 검색
  useEffect(() => {
    if (!debouncedValue.trim() || !accessToken) {
      setSearchResult([]);
      return;
    }

    const fetchSearch = async () => {
      try {
        const result = await searchUser(debouncedValue, accessToken);
        setSearchResult(result);
      } catch (error) {
        console.error('유저 검색 실패:', error);
      }
    };

    fetchSearch();
  }, [debouncedValue, accessToken]);

  // 카드 렌더링 함수
  const renderUserCard = (item: any) => {
    const { user: targetUser, followStatus } = item;

    let statusLabel = '';
    let statusColor = '';

    // 상태
    if (tab === 'following') {
      if (followStatus.sent === 'approved') {
        statusLabel = '팔로잉';
        statusColor = 'bg-gray-d9 text-black';
      } else if (followStatus.sent === 'pending') {
        statusLabel = '요청 중';
        statusColor = 'bg-blue-76 text-white';
      }
    } else if (tab === 'follower') {
      if (followStatus.received === 'pending') {
        statusLabel = '수락 대기 중';
        statusColor = 'bg-blue-76 text-white';
      } else if (followStatus.sent === 'approved') {
        statusLabel = '팔로잉';
        statusColor = 'bg-gray-d9 text-black';
      } else {
        statusLabel = '팔로우';
        statusColor = 'bg-white text-black border border-blue-500';
      }
    }

    return (
      <Link
        href={`/profile/${targetUser.id}`}
        key={targetUser.id}
        className="flex items-center gap-4 p-3 border border-gray-200 rounded-md shadow-sm w-full h-[60px] hover:bg-gray-50 transition">
        <img
          src={targetUser.image || '/images/user.svg'}
          alt={`${targetUser.nickname} 프로필`}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex justify-between w-full items-center">
          <span className="font-semibold">{targetUser.nickname}</span>
          <span className={`text-[14px] py-2 px-3 rounded-[4px] ${statusColor}`}>{statusLabel}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-start p-10 gap-[16px]">
      <UserSearchBox
        inputValue={inputValue}
        onInputChange={setInputValue}
        searchResult={searchResult}
        myUserId={user?.id}
      />

      <div className="relative flex items-center justify-center w-full">
        <div
          className={`relative flex w-1/2 text-center justify-center cursor-pointer ${tab === 'following' && 'font-bold'}`}
          onClick={() => setTab('following')}>
          <span className="pb-2">팔로잉</span>
          {tab === 'following' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black transition-all duration-300" />
          )}
        </div>
        <div
          className={`relative flex w-1/2 text-center justify-center cursor-pointer ${tab === 'follower' && 'font-bold'}`}
          onClick={() => setTab('follower')}>
          <span className="pb-2">팔로워</span>
          {tab === 'follower' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black transition-all duration-300" />
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {Array.isArray(followUserList) && followUserList.length === 0 ? (
          <p className="text-gray-500 text-[16px] text-center">표시할 유저가 없습니다.</p>
        ) : (
          Array.isArray(followUserList) && followUserList.map(renderUserCard)
        )}
      </div>
    </div>
  );
}
