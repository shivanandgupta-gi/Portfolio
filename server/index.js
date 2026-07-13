import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/index.js';
import { connectDB, closeDB } from './models/database.js';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound } from './middleware/notFound.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Security
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: config.corsOrigins }));

// Parsing & logging
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

// API Routes
app.use('/api', apiRoutes);

// Serve Vite build in production
if (config.nodeEnv === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.use(notFound);
}

app.use(errorHandler);

// Graceful shutdown
async function start() {
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(`Portfolio server running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
  });

  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down...`);
    server.close(async () => {
      await closeDB();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
