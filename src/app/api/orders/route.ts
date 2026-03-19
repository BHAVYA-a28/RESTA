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

export async function PATCH(req: NextRequest) {
  try {
    const { tableNumber, orderId, status } = await req.json();
    
    try {
      await withTimeout(connectDB(), 3000);
      
      if (orderId) {
        // Individual order update
        const updated = await Order.findByIdAndUpdate(orderId, { $set: { status } }, { new: true });
        return NextResponse.json(updated);
      } else if (tableNumber) {
        // Bulk table update (e.g., bill request)
        await Order.updateMany(
          { tableNumber, status: { $nin: ['completed', 'cancelled'] } },
          { $set: { status: status || 'bill_requested' } }
        );
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'Missing tableNumber or orderId' }, { status: 400 });
    } catch (e: any) {
      // Mock fallback
      if (orderId) {
        const order = mockOrders.find(o => o._id === orderId);
        if (order) order.status = status;
        return NextResponse.json({ success: true, isDemo: true });
      } else if (tableNumber) {
        mockOrders.forEach(o => {
          if (o.tableNumber === tableNumber && !['completed', 'cancelled'].includes(o.status)) {
            o.status = status || 'bill_requested';
          }
        });
        return NextResponse.json({ success: true, isDemo: true });
      }
      return NextResponse.json({ error: 'Fallback failed' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tableNum = searchParams.get('table');

    let dbOrders = [];
    try {
      await withTimeout(connectDB(), 3000);
      const query = tableNum ? { tableNumber: tableNum } : {};
      dbOrders = await Order.find(query).sort({ createdAt: -1 });
    } catch (e) {
      console.warn('GET /orders: DB offline, showing mock data only.');
    }

    let filteredMocks = mockOrders;
    if (tableNum) {
      filteredMocks = mockOrders.filter(o => o.tableNumber === tableNum);
    }

    const combined = [...filteredMocks, ...dbOrders];
    return NextResponse.json(combined);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
