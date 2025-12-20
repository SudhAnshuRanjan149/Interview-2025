import { app } from './app.js';
import { config } from './config/env.js';
import { connectProducer, disconnectProducer } from './kafka/producer.js';
import { connectConsumer, disconnectConsumer, subscribeAndConsume } from './kafka/consumer.js';
import { processOrder } from './processors/orderProcessor.js';
import { logger } from './utils/logger.js';

async function startServer() {
  try {
    // Connect Kafka producer
    await connectProducer();
    
    // Connect Kafka consumer and subscribe to orders
    await connectConsumer();
    await subscribeAndConsume('orders', processOrder);
    
    // Start Express server
    const server = app.listen(config.SERVICE_PORT, () => {
      logger.info(`Service B listening on port ${config.SERVICE_PORT}`);
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
