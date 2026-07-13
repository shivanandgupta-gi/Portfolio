const sanitize = (str) => str.replace(/[<>]/g, '').trim();

export function sanitizeInput(obj) {
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      cleaned[key] = sanitize(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}
