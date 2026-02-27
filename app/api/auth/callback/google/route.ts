import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/google';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // Decode action from state parameter
  let action = 'signup'; // default
  let branchType = 'single'; // default
  let bakeryName = ''; // default
  if (state) {
    try {
      const stateData = JSON.parse(decodeURIComponent(state));
      action = stateData.action || 'signup';
      branchType = stateData.branchType || 'single';
      bakeryName = stateData.bakeryName || '';
    } catch (error) {
      console.error('Error parsing state:', error);
      action = 'signup';
      branchType = 'single';
      bakeryName = '';
    }
  }

  if (!code) {
    return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 400 });
    }

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      return NextResponse.json({ error: 'Failed to get user info' }, { status: 400 });
    }

    const googleId = userData.id;
    const userEmail = userData.email;

    // Check if user already exists (by email, not just googleId)
    const existingUser = await prisma.user.findFirst({
      where: {
        email: userData.email
      }
    });

    let user: any = null;

    if (action === 'login') {
      // Login flow: user must exist
      if (!existingUser) {
        // User doesn't exist, redirect to signup with error
        const redirectUrl = new URL('http://localhost:3000/auth/callback');
        redirectUrl.searchParams.set('error', 'User not found. Please sign up first.');
        redirectUrl.searchParams.set('action', 'login_failed');
        return NextResponse.redirect(redirectUrl.toString());
      }
      
      // Link Google account to existing user if not already linked
      if (!existingUser.googleId) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            googleId: googleId,
            picture: userData.picture || existingUser.picture,
            verifiedEmail: userData.verified_email || existingUser.verifiedEmail,
          }
        });
      }
      
      // Use existing user
      user = existingUser;
    } else {
      // Signup flow: check if user already exists
      if (existingUser) {
        // User already exists, redirect to login with error
        const redirectUrl = new URL('http://localhost:3000/auth/callback');
        redirectUrl.searchParams.set('error', 'An account with this email already exists. Please login instead.');
        redirectUrl.searchParams.set('action', 'signup_failed');
        return NextResponse.redirect(redirectUrl.toString());
      }
      
      // Create new user in PostgreSQL with branch type and bakery name
      const newUser = await prisma.user.create({
        data: {
          googleId: googleId,
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
          verifiedEmail: userData.verified_email || false,
          branchType: branchType,
          bakeryName: bakeryName || `${userData.name}'s Bakery`,
        }
      });
    }

    // Get the user (existing or newly created)
    user = user || await prisma.user.findFirst({
      where: { googleId: googleId }
    });

    if (!user) {
      return NextResponse.json({ error: 'Failed to create/retrieve user' }, { status: 500 });
    }

    // Create bakery record if user has bakery name and doesn't have one yet
    const existingBakery = await prisma.bakery.findFirst({
      where: { userId: user.id }
    });
    
    if (!existingBakery && user.bakeryName) {
      await prisma.bakery.create({
        data: {
          name: user.bakeryName,
          userId: user.id,
        }
      });
    }

    // Create user session
    const redirectUrl = new URL('http://localhost:3000/auth/callback');
    redirectUrl.searchParams.set('user', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture || '',
      verified_email: user.verifiedEmail,
      branchType: user.branchType,
      bakeryName: user.bakeryName,
    }));
    redirectUrl.searchParams.set('token', tokenData.access_token);
    redirectUrl.searchParams.set('action', action);

    return NextResponse.redirect(redirectUrl.toString());

  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
