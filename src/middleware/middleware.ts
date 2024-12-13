import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    
    if (req.nextUrl.pathname !== '/' && !req.nextauth.token) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === '/') {
          return true
        }
        return !!token
      },
    },
  }
)

// 모든 경로에 대해 미들웨어 실행 (랜딩 페이지 포함)
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] }