import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { logger } from './utils/logger.js';

export const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.disable('x-powered-by');

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Request logging
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'service-b' });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack
  });
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error'
    }
  });
});
