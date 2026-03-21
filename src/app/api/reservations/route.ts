import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Reservation } from '@/models/Reservation';
import { verifyToken } from '../menu/route';

const IS_DEMO = process.env.DEMO_MODE === 'true';

const withTimeout = (promise: Promise<any>, timeoutMs: number) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out')), timeoutMs))
  ]);
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    
    // Server-side validation
    if (!data.name || !data.email || !data.date || !data.time || !data.guests) {
       return NextResponse.json({ error: 'Missing mandatory fields: name, email, date, time, guests' }, { status: 400 });
    }

    const reservation = await Reservation.create(data);
    return NextResponse.json(reservation, { status: 201 });
  } catch (error: any) {
    console.error('Reservation POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!await verifyToken(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      await withTimeout(connectDB(), 10000);
      const data = await Reservation.find({}).sort({ createdAt: -1 }).limit(100);
      return NextResponse.json(data, { status: 200 });
    } catch (dbError) {
      if (IS_DEMO) {
         const mockReservations = [
           { _id: 'mock-res-1', name: 'John Doe', email: 'john@example.com', phone: '9876543210', date: '2024-03-20', time: '19:00', guests: 2, tableNumber: '05', status: 'confirmed' },
           { _id: 'mock-res-2', name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', date: '2024-03-21', time: '20:30', guests: 4, tableNumber: '12', status: 'pending' }
         ];
         return NextResponse.json(mockReservations, { status: 200 });
      }
      return NextResponse.json({ error: 'Database service unavailable' }, { status: 503 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
