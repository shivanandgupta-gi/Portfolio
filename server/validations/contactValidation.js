import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required.')
    .max(100, 'Name is too long (max 100 characters).')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please provide a valid email address.')
    .max(255)
    .toLowerCase()
    .trim(),
  subject: z
    .string()
    .min(1, 'Subject is required.')
    .max(200, 'Subject is too long (max 200 characters).')
    .trim(),
  message: z
    .string()
    .min(1, 'Message is required.')
    .max(5000, 'Message is too long (max 5000 characters).')
    .trim(),
});

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((i) => i.message);
      return res.status(400).json({ success: false, error: errors[0] });
    }
    req.validatedBody = result.data;
    next();
  };
}
