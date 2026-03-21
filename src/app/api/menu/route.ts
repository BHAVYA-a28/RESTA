import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Menu } from '@/models/Menu';
import jwt from 'jsonwebtoken';

// Helper to wrap promise with a hard timeout for slow connection issues
const withTimeout = (promise: Promise<any>, timeoutMs: number) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out')), timeoutMs))
  ]);
};

// Helper to verify admin token
export async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return decoded;
  } catch (error) {
    return false;
  }
}

// Check if we are in demo mode (fallbacks allowed)
const IS_DEMO = process.env.DEMO_MODE === 'true';

export async function GET() {
  try {
    try {
      // Connect to DB with a 10s timeout for real-world reliability
      await withTimeout(connectDB(), 10000);
      const items = await Menu.find({});
      
      if (items.length > 0) {
        return NextResponse.json(items, { status: 200 });
      }

      // If DB is empty and NOT in demo mode, return empty array (fresh install)
      if (!IS_DEMO) {
        return NextResponse.json([], { status: 200 });
      }
      
      // If DEMO_MODE is ON and DB is empty, we can return some fallback items if desired
      // But for "REAL LIFE", we should probably return empty and let user use "Seed" button
      return NextResponse.json([], { status: 200 });

    } catch (dbError: any) {
       console.error("DB Error in Menu GET:", dbError.message);
       if (IS_DEMO) {
          // Only serve mock data if explicitly in demo mode
          const { SEED_ITEMS } = require('@/lib/seedGenerator'); 
          return NextResponse.json(SEED_ITEMS, { status: 200 });
       }
       return NextResponse.json({ error: 'Database service unavailable' }, { status: 503 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!await verifyToken(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const data = await req.json();
    
    // Server-side validation
    if (!data.name || !data.price || !data.category) {
      return NextResponse.json({ error: 'Missing required fields: name, price, category are mandatory' }, { status: 400 });
    }

    const item = await Menu.create(data);
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    console.error('Menu POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
