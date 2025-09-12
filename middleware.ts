import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './src/lib/linkToken';

export async function middleware(request: NextRequest) {
  // Only apply to the gear checklist page
  if (request.nextUrl.pathname === '/resources/gear-checklist') {
    const token = request.nextUrl.searchParams.get('t');
    
    if (!token) {
      return new NextResponse(null, { status: 404 });
    }
    
    const { valid } = await verifyToken(token);
    
    if (!valid) {
      return new NextResponse(null, { status: 404 });
    }
    
    // Add no-index headers
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/resources/gear-checklist'
};