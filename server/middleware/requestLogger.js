export function requestLogger(req, _res, next) {
  const start = Date.now();
  _res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `${req.method} ${req.originalUrl} ${_res.statusCode} ${duration}ms`;
    if (_res.statusCode >= 400) {
      console.error(log);
    } else {
      console.log(log);
    }
  });
  next();
}
