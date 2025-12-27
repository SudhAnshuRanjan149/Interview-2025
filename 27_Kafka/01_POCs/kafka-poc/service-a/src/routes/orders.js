import express from 'express';
import { z } from 'zod';
import { produceMessage } from '../kafka/producer.js';
import { logger } from '../utils/logger.js';

export const ordersRouter = express.Router();

// In-memory store for demo (use DB in production)
const orders = new Map();

// Validation schema
const createOrderSchema = z.object({
  orderId: z.string().uuid(),
  userId: z.string(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  }))
});

// POST /orders - Create order
ordersRouter.post('/', async (req, res, next) => {
  try {
    // Validate request body
    const orderData = createOrderSchema.parse(req.body);
    
    // Store order with pending status
    orders.set(orderData.orderId, {
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    
    // Produce to Kafka
    const event = {
      eventType: 'ORDER_CREATED',
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      data: orderData
    };
    
    await produceMessage('orders', orderData.orderId, event);
    
    logger.info('Order created', { orderId: orderData.orderId });
    
    res.status(202).json({
      message: 'Order accepted for processing',
      orderId: orderData.orderId
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors
      });
    }
    next(error);
  }
});

// GET /orders/:id - Get order status
ordersRouter.get('/:id', (req, res) => {
  const order = orders.get(req.params.id);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});

// Handler for payment events (called by consumer)
export function handlePaymentEvent({ key, value }) {
  const orderId = key;
  const order = orders.get(orderId);
  
  if (order) {
    order.status = value.data.paymentStatus;
    order.paymentId = value.data.paymentId;
    order.updatedAt = new Date().toISOString();
    
    logger.info('Order updated from payment event', {
      orderId,
      status: order.status
    });
  }
}
