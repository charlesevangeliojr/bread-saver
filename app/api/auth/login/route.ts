import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ 
        error: 'Missing required fields: email, password' 
      }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        // Only allow login for users who signed up with email (have password)
        password: { not: null }
      }
    });

    if (!user) {
      return NextResponse.json({ 
        error: 'Invalid email or password' 
      }, { status: 401 });
    }

    // In production, you should hash passwords and compare them
    // For now, we'll do simple string comparison (NOT SECURE FOR PRODUCTION)
    if (user.password !== password) {
      return NextResponse.json({ 
        error: 'Invalid email or password' 
      }, { status: 401 });
    }

    // Return success response with user data
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: '', // Email users don't have profile pictures initially
        verified_email: user.verifiedEmail,
      },
      token: 'email-login-token' // In production, use JWT
    });

  } catch (error) {
    console.error('Email login error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
