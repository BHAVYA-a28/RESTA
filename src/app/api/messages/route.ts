import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Message } from '@/models/Message';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const message = await Message.create(data);
    return NextResponse.json(message, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
