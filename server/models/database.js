import { MongoClient, ObjectId } from 'mongodb';
import { config } from '../config/index.js';

let client;
let db;
let contacts;

export async function connectDB() {
  client = new MongoClient(config.mongoUri);
  await client.connect();
  db = client.db(config.dbName);
  contacts = db.collection('contacts');

  await contacts.createIndex({ created_at: -1 });
  console.log(`Connected to MongoDB: ${config.dbName}`);
  return db;
}

export function getContactsCollection() {
  return contacts;
}

export function getObjectId(id) {
  return new ObjectId(id);
}

export function closeDB() {
  if (client) return client.close();
}
