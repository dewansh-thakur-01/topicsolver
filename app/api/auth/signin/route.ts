import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both email and password.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    return NextResponse.json({
      success: true,
      user: {
        id: 'usr_' + Date.now().toString(36),
        name: cleanEmail.split('@')[0],
        email: cleanEmail
      },
      token: 'jwt_mock_' + Date.now().toString(36),
      message: `Signed in successfully!`
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error during sign in.' },
      { status: 500 }
    );
  }
}
