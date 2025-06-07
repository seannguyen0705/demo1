import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from './utils/enums';

const privatePaths = ['/profile-personal'];
const employerPaths = ['/manage-jobs', '/manage-candidates', '/create-job', 'edit-job'];
const authPaths = ['/sign-in', '/sign-up', '/recruitment/sign-in', '/recruitment', '/admin/sign-in', 'create-job'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('Authentication')?.value || request.cookies.get('Refresh')?.value;
  const user = token ? decodeUser(token) : null;

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

function decodeUser(token: string) {
  return jwtDecode(token) as { role: UserRole };
}
