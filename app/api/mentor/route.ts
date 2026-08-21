import { NextRequest, NextResponse } from 'next/server';
import { analyzeStudentCode, detectLanguage } from '@/lib/codeMentorEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, language } = body;

    if (code === undefined || code === null) {
      return NextResponse.json(
        { error: 'No code provided in request body.' },
        { status: 400 }
      );
    }

    const analysis = analyzeStudentCode(code, language);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('CodeMentor API Error:', error);
    return NextResponse.json(
      { 
        error: 'An error occurred during code analysis.', 
        details: error?.message || 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
