import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '로그인 페이지',
  description: 'Calog Login Page',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
