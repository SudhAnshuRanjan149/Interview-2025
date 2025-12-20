import { kafka } from './client.js';
import { logger } from '../utils/logger.js';

const producer = kafka.producer({
  allowAutoTopicCreation: false,
  idempotent: true,
  maxInFlightRequests: 5,
  transactionalId: 'service-a-producer',
});

let isConnected = false;

export async function connectProducer() {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    logger.info('Kafka producer connected');
  }
}

export async function produceMessage(topic, key, value) {
  try {
    const result = await producer.send({
      topic,
      messages: [
        {
          key: key.toString(),
          value: JSON.stringify(value),
          timestamp: Date.now().toString(),
        }
      ],
      acks: -1, // Wait for all in-sync replicas
      timeout: 30000,
    });
    
    logger.info('Message produced', { 
      topic, 
      key, 
      partition: result[0].partition,
      offset: result[0].offset 
    });
    
    return result;
  } catch (error) {
    logger.error('Failed to produce message', { topic, key, error: error.message });
    throw error;
  }
}

export async function disconnectProducer() {
  if (isConnected) {
    await producer.disconnect();
    isConnected = false;
    logger.info('Kafka producer disconnected');
  }
}
