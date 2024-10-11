// app/api/subscribe/route.ts

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
// import { Prisma } from '@prisma/client';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const subscriber = await prisma.subscriber.create({
      data: {
        email,
      },
    });
    return NextResponse.json(
      { message: 'Subscription successful', data: subscriber },
      { status: 200 }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      // Unique constraint failed
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 });
    } else {
      console.error(error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  } finally {
    await prisma.$disconnect();
  }
}
