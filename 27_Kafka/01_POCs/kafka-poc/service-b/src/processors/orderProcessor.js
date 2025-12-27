import { z } from 'zod';
import { produceMessage } from '../kafka/producer.js';
import { logger } from '../utils/logger.js';

// Validation schema
const orderEventSchema = z.object({
  eventType: z.literal('ORDER_CREATED'),
  eventId: z.string().uuid(),
  timestamp: z.string(),
  data: z.object({
    orderId: z.string().uuid(),
    userId: z.string(),
    amount: z.number().positive(),
    currency: z.string(),
    items: z.array(z.any())
  })
});

export async function processOrder({ key, value, topic, partition, offset }) {
  const orderId = key;
  
  try {
    // Validate event schema
    const orderEvent = orderEventSchema.parse(value);
    
    // Simulate payment processing logic
    const paymentSuccess = Math.random() > 0.2; // 80% success rate for demo
    
    if (!paymentSuccess) {
      throw new Error('Payment gateway declined');
    }
    
    // Create payment event
    const paymentEvent = {
      eventType: 'PAYMENT_COMPLETED',
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      data: {
        orderId: orderEvent.data.orderId,
        paymentId: crypto.randomUUID(),
        paymentStatus: 'completed',
        amount: orderEvent.data.amount,
        currency: orderEvent.data.currency,
        processedAt: new Date().toISOString()
      }
    };
    
    // Produce to payments topic
    await produceMessage('payments', orderId, paymentEvent);
    
    logger.info('Order processed successfully', { orderId });
    
  } catch (error) {
    logger.error('Order processing failed', {
      orderId,
      error: error.message
    });
    
    // Send to Dead Letter Topic
    const dltEvent = {
      originalTopic: topic,
      originalPartition: partition,
      originalOffset: offset,
      originalKey: key,
      originalValue: value,
      errorType: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
      failedAt: new Date().toISOString(),
      retryCount: 0
    };
    
    try {
      await produceMessage('orders.DLT', orderId, dltEvent);
      logger.info('Message sent to DLT', { orderId });
    } catch (dltError) {
      logger.error('Failed to send to DLT', {
        orderId,
        error: dltError.message
      });
    }
  }
}
