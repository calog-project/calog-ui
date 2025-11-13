'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/lib/authOption';
import { revalidatePath } from 'next/cache';
import { updateUserProfileWithFormData } from '@/api/user/user';

export async function updateUserProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session?.accessToken) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  const userId = session.user.id;
  const accessToken = session.accessToken;

  try {
    const result = await updateUserProfileWithFormData(userId, accessToken, formData);

    revalidatePath('/mypage');
    revalidatePath(`/mypage/edit`);

    return result;
  } catch (error) {
    console.error('프로필 업데이트 액션 실패:', error);
    throw new Error('프로필 업데이트에 실패했습니다.');
  }
}
