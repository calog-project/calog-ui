import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { searchUser, getFollowers, getFollowing, approveFollowRequest, rejectFollowRequest } from '@/api/follow/follow';
import useAuthStore from '@/stores/authStore';
import { useFollowStore } from '@/stores/followStore';
import { getStatusDisplay } from '@/utils/followStatus';
import UserSearchBox from '@/components/domains/mypage/UserSearchBox';
import Link from 'next/link';

export default function UserList() {
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [tab, setTab] = useState<'follower' | 'following'>('follower');
  const [showRequests, setShowRequests] = useState(false);
  const { 
    setFollowers, 
    setFollowing, 
    getRequestedFollowers,
    getNormalFollowers,
    getRequestedFollowing,
    getNormalFollowing
  } = useFollowStore();

  const debouncedValue = useDebounce(inputValue, 300);
  const { user, accessToken } = useAuthStore();

  // 팔로우/팔로워 목록 불러오기
  useEffect(() => {
    const fetchFollowList = async () => {
      if (!accessToken || !user?.id) return;

      try {
        const result =
          tab === 'follower' ? await getFollowers(accessToken, user.id) : await getFollowing(accessToken, user.id);

        const users = Array.isArray(result.users) ? result.users : [];

        if (tab === 'follower') {
          setFollowers(users);
        } else {
          setFollowing(users);
        }

        console.log(result);
      } catch (error) {
        console.error(`${tab} 리스트 불러오기 실패:`, error);
      }
    };

    fetchFollowList();
  }, [tab, accessToken, user?.id]);

  // 탭 변경 시 요청 토글 리셋
  useEffect(() => {
    setShowRequests(false);
  }, [tab]);

  // 스토어에서 데이터 가져오기
  const requestList = tab === 'follower' ? getRequestedFollowers() : getRequestedFollowing();
  const normalList = tab === 'follower' ? getNormalFollowers() : getNormalFollowing();
  const requestCount = requestList.length;

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

  // 팔로우 요청 처리 함수
  const handleFollowAction = async (userId: number, action: 'approve' | 'reject') => {
    if (!accessToken) return;

    try {
      const success =
        action === 'approve'
          ? await approveFollowRequest(userId, accessToken)
          : await rejectFollowRequest(userId, accessToken);

      if (success) {
        // 목록 새로고침
        const result = await getFollowers(accessToken, user!.id);
        const resultData = result as { users?: unknown[] };
        const users = Array.isArray(resultData.users) ? resultData.users : [];
        setFollowers(users);
      }
    } catch (error) {
      console.error(`팔로우 요청 ${action === 'approve' ? '승인' : '거절'} 실패:`, error);
    }
  };

  // 카드 렌더링 함수
  const renderUserCard = (user: any) => {
    const { label: statusLabel, color: statusColor } = getStatusDisplay(user.status);

    return (
      <Link
        href={`/profile/${user.id}`}
        key={user.id}
        className="flex items-center gap-4 p-3 border border-gray-200 rounded-md shadow-sm w-full h-[60px] hover:bg-gray-50 transition">
        <img
          src={user.image || '/images/user.svg'}
          alt={`${user.nickname} 프로필`}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex justify-between w-full items-center">
          <span className="font-semibold text-[18px]">{user.nickname}</span>
          {/* 수락 대기 중인 경우 수락/거절 버튼 */}
          {user.status === 'pending_received' ? (
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white text-[16px] rounded hover:bg-blue-600 transition"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleFollowAction(user.id, 'approve');
                }}>
                수락
              </button>
              <button
                className="px-3 py-1 bg-gray-500 text-white text-[16px] rounded hover:bg-gray-600 transition"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleFollowAction(user.id, 'reject');
                }}>
                거절
              </button>
            </div>
          ) : (
            <span className={`text-[16px] py-2 px-3 rounded-[4px] ${statusColor}`}>{statusLabel}</span>
          )}
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
          className={`relative flex w-1/2 text-center justify-center cursor-pointer ${tab === 'follower' && 'font-bold'}`}
          onClick={() => setTab('follower')}>
          <span className="pb-2 text-[18px]">팔로워</span>
          {tab === 'follower' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black transition-all duration-300" />
          )}
        </div>
        <div
          className={`relative flex w-1/2 text-center justify-center cursor-pointer ${tab === 'following' && 'font-bold'}`}
          onClick={() => setTab('following')}>
          <span className="pb-2 text-[18px]">팔로잉</span>
          {tab === 'following' && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black transition-all duration-300" />
          )}
        </div>
      </div>

      {/* 요청 토글 */}
      {requestCount > 0 && (
        <div
          className="flex items-center justify-center gap-2 py-2 cursor-pointer hover:bg-gray-50 rounded transition"
          onClick={() => setShowRequests(!showRequests)}>
          <span className="text-[16px] text-gray-600">
            {tab === 'follower' ? '요청' : '요청중'} ({requestCount})
          </span>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${
              showRequests ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4">
        {/* 요청 목록 (토글 열렸을 때만 표시) */}
        {showRequests && requestList.length > 0 && (
          <>
            {requestList.map(renderUserCard)}
            {/* 구분선 */}
            <div className="border-t border-gray-200 my-2" />
          </>
        )}
        
        {/* 일반 목록 */}
        {normalList.length === 0 ? (
          <p className="text-gray-500 text-[16px] text-center">표시할 유저가 없습니다.</p>
        ) : (
          normalList.map(renderUserCard)
        )}
      </div>
    </div>
  );
}
