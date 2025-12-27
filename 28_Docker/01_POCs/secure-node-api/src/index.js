require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Basic security middlewares
app.use(helmet()); // security headers
app.use(cors({ origin: ['https://your-prod-domain.com'], methods: ['GET','POST'] })); // restrict origins
app.use(express.json({ limit: '10kb' })); // prevent large body DoS
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')); // logging

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter); // apply to API routes

// Basic healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Sample API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from secure API' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err); // in prod, send to log system
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
