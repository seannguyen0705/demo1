import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const privatePath = ['/profile-personal'];
const authPath = [
  '/sign-in',
  '/sign-up',
  '/recruitment/sign-in',
  '/admin/sign-in',
];

export async function middleware(request: NextRequest) {
  const refreshToken = await checkRefreshToken(request);
  const authentication = await checkAccessToken(request);
  const currentPath = request.nextUrl.pathname;

  if (refreshToken && !authentication) {
    const responseRefresh = await fetch(
      `${process.env.BACKEND_URL}/api/v1/refresh-token`,
      {
        method: 'POST',
        headers: {
          Cookie: `${refreshToken?.name}=${refreshToken?.value}`,
        },
      },
    );
    if (!responseRefresh.ok) {
      request.cookies.delete('Refresh');
      return NextResponse.redirect(new URL('sign-in', request.url), {});
    } else {
      return NextResponse.redirect(new URL(currentPath, request.url), {
        headers: {
          'Set-Cookie': responseRefresh.headers.get('set-cookie') as string,
        },
      });
    }
  }

  if (
    privatePath.some((path) => currentPath.startsWith(path)) &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL('sign-in', request.url));
  }
  if (authPath.some((path) => currentPath.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

const checkRefreshToken = async (request: NextRequest) => {
  const refreshToken = request.cookies.get('Refresh');
  const cookieStore = await cookies();
  if (!refreshToken) {
    return null;
  }
  try {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is not defined');
    }
    await jwtVerify(
      refreshToken.value as string,
      new TextEncoder().encode(secret),
    );
    return refreshToken;
  } catch {
    cookieStore.delete('Refresh');
    return NextResponse.redirect(new URL('sign-in', request.url));
  }
};

const checkAccessToken = async (request: NextRequest) => {
  const accessToken = request.cookies.get('Authentication');
  const cookieStore = await cookies();
  if (!accessToken) {
    return null;
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    await jwtVerify(
      accessToken.value as string,
      new TextEncoder().encode(secret),
    );

    return accessToken;
  } catch {
    cookieStore.delete('Authentication');
    return null;
  }
};
