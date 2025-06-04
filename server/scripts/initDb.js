import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get the database instance
    const db = mongoose.connection.db;

    // Create collections if they don't exist
    await db.createCollection('users');
    console.log('Users collection created');

    await db.createCollection('profiles');
    console.log('Profiles collection created');

    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('Created unique index on users.email');

    await db.collection('profiles').createIndex({ user: 1 }, { unique: true });
    console.log('Created unique index on profiles.user');

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

initializeDatabase();