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
  const refreshToken = request.cookies.get('Refresh');
  const currentPath = request.nextUrl.pathname;
  const authentication = request.cookies.get('Authentication');

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
      const cookieStore = await cookies();
      cookieStore.delete('Refresh');
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
  // matcher: [
  //     /*
  //      * Match all request paths except for the ones starting with:
  //      * - api (API routes)
  //      * - _next/static (static files)
  //      * - _next/image (image optimization files)
  //      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
  //      */
  //     '/profile',
  //     '/login',
  //     '/',
  //     '/register',
  //     '/product'
  // ],
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
