import * as contactService from '../services/contactService.js';
import { apiResponse } from '../utils/response.js';
import { sanitizeInput } from '../utils/sanitize.js';

export async function createContact(req, res, next) {
  try {
    const data = req.validatedBody || req.body;
    const sanitized = sanitizeInput(data);
    const contact = await contactService.createContact(sanitized);

    console.log(`New contact submission #${contact.id} from ${contact.email} (email: ${contact.emailSent ? 'sent' : 'failed'})`);

    if (contact.emailSent) {
      apiResponse(res, {
        status: 201,
        success: true,
        data: { id: contact.id },
        message: 'Message sent successfully! I will get back to you soon.',
      });
    } else {
      apiResponse(res, {
        status: 201,
        success: true,
        data: { id: contact.id },
        message: 'Message received, but email delivery failed. I will still see your message.',
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllContacts(_req, res, next) {
  try {
    const contacts = await contactService.fetchAllContacts();
    apiResponse(res, {
      status: 200,
      success: true,
      data: { contacts, total: contacts.length },
    });
  } catch (err) {
    next(err);
  }
}

export async function markAsRead(req, res, next) {
  try {
    await contactService.markContactAsRead(req.params.id);
    apiResponse(res, { status: 200, success: true, message: 'Marked as read.' });
  } catch (err) {
    next(err);
  }
}

export function healthCheck(_req, res) {
  apiResponse(res, {
    status: 200,
    success: true,
    data: { status: 'ok', timestamp: new Date().toISOString() },
  });
}
