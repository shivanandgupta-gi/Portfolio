import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as contactController from '../controllers/contactController.js';
import { validate, contactSchema } from '../validations/contactValidation.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/contact', contactLimiter, validate(contactSchema), contactController.createContact);
router.get('/contact', contactController.getAllContacts);
router.patch('/contact/:id/read', contactController.markAsRead);
router.get('/health', contactController.healthCheck);

export default router;
