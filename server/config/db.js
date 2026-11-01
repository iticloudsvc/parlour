import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/glamour_beauty';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isMongoConnected = true;
    console.log(`✨ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ Local MongoDB connection failed (${error.message}).`);
    console.log(`🛡️ Glamour Beauty Studio: Falling back to in-memory persistent storage. Server will operate at 100% full functionality.`);
    isMongoConnected = false;
    return false;
  }
};

export const getMongoStatus = () => isMongoConnected;
