import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Order } from '@/models/Order';
import { Menu } from '@/models/Menu';

let mockOrders: any[] = [];
const IS_DEMO = process.env.DEMO_MODE === 'true';

// Helper to wrap promise with a hard timeout
const withTimeout = (promise: Promise<any>, timeoutMs: number) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out')), timeoutMs))
  ]);
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, totalAmount, tableNumber, customer, type = 'dine-in' } = body;
    
    // Server-side Validation
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
    }

    if (type === 'delivery' && (!customer || !customer.address || !customer.phone)) {
      return NextResponse.json({ error: 'Delivery orders require address and phone number' }, { status: 400 });
    }

    // Transform UI cart state to DB order state safely
    const orderItems = (items || []).map((i: any) => ({
      productId: i._id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image
    }));

    try {
      // Connect to DB with 10s timeout
      await withTimeout(connectDB(), 10000);
      
      const newOrder = await Order.create({
        items: orderItems,
        totalAmount,
        tableNumber,
        customer,
        type, 
        status: 'pending'
      });
      console.log(`✅ Order Created: ${newOrder._id} (Type: ${type})`);
      return NextResponse.json(newOrder, { status: 201 });
    } catch (dbError: any) {
      console.error('Order API DB Error:', dbError.message);
      
      if (IS_DEMO) {
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

      return NextResponse.json({ error: 'Database service unavailable. Please try again later.' }, { status: 503 });
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
      await connectDB();
      
      if (orderId) {
        const updated = await Order.findByIdAndUpdate(orderId, { $set: { status } }, { new: true });
        return NextResponse.json(updated);
      } else if (tableNumber) {
        await Order.updateMany(
          { tableNumber, status: { $nin: ['completed', 'cancelled'] } },
          { $set: { status: status || 'bill_requested' } }
        );
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'Missing tableNumber or orderId' }, { status: 400 });
    } catch (e: any) {
      if (IS_DEMO) {
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
      }
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
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
      await connectDB();
      const query = tableNum ? { tableNumber: tableNum } : {};
      dbOrders = await Order.find(query).sort({ createdAt: -1 }).limit(50);
    } catch (e) {
      if (!IS_DEMO) return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
    }

    if (IS_DEMO) {
      let filteredMocks = mockOrders;
      if (tableNum) {
        filteredMocks = mockOrders.filter(o => o.tableNumber === tableNum);
      }
      const combined = [...filteredMocks, ...dbOrders];
      return NextResponse.json(combined);
    }

    return NextResponse.json(dbOrders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
