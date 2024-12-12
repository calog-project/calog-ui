'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

const OAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(1);
    const isOauth = searchParams.get('oauth');

    const handleOauthCallback = async () => {
      try {
        const result = await signIn('oauth', {
          redirect: false,
        });

        console.log(result);

        if (result?.error) {
          throw new Error(result.error);
        }

        if (result?.ok) {
          router.push('/main');
        }
      } catch (err) {
        console.error('OAuth 로그인 액세스 재발급 에러', err);
        throw new Error('OAuth 로그인 액세스 재발급 실패');
      }
    };

    if (isOauth === 'kakao' || isOauth === 'google') {
      handleOauthCallback();
    }
  }, [searchParams, router]);

  return <div>OAuthCallback</div>;
};

export default OAuthCallback;
