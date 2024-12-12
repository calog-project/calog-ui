import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
    user: {
      id: number;
      email: string;
    };
  }

  interface User {
    id: number;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    error?: string;
  }
}
