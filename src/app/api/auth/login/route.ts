import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

function generateToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const identifier = email; 

    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('Database Connection Error during Login:', dbError);
      
      // Mock Login Fallback
      if ((identifier === 'admin' || identifier === 'admin123') && (password === 'admin123' || password === 'admin')) {
         console.warn("Using MOCK LOGIN due to database connection failure.");
         return NextResponse.json({
            _id: 'mock-admin-id',
            name: 'Admin (Offline Mode)',
            email: 'admin@admin.com',
            role: 'admin',
            token: jwt.sign({ id: 'mock-admin-id' }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' }),
         });
      }
      return NextResponse.json({ error: 'Database Connection Failed. Please check MONGO_URI.' }, { status: 503 });
    }

    // Development auto-setup script: Create a default admin if none exists
    const adminCount = await User.countDocuments({});
    if (adminCount === 0) {
      if ((identifier === 'admin' || identifier === 'admin@admin.com') && password === 'admin123') {
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash('admin123', salt);
         await User.create({ name: 'Admin', email: 'admin@admin.com', password: hashedPassword, role: 'admin' });
      }
    }

    const user = await User.findOne({ 
      $or: [{ email: identifier }, { name: identifier }] 
    });

    if (user && (await bcrypt.compare(password, user.password as string))) {
      return NextResponse.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
         token: generateToken(user._id.toString()),
      });
    } else {
      return NextResponse.json({ error: 'Invalid identifier or password' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
