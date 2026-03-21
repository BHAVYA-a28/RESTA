import mongoose from 'mongoose';
import dns from 'dns';

// Force DNS to use Google to fix ECONNREFUSED for MongoDB SRV records on some networks
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('DB/DNS: Failed to set recursive servers, using default.');
}

// Global caching for Next.js hot reloading
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGO_URI || '';
  
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env');
  }

  if (MONGODB_URI.includes('<your_username>')) {
     throw new Error('MONGODB_URI contains a placeholder. Please update with your actual MongoDB credentials.');
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: true, // Allow commands to buffer while connecting
      connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      family: 4, // Robust for Atlas on Windows
    };

    console.log('🔌 DB: Establishing new connection to Mongo Atlas...');
    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log('✅ DB: Connected successfully (Ready for live traffic)');
      return m;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e: any) {
    console.error('❌ DB: Connection failed:', e.message);
    cached!.promise = null; // Reset for retry
    throw e;
  }

  return cached!.conn;
}

export default connectDB;
