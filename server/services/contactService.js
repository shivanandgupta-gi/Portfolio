import { getContactsCollection, getObjectId } from '../models/database.js';
import { sendContactEmail } from './emailService.js';

export async function createContact({ name, email, subject, message }) {
  const collection = getContactsCollection();
  const doc = {
    name,
    email,
    subject,
    message,
    created_at: new Date(),
    is_read: false,
  };
  const result = await collection.insertOne(doc);
  const contact = { id: result.insertedId, ...doc };

  try {
    await sendContactEmail({ name, email, subject, message });
    contact.emailSent = true;
  } catch (err) {
    console.error('Email delivery failed:', err.message);
    contact.emailSent = false;
    contact.emailError = err.message;
  }

  return contact;
}

export async function fetchAllContacts() {
  const collection = getContactsCollection();
  return collection.find().sort({ created_at: -1 }).toArray();
}

export async function markContactAsRead(id) {
  const collection = getContactsCollection();
  const objectId = getObjectId(id);
  return collection.updateOne({ _id: objectId }, { $set: { is_read: true } });
}
