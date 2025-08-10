import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '마이 페이지',
  description: 'Calog My Page',
};

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-screen flex flex-col mx-auto">{children}</div>;
}
