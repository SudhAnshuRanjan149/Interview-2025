import { kafka } from './client.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

const consumer = kafka.consumer({
  groupId: config.KAFKA_GROUP_ID,
  sessionTimeout: 30000,
  heartbeatInterval: 3000,
  maxWaitTimeInMs: 5000,
  retry: {
    initialRetryTime: 100,
    retries: 8
  }
});

let isConnected = false;

export async function connectConsumer() {
  if (!isConnected) {
    await consumer.connect();
    isConnected = true;
    logger.info('Kafka consumer connected');
  }
}

export async function subscribeAndConsume(topic, handler) {
  await consumer.subscribe({ 
    topic, 
    fromBeginning: false 
  });
  
  logger.info('Subscribed to topic', { topic });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = JSON.parse(message.value.toString());
        const key = message.key ? message.key.toString() : null;
        
        logger.info('Message received', {
          topic,
          partition,
          offset: message.offset,
          key
        });
        
        await handler({ key, value, topic, partition, offset: message.offset });
        
      } catch (error) {
        logger.error('Error processing message', {
          topic,
          partition,
          offset: message.offset,
          error: error.message
        });
        // In production, consider sending to DLT or implementing retry logic
      }
    }
  });
}

export async function disconnectConsumer() {
  if (isConnected) {
    await consumer.disconnect();
    isConnected = false;
    logger.info('Kafka consumer disconnected');
  }
}
