import express from 'express';
import { corsMiddleware } from './middleware/cors.middleware';

export function createApp(): express.Application {
  const app = express();

  // Middleware
  app.use(corsMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return app;
}

