import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// export { default } from 'next-auth/middleware';

// updated accordingly
export const config = {
  matcher: ['/sign-in', '/sign-up', '/profile', '/unveil-secret'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to home if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up'))
  ) {
    console.log(token);
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && url.pathname.startsWith('/unveil-secret')) {
    console.log('Redirecting to sign-in');
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (!token && url.pathname.startsWith('/profile')) {
    console.log('Redirecting to sign-in');
    console.log(token);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
