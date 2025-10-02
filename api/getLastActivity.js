import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const MONGO_URI = process.env.MONGO_URI;
const DISCORD_ID = process.env.VITE_DISCORD_ID;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db();
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const doc = await db.collection('discord_presence').findOne({ user_id: DISCORD_ID });
    if (!doc) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
