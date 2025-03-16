'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/lib/authOption';
import { TCategory } from '@/types/category';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function fetchCategories(): Promise<TCategory[]> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('카테고리를 불러오는 데 실패했습니다.');
    }

    const data = await response.json();
    revalidatePath('/main');
    return data.payload.data;
  } catch (error) {
    console.error('카테고리 불러오기 실패:', error);
    throw error;
  }
}

export async function addCategory(formData: FormData): Promise<void> {
  const name = formData.get('name');
  const color = formData.get('color');

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error('로그인된 사용자가 아닙니다.');
  }

  const userId = session.user.id;

  const newCategory = {
    name,
    color,
    userId,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
      body: JSON.stringify(newCategory),
    });

    if (!response.ok) {
      throw new Error('카테고리 추가를 실패했습니다.');
    }

    revalidatePath('/main');
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editCategory(formData: FormData): Promise<void> {
  const name = formData.get('name');
  const color = formData.get('color');
  const categoryId = formData.get('categoryId');

  const editCategory = {
    name,
    color,
  };

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error('로그인된 사용자가 아닙니다.');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category/${categoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
      body: JSON.stringify(editCategory),
    });

    if (!response.ok) {
      throw new Error('카테고리 수정을 실패했습니다.');
    }

    revalidatePath('/main');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCategory(categoryId: number): Promise<boolean> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error('로그인된 사용자가 아닙니다.');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('카테고리 삭제 실패:', response.statusText);
      return false;
    }

    revalidatePath('/main');
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCategory({ categoryId }: { categoryId: number }): Promise<TCategory[]> {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/category/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('카테고리 상세 정보를 불러오는 데 실패했습니다.');
    }

    const data = await response.json();
    revalidatePath('/main');
    return data.payload.data;
  } catch (error) {
    console.error('카테고리 상세 정보 불러오기 실패:', error);
    throw error;
  }
}
