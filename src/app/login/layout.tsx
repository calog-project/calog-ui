import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '로그인 페이지',
  description: 'Calog Login Page',
};

export default function LoginPageLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
