import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const subscriber = await prisma.subscriber.create({
      data: { email },
    })

    return NextResponse.json(
      { message: 'Subscription successful', data: subscriber },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscription error:', error)

    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 })
    } else {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  } finally {
    await prisma.$disconnect()
  }
}

