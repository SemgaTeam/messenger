import { prismaClient } from './../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  const users = await prismaClient.user_profiles.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { display_name, description, status } = await req.json();
      
  const user = await prismaClient.user_profiles.create({
      data: {
        display_name: display_name,
        description: description || null,
        status: status || 'active',
      },
    });

  return NextResponse.json(user, { status: 201 });
}
