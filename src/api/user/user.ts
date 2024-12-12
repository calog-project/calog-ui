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
