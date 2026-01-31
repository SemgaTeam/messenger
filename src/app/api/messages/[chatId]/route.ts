import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/messages/[chatId]
export async function GET(req: NextRequest, context: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await context.params; // ✅ unwrap params

  const messages = await query(
    `
    SELECT m.id, m.sender_id, u.display_name, m.created_at, mc.text, mc.payload
    FROM messages m
    JOIN message_contents mc ON m.id = mc.message_id
    JOIN user_profiles u ON m.sender_id = u.id
    WHERE m.direct_chat_id = $1
    ORDER BY m.created_at ASC
  `,
    [chatId]
  );

  return NextResponse.json(messages);
}

// POST /api/messages/[chatId]
export async function POST(req: NextRequest, context: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await context.params; // ✅ unwrap params
  const { sender_id, text, payload } = await req.json();

  const [message] = await query(
    `INSERT INTO messages (sender_id, direct_chat_id) VALUES ($1, $2) RETURNING *`,
    [sender_id, chatId]
  );

  await query(
    `INSERT INTO message_contents (message_id, text, payload) VALUES ($1, $2, $3)`,
    [message.id, text, payload || null]
  );

  return NextResponse.json({ ...message, text, payload }, { status: 201 });
}
