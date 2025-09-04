import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Force HTTPS in production (honors x-forwarded-proto when behind proxy)
  if (process.env.NODE_ENV === 'production') {
    const proto = req.headers.get('x-forwarded-proto');
    if (proto && proto !== 'https') {
      const url = req.nextUrl.clone();
      url.protocol = 'https:';
      return NextResponse.redirect(url, 308);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

