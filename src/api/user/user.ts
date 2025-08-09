interface ApiResponse {
  isSuccess: boolean;
  payload: {
    statusCode: number;
    message: string;
    data: {
      isAvailable: boolean;
    };
  };
}

// user 조회
export async function getUserInfo(id: number, accessToken: string): Promise<any> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`유저 정보를 가져오는 데 실패했습니다. 상태코드: ${response.status}`);
    }

    const data: any = await response.json();

    if (!data.isSuccess) {
      throw new Error(data.payload.message || '유저 정보 요청 실패');
    }

    return data.payload.data;
  } catch (error) {
    console.error('getUserInfo 에러:', error);
    throw error;
  }
}

export async function checkNickname(nickname: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/check-nickname/${encodeURIComponent(nickname)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('닉네임 중복 확인 중 오류가 발생했습니다.');
    }

    const data: ApiResponse = await response.json();
    return data.payload.data.isAvailable;
  } catch (error) {
    console.error('닉네임 중복 확인 실패:', error);
    throw error;
  }
}

export async function checkEmail(email: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/check-email/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('이메일 중복 확인 중 오류가 발생했습니다.');
    }

    const data: ApiResponse = await response.json();
    return data.payload.data.isAvailable;
  } catch (error) {
    console.error('이메일 중복 확인 실패:', error);
    throw error;
  }
}
