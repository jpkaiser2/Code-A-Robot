import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname from the request
  const pathname = request.nextUrl.pathname;
  console.log('Middleware - Pathname:', pathname);

  // Create a new response
  const response = NextResponse.next();

  // Add the pathname to the headers
  response.headers.set('x-pathname', pathname);
  response.headers.set('x-invoke-path', pathname);
  console.log('Middleware - Set headers:', {
    'x-pathname': pathname,
    'x-invoke-path': pathname
  });

  return response;
}

export const config = {
  matcher: [
    '/course/:path*',
    '/course/sections/:path*'
  ],
}; 