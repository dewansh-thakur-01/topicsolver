import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = (name || cleanEmail.split('@')[0]).trim();

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: 'usr_' + Date.now().toString(36),
        name: cleanName,
        email: cleanEmail
      },
      token: 'jwt_mock_' + Date.now().toString(36),
      message: `Account registered successfully for ${cleanName}!`
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error during sign up.' },
      { status: 500 }
    );
  }
}
