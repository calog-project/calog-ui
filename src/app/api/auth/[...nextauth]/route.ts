import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface CustomUser {
  id: number;
  email: string;
  accessToken: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include',
          });

          const resBody = await response.json();
          const user = resBody.payload?.data;
          const accessToken = response.headers.get('Authorization') || '';

          if (resBody.isSuccess && user) {
            return {
              id: user.id,
              email: user.email,
              accessToken: accessToken,
            };
          }
          return null;
        } catch (err) {
          console.error('로그인 에러:', err);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: 'oauth',
      name: 'OAuth',
      credentials: {},
      async authorize() {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          const resBody = await response.json();
          const user = resBody.paylod?.data;
          const accessToken = response.headers.get('Authorization') || '';

          if (resBody.isSuccess && user) {
            return {
              id: user.id,
              email: user.email,
              accessToken: accessToken,
            };
          }
          return null;
        } catch (err) {
          console.error('OAuth 로그인 에러:', err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as CustomUser).id;
        token.email = (user as CustomUser).email;
        token.accessToken = (user as CustomUser).accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id as number;
      session.user.email = token.email as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  // logger: {
  //   error(code, ...message) {
  //     console.error(code, ...message);
  //   },
  //   warn(code, ...message) {
  //     console.warn(code, ...message);
  //   },
  //   debug(code, ...message) {
  //     console.debug(code, ...message);
  //   },
  // },
  // debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
