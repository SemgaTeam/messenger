import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  const users = await query('SELECT * FROM user_profiles');
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { display_name, description, status } = await req.json();
  const [user] = await query(
    'INSERT INTO user_profiles (display_name, description, staatus) VALUES ($1, $2, $3) RETURNING *',
    [display_name, description, status ]
  );
  return NextResponse.json(user, { status: 201 });
}
