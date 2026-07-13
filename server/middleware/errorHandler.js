export function errorHandler(err, _req, res, _next) {
  console.error('Unhandled error:', err);

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid ID format.' });
  }

  if (err.code === 11000) {
    return res.status(409).json({ success: false, error: 'Duplicate entry.' });
  }

  res.status(500).json({ success: false, error: 'Internal server error.' });
}
