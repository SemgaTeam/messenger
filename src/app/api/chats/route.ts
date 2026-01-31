// app/api/chats/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  const chats = await query(`
    SELECT dc.id, u1.display_name AS user1, u2.display_name AS user2, dc.created_at
    FROM direct_chats dc
    JOIN user_profiles u1 ON dc.user1_id = u1.id
    JOIN user_profiles u2 ON dc.user2_id = u2.id
  `);
  return NextResponse.json(chats);
}

export async function POST(req: Request) {
  const { user1_id, user2_id } = await req.json();
  const [chat] = await query(
    `INSERT INTO direct_chats (user1_id, user2_id) VALUES ($1, $2) RETURNING *`,
    [user1_id, user2_id]
  );
  return NextResponse.json(chat, { status: 201 });
}
