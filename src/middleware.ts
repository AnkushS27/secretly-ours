import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

// updated accordingly
export const config = {
  matcher: ['/sign-in', '/sign-up', '/profile', '/unveil-secret'],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });

  // More explicit redirection for authenticated users
  if (token) {
    if (
      url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up')
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Redirect unauthenticated users from protected routes
  if (!token) {
    if (
      url.pathname.startsWith('/unveil-secret') ||
      url.pathname.startsWith('/profile')
    ) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}
