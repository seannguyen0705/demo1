import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const privatePaths = ['/profile-personal'];
const authPaths = [
  '/sign-in',
  '/sign-up',
  '/recruitment/sign-in',
  '/recruitment',
  '/admin/sign-in',
];

export async function middleware(request: NextRequest) {
  const refreshToken = await checkRefreshToken(request);
  const accessToken = await checkAccessToken(request);
  const currentPath = request.nextUrl.pathname;
  const cookieStore = await cookies();

  if (!refreshToken && request.cookies.get('Refresh')) {
    const res = NextResponse.redirect(new URL('/sign-in', request.url));
    cookieStore.delete('Refresh');
    cookieStore.delete('Authentication');
    return res;
  }

  // Nếu có refresh token nhưng không có access token → gọi API refresh
  if (refreshToken && !accessToken) {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/refresh-token`,
      {
        method: 'POST',
        headers: {
          Cookie: `${refreshToken.name}=${refreshToken.value}`,
        },
      },
    );

    if (!response.ok) {
      const res = NextResponse.redirect(new URL('/sign-in', request.url));
      cookieStore.delete('Refresh');
      cookieStore.delete('Authentication');
      return res;
    }

    const newAccessToken = response.headers.get('set-cookie');
    if (newAccessToken) {
      const res = NextResponse.redirect(new URL(currentPath, request.url));
      res.headers.set('Set-Cookie', newAccessToken);
      return res;
    }
  }

  // Nếu vào route private mà không có refresh token → chuyển về đăng nhập
  if (
    privatePaths.some((path) => currentPath.startsWith(path)) &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Nếu đã login mà vào trang auth → chuyển về homepage
  if (authPaths.some((path) => currentPath.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

const checkRefreshToken = async (request: NextRequest) => {
  const token = request.cookies.get('Refresh');
  if (!token) return null;

  try {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error('JWT_REFRESH_SECRET is not defined');

    await jwtVerify(token.value, new TextEncoder().encode(secret));
    return token;
  } catch {
    const cookieStore = await cookies();
    cookieStore.delete('Refresh');
    return null;
  }
};

const checkAccessToken = async (request: NextRequest) => {
  const token = request.cookies.get('Authentication');
  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');

    await jwtVerify(token.value, new TextEncoder().encode(secret));
    return token;
  } catch {
    const cookieStore = await cookies();
    cookieStore.delete('Authentication');
    return null;
  }
};
