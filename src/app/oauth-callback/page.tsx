// `Suspense`를 사용하여 클라이언트 사이드에서만 처리
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';

const OAuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isOauth = searchParams.get('oauth');

    const handleOauthCallback = async () => {
      if (!isOauth) return;

      try {
        const result = await signIn('oauth', { redirect: false });

        if (result?.error) {
          throw new Error(result.error);
        }

        if (result?.ok) {
          router.push('/main');
        }
      } catch (err) {
        console.error('OAuth 로그인 액세스 재발급 에러', err);
      }
    };

    if (isOauth === 'kakao' || isOauth === 'google') {
      handleOauthCallback();
    }
  }, [searchParams, router]);

  return <div>OAuthCallback</div>;
};

const OAuthCallback = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthCallbackContent />
    </Suspense>
  );
};

export default OAuthCallback;
