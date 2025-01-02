import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface DecodedToken {
  id: string;
  role: number;
  exp: number; 
}

export function middleware(request: NextRequest) {
  // Handle CORS preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Default response setup
  const response = NextResponse.next();
    // add the CORS headers to the response
    response.headers.append('Access-Control-Allow-Credentials', "true")
    response.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    response.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    response.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api/v1/user')) {
    return userMiddleware(request);
  }

  if (pathname.startsWith('/api/v1/admin')) {
    return adminMiddleware(request);
  }

  return response;
}

function userMiddleware(request: NextRequest) {
  const token = extractBearerToken(request.headers.get('Authorization'));
  if (!token) {
    return NextResponse.json(
      { error: 'Token is missing' },
      { status: 401 }
    );
  }
  
  const userToken = decodeToken(token);
  if (!userToken || userToken.role !== 0) {
    return NextResponse.json({ error: 'Forbidden: Users only' }, { status: 403 });
  }
  
  const response = NextResponse.next();
  response.headers.set('x-user-id', userToken.id);
  return response;
}

function adminMiddleware(request: NextRequest) {
  const token = extractBearerToken(request.headers.get('Authorization'));
  if (!token) {
    return NextResponse.json(
      { error: 'Token is missing' },
      { status: 401 }
    );
  }
  
  const adminToken = decodeToken(token);
  if (!adminToken || adminToken.role !== 1) {
    return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
  }
  
  const response = NextResponse.next();
  response.headers.set('x-admin-id', adminToken.id);
  return response;
}

function extractBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null;
  }
  return authorizationHeader.split(' ')[1];
}

function decodeToken(token: string): DecodedToken | null {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])) as DecodedToken;
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export const config = {
  matcher: ['/api/v1/admin/:path*', '/api/v1/user/:path*'],
};
