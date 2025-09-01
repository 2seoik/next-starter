import { NextRequest, NextResponse } from 'next/server';

// api/hello?name=test
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get('name');

  return NextResponse.json({
    message: `Hello, ${name}! Wellcome NextJs!`,
  });
}
