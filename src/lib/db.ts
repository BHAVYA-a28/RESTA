import mongoose from 'mongoose';
import dns from 'dns';

// Force DNS to use Google to fix ECONNREFUSED for MongoDB SRV records
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('DNS: Failed to set recursive servers, using default.');
}

// Standard DB connection with Next.js caching
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
      connectTimeoutMS: 15000,
      serverSelectionTimeoutMS: 15000,
      family: 4, // Force IPv4 to resolve ATLAS DNS on Windows smoothly
    };

    console.log('🔄 DB: Connecting to MongoDB (IPv4 Mode)...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ DB: Successfully connected!');
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
