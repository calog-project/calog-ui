import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  exp?: number;
}

export function isTokenExpired(token?: string): boolean {
  if (!token) {
    return true; // 토큰이 없으면 만료된 것으로 간주
  }

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    if (!decodedToken.exp) {
      return true; // 만료 시간이 없으면 만료된 것으로 간주
    }

    // 현재 시간(초 단위)과 만료 시간 비교
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('토큰 디코딩 에러:', error);
    return true; // 디코딩 에러 발생 시 만료된 것으로 간주
  }
}
