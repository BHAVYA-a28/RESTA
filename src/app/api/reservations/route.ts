import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Reservation } from '@/models/Reservation';
import { verifyToken } from '../menu/route';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const reservation = await Reservation.create(data);
    return NextResponse.json(reservation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!await verifyToken(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    return NextResponse.json(reservations, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
