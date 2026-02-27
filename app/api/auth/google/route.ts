import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/google';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const actionParam = searchParams.get('action');
  const customState = searchParams.get('state');
  
  // Parse custom state or create default based on action parameter
  let stateData;
  if (customState) {
    try {
      stateData = JSON.parse(decodeURIComponent(customState));
    } catch (error) {
      console.error('Error parsing custom state:', error);
      stateData = { action: actionParam || 'signup' };
    }
  } else {
    stateData = { action: actionParam || 'signup' };
  }
  
  const action = stateData.action || 'signup';
  const branchType = stateData.branchType || 'single';
  
  // Encode action and branch type in state parameter for Google
  const state = encodeURIComponent(JSON.stringify({ action, branchType }));
  
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  return NextResponse.redirect(authUrl.toString());
}
