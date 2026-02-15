import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ chatId: string }> },
) {
  const { chatId } = await context.params;

  const messages = await prismaClient.messages.findMany({
    where: {
      direct_chat_id: chatId,
    },

    orderBy: {
      created_at: "asc",
    },

    include: {
      message_contents: true,
      user_profiles: {
        select: {
          id: true,
          display_name: true,

        },
      },
    },
  });

  const messagesFlat = messages.map(msg => ({
    id: msg.id,
    sender_id: msg.sender_id,
    display_name: msg.user_profiles.display_name,
    created_at: msg.created_at,
    text: msg.message_contents?.text || null,
    payload: msg.message_contents?.payload || null,
  }));
  console.log(messagesFlat)

  return NextResponse.json(messagesFlat);
}


export async function POST(
  req: NextRequest,
  context: { params: Promise<{ chatId: string }> },
) {
  const { chatId } = await context.params;
  const { sender_id, text, payload } = await req.json();

  const message = await prismaClient.messages.create({
    data: {
      sender_id: sender_id,
      direct_chat_id: chatId,

      message_contents: {
        create: {
          text: text,
          payload: payload || null
        },
      },
    },

    include: {
      message_contents: true
    }
  });

  return NextResponse.json({ ...message, text, payload }, { status: 201 });
}
