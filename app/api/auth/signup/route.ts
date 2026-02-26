import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password, bakeryName, branchType } = await request.json();

    // Validate required fields
    if (!email || !password || !bakeryName || !branchType) {
      return NextResponse.json({ 
        error: 'Missing required fields: email, password, bakeryName, branchType' 
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { googleId: email } // In case email matches a Google ID
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ 
        error: 'User with this email already exists' 
      }, { status: 400 });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // In production, you should hash this
        name: email.split('@')[0], // Default name from email
        bakeryName,
        branchType,
        verifiedEmail: false, // Email users need email verification
      }
    });

    // Create bakery record
    await prisma.bakery.create({
      data: {
        name: bakeryName,
        userId: newUser.id,
      }
    });

    // Return success response
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        picture: '', // Email users don't have profile pictures initially
        verified_email: newUser.verifiedEmail,
      }
    });

  } catch (error) {
    console.error('Email signup error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
