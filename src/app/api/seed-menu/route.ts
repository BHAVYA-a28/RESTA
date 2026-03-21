import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Menu } from '@/models/Menu';
import jwt from 'jsonwebtoken';
import { PREMIUM_SEED } from '@/lib/seedGenerator';

export async function POST(req: NextRequest) {
  try {
    // Basic auth check
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (e) {
      return NextResponse.json({ error: 'Invalid Session' }, { status: 401 });
    }

    await connectDB();
    
    console.log('🧹 Seeding: Clearing existing menu...');
    await Menu.deleteMany({}); 

    console.log(`🌱 Seeding: Inserting ${PREMIUM_SEED.length} premium items...`);
    await Menu.insertMany(PREMIUM_SEED);

    return NextResponse.json({ 
      message: 'Menu seeded with premium selection', 
      count: PREMIUM_SEED.length 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Seeding Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
