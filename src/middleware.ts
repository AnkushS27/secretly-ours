import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

// Define routes that require authentication
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/profile',
    '/unveil-secret',
    '/dashboard/:path*',
  ],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Get the token (JWT) for the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });

  // Handle authenticated users trying to access login or signup pages
  if (token) {
    if (
      url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up')
    ) {
      // Redirect authenticated users away from login/signup pages
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Handle users trying to access dashboard or admin-specific pages
    if (url.pathname.startsWith('/dashboard')) {
      // Check if the user is an admin
      if (token.role !== 'admin') {
        // Redirect non-admin users attempting to access the dashboard
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  // Handle unauthenticated users trying to access protected routes
  if (!token) {
    if (
      url.pathname.startsWith('/unveil-secret') ||
      url.pathname.startsWith('/profile') ||
      url.pathname.startsWith('/dashboard')
    ) {
      // Redirect unauthenticated users to the sign-in page
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Proceed if the user is authenticated or accessing public routes
  return NextResponse.next();
}
