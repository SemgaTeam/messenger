import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";

export async function GET() {

  const chats = await prismaClient.$queryRaw<{ id: number; user1: string; user2: string; created_at: Date }[]>
  `
    SELECT dc.id, u1.display_name AS user1, u2.display_name AS user2, dc.created_at
    FROM direct_chats dc
    JOIN user_profiles u1 ON dc.user1_id = u1.id
    JOIN user_profiles u2 ON dc.user2_id = u2.id
  `;
 
  return NextResponse.json(chats);
}

export async function POST(req: Request) {
  const { user1_id, user2_id } = await req.json();

  // Rule in bd user1_id < user2_id
  const sortedIds = [user1_id, user2_id].sort();

  const chat = await prismaClient.direct_chats.create({
    data: {
      user1_id: sortedIds[0],
      user2_id: sortedIds[1]
    }
  });

  return NextResponse.json(chat, { status: 201 });
}
