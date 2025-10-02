import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const MONGO_URI = process.env.MONGO_URI;
const DISCORD_ID = process.env.VITE_DISCORD_ID;
const lanyardUrl = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log('Using cached MongoDB client and database');
    return { client: cachedClient, db: cachedDb };
  }
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db();
  cachedClient = client;
  cachedDb = db;
  console.log('MongoDB connection established');
  return { client, db };
}

async function fetchDiscordPresence() {
  console.log('Fetching Discord presence from Lanyard API...');
  const res = await fetch(lanyardUrl);
  if (!res.ok) {
    const errMsg = `Failed to fetch Lanyard: ${res.status} ${res.statusText}`;
    console.error(errMsg);
    throw new Error(errMsg);
  }
  const json = await res.json();
  console.log('Discord presence fetched successfully');
  return json.data;
}

async function upsertActivity(db, data) {
  console.log('Updating activity document in MongoDB...');
  const collection = db.collection('discord_presence');
  const result = await collection.updateOne(
    { user_id: DISCORD_ID },
    {
      $set: {
        activity_type: 'discord_presence',
        activity_data: data,
        last_seen_at: new Date()
      }
    },
    { upsert: true }
  );
  console.log('MongoDB upsert completed:', result.result);
  return result;
}

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const presence = await fetchDiscordPresence();

    if (presence.spotify && presence.spotify.album_art_url) {
      const regex = /^\[([^\]]+)\]\([^)]+\)$/;
      const match = presence.spotify.album_art_url.match(regex);
      if (match) {
        presence.spotify.album_art_url = match[1];
        console.log('Cleaned Spotify album_art_url');
      }
    }

    await upsertActivity(db, presence);
    console.log('Activity updated successfully');
    res.status(200).json({ message: 'Activity updated successfully' });
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ error: error.message });
  }
}
