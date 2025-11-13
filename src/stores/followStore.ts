import { create } from 'zustand';
import { SimpleFollowStatus, getSimpleFollowStatus } from '@/utils/followStatus';

export type FollowUser = {
  id: number;
  nickname: string;
  email: string;
  image: string;
  status: SimpleFollowStatus;
  isMutualFollow: boolean;
};

export type FollowState = {
  followers: FollowUser[];
  following: FollowUser[];
  
  // 데이터 설정
  setFollowers: (users: any[]) => void;
  setFollowing: (users: any[]) => void;
  
  // 상태 업데이트
  updateUserStatus: (userId: number, newStatus: SimpleFollowStatus) => void;
  
  // 유저 추가/제거
  addFollower: (user: FollowUser) => void;
  removeFollower: (userId: number) => void;
  addFollowing: (user: FollowUser) => void;
  removeFollowing: (userId: number) => void;
  
  // 필터링된 목록 반환
  getRequestedFollowers: () => FollowUser[];
  getNormalFollowers: () => FollowUser[];
  getRequestedFollowing: () => FollowUser[];
  getNormalFollowing: () => FollowUser[];
};

export const useFollowStore = create<FollowState>((set, get) => ({
  followers: [],
  following: [],
  
  setFollowers: (users) => set({
    followers: users.map(item => ({
      id: item.user.id,
      nickname: item.user.nickname,
      email: item.user.email,
      image: item.user.image,
      status: getSimpleFollowStatus(item.followStatus),
      isMutualFollow: item.isMutualFollow
    }))
  }),
  
  setFollowing: (users) => set({
    following: users.map(item => ({
      id: item.user.id,
      nickname: item.user.nickname,
      email: item.user.email,
      image: item.user.image,
      status: getSimpleFollowStatus(item.followStatus),
      isMutualFollow: item.isMutualFollow
    }))
  }),
  
  updateUserStatus: (userId, newStatus) => set(state => ({
    followers: state.followers.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ),
    following: state.following.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    )
  })),
  
  addFollower: (user) => set(state => ({
    followers: [user, ...state.followers]
  })),
  
  removeFollower: (userId) => set(state => ({
    followers: state.followers.filter(user => user.id !== userId)
  })),
  
  addFollowing: (user) => set(state => ({
    following: [user, ...state.following]
  })),
  
  removeFollowing: (userId) => set(state => ({
    following: state.following.filter(user => user.id !== userId)
  })),
  
  getRequestedFollowers: () => get().followers.filter(user => user.status === 'pending_received'),
  getNormalFollowers: () => get().followers.filter(user => user.status !== 'pending_received'),
  getRequestedFollowing: () => get().following.filter(user => user.status === 'pending_sent'),
  getNormalFollowing: () => get().following.filter(user => user.status !== 'pending_sent'),
}));