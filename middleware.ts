import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Logoout Procedure for Applicants
  if (request.nextUrl.pathname.startsWith('/logout')) {
    if(request.cookies.has('applicant')) request.cookies.delete('applicant'); // Clear Session
    return NextResponse.redirect(new URL('/', request.url));
  }
 
  // Applicant Session Verification   
  let applicant = request.cookies.get('applicant')?.value;
  if(!applicant) return NextResponse.redirect(new URL('/', request.url));
  return response;

  
}
 
// See "Matching Paths" below to learn more
export const config = {
   matcher: ['/application', '/printout','/smsfly','/register','/logout'],
};