import { NextRequest, NextResponse } from 'next/server';

const privatePaths = ['/profile-personal'];
const authPaths = ['/sign-in', '/sign-up', '/recruitment/sign-in', '/recruitment', '/admin/sign-in'];

export async function middleware(request: NextRequest) {
  const isAuth = request.cookies.has('Refresh') || request.cookies.has('Authentication');
  const currentPath = request.nextUrl.pathname;

  if (privatePaths.some((path) => currentPath.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (authPaths.some((path) => currentPath.startsWith(path)) && isAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
