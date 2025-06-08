import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from './utils/enums';

const employerPaths = ['/manage-jobs', '/manage-candidates', '/create-job', 'edit-job'];
const candidatePaths = ['/my-jobs'];
const adminPaths = ['/manage/employer', '/manage/candidate', '/manage/job'];
const privatePaths = [...employerPaths, ...candidatePaths, ...adminPaths, '/profile-personal'];
const authPaths = ['/sign-in', '/sign-up', '/recruitment/sign-in', '/recruitment', '/admin/sign-in', 'create-job'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('Authentication')?.value || request.cookies.get('Refresh')?.value;
  const user = token ? decodeUser(token) : null;

  const currentPath = request.nextUrl.pathname;
  if (user) {
    if (authPaths.some((path) => currentPath.startsWith(path))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (employerPaths.some((path) => currentPath.startsWith(path)) && user.role !== UserRole.EMPLOYER) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (currentPath === '/job' && user.role !== UserRole.CANDIDATE) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (candidatePaths.some((path) => currentPath.startsWith(path)) && user.role !== UserRole.CANDIDATE) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (adminPaths.some((path) => currentPath.startsWith(path)) && user.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (privatePaths.some((path) => currentPath.startsWith(path))) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};

function decodeUser(token: string) {
  try {
    return jwtDecode(token) as { role: UserRole };
  } catch {
    return null;
  }
}
