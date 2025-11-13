export type SimpleFollowStatus =
  | 'mutual' // 서로 팔로우
  | 'following' // 내가 팔로우 중
  | 'follower' // 상대가 나를 팔로우 중
  | 'pending_sent' // 내가 요청 중
  | 'pending_received' // 상대가 요청 중
  | 'none'; // 관계 없음

export type FollowStatusFromAPI = {
  sent: 'approved' | 'pending' | null;
  received: 'approved' | 'pending' | null;
};

export function getSimpleFollowStatus(followStatus: FollowStatusFromAPI): SimpleFollowStatus {
  const { sent, received } = followStatus;

  // pending 상태를 우선 처리
  if (sent === 'pending') return 'pending_sent';
  if (received === 'pending') return 'pending_received';
  
  // approved 상태 처리
  if (sent === 'approved' && received === 'approved') return 'mutual';
  if (sent === 'approved') return 'following';
  if (received === 'approved') return 'follower';
  
  return 'none';
}

// 정적 스타일 매핑 (세이프리스트 불필요)
const STATUS_STYLES = {
  mutual: { label: '팔로잉', color: 'bg-gray-200 text-gray-800' },
  following: { label: '팔로잉', color: 'bg-gray-200 text-gray-800' },
  pending_sent: { label: '요청 중', color: 'bg-blue-500 text-white' },
  follower: { label: '팔로우', color: 'bg-blue-500 text-white' },
  none: { label: '팔로우', color: 'bg-blue-500 text-white' },
  pending_received: { label: '', color: '' },
} as const;

export function getStatusDisplay(status: SimpleFollowStatus) {
  return STATUS_STYLES[status] || STATUS_STYLES.none;
}
