import mongoose from 'mongoose';
import dns from 'dns';

// Fix for ECONNREFUSED and DNS SRV issues in some Node.js environments
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

async function connectDB() {
  let cached = (global as any).mongoose;

  if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
  }
  const MONGODB_URI = process.env.MONGO_URI || '';
  
  // Check for placeholder URIs
  if (!MONGODB_URI || MONGODB_URI.includes('<your_username>')) {
     const error = new Error('MONGODB_URI is not configured in .env. Current value is a placeholder.');
     (error as any).isPlaceholder = true;
     throw error;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
