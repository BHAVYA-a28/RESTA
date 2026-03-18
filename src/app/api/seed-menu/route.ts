import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Menu } from '@/models/Menu';
import jwt from 'jsonwebtoken';

const SEED_ITEMS = [
  // STARTERS (TANDOOR)
  {
    name: 'Paneer Tikka Angara',
    description: 'Fresh cottage cheese cubes marinated in spicy red chili paste, finished in a clay oven. Served with mint chutney.',
    price: 349,
    category: 'Starters',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    name: 'Afghani Murg Malai',
    description: 'Tender chicken marinated in cream, cheese and cashew paste with mild aromatic spices, roasted in charcoal tandoor.',
    price: 459,
    category: 'Starters',
    dietary: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  
  // MAIN COURSE (THE HANDI)
  {
    name: 'Dal TastyBites 24/7',
    description: 'Black lentils slow-cooked for 24 hours with spices, butter and cream for that authentic earthy flavor.',
    price: 289,
    category: 'Mains',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    name: 'Kashmiri Mutton Rogan Josh',
    description: 'A signature mutton recipe with a perfect balance of traditional Kashmiri spices and tender lamb chunks.',
    price: 529,
    category: 'Mains',
    dietary: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1545243191-240acc07f282?auto=format&fit=crop&w=800&q=80',
    isPopular: false
  },

  // RICE & BIRYANI
  {
    name: 'Lucknowi Dum Biryani',
    description: 'Fragrant basmati rice and tender meat pieces cooked on slow fire with saffron and aromatic spices.',
    price: 449,
    category: 'Biryani',
    dietary: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },

  // BREADS
  {
    name: 'Garlic Butter Naan',
    description: 'Traditional Indian leavened bread infused with fresh garlic and cilantro, brushed with pure butter.',
    price: 69,
    category: 'Breads',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1601303516536-225654037bt5?auto=format&fit=crop&w=800&q=80',
    isPopular: false
  },

  // DESSERTS
  {
    name: 'Kesari Gulab Jamun',
    description: 'Golden fried milk dumplings soaked in saffron-infused warm sugar syrup. Served as a pair.',
    price: 149,
    category: 'Desserts',
    dietary: 'Veg',
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=80',
    isPopular: false
  }
];

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'secret');

    await connectDB();
    
    // Clear existing menu to prevent duplicates during seeding session
    await Menu.deleteMany({}); 

    await Menu.insertMany(SEED_ITEMS);

    return NextResponse.json({ message: 'Menu seeded successfully', count: SEED_ITEMS.length }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
