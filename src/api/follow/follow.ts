interface ApiResponse {
  isSuccess: boolean;
  payload: {
    statusCode: number;
    message: string;
    data: any;
  };
}

// 사용자 팔로우
export async function followUser(userId: number, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/follow/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('팔로우 요청 중 오류가 발생했습니다.');
    }

    const data: ApiResponse = await response.json();
    return data.isSuccess;
  } catch (error) {
    console.error('팔로우 요청 실패:', error);
    throw error;
  }
}

// 사용자 언팔로우
export async function unfollowUser(userId: number, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/follow/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('언팔로우 요청 중 오류가 발생했습니다.');
    }

    const data: ApiResponse = await response.json();
    return data.isSuccess;
  } catch (error) {
    console.error('언팔로우 요청 실패:', error);
    throw error;
  }
}

// 팔로우 요청 승인
export async function approveFollowRequest(userId: number, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/follow/${userId}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('팔로우 요청 승인 중 오류가 발생했습니다.');
    }

    const data: ApiResponse = await response.json();
    return data.isSuccess;
  } catch (error) {
    console.error('팔로우 요청 승인 실패:', error);
    throw error;
  }
}

// 팔로우 요청 거절
export async function rejectFollowRequest(userId: number, accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/follow/${userId}/reject`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('팔로우 요청 거절 중 오류가 발생했습니다.');
    }

    const data: ApiResponse = await response.json();
    return data.isSuccess;
  } catch (error) {
    console.error('팔로우 요청 거절 실패:', error);
    throw error;
  }
}

// 팔로워 목록 조회
export async function getFollowers(accessToken: string, userId: number): Promise<any> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/follower/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('팔로워 목록 조회 중 오류가 발생했습니다.');
    }

    const data: ApiResponse = await response.json();
    return data.payload.data;
  } catch (error) {
    console.error('팔로워 목록 조회 실패:', error);
    throw error;
  }
}

// 팔로잉 목록 조회
export async function getFollowing(accessToken: string, userId: number): Promise<any> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/following/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('팔로잉 목록 조회 중 오류가 발생했습니다.');
    }

    const data: ApiResponse = await response.json();
    return data.payload.data;
  } catch (error) {
    console.error('팔로잉 목록 조회 실패:', error);
    throw error;
  }
}

// 유저 검색
export async function searchUser(keyword: string, accessToken: string): Promise<any[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/search?keyword=${encodeURIComponent(keyword)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('사용자 검색 중 오류가 발생했습니다.');
    }

    const data: ApiResponse = await response.json();
    return data.payload.data.users;
  } catch (error) {
    console.error('사용자 검색 실패:', error);
    throw error;
  }
}
