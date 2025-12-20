import { app } from './app.js';
import { config } from './config/env.js';
import { connectProducer, disconnectProducer } from './kafka/producer.js';
import { connectConsumer, disconnectConsumer, subscribeAndConsume } from './kafka/consumer.js';
import { handlePaymentEvent } from './routes/orders.js';
import { logger } from './utils/logger.js';

async function startServer() {
  try {
    // Connect Kafka producer
    await connectProducer();
    
    // Connect Kafka consumer and subscribe to payments
    await connectConsumer();
    await subscribeAndConsume('payments', handlePaymentEvent);
    
    // Start Express server
    const server = app.listen(config.SERVICE_PORT, () => {
      logger.info(`Service A listening on port ${config.SERVICE_PORT}`);
    });
    
    // Graceful shutdown
    const shutdown = async (signal) => {
      logger.info(`${signal} received, shutting down gracefully`);
      
      server.close(async () => {
        await disconnectProducer();
        await disconnectConsumer();
        logger.info('Server closed');
        process.exit(0);
      });
      
      // Force close after 10s
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };
    
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    
  } catch (error) {
    logger.error('Failed to start service', { error: error.message });
    process.exit(1);
  }
}

startServer();
