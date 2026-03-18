import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Order } from '@/models/Order';
import { Menu } from '@/models/Menu'; // Required for ref

let mockOrders: any[] = [];

// Helper to wrap promise with a hard timeout for DNS/slow connection issues
const withTimeout = (promise: Promise<any>, timeoutMs: number) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out')), timeoutMs))
  ]);
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, totalAmount, tableNumber } = body;

    // Transform UI cart state to DB order state safely
    const orderItems = (items || []).map((i: any) => ({
      productId: i._id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image
    }));

    try {
      // If DB doesn't respond within 3 seconds, we bail to Mock for a smooth Guest experience
      await withTimeout(connectDB(), 3000);
      
      const newOrder = await Order.create({
        items: orderItems,
        totalAmount,
        tableNumber,
        status: 'pending'
      });
      return NextResponse.json(newOrder, { status: 201 });
    } catch (dbError: any) {
      console.error('Bailing to Mock Ordering:', dbError.message);
      
      const newMockOrder = {
        _id: 'ORDER_DEMO_' + Math.random().toString(36).substr(2, 9),
        items: orderItems,
        totalAmount,
        tableNumber: tableNumber || 'Unknown',
        status: 'pending (Demo Mode)',
        createdAt: new Date().toISOString()
      };
      
      mockOrders.unshift(newMockOrder); 
      return NextResponse.json({ ...newMockOrder, isDemo: true }, { status: 201 });
    }
  } catch (error: any) {
    console.error('Order API Critical Error:', error);
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    let dbOrders = [];
    try {
      await withTimeout(connectDB(), 3000);
      dbOrders = await Order.find({}).sort({ createdAt: -1 });
    } catch (e) {
      console.warn('GET /orders: DB offline, showing mock data only.');
    }

    const combined = [...mockOrders, ...dbOrders];
    return NextResponse.json(combined);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
