import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Menu } from '@/models/Menu';
import jwt from 'jsonwebtoken';

// Helper to wrap promise with a hard timeout for DNS/slow connection issues
const withTimeout = (promise: Promise<any>, timeoutMs: number) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out')), 15000))
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

import { generateSeedItems } from '@/lib/seedGenerator';

// Base items for the mock menu
const BASE_MOCK = [
  // STARTERS (TANDOOR)
  {
    _id: "mock-1",
    name: 'Paneer Tikka Angara',
    description: 'Fresh cottage cheese cubes marinated in spicy red chili paste, finished in a clay oven. Served with mint chutney.',
    price: 349,
    category: 'Starters',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80',
    isPopular: true,
    isAvailable: true
  },
  {
    _id: "mock-s2",
    name: 'Afghani Murg Malai',
    description: 'Tender chicken marinated in cream, cheese and cashew paste with mild aromatic spices, roasted in charcoal tandoor.',
    price: 459,
    category: 'Starters',
    dietary: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80',
    isPopular: true,
    isAvailable: true
  },
  
  // MAIN COURSE (THE HANDI)
  {
    _id: "mock-m1",
    name: 'Dal TastyBites 24/7',
    description: 'Black lentils slow-cooked for 24 hours with spices, butter and cream for that authentic earthy flavor.',
    price: 289,
    category: 'Mains',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
    isPopular: true,
    isAvailable: true
  },
  // ... more can be added
];

// Generate 120+ items for a rich mock experience
const GENERATED_MOCK = generateSeedItems(20).map((item, idx) => ({
    ...item,
    _id: `mock-gen-${idx}`
}));

const MOCK_MENU = [...BASE_MOCK, ...GENERATED_MOCK];

export async function GET() {
  try {
    try {
      await withTimeout(connectDB(), 3000);
      const items = await Menu.find({});
      if (items.length > 0) {
        return NextResponse.json(items, { status: 200 });
      }
      // If DB is empty, still serve mock for better user experience initially
      return NextResponse.json(MOCK_MENU, { status: 200 });
    } catch (e: any) {
       console.warn("Serving MOCK MENU due to DB offline or empty:", e.message);
       return NextResponse.json(MOCK_MENU, { status: 200 });
    }
  } catch (error: any) {
    console.error('Ultimate GET Fallback:', error);
    return NextResponse.json(MOCK_MENU, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!await verifyToken(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await withTimeout(connectDB(), 5000);
    const data = await req.json();
    const item = await Menu.create(data);
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
