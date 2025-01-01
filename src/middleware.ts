import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if(pathname.startsWith('/api/v1/user')){
    return userMiddleware(request);
  }
  if(pathname.startsWith('/api/v1/admin')){
    return adminMiddleware(request);
  }
  return NextResponse.next();
}
function userMiddleware(request: NextRequest){
  const token = extractBearerToken(request.headers.get('Authorization'));
  if(!token){
    return NextResponse.json(
      {error: 'Token is missing'},
      {status: 401}
    );
  }
  const userToken = decodeToken(token);
  if (!userToken || userToken.role !== 0 || userToken.role !== 1) {
    return NextResponse.json({ error: 'Forbidden: Users only' }, { status: 403 });
  } 
  const response = NextResponse.next();
  response.headers.set('x-user-id', userToken.id);
  return response;
}
function adminMiddleware(request: NextRequest){
  const token = extractBearerToken(request.headers.get('Authorization'));
  if(!token){
    return NextResponse.json(
      {error: 'Token is missing'},
      {status: 401}
    );
  }
  const adminToken = decodeToken(token);
  console.log(adminToken)
  if (!adminToken || adminToken.role !== 1) {
    return NextResponse.json({ error: 'Forbidden: admins only' }, { status: 403 });
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
function decodeToken(token: string): any | null {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); 
    const now = Math.floor(Date.now() / 1000);
    if(decoded.exp < now){
        return null;
    }
        return decoded;
    
  } catch {
    return null;
  }
}

// Cấu hình matcher cho 2 API cụ thể
export const config = {
  matcher: ['/api/v1/admin/:path*', '/api/v1/user/:path*']
};